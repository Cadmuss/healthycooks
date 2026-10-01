// Rebuild draft Supabase seed data from the trusted bundled recipe content.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..'),ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'dist/recipes.js'),'utf8'),ctx);
const q=s=>s===null?'null':"'"+String(s).replaceAll("'","''")+"'";
let sql='-- Draft seeds for a new database. Run once after 001_schema.sql.\n-- Media remains pending; verify playback and any segment boundaries before approving.\nbegin;\n';
for(const r of ctx.window.RECIPES){const id=`(select id from public.recipes where slug=${q(r.id)})`;
 sql+=`insert into public.countries(code,name,region,latitude,longitude) values (${q(r.code)},${q(r.country)},${q(r.region)},${r.lat},${r.lon}) on conflict(code) do nothing;\n`;
 sql+=`insert into public.recipes(slug,country_code,title,description,cuisine_note,total_minutes,base_servings,allergens,substitutions) values (${q(r.id)},${q(r.code)},${q(r.title)},${q(r.description)},'Cuisine-inspired healthycooks draft; not kitchen-tested.',${r.minutes},${r.servings},array[${q(r.allergens)}],${q(r.swap)});\n`;
 for(const [i,[n,u,name]] of r.ingredients.entries())sql+=`insert into public.recipe_ingredients(recipe_id,position,ingredient_name,quantity,unit) values (${id},${i},${q(name)},${n},${q(u)});\n`;
 for(const [i,s] of r.steps.entries()){
  const v=s.videos?.[0];let videoId='null';
  if(v){const url='https://www.youtube.com/watch?v='+v.id;
   sql+=`insert into public.media_assets(recipe_id,kind,provider,url,title,attribution,license,source_url,rights_basis,status) values (${id},'video','youtube',${q(url)},${q(v.title)},${q(v.creator)},'Third-party platform embed; no download or editing permission obtained.',${q(v.sourceUrl)},'platform_embed','pending');\n`;
   videoId=`(select id from public.media_assets where recipe_id=${id} and url=${q(url)})`;
  }
  sql+=`insert into public.recipe_steps(recipe_id,position,title,short_instruction,instruction,visual_cue,timer_seconds,video_id,video_start_seconds,video_end_seconds,default_method) values (${id},${i},${q(s.title)},${q(s.short||s.title)},${q(s.text)},${q(s.cue)},${s.seconds},${videoId},${v?.start||0},${v?.end??'null'},${q(s.defaultMethod||null)});\n`;
  for(const m of s.methods||[]){const full={...s,...m},mv=full.videos?.[0];let methodVideo=videoId;
   if(mv&&mv.id!==v?.id){const url='https://www.youtube.com/watch?v='+mv.id;
    sql+=`insert into public.media_assets(recipe_id,kind,provider,url,title,attribution,license,source_url,rights_basis,status) values (${id},'video','youtube',${q(url)},${q(mv.title)},${q(mv.creator)},'Third-party platform embed; no download or editing permission obtained.',${q(mv.sourceUrl)},'platform_embed','pending');\n`;
    methodVideo=`(select id from public.media_assets where recipe_id=${id} and url=${q(url)})`;
   }else if(!mv)methodVideo='null';
   const ui={hint:full.hint,facts:full.facts,checklist:full.checklist,methodNote:full.methodNote,adjustableTimer:full.adjustableTimer||false,timerLabel:full.timerLabel,checkpointSeconds:full.checkpointSeconds,checkpointMessage:full.checkpointMessage,mediaGap:full.mediaGap,gapTitle:full.gapTitle};
   sql+=`insert into public.recipe_step_methods(step_id,recipe_id,method_key,label,instruction,short_instruction,visual_cue,timer_seconds,temperature_c,ui_details,source_url,video_id) values ((select id from public.recipe_steps where recipe_id=${id} and position=${i}),${id},${q(m.id)},${q(m.label)},${q(full.text)},${q(full.short)},${q(full.cue)},${full.seconds},${full.temperatureC??'null'},${q(JSON.stringify(ui))}::jsonb,${q(full.sources?.[0]?.url||mv?.sourceUrl||null)},${methodVideo});\n`;
  }
 }
 const n=r.nutrition;sql+=`insert into public.nutrition_estimates(recipe_id,kcal,protein_g,carbs_g,fat_g,fibre_g,method) values (${id},${n.kcal},${n.protein},${n.carbs},${n.fat},${n.fibre},'Illustrative manual estimates. Not a validated ingredient-level calculation.');\n`;
 sql+=`insert into public.prep_guidance(recipe_id,portioning,cooling,storage,reheating,source_url) values (${id},${q(r.prep)},'Refrigerate or freeze within 2 hours. Cool rice promptly.','Refrigerate at 4°C or below. Plan to eat the next day; freeze later portions promptly.','Reheat cooked portions until steaming hot all the way through. Keep cold salad separate.','https://www.sfa.gov.sg/food-safety-tips/safe-food-practices/food-safety-tips');\n`;
}
fs.writeFileSync(path.join(root,'supabase/002_seed.sql'),sql+'commit;\n');
