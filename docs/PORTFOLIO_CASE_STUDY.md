# healthycooks: translating healthy-eating guidance into a practical cooking experience

**Status:** Functional prototype; validation pending. 29 September 2026.

**Role:** Product concept and policy framing by Cadmus Chau; implementation and research supported by AI. Claim only the work you personally reviewed, directed or completed. This draft contains no invented user results or launch statistics.

## The problem I chose

Healthy-eating guidance can be easy to understand but harder to apply during a busy week. For students, barriers may include limited cooking confidence, unfamiliar ingredients, cost, equipment and uncertainty about storing leftovers. These are hypotheses for investigation, not conclusions from field research.

I proposed healthycooks to connect food discovery with practical execution: select a cuisine on a map, follow a manageable recipe, and prepare an additional portion safely. The initial audience is Singapore-based students and young adults.

## Why it matters to public policy

The project explores an implementation question: how can a digital service make a public-health objective easier to act on? HealthHub's My Healthy Plate provides an accessible reference for balanced meals. healthycooks uses that context while remaining an independent project with no government affiliation or endorsement.

Its potential policy value depends on accessibility and behaviour, not the number of recipes displayed. A user may understand a balanced plate but lack a stove, fridge, money or time. The design therefore needs testing with different household circumstances. A cooking website cannot solve those structural constraints on its own.

## Product decisions

I chose a map as a discovery mechanism, paired with direct recipe cards so it does not become a barrier. I limited the pilot to three countries because complete, reviewed recipes are more useful than a large map with shallow content. Recipes are labelled adaptations instead of claiming to represent an entire cuisine authentically.

Guided cooking breaks a recipe into discrete actions, visual cues and timers. Portion scaling links the same recipe to meal prep. Allergen notes and storage guidance are placed inside the cooking journey rather than hidden in a generic disclaimer.

The first build is static, with no account requirement or paid API. This supports the $0 pilot constraint and avoids collecting personal information before there is a reason to do so. A Supabase schema defines a future publishing workflow with draft content hidden by row-level security, but no database has yet been connected.

## What the prototype demonstrates

- An interactive world map with three working recipe selections and honest empty states.
- Recipe detail views, checklists and ingredient quantities for 1–8 portions.
- Step-by-step instructions and independent cooking timers with pause/reset behaviour.
- A video-led ginger chicken guide with seven credited technique references and external playback fallbacks.
- Explicit nutrition-estimate labels, meal-prep instructions and third-party credits.
- Portable source, a proposed database model and deployment instructions.

It does not yet demonstrate verified nutritional improvements, cooking adoption, willingness to pay or product-market fit. The recipes need kitchen testing; imagery is illustrative; nutrition values are provisional; recipe-specific videos and creator agreements remain future work.

## Research and evaluation plan

I plan to recruit 5–8 volunteer students for exploratory usability sessions. Participants will find a recipe, scale it, identify an allergen, navigate a cooking step and explain leftover handling. I will record task completion, time, confusion points and self-reported confidence, with consent.

A follow-up can ask whether participants actually cooked the dish. This self-report would be directional evidence, not proof of better dietary health. Any study comparing versions needs a clear design and should avoid causal claims from a small convenience sample.

| Question | Evidence to collect | Decision it could change |
|---|---|---|
| Does the map help discovery? | Task time, route chosen, user explanation | Retain map prominence or prioritise direct browsing |
| Do visual cues reduce uncertainty? | Observed confusion at each step | Invest in exact step photos and targeted clips |
| Is meal prep practical? | Storage access, batch size, next-day use | Change portions and storage guidance |
| Are meals accessible? | Grocery availability, equipment, cost diaries | Add substitutions or simpler recipes |
| Does interest become action? | Consented follow-up on actual cooking | Address barriers before expanding content |

## Responsible use of AI

AI accelerated the initial implementation, source discovery and draft content. My responsibility is to verify claims, understand how the product works, test the recipes and make product decisions. AI assistance should be disclosed rather than presented as unaided software development or original empirical research.

For each release I should keep a short log: what I asked AI to do, what it produced, what I verified, what I rejected and why. Source checking, cooking tests and user feedback are stronger evidence of judgment than the amount of code produced.

## What I can honestly claim today

“Developed an AI-assisted prototype of a map-based meal-prep platform, translating a healthy-eating policy context into country discovery, guided cooking and safe-storage workflows. Designed a proposed PostgreSQL content model and a $0 pilot architecture. User validation and nutrition review are planned.”

Do not replace “prototype” with “launched platform”, claim active users, call the nutrition verified, imply HPB affiliation, or claim behavioural impact without evidence.

## Relevance to my portfolio

For public-sector roles, this can demonstrate problem definition, service design, digital implementation, cost constraints and evaluation thinking. For MAS/MOF-adjacent interests, deepen the cost model and consider how evidence would justify spending or scaling. For high-finance recruiting, this is a supplementary initiative example; it does not substitute for financial analysis, accounting, valuation or relevant experience.

The next strong portfolio update should contain a specific observation, a product change and the evidence behind that change. Example structure: “Participants struggled with [observed issue]. I changed [feature]. In the next round, [measured outcome], with [limitations].” Fill these brackets only after conducting the work.

## Budget-planning iteration
Added a Singapore ginger-chicken cost pilot to distinguish food consumed from the larger upfront grocery purchase. A per-portion estimate sits alongside whole-pack spend, with pantry toggles and shared portion scaling. Cached retailer prices and approximate weights are explicitly labelled. Static data keeps operating costs unchanged, at the expense of manual price maintenance. Calculator interactions were checked in a mocked DOM; real-user usability testing and live price integration remain future work.

## Portable meal iteration
Replaced the India pilot with Mexico chicken-and-cheese burritos after a user requested a fast meal for eating on the go. Kept one ingredient flow across cooking alternatives, labelled the precooked-rice time assumption and added separate cold-storage/transport guidance. Extended Singapore costing to a second cuisine while keeping pantry checkboxes independent. Short technique matching remains incomplete; no kitchen or user-testing outcomes are claimed.
