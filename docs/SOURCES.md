# Sources and reuse notes

Checked 29 September 2026. The app does not imply endorsement by any cited organisation.

## Product context and safety

- HealthHub. *Eat More / My Healthy Plate*. https://www.healthhub.sg/programmes/nutrition-hub/eat-more — quarter wholegrains, quarter protein, half fruit and vegetables. Guidance is a design reference, not recipe certification.
- Singapore Food Agency. *A–Z Food Safety*. https://www.sfa.gov.sg/tools-and-resources/glossary-a-z-on-food-safety — cooked food refrigeration/freezing within two hours.
- Singapore Food Agency. *Temperature Control in Cooked Food*. https://www.sfa.gov.sg/food-safety-tips/food-risk-concerns/risk-at-a-glance/temperature-control-in-cooked-food — prompt refrigeration at 4°C or below and thorough reheating.
- Singapore Food Agency. *Fried Rice Syndrome*. https://www.sfa.gov.sg/food-safety-tips/food-risk-concerns/risk-at-a-glance/fried-rice-syndrome — cool rice promptly; reheating does not undo unsafe storage.
- Singapore Food Agency. *Food Safety Tips*. https://www.sfa.gov.sg/food-safety-tips/safe-food-practices/food-safety-tips — portion extra food into clean, covered containers.

Nutrition numbers are manually chosen illustrative estimates and are not independently sourced or validated calculations. A future release needs ingredient-level source entries, weights, yields, per-portion calculation and documented review. Do not cite HealthHub as the source of these recipe-specific figures.

## Cost and platform decisions

- Vercel. *Hobby Plan*. https://vercel.com/docs/plans/hobby — free tier is restricted to personal, noncommercial use and includes usage limits.
- Supabase. *Pricing & Fees*. https://supabase.com/pricing — Free: 500 MB database, 1 GB file storage, 5 GB egress, two active projects; projects pause after a week of inactivity.
- Supabase. *Row Level Security*. https://supabase.com/docs/guides/database/postgres/row-level-security — public-schema access control design reference.

## Media

- TechnoKittyCat. *Donburi Rice bowl of Chicken Teriyaki with Tomato*. CC0. https://commons.wikimedia.org/wiki/File:Donburi_Rice_bowl_of_Chicken_Teriyaki_with_Tomato.jpg . Resized and cropped in layout. Related-dish inspiration, not the Singapore recipe.
- Datariumrex. *Salmon with Rice and Sauce finished dish*. CC0. https://commons.wikimedia.org/wiki/File:Salmon_with_Rice_and_Sauce_finished_dish.jpg . Resized and cropped in layout; not the exact recipe.
- FitTasteTic. *Colorful healthy Chickpea Salad*. CC BY-SA 2.0. https://commons.wikimedia.org/wiki/File:Colorful_healthy_Chickpea_Salad.jpg . License: https://creativecommons.org/licenses/by-sa/2.0/ . Resized and cropped in layout. The image and any adaptations remain available under that license; this does not automatically license the site's separate code under CC BY-SA. The image includes ingredients different from the recipe.
- Gordon Ramsay. Onion-chopping demonstration. https://www.youtube.com/watch?v=dCGS067s0zo . Referenced using an official platform embed/link, not downloaded or rehosted. Playback may be unavailable in some environments. No creator partnership or reuse permission beyond permitted platform embedding is claimed.
- Natural Earth / DataHub. Country geometry. https://github.com/datasets/geo-countries . Natural Earth source geography is public domain. Simplified into local SVG paths. Displayed boundaries are illustrative.

## Verification boundaries

Local JavaScript syntax, bundled asset references, recipe schema consistency and image files were checked. The schema is a proposed migration and was not executed in Supabase. Full browser/device testing and external-video playback testing remain pending. No user study, nutrition review or kitchen testing was conducted.

## Ginger chicken: cooking alternatives

- Spice N’ Pans. *Chicken with Ginger & Spring Onion*. https://www.youtube.com/watch?v=TglLMjY316Y — actual ginger-chicken stir-fry reference, replacing a generic pan-cooking video. Official search metadata establishes the topic/channel; playback and short-segment boundaries remain unreviewed. Our simplified sauce differs.
- Laura Fuentes. *Air Fryer Chicken Bites*. https://www.laurafuentes.com/air-fryer-chicken-bites/ and https://www.youtube.com/watch?v=B2co2uSknew — unbreaded, approximately 2.5 cm breast cubes. Time/temperature reference for the alternative; our fresh ginger-and-soy seasoning is a separate, untested adaptation.
- Zojirushi Singapore. *Cooking the Perfect Brown Rice*. https://zojirushi.sg/recipes/brown-rice/ — rice-cooker preparation and illustrated reference. Follow the specific appliance manual rather than applying a universal water ratio or duration. No rice-cooker video has been added yet.

No new creator media was downloaded, edited or rehosted. Embedded demonstrations have independent credits and original-source links; they do not imply a creator partnership.

## Consistency and vegetable-method review — 30 September 2026

- Food Standards Agency, *Cooking your food*. https://www.food.gov.uk/safety-hygiene/cooking-your-food — household chicken doneness checks and steaming-hot reheating. Used to replace the mandatory thermometer interaction; appearance and time are not presented as guarantees.
- Good Food, *How to cook broccoli*. https://www.bbcgoodfood.com/howto/guide/how-to-cook-broccoli — cooking time depends on floret size; the boiling alternative uses a 4–5 minute broccoli estimate with a fork check.
- Love & Lemons, *Steamed Broccoli*. https://www.loveandlemons.com/steamed-broccoli/ — steaming method reference.
- Mayo Clinic, *Honey sage carrots*. https://www.mayoclinic.org/healthy-lifestyle/recipes/honey-sage-carrots/rcp-20197722 — carrot boiling reference only; honey/sage additions are not used.
- A Couple Cooks, *How to Cut Ginger*. https://www.acouplecooks.com/how-to-cut-ginger/ — illustrated grating guidance separate from the peeling video.

See GINGER_CHICKEN_VIDEO_GUIDE.md for the per-technique audit, repeated-prep issue and unresolved footage. Access failures prevented a complete video playback review; new excerpt timestamps were not guessed.

## Mexico replacement
The India pilot is no longer in the collection. Current burrito recipe, video sources, reuse credits and validation limits are registered in BURRITO_RECIPE_GUIDE.md. The burrito photo is Sodanie Chea, CC BY 2.0, resized and cropped for display; it depicts a related dish. Singapore costing sources are in COST_ESTIMATES.md and dist/prices.js.

## Quick sesame salmon (30 September 2026)
See SALMON_RECIPE_GUIDE.md for the exact adaptation, rice routes and media register. Publisher sources: Downshiftology air-fryer salmon (200°C, 8–10 minutes); Good Food how-to-cook-salmon (180°C / 160°C fan, 10–15 minutes); Good Food teriyaki salmon bowl (ready-cooked-rice inspiration). FSA fish and rice guidance controls the household checks and storage. Publisher JSON-LD identifies Downshiftology's linked YouTube video `gbeZAN0mOi8` as 5:26; it is a full optional reference. A separate Feel Good Foodie page exposed a directly hosted MP4; it was not downloaded, rehosted or substituted for a creator-approved player.
