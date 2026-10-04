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

const css = `:root{color-scheme:light dark;--bg:#fff;--ink:#122739;--muted:#526672;--line:#dce3e3;--link:#0b5c8a;--lime:#d6f56c}
@media(prefers-color-scheme:dark){:root{--bg:#0a1620;--ink:#e6edf1;--muted:#9fb1bd;--line:#2b4152;--link:#8cc8ee}}
body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.65 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
main{max-width:760px;margin:0 auto;padding:28px 20px 64px}
h1{font-size:2rem;line-height:1.2;margin:.2em 0 .3em}h2{font-size:1.25rem;margin:1.8em 0 .4em}
p,li{margin:.45em 0}a{color:var(--link)}ul,ol{padding-left:1.3em}
.eyebrow{color:var(--muted);font-size:.85rem;letter-spacing:.06em;text-transform:uppercase;margin:0}
.back{display:inline-block;margin-bottom:14px}.muted{color:var(--muted);font-size:.95rem}
img{max-width:100%;height:auto;border-radius:12px;display:block;margin:14px 0}
.btn{display:inline-block;background:var(--lime);color:#122739;text-decoration:none;font-weight:600;padding:12px 22px;border-radius:999px}
.method{margin:.4em 0 .4em 0}.look{color:var(--muted);font-size:.95rem}
footer{border-top:1px solid var(--line);margin-top:40px;padding-top:16px;font-size:.95rem}`;

function page(r) {
  const url = `${SITE}/recipes/${r.id}.html`;
  const time = r.timeLabel || `${r.minutes} min`;
  const steps = r.steps.map(s => {
    let body;
    if (s.methods) {
      body = s.methods.map(m => `<p class="method"><strong>${esc(m.label)}${m.id === s.defaultMethod ? ' (default)' : ''}:</strong></p><ul>${dirs({ ...s, ...m }).map(d => `<li>${esc(d)}</li>`).join('')}</ul>`).join('');
    } else {
      body = `<ul>${dirs(s).map(d => `<li>${esc(d)}</li>`).join('')}</ul>`;
    }
    const look = s.appearance || s.cue;
    return `<li><strong>${esc(s.title)}</strong>${body}${look ? `<p class="look"><em>What it should look like:</em> ${esc(look)}</p>` : ''}</li>`;
  }).join('\n');
  const prep = (r.prepCards || []).map(c => `<li><strong>${esc(c.title.replace(/^\d+\s*\/\s*/, ''))}.</strong> ${esc(c.text)}</li>`).join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(r.title)} — healthycooks</title>
<meta name="description" content="${esc(r.description)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article"><meta property="og:title" content="${esc(r.title)} — healthycooks"><meta property="og:description" content="${esc(r.description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${SITE}/${esc(r.image)}"><meta name="twitter:card" content="summary_large_image">
<style>${css}</style>
<script type="application/ld+json">${jsonLd(r)}</script>
</head><body><main>
<a class="back" href="/">← All recipes</a>
<p class="eyebrow">${esc(r.country)} · ${esc(time)} · ${esc(r.servings)} portions</p>
<h1>${esc(r.title)}</h1>
<p>${esc(r.description)}</p>
<img src="/${esc(r.image)}" alt="${esc(r.imageAlt)}">
<p><a class="btn" href="/#${esc(r.id)}">Cook step by step</a></p>
<h2>Ingredients (makes ${esc(r.servings)} portions)</h2>
<ul>${r.ingredients.map(i => `<li>${esc(ingLine(i))}</li>`).join('')}</ul>
${r.equipment ? `<p><strong>Equipment:</strong> ${esc(r.equipment)}</p>` : ''}
${r.allergens ? `<p><strong>Allergens:</strong> ${esc(r.allergens)}</p>` : ''}
${r.swap ? `<p><strong>Make it yours:</strong> ${esc(r.swap)}</p>` : ''}
<h2>Method</h2>
<ol>${steps}</ol>
${prep ? `<h2>Meal prep and storage</h2><ul>${prep}</ul>` : ''}
<p class="muted">Nutrition numbers, prices and cooking times are estimates for general information only, not dietary, medical or food-safety advice. Check labels for allergens. Photographs show related dishes, not this exact recipe.</p>
<footer><a href="/">healthycooks</a> · <a href="/privacy.html">Privacy</a> · <a href="/terms.html">Terms</a></footer>
</main></body></html>
`;
}

fs.mkdirSync(outDir, { recursive: true });
for (const r of recipes) fs.writeFileSync(path.join(outDir, `${r.id}.html`), page(r));

const today = new Date().toISOString().slice(0, 10);
const urls = ['/', '/privacy.html', '/terms.html', ...recipes.map(r => `/recipes/${r.id}.html`)];
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
console.log(`Wrote ${recipes.length} recipe pages to dist/recipes/ and updated dist/sitemap.xml`);