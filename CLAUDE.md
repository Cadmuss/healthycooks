# healthycooks — project instructions

Read docs/HANDOFF.md and docs/GINGER_CHICKEN_VIDEO_GUIDE.md before making changes.

## Product and owner preferences
- healthycooks is a healthy global meal-prep platform for beginner cooks, initially oriented toward Singapore.
- Owner: Cadmus. Nontechnical founder/student; explain changes simply and act on clear requests.
- Budget target is $0. Do not add paid APIs, subscriptions, hosting upgrades or unnecessary dependencies.
- The landing page is an interactive country map. The main differentiator is short technique videos inside coherent recipe steps.
- Preserve the existing navy/lime visual design unless the user requests changes.
- Do not rename it Atlas Kitchen. The existing hosted URL retains that older slug only.

## Actual implementation
- Static HTML/CSS/vanilla JavaScript in dist/. Do not assume React, Next.js or a connected Supabase backend.
- dist/recipes.js is the frontend content source of truth (window.RECIPES).
- dist/app.js implements map rendering, recipe dialogs, methods, ingredient scaling, lazy YouTube embeds and independent timers.
- dist/styles.css and dist/index.html define the interface. Local images and map data are included.
- In the portable export, npm run dev starts the dependency-free Node development server at http://localhost:5173. Node >=20 is required; npm install is not required.
- The original checkout can also run python3 -m http.server 8000 --directory dist.
- Syntax checks: node --check dist/app.js; node --check dist/recipes.js.
- Rebuild draft seeds after recipe edits: node scripts/export-seed.cjs.
- supabase/001_schema.sql and 002_seed.sql are a proposal for a NEW database, not a deployed backend. Do not run them against an existing database without a reviewed migration.

## Recipe and media rules
- One authoritative ingredient list and preparation sequence must lead to the final dish. Video ingredients do not override the recipe.
- Ginger chicken is cut and seasoned ONCE before choosing pan or air fryer. Do not add seasoning twice.
- Vegetables are cut once in step 2; the steam/boil step reuses them. Cold cucumber, spring onion and lime are added only at assembly.
- Each cooking method owns its instructions, timer, cues and media. Preserve method-specific timers and halfway reminders.
- The user requested no mandatory food thermometer. Current household checks follow Food Standards Agency guidance; do not treat elapsed time or exterior browning alone as proof of doneness.
- Do not call full recipe videos verified short clips. kind=short, chapter, reference distinguish presentation; full references are labelled clearly; videos now start expanded at the owner’s request.
- Never invent timestamps or claim to have watched unavailable videos. Playback, exact excerpt boundaries and some technique matches remain unverified.
- Use credited original hosted embeds/links. Do not download, cut, rehost or reuse creator stills without an appropriate rights basis.
- Photos are related-dish inspiration, not exact recipe/step photographs. Nutrition is illustrative; recipes are not kitchen-tested or dietitian-reviewed.
- No government endorsement or creator partnership is implied.

## Continuing safely
- First run the current app and report its actual state. Do not rebuild it from scratch.
- Do not provision services, publish publicly or change the existing site's audience merely to test the local export.
- Keep docs/HANDOFF.md and the video audit current as decisions change.
- The immediate unfinished work is reviewing genuine short technique footage and validating the recipe, not expanding to dozens of countries.

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
