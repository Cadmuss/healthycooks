# healthycooks

A map-first healthy meal-prep prototype for Singapore-based beginner cooks. Built for Cadmus Chau as a PPGA portfolio project. This repository contains the working static app, a proposed Supabase schema and seed data, a product/UX plan, deployment instructions and an evidence-conscious portfolio case study.

## Open and edit

The complete website is in `dist/`. No package installation, build step, API key, account system or database is required. Start any static HTTP server at `dist/` (for example `python3 -m http.server 8000 --directory dist`) and visit its address. Opening `index.html` as a `file:` URL will block the map fetch in some browsers.

- `dist/index.html`: page structure and policy positioning.
- `dist/styles.css`: responsive design and tokens.
- `dist/app.js`: map, country selection, recipe dialog, portion scaling, checklists, timers and lazy video embeds.
- `dist/recipes.js`: editable pilot recipe content.
- `dist/assets/map.json`: simplified Natural Earth country paths.
- `dist/assets/*.jpg`: credited food photographs.
- `supabase/001_schema.sql`: proposed PostgreSQL model and read-only public RLS policies.
- `supabase/002_seed.sql`: matching pilot content, **draft by default**.
- `docs/BUILD_GUIDE.md`: concept → UX → data → MVP → deployment → research roadmap.
- `docs/PORTFOLIO_CASE_STUDY.md`: honest portfolio narrative and validation plan.
- `docs/SOURCES.md`: sources and asset licensing.

## What is implemented

Interactive geographical map with three pilot countries and explicit empty states elsewhere; keyboard country controls; recipe details; 1–8 portion ingredient scaling; ingredient checklists; step-by-step cooking; parallel countdown timers with pause/reset and recovery navigation; estimated nutrition; food-storage guidance; a ginger chicken guide with short-format demos, clearly labelled optional full references and the original onion example; credits and independence disclaimer.

## Boundaries

This is a frontend prototype, not a clinically reviewed nutrition product. Recipes are original drafts, not kitchen-tested. Numbers are illustrative nutrition estimates, not validated calculations. Photos show related dishes, not exact recipes or step outcomes. The ginger chicken guide uses third-party technique references, with exact short excerpts still pending review. Its assembly step has no video; some other actions still need closer-matching footage. Sessions reset on reload; there is no saved account history, cross-device sync, shopping list or weekly planner. Supabase is designed but **not connected or provisioned**. Timers require the page to stay open and background alerts can be delayed. Creator partnerships have not been secured.

## Portability

Use Bolt or Cursor to open this repository and edit the files directly. You do not need a paid AI coding plan to run or host it. A React/Vite rewrite is optional, not necessary for the pilot. Preserve the functional scope before undertaking a framework migration.

Current deployment uses Sites for a private working prototype. Vercel migration instructions are included, but no Vercel account or deployment was created. The application is static and has no Sites-specific runtime dependency. `.openai/hosting.json` and source-repository metadata are hosting controls, not part of the public app.

## Video-led ginger chicken update

See `docs/GINGER_CHICKEN_VIDEO_GUIDE.md` for the source register and remaining media gaps. The first recipe opens directly in an eight-step cooking guide. Full recipe videos are collapsed references; short-format demos and the cubing chapter remain in the main flow. The rice timer is editable to match the packet; timers for different steps run independently. The portable app still uses bundled data. `node scripts/export-seed.cjs` rebuilds draft SQL seed data; this is not a live database migration.


### Cooking alternatives update
Ginger chicken now offers pan or air-fryer instructions after shared preparation; rice offers stovetop or rice-cooker instructions; broccoli and carrots offer steam or boil. Method choice updates the video, cues, settings and timer. Air-fryer mode includes a halfway page reminder. The rice-cooker route links illustrated manufacturer guidance and has no video yet. Timers pause when changing methods and retain independent state until reload. See `docs/GINGER_CHICKEN_VIDEO_GUIDE.md` for source matching and content limits.

For a new Supabase database, the proposed schema and generated seeds include `recipe_step_methods`. This has not been applied to a live database; an existing database needs a reviewed migration instead of re-running the fresh-install scripts.
