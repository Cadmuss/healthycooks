# healthycooks — handover to Claude Code

Prepared 30 September 2026, Singapore. This is a curated project handover, not the original chat transcript.

## Goal and decisions

Create a healthy global meal-prep platform: interactive world map → country → recipe → visual guided cooking, practical alternatives, timers, nutrition and meal-prep guidance. Singapore healthy-living objectives inform the design, without suggesting government endorsement. Long-term, partner with cooking creators for authentic recipes and technique footage.

Cadmus wants development costs near $0 and originally considered Bolt/Cursor, Supabase and Vercel. The actual prototype is deliberately simpler: static files with bundled recipe data. The user does not want to personally film cooking content. The plan is credited creator references initially, with reviewed/licensed short clips later. No partnerships or permissions to edit/rehost videos have been obtained.

The project was originally called Atlas Kitchen; the user explicitly renamed it **healthycooks** because the former name was already in use. Do not revert the name. No trademark clearance has been performed for either name.

## What exists

- Three pilot countries/recipes: Singapore ginger chicken and brown rice; Japan sesame salmon bowl; Mexico chicken & cheese burritos (no beans).
- Real simplified world-map geometry, country selection and recipe cards.
- Ingredients scaled to 1–8 portions, checklist, recipe modal and meal-prep tab.
- Ginger chicken: eight steps, short-format demonstrations/chapters, optional full references, explicit media gaps.
- Stovetop/rice-cooker choices; pan/air-fryer chicken; steam/boil vegetables.
- Separate countdowns per step/method; changing method pauses the former method's timer. Air fryer and boiling have halfway/stage reminders.
- YouTube only loads after a click; original-source credits and external fallback links remain.
- No account system, saved user data, live database, paid APIs, shopping list or weekly meal planner.
- Proposed Supabase tables, RLS policies and draft seeds; product guide, source register and portfolio case study.

## Most recent user corrections

The user asked to make all steps lead to one consistent final dish, use short videos only for the relevant technique, avoid repeating cutting during vegetable cooking, offer practical alternatives such as boiling, remove the thermometer requirement, and rename the website healthycooks.

Implemented:
- One shared chicken prep: approximately 2.5 cm cubes; all measured oil, ginger, garlic and soy mixed once. Both cooking routes start with that seasoned chicken.
- Prepared broccoli and carrot reused in the cooking step. Boiling gives carrots a head start; both methods end with a fork check and draining.
- Cucumber, spring onion and lime prepared once and added at assembly. Meal-prep cold toppings stored separately.
- Scaled ingredient quantities visible within relevant steps; no hard-coded two-portion seasoning in the air-fryer text.
- Mandatory thermometer/internal-temperature instructions replaced with household checks and steaming-hot reheating. Appliance cooking temperatures and fridge storage guidance remain.
- Full videos that repeat preparation or use different ingredients moved into collapsed optional references. Peeling/chopping short demos and a cubing chapter remain in the main flow.
- Site HTML, visible branding, docs and hosting display title renamed.

## Unfinished — do not overclaim

The last assistant could read/search some publisher descriptions and metadata but could NOT fully play through every video. Some pages returned restricted fetches, 403/429 errors, or unavailable playback. Therefore this is not a completed frame-by-frame audit. No new excerpt timestamps were guessed.

Read docs/GINGER_CHICKEN_VIDEO_GUIDE.md for the technique-by-technique register, exact source URLs and outstanding matches. The repeated steaming video was moved out of the main flow, NOT successfully trimmed into a verified cooking-only clip. Boiling and rice-cooker footage is still missing. Ginger peeling is shown but grating needs its own reviewed clip. Several other vegetable cuts and exact bowl assembly need footage.

Recommended first content task: review the existing original videos where accessible, record exact technique boundaries and preparation/equipment differences, and replace mismatched/full references with appropriate short demonstrations. Preserve creator attribution and respect reuse rights. Do not substitute stock/generated footage as evidence that the recipe was cooked.

The written ingredient flow is consistent, but taste, timing across appliances, yields and finished appearance still require kitchen testing. Numeric nutrition is illustrative, not a verified ingredient-level calculation. Existing food photos show related dishes, not exact results. No user research or outcome claims should be invented for the portfolio.

## Architecture and file map

- dist/index.html: page structure, metadata, brand, dialogs.
- dist/styles.css: navy/lime styling, responsive layout, cooking guide.
- dist/app.js: map UI, recipe rendering, method choices, scaling, timers, media loading.
- dist/recipes.js: complete current content, including methods, source URLs, video IDs and scope notes.
- dist/assets/: three credited photos and map.json.
- scripts/export-seed.cjs: rebuild proposed SQL seeds from bundled content.
- supabase/: schema and draft seeds; not executed or connected.
- docs/BUILD_GUIDE.md: concept, UX, backend proposal and deployment roadmap.
- docs/SOURCES.md: provenance, reuse and validation boundaries.
- docs/PORTFOLIO_CASE_STUDY.md: editable portfolio narrative.
- docs/GINGER_CHICKEN_VIDEO_GUIDE.md: latest recipe/technique audit.

In the portable package, package.json and dev-server.mjs add a local preview without dependencies. Run npm run dev and open http://localhost:5173. If you do not have Node, install a currently supported Node version meeting the >=20 requirement. The server is for development only. Opening index.html directly with a file: URL can block the map fetch.

## Hosting and portability

Current private prototype: https://atlas-kitchen.cactus369.chatgpt.site
Display title: healthycooks. The old slug remains because the available rename operation changed only the display title.
The current bundled source includes the Mexico burrito update; consult Git for publication provenance.

The exported app does not depend on ChatGPT at runtime. This package does not transfer ownership/access to the existing Sites deployment, source-repository credentials, account subscriptions or hosting tools. It includes no private deployment credentials. It omits the Sites hosting identity and internal Git metadata so it can be opened as a separate project.

For deployment elsewhere, use the user's own Git repository and hosting account. The Vercel configuration is included; the static output is dist/. Check current provider terms and quotas before calling hosting permanently free. No Vercel deployment or Supabase provisioning has been performed. Do not assume the existing private site should become public during migration.

## Verification already performed

JavaScript syntax checks and simulated DOM interactions passed for navigation, lazy video loading/replay, portion scaling, parallel timers, method-specific pause/resume/reset, halfway reminders, boil method, shared seasoning text, missing-video states, and branding. These are NOT full browser/device, external-player, food-safety laboratory, kitchen or nutrition tests.

## Working style

Be practical, concise and candid. Cadmus prefers direct edits and simple explanations over lengthy planning interviews. Preserve agreed product decisions. Explain concrete limitations instead of quietly claiming completion. Ask only when genuinely necessary. Keep costs near zero; do not introduce a backend or framework rewrite just because a coding assistant prefers one.

## Chat archive

This handover reconstructs the project decisions available in the conversation and repository. It is not a lossless export of every message, tool result or prior attachment. Cadmus can separately request the account's ChatGPT data export and save relevant chats/attachments. Read this handover and the actual code first; consult the old chat only for unresolved context.

## Singapore recipe costs (30 September 2026)
Ginger chicken now has a Costs tab with FairPrice cached price snapshots, ingredient value per portion, whole-pack shopping spend, shared portion scaling and session-only pantry checkboxes. dist/prices.js is the source of price data; dist/costs.js owns calculations/UI. Read docs/COST_ESTIMATES.md for sources, approximate count-to-weight conversions and exclusions. No live prices, paid API or database was added. Pantry controls affect shopping spend only. The Mexico burrito also has a cost estimate; Japan salmon remains unpriced.

## Mexico burrito update
Read docs/BURRITO_RECIPE_GUIDE.md. Mexico replaces India; no beans. One portion is two small wholemeal wraps with chicken, rice, pepper, onion, cheddar and salsa. Eight visual-guide steps; pan/air-fryer filling, cooked/stovetop/rice-cooker rice, microwave/stovetop warming, optional pan toast or soft wrap. Main short references cover pepper preparation and folding; unmatched cooking videos remain explicit gaps. Approximate 30 minutes uses safely precooked rice; fresh rice takes longer. Meal prep uses fresh rice/filling stored separately, avoiding repeated rice reheating. Recipe-specific prepCards and source provenance now render. Pantry state is scoped per recipe. Costs and nutrition remain estimates; no paid API or backend added.

## Calmer cooking layout
The cooking view uses one centered reading column across all recipes. An expandable All steps menu replaces the persistent step rail. Cooking-method choices, instructions, applicable technique videos, appearance/doneness cues and timers are clearly separated with larger spacing. Step ingredients, extended guidance/source links and video context expand on demand. Full references remain optional and collapsed; no-video steps use a small disclosure instead of a large placeholder. Required action checklists and doneness checks remain visible. No new imagery, video claims, recipe changes, services or dependencies were introduced.

## Concise copy update
Owner requested less text and removal of review-status language from the product interface. Recipe steps/methods now provide directions (1–3 short action lines), appearance cues, and compact video captions; the renderer uses these instead of repeating short/text/checklist. Method buttons show labels only; temperatures and times appear in the directions. Sources and scaled ingredients remain expandable. Missing-video placeholders and review notices are no longer rendered. Audit limitations remain in project documentation and verification metadata; removing notices does not mean footage or recipes became validated. Timers and critical cooking/storage checks remain.

## Quick salmon and video maintenance
Sesame salmon now has an eight-step visual guide and ~25-minute ready-rice/air-fryer route (two portions, thawed fillets, one batch). Oven ~30 minutes; fresh rice 55–65 minutes or complete cooker cycle. Cooked rice replaces dry rice in the canonical list; dressing remains clean and is added only after cooking. Air-fryer/oven fish, steam/boil vegetables and microwave/stovetop rice alternatives have independent timers/media. See docs/SALMON_RECIPE_GUIDE.md for exact sources and remaining checks. Full Downshiftology video is an optional reference, not a verified short clip. docs/ADDING_VIDEOS.md explains maintaining creator embeds in Cursor/Claude Code without ChatGPT. Salmon remains unpriced.

## Video visibility update
Owner explicitly requested videos visible by default, with an option to retract them. All technique videos, including full references, now open at full width in the step. Show/Hide video is an accessible button; hiding unloads the iframe to stop playback, and showing returns the click-to-play panel without autoplay. Visibility is remembered per recipe/step/method for the session. This supersedes earlier collapsed-reference guidance. Salmon prep now includes Howcast / Brendan McDermott’s focused pin-bone demonstration (`j1Q6xfl-MLw`); keep fillets whole and skin-on, pat dry, remove any bones with clean fish tweezers, brush oil and clean raw-fish tools.
