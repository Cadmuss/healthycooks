# healthycooks — product and launch guide

Prepared 29 September 2026. Costs and plan limits below were checked against the linked providers on that date. They can change.

## 1. Product concept

**Promise:** Explore a cuisine, cook one approachable balanced meal, and know how to keep the extra portion safely.

**Initial audience:** Singapore-based students and young adults who want variety but have limited cooking confidence, time and money. This is a product hypothesis, not a finding from user interviews.

**Job to be done:** “Help me turn ingredients I can buy locally into a meal I want to eat, without getting lost in a long recipe or wasting the leftovers.”

The map creates discovery and curiosity. Cooking cues reduce uncertainty at the stove. Portion scaling and storage instructions bridge cooking tonight and eating tomorrow. These are the three product bets to test.

Singapore's healthy-living context gives the project a clear public-interest rationale: make balanced eating easier to act on. Follow HealthHub's wholegrains/protein/fruit-and-vegetable proportions as an educational design reference. Do not claim certification, endorsement, official partnership, clinical outcomes or that every recipe automatically meets a nutrition standard. Do not use HPB logos or the Healthier Choice Symbol as product badges.

## 2. The first experience

1. **Explore:** A world map and three immediately selectable countries. Countries with content are highlighted; other countries show an honest empty state. Buttons provide a keyboard and mobile alternative to tiny geographical targets.
2. **Choose:** Country panel shows a dish, total time and portions. The collection below offers direct access without map interaction.
3. **Prepare:** Open the recipe. Read allergens, review ingredients and scale from 1 to 8 portions. Tick off what is ready. Ingredient weights specify raw/dry/drained where relevant.
4. **Cook:** Advance one step at a time. Read the visual cue. Start or pause a timer. A floating timer lets users return to its originating recipe and step. Timers for different steps can run concurrently.
5. **Learn a technique:** Ginger chicken and Mexico burritos load credited technique references on demand; short demos, optional full references and missing clips are distinguished. An external link works if embedding is blocked. The video provider receives a connection only after play.
6. **Prep safely:** Read portioning, cooling, storage and reheating instructions. Food safety is not reduced to a “good for five days” badge.

The design uses a blue-grey atlas, dark navy text and a lime highlight. The main surface is the usable map rather than a long marketing introduction. All main actions work without sign-in.

### Content rules

- Label adaptations as “cuisine-inspired”; one dish does not represent an entire national cuisine.
- Every recipe needs measured ingredients, servings, allergens, steps and storage notes.
- Keep appearance cues separate from safety checks; poultry/fish safety cannot be established from colour alone.
- Show estimated nutrition per portion and the calculation method. Recalculate when quantities, ingredients or portions change materially.
- Images should ultimately show the exact tested recipe and relevant step. Current photos are explicitly labelled serving inspiration.
- Videos need attribution and a documented rights basis. Linking/embedding permitted platform content is different from downloading, editing and rehosting it.
- Creator collaboration requires actual permission and an agreement covering usage, editing, attribution, compensation, cancellation and takedowns. No partnership is presently in place.

## 3. Current MVP and next release

| Capability | Current state | Before a broader launch |
|---|---|---|
| Map and country selection | Working; 3 countries | Test map vs list discovery with users |
| Recipes | 3 editable original drafts | Kitchen-test and record ingredient yields |
| Guided cooking | Working steps and cues | Add exact step photos for uncertainty points |
| Timers | Parallel in-page timers | Test on mobile backgrounding; add stronger alerts only if needed |
| Nutrition | Clearly labelled illustrative estimates | Compute from a documented database and review |
| Videos | Seven ginger chicken technique references plus the onion example | Record or license recipe-specific clips |
| Portion scaling | Working, 1–8 portions | Test fractions, package quantities and larger batch times |
| Meal prep | Written guidance | Validate recipe-specific texture and safe handling |
| Accounts/planner | Not included | Add only if testing demonstrates repeat-use need |
| Supabase | Schema and seed supplied | Provision and connect only when content volume warrants it |
| Deployment | Private working Site | Vercel import remains a separate account action |

## 4. Database structure

Use `supabase/001_schema.sql`, then `supabase/002_seed.sql`, in a new Supabase project. These files are supplied for implementation; they have not been executed against a live database in this task.

| Table | Purpose | Relationships |
|---|---|---|
| countries | Names, region, map coordinates | One country → many recipes |
| creators | Approved public creator profiles | Optional creator → recipes and media |
| recipes | Title, cuisine context, time, portions, review status | Parent for all recipe content |
| recipe_ingredients | Ordered quantities and units | Many rows per recipe |
| recipe_steps | Ordered instructions, cues and timers | Optional image/video IDs constrained to same recipe |
| media_assets | Images/videos, credits, license, rights basis | Belongs to recipe; optional creator |
| nutrition_estimates | Per-portion values and method | One row per recipe |
| prep_guidance | Portion, cooling, storage, reheating instructions | One row per recipe |

**Access model:** anonymous and signed-in visitors can read published recipes and approved media only. Draft recipes remain hidden. No browser insert/update/delete permission is granted. Editing initially happens through the owner's Supabase dashboard. The schema enables row-level security on every table. Private contracts, contact details and credentials must not be stored in publicly readable creator/media rows.

The supplied seeds are drafts. Review and deliberately publish them before expecting an anonymous query to return recipes. The static demonstration still uses `dist/recipes.js`; running SQL alone does not connect it to Supabase.

**Integration sequence:** keep the static app working; introduce an asynchronous content loader; fetch published records with the Supabase publishable key; join/order children; validate the response; map records into the existing recipe view model; show useful loading/empty/error states; fall back only to explicitly labelled bundled pilot data. Never expose a service-role key. Render external text with `textContent` or escape it rather than interpolating untrusted strings into `innerHTML`. Current templates use only trusted bundled content.

For the lowest-cost public app, prefer generating a static recipe JSON snapshot during an intentional content release. This reduces runtime database requests and avoids an idle Supabase project affecting browsing. Do not use cron requests solely to evade inactivity pausing.

## 5. A realistic $0 budget

**A small noncommercial pilot can have $0 incremental hosting and API expense. A permanent $0 business with unlimited usage is not a realistic promise.** Time, groceries, existing internet/devices and any subscription you already hold are not included in “$0”.

| Item | $0 choice | Limit or tradeoff |
|---|---|---|
| Frontend | Current static HTML/CSS/JS | Manual content updates; no backend required |
| Editing | Any free local editor | Bolt/Cursor AI credits may run out; paid AI is optional |
| Hosting | Vercel Hobby for eligible personal, noncommercial use | Usage quotas; commercial activity needs reassessment |
| Domain | Provider subdomain | A custom domain costs money |
| Database | Skip for first pilot; Supabase Free later | Currently 500 MB DB, 1 GB storage, 5 GB egress; pauses after 1 week inactivity; 2 active free projects |
| Images | Your own phone photos; appropriately licensed photos | Time and licensing/attribution work |
| Videos | Your own phone clips or permitted external embeds | Platform ads, availability and tracking; no availability guarantee |
| Nutrition | Manually calculate from reliable ingredient data | More review work; no live paid API |
| Analytics | Small consented usability study | No automated population-scale outcome claims |
| Email/accounts | Omit initially | No cross-device favourites or automated email |

**Avoid at first:** paid map tiles, AI calls per visit, generated video, user uploads, subscriptions, paid custom domains and third-party nutrition API usage. Map geometry is bundled locally; there are no paid map requests.

At scale, video bandwidth and content quality work are more likely to drive cost than text recipes. Keep clips off the app's storage until there is an intentional budget and rights workflow. A creator partnership can be valuable, but creators' time should not be assumed free.

Vercel explicitly restricts Hobby to personal noncommercial use. Review its terms before sponsorships, affiliate links, ads, subscriptions or other monetisation. Supabase Free has no automatic entitlement to unlimited operation. Read current plans before switching tiers.

## 6. Deployment and ownership

### Current delivery

The prototype is hosted privately through Sites, with its source saved to the Site's repository. You can view it and request edits. Sharing remains private until you choose otherwise. This does not create Vercel or Supabase accounts.

### Vercel migration

1. Put the project in a repository you control, excluding `.env*`, credentials and local build archives. Keep `dist`, docs, schema and `vercel.json`.
2. In Vercel, import that repository. Select the “Other” framework preset. Set the output directory to `dist`. No build/install command or environment variables are needed for this static pilot.
3. Deploy to the free provider subdomain if your project is eligible for Hobby.
4. Check the map, all three recipes, image loading, mobile layout, keyboard dialog operation, portion changes, timer pause/reset and the external-video fallback.
5. Review credits and disclaimers. Do not present the content as professionally reviewed until it is.

A custom domain, Supabase connection or paid plan is not necessary to test the concept. A Vercel deployment is not complete until its actual deployment reports success; no Vercel deployment was performed in this task.

### Before adding accounts

Collect only data needed for a tested feature. Avoid health-condition profiles or clinical recommendations. Decide deletion/export rules, email delivery, privacy wording and RLS ownership before building saved plans. No personal data is currently collected by the app itself; external media has its own policies.

## 7. Validation and portfolio evidence

Start with 5–8 volunteer students. Treat results as a small exploratory study, not representative evidence about Singaporeans.

- Task A: Find a meal you would actually cook. Observe map vs direct recipe-card use.
- Task B: Scale it for four portions and identify an allergen.
- Task C: Explain the next cooking action and the cue used to judge progress.
- Task D: Start, pause and locate the active timer.
- Task E: Describe how you would cool and store the extra portion.

Record time to find a recipe, task completion, where help was needed, confidence before/after and follow-up self-reported cooking. Make participant consent and data retention explicit. Do not equate confidence with improved diet or claim causal health effects.

Useful decision rules (proposed, not measured): if most participants bypass the map, keep it as discovery but make recipe browsing equally prominent; if visual cues do not resolve confusion, spend effort on exact step photos before expanding country count; if few people cook after browsing, investigate ingredients, equipment and cost before adding social features.

## 8. Practical next steps

1. Cook and photograph the three pilot recipes, using the same ingredient weights shown in the app.
2. Replace estimates with traceable calculations and seek a qualified nutrition review before stronger health claims.
3. Film the 2–3 most confusing actions on a phone, or obtain creator permission for specific clips.
4. Run the small usability study and keep anonymised notes.
5. Fix observed friction and publish a dated case-study update with real evidence.
6. Add countries only when their content meets the same review standard.

The strongest PPGA portfolio story is your problem framing, implementation choices, attention to equity and affordability, evidence collection and willingness to revise the product. The map alone will not establish policy or finance expertise.
