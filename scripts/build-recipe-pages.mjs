// Generates one static page per recipe (with Google recipe markup) plus sitemap.xml.
// Run from the project folder:  node scripts/build-recipe-pages.mjs
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const SITE = 'https://healthycooks.vercel.app';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const outDir = path.join(dist, 'recipes');

const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(dist, 'recipes.js'), 'utf8'), sandbox);
const recipes = sandbox.window.RECIPES;
if (!Array.isArray(recipes) || !recipes.length) throw new Error('No recipes found in dist/recipes.js');

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const ingLine = ([n, u, name]) => `${+Number(n).toFixed(1)} ${u} ${name}`;
const dirs = s => s.directions || [s.short || s.text].filter(Boolean);
const defMethod = s => s.methods && (s.methods.find(m => m.id === s.defaultMethod) || s.methods[0]);
const stepText = s => dirs({ ...s, ...(defMethod(s) || {}) }).join(' ');
const num = (v, unit) => (v == null ? undefined : `${v} ${unit}`);

function jsonLd(r) {
  const n = r.nutrition || {};
  const data = {
    '@context': 'https://schema.org', '@type': 'Recipe',
    name: r.title, description: r.description, image: [`${SITE}/${r.image}`],
    author: { '@type': 'Organization', name: 'healthycooks', url: `${SITE}/` },
    totalTime: r.minutes ? `PT${r.minutes}M` : undefined,
    recipeYield: `${r.servings} servings`, recipeCategory: 'Main course', recipeCuisine: r.country,
    keywords: [r.country, r.tag, 'healthy', 'meal prep'].filter(Boolean).join(', '),
    recipeIngredient: r.ingredients.map(ingLine),
    recipeInstructions: r.steps.map(s => ({ '@type': 'HowToStep', name: s.title, text: stepText(s) })),
    nutrition: { '@type': 'NutritionInformation', servingSize: '1 portion', calories: num(n.kcal, 'kcal'), proteinContent: num(n.protein, 'g'), carbohydrateContent: num(n.carbs, 'g'), fatContent: num(n.fat, 'g'), fiberContent: num(n.fibre, 'g') }
  };
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

const css = `:root{color-scheme:light dark;--ink:#122739;--muted:#536472;--line:#dce3e6;--lime:#d6f56c;--sea:#eaf3f7;--paper:#f7f9fa;--card:#fff;--tint:#f1f6e6;--link:#0b5c8a}
@media(prefers-color-scheme:dark){:root{--ink:#e6edf1;--muted:#9fb1bd;--line:#2b4152;--paper:#0a1620;--card:#0f1f2c;--sea:#16293a;--tint:#1d3024;--link:#8cc8ee}}
*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:17px/1.6 Arial,Helvetica,sans-serif}
a{color:var(--link)}h1,h2,h3{line-height:1.15;margin:0}
.top{background:#122739;color:#fff}.top .in{max-width:1080px;margin:0 auto;padding:16px 22px;display:flex;justify-content:space-between;align-items:center}
.brand{font-size:24px;font-weight:800;letter-spacing:-1.1px;color:#fff;text-decoration:none}.brand span{color:var(--lime)}
.top nav a{color:#cfdbe3;text-decoration:none;font-size:15px}.top nav a:hover{color:#fff}
.hero{background:#122739;color:#fff;padding:8px 22px 56px}.hero .in{max-width:1080px;margin:0 auto;display:grid;gap:32px;grid-template-columns:1.1fr .9fr;align-items:center}
.eyebrow{color:var(--lime);font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin:0 0 12px}
.hero h1{font-size:clamp(2rem,4.5vw,3.2rem);letter-spacing:-.03em}.hero p.lead{color:#cfdbe3;font-size:1.1rem;margin:16px 0 0;max-width:34em}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin:22px 0 0;padding:0;list-style:none}
.chips li{background:#1b3a52;color:#fff;border-radius:999px;padding:7px 14px;font-size:14px;margin:0}.chips b{color:var(--lime)}
.cta{margin-top:26px;display:flex;gap:12px;flex-wrap:wrap}
.btn{display:inline-block;background:var(--lime);color:#122739;text-decoration:none;font-weight:700;padding:14px 26px;border-radius:999px;font-size:1.05rem}
.btn:hover{filter:brightness(.95)}.btn.ghost{background:transparent;color:#fff;border:2px solid #3b5a73}
.hero figure{margin:0}.hero img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:22px;display:block;box-shadow:0 20px 50px #0006}
.hero figcaption{color:#9fb1bd;font-size:12px;margin-top:8px}
.wrap{max-width:1080px;margin:0 auto;padding:36px 22px 20px;display:grid;gap:28px;grid-template-columns:340px 1fr;align-items:start}
.side{position:sticky;top:16px;display:grid;gap:18px}
.card{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:22px}
.card h2{font-size:1.25rem;margin-bottom:12px}.card h3{font-size:1rem;margin:14px 0 4px}
.ings{list-style:none;margin:0;padding:0}.ings li{display:flex;gap:10px;padding:9px 0;border-bottom:1px solid var(--line);margin:0}.ings li:last-child{border:0}
.ings .q{flex:0 0 74px;font-weight:700}.note{font-size:15px;color:var(--muted);margin:8px 0 0}
.main h2.sec{font-size:1.6rem;letter-spacing:-.02em;margin:0 0 16px}
.steps{list-style:none;counter-reset:s;margin:0;padding:0;display:grid;gap:14px}
.steps>li{counter-increment:s;background:var(--card);border:1px solid var(--line);border-radius:18px;padding:20px 22px 20px 74px;position:relative;margin:0}
.steps>li::before{content:counter(s);position:absolute;left:20px;top:18px;width:38px;height:38px;border-radius:50%;background:var(--lime);color:#122739;font-weight:800;line-height:38px;text-align:center}
.steps h3{font-size:1.15rem;margin-bottom:8px}.steps ul{margin:6px 0;padding-left:1.1em}.steps li li{margin:4px 0}
.opt{margin:12px 0 4px;font-weight:700;font-size:.95rem}.opt span{background:var(--sea);border-radius:999px;padding:3px 10px;font-size:12px;font-weight:700;margin-left:6px;color:var(--muted)}
.look{background:var(--tint);border-radius:12px;padding:12px 14px;margin:12px 0 0;font-size:.95rem}.look b{display:block;font-size:11px;letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px}
.stats{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin:0 0 6px}.stat{background:var(--sea);border-radius:14px;padding:14px 8px;text-align:center}.stat b{display:block;font-size:1.3rem}.stat span{font-size:12px;color:var(--muted)}
.prep{display:grid;grid-template-columns:1fr 1fr;gap:12px}.prep .card{padding:18px}.prep h3{margin:0 0 6px}.prep p{margin:0;font-size:.95rem}
.band{background:#122739;color:#fff;text-align:center;padding:40px 22px;margin-top:30px}.band h2{margin-bottom:14px}
.fine{max-width:1080px;margin:0 auto;padding:22px;color:var(--muted);font-size:13px}
footer{border-top:1px solid var(--line);max-width:1080px;margin:0 auto;padding:18px 22px 40px;font-size:14px;display:flex;gap:16px;flex-wrap:wrap}
@media(max-width:860px){.hero .in{grid-template-columns:1fr}.hero figure{order:-1}.wrap{grid-template-columns:1fr}.side{position:static}.stats{grid-template-columns:repeat(3,1fr)}.prep{grid-template-columns:1fr}.btn{width:100%;text-align:center}}`;

function page(r) {
  const url = `${SITE}/recipes/${r.id}.html`;
  const time = r.timeLabel || `${r.minutes} min`;
  const n = r.nutrition || {};
  const steps = r.steps.map(s => {
    let body;
    if (s.methods) {
      body = s.methods.map(m => `<p class="opt">${esc(m.label)}${m.id === s.defaultMethod ? '<span>Default</span>' : ''}</p><ul>${dirs({ ...s, ...m }).map(d => `<li>${esc(d)}</li>`).join('')}</ul>`).join('');
    } else {
      body = `<ul>${dirs(s).map(d => `<li>${esc(d)}</li>`).join('')}</ul>`;
    }
    const look = s.appearance || s.cue;
    return `<li><h3>${esc(s.title)}</h3>${body}${look ? `<div class="look"><b>What it should look like</b>${esc(look)}</div>` : ''}</li>`;
  }).join('\n');
  const prep = (r.prepCards || []).map(c => `<div class="card"><h3>${esc(c.title.replace(/^\d+\s*\/\s*/, ''))}</h3><p>${esc(c.text)}</p></div>`).join('');
  const stat = (v, l) => (v == null ? '' : `<div class="stat"><b>${esc(v)}</b><span>${l}</span></div>`);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(r.title)} — healthycooks</title>
<meta name="description" content="${esc(r.description)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article"><meta property="og:title" content="${esc(r.title)} — healthycooks"><meta property="og:description" content="${esc(r.description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${SITE}/${esc(r.image)}"><meta name="twitter:card" content="summary_large_image">
<style>${css}</style>
<script type="application/ld+json">${jsonLd(r)}</script>
</head><body>
<header class="top"><div class="in"><a class="brand" href="/">healthy<span>cooks</span></a><nav><a href="/#recipes">All recipes</a></nav></div></header>
<section class="hero"><div class="in">
<div><p class="eyebrow">${esc(r.country)}${r.tag ? ' · ' + esc(r.tag) : ''}</p><h1>${esc(r.title)}</h1><p class="lead">${esc(r.description)}</p>
<ul class="chips"><li>⏱ <b>${esc(time)}</b></li><li>🍽 <b>${esc(r.servings)}</b> portions</li>${n.kcal ? `<li>🔥 <b>${esc(n.kcal)}</b> kcal / portion*</li>` : ''}</ul>
<div class="cta"><a class="btn" href="/#${esc(r.id)}">Cook step by step →</a></div></div>
<figure><img src="/${esc(r.image)}" alt="${esc(r.imageAlt)}"><figcaption>Serving inspiration; not a photo of this exact recipe.</figcaption></figure>
</div></section>
<div class="wrap">
<aside class="side">
<div class="card"><h2>Ingredients</h2><p class="note" style="margin:0 0 6px">Makes ${esc(r.servings)} portions</p><ul class="ings">${r.ingredients.map(([q, u, name]) => `<li><span class="q">${esc(+Number(q).toFixed(1))} ${esc(u)}</span><span>${esc(name)}</span></li>`).join('')}</ul></div>
<div class="card"><h2>Before you start</h2>${r.equipment ? `<h3>Equipment</h3><p class="note" style="margin:0">${esc(r.equipment)}</p>` : ''}${r.allergens ? `<h3>Allergens</h3><p class="note" style="margin:0">${esc(r.allergens)}</p>` : ''}${r.swap ? `<h3>Make it yours</h3><p class="note" style="margin:0">${esc(r.swap)}</p>` : ''}</div>
</aside>
<div class="main">
<h2 class="sec">Method</h2>
<ol class="steps">${steps}</ol>
<h2 class="sec" style="margin-top:36px">Nutrition per portion*</h2>
<div class="stats">${stat(n.kcal, 'kcal')}${stat(n.protein == null ? null : n.protein + 'g', 'protein')}${stat(n.carbs == null ? null : n.carbs + 'g', 'carbs')}${stat(n.fat == null ? null : n.fat + 'g', 'fat')}${stat(n.fibre == null ? null : n.fibre + 'g', 'fibre')}</div>
${prep ? `<h2 class="sec" style="margin-top:36px">Meal prep and storage</h2><div class="prep">${prep}</div>` : ''}
</div></div>
<section class="band"><h2>Ready to cook?</h2><a class="btn" href="/#${esc(r.id)}">Open the step-by-step guide →</a></section>
<p class="fine">*Illustrative estimates, not dietary, medical or food-safety advice. Prices and cooking times are estimates. Check labels for allergens. Photographs show related dishes, not this exact recipe.</p>
<footer><a href="/">healthycooks</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a></footer>
</body></html>
`;
}

fs.mkdirSync(outDir, { recursive: true });
for (const r of recipes) fs.writeFileSync(path.join(outDir, `${r.id}.html`), page(r));

const today = new Date().toISOString().slice(0, 10);
const urls = ['/', '/privacy.html', '/terms.html', ...recipes.map(r => `/recipes/${r.id}.html`)];
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
console.log(`Wrote ${recipes.length} recipe pages to dist/recipes/ and updated dist/sitemap.xml`);