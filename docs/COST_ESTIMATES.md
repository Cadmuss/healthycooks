# Singapore cost estimates — ginger chicken

Added 30 September 2026. Static pilot; no API, scraper, account, database or added running cost. Shopping market SG/SGD is independent of cuisine. Ginger chicken and the Mexican-inspired burrito are priced; salmon has no price estimate.

## Provenance and limits

These are cached FairPrice retail listings retrieved on 30 September 2026, mostly indexed 2–4 weeks earlier. Direct live product retrieval failed for rice and chicken. The retrieval date is NOT a verified live price date. No current stock or checkout total is guaranteed. Use regular single-pack/list prices, excluding promotions and multibuy conditions. These chosen products are examples, not an optimized cheapest basket or retailer partnership.

| Recipe ingredient index | Product | Pack | SGD price | Source |
|---|---|---|---|---|
| 0 | FairPrice Thai Brown Unpolished Rice | 1000 g | 3.99 | [FairPrice](https://omni.fairprice.com.sg/category/housebrand-rice?query=FairPrice+brown+rice) |
| 1 | Kee Song Fresh Chicken — Boneless Breast | 300 g | 5.80 | [FairPrice](https://www.fairprice.com.sg/product-listing?category=chicken&pageType=category&title=Chicken&url=chicken) |
| 2 | Yuan Zhen Yuan Australian Broccoli | 300 g | 3.90 | [FairPrice](https://www.fairprice.com.sg/product/yuan-zhen-yuan-australian-broccoli-300-g-90171305) |
| 3 | Pasar Japanese Cucumber | 250 g | 1.50 | [FairPrice](https://www.fairprice.com.sg/product-listing?category=fruits-vegetables&collectionSlug=fruits-vegetables&collectionType=category&hasStock=1&metaData=%5Bobject+Object%5D&pageType=category&sorting=POPULARITY&title=Fruits+%26+vegetables&url=fruits-vegetables) |
| 4 | Pasar Prepacked Carrots | 500 g | 1.10 | [FairPrice](https://www.fairprice.com.sg/category/carrots-1) |
| 5 | Simply Finest Old Ginger | 200 g | 2.20 | [FairPrice](https://www.fairprice.com.sg/product-listing?category=fruits-vegetables&collectionSlug=fruits-vegetables&collectionType=category&hasStock=1&metaData=%5Bobject+Object%5D&pageType=category&sorting=POPULARITY&title=Fruits+%26+vegetables&url=fruits-vegetables) |
| 6 | Chef China Garlic — Pure White | 500 g | 2.85 | [FairPrice](https://www.fairprice.com.sg/product-listing?category=fruits-vegetables&collectionSlug=fruits-vegetables&collectionType=category&hasStock=1&metaData=%5Bobject+Object%5D&pageType=category&sorting=POPULARITY&title=Fruits+%26+vegetables&url=fruits-vegetables) |
| 7 | FairPrice Canola Oil | 2000 ml | 9.50 | [FairPrice](https://www.fairprice.com.sg/product/fairprice-canola-oil-2l-13174008) |
| 8 | Tai Hua Light Soy Sauce — Reduced Salt | 305 ml | 3.11 | [FairPrice](https://www.fairprice.com.sg/product/tai-hua-soy-sauce-light-reduced-salt-305ml-10719940) |
| 9 | Simply Finest Large Lime | 250 g | 1.70 | [FairPrice](https://www.fairprice.com.sg/product-listing?metaData=%5Bobject+Object%5D&pageType=search&url=limes) |
| 10 | Pasar Thailand Spring Onion | 100 g | 1.88 | [FairPrice](https://www.fairprice.com.sg/product-listing?category=fruits-vegetables&collectionSlug=fruits-vegetables&collectionType=category&hasStock=1&metaData=%5Bobject+Object%5D&pageType=category&sorting=POPULARITY&title=Fruits+%26+vegetables&url=fruits-vegetables) |

## Calculation and assumptions

Use recipe ingredient quantities, scaled by selected portions / base portions. Multiply counts by explicit quantityFactor: garlic 3 g/clove, whole lime 70 g each, spring onion 15 g/stalk. These are budgeting assumptions, not measured or retailer-certified conversions. Other quantities already use g or ml. Canola represents recipe rapeseed oil. Chicken assumes pack weight is usable skinless meat; broccoli includes usable tender stalk. Extra trimming loss is excluded and can require more food.

Consumed value = required quantity / pack quantity × pack price. Shopping cost = ceil(required quantity / pack quantity) × pack price. Round only displayed amounts. Pantry toggles remove a whole ingredient's purchase cost and imply enough stock for all selected portions. They never reduce consumed value, are independent of prep checkboxes, and reset on reload. Portions are shared with the recipe. Water (index 11), energy, equipment, containers, delivery, service fees and spoilage are excluded. All cooking alternatives use the same priced ingredients. Missing or invalid prices result in an incomplete subtotal, never a free ingredient.

Base two-portion snapshot: consumed S$13.28, S$6.64/portion, whole-pack shopping S$37.53 before pantry selections. The initial shopping cost includes long-lasting packs of oil, rice and seasonings; leftovers are not charged as fully consumed by this meal.

## Maintenance

Edit dist/prices.js for prices, packs, sources and retrieval metadata. Preserve ingredient mappings if changing recipe order. UI and pure calculation live in dist/costs.js; scripts load after recipes and before app. Update the visible snapshot date/status in renderCosts when refreshing the dataset. Do not relabel cached retrieval as live verification. Supabase seeds do not contain this separate static price catalogue.

## Verification

Node syntax checks and mocked DOM interaction checks passed: existing cooking flows, portion scaling, pack boundaries (300 g chicken needs one pack at 2 portions, two at 3 or 4), pantry/consumed-value isolation, missing prices, tab keyboard wrap, and no Costs tab on unpriced recipes. Responsive CSS is supplied; no full visual browser QA or live checkout verification was performed.

## Burrito expansion (30 September 2026)

Singapore prices are independent of Mexico as the recipe cuisine. Same cached-source retrieval limitation applies; no live stock/checkout verification. Full catalogue is in dist/prices.js. Pantry ownership now has a separate session-only set for each recipe, preventing a garlic toggle from accidentally marking burrito oil as owned.

| Product | Pack | SGD list price | Source |
|---|---|---|---|
| Kee Song Fresh Chicken — Boneless Breast | 300 g | 5.80 | [FairPrice](https://www.fairprice.com.sg/product-listing?category=chicken&pageType=category&title=Chicken&url=chicken) |
| FairPrice Thai Brown Unpolished Rice | 1000 g | 3.99 | [FairPrice](https://omni.fairprice.com.sg/category/housebrand-rice?query=FairPrice+brown+rice) |
| FairPrice Canola Oil | 2000 ml | 9.50 | [FairPrice](https://www.fairprice.com.sg/product/fairprice-canola-oil-2l-13174008) |
| FairPrice Wraps — Wholemeal | 8 wraps | 4.20 | [FairPrice](https://www.fairprice.com.sg/product-listing?hasImage=true&hasStock=true&pageType=similar-product&personalisationApi=similar-product&personalisationType=SIMILAR_PRODUCT&title=Similar+Products&trackinfo=165806) |
| Yuan Zhen Yuan Yellow Capsicum | 200 g | 2.50 | [FairPrice](https://www.fairprice.com.sg/chillies-capsicums) |
| Chef Red Onion — Large | 700 g | 1.70 | [FairPrice](https://www.fairprice.com.sg/product-listing?metaData=%5Bobject+Object%5D&pageType=search&url=Red+Onion) |
| FairPrice Shredded Cheddar | 225 g | 5.20 | [FairPrice](https://www.fairprice.com.sg/housebrand-cheese) |
| MasterFoods Ground Paprika | 33 g | 4.48 | [FairPrice](https://www.fairprice.com.sg/product-listing?hasImage=true&hasStock=true&pageType=similar-product&personalisationApi=similar-product&personalisationType=SIMILAR_PRODUCT&title=Similar+Products&trackinfo=1393431) |
| McCormick Ground Cumin | 32 g | 6.45 | [FairPrice](https://www.fairprice.com.sg/product-listing?hasImage=true&hasStock=true&pageType=similar-product&personalisationApi=similar-product&personalisationType=SIMILAR_PRODUCT&title=Similar+Products&trackinfo=1393431) |
| Biona Organic Salsa Dip — Mild | 260 g | 7.90 | [FairPrice](https://www.fairprice.com.sg/en/fairprice/search/dips) |

Two-portion estimate: S$11.52 consumed, S$5.76 per portion (two small wraps), S$51.72 whole packs with an empty pantry. Includes jars of spices, oil, salsa, rice, cheese and unused wraps; it is not a cheapest-basket result. Cooked rice is priced at 1/3 of its weight as dry rice, a declared yield assumption. Extra rice for appliance minimum batches is excluded from this allocated recipe cost. Ready-cooked retail pouches are not represented by this price. Recipe pepper/onion weights are before trimming. Nutrition is not derived from these price records.
