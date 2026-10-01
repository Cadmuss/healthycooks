-- healthycooks / PostgreSQL for a NEW Supabase project.
-- Run once in the SQL editor as the project owner. No frontend writes are granted.
begin;
create extension if not exists pgcrypto;
create table public.countries (
  code text primary key check (code ~ '^[A-Z]{2}$'),
  name text not null unique,
  region text not null,
  latitude double precision check(latitude between -90 and 90),
  longitude double precision check(longitude between -180 and 180)
);
create table public.creators (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  public_url text check(public_url is null or public_url ~ '^https://'),
  bio text,
  approved boolean not null default false
);
create table public.recipes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check(slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  country_code text not null references public.countries(code),
  creator_id uuid references public.creators(id) on delete set null,
  title text not null,
  description text not null,
  cuisine_note text not null,
  total_minutes integer not null check(total_minutes > 0),
  base_servings integer not null check(base_servings between 1 and 20),
  allergens text[] not null default '{}',
  substitutions text,
  status text not null default 'draft' check(status in ('draft','review','published','archived')),
  kitchen_tested boolean not null default false,
  nutrition_reviewed boolean not null default false,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table public.recipe_ingredients (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  position integer not null check(position >= 0),
  ingredient_name text not null,
  quantity numeric(10,3) not null check(quantity > 0),
  unit text not null,
  preparation_note text,
  unique(recipe_id,position)
);
create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  creator_id uuid references public.creators(id) on delete set null,
  kind text not null check(kind in ('image','video')),
  provider text not null check(provider in ('local','youtube','external')),
  url text not null check(url ~ '^https://' or url ~ '^/assets/'),
  title text not null,
  alt_text text,
  attribution text not null,
  license text not null,
  source_url text check(source_url is null or source_url ~ '^https://'),
  rights_basis text not null check(rights_basis in ('original','licensed','public_domain','platform_embed')),
  permission_reference text,
  duration_seconds integer check(duration_seconds > 0),
  is_exact_recipe boolean not null default false,
  status text not null default 'pending' check(status in ('pending','approved','rejected')),
  unique(id,recipe_id),
  check(kind <> 'image' or alt_text is not null)
);
create table public.recipe_steps (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  position integer not null check(position >= 0),
  title text not null,
  short_instruction text,
  instruction text not null,
  visual_cue text not null,
  timer_seconds integer not null default 0 check(timer_seconds between 0 and 86400),
  image_id uuid,
  video_id uuid,
  video_start_seconds integer not null default 0 check(video_start_seconds >= 0),
  video_end_seconds integer check(video_end_seconds > video_start_seconds),
  segment_verified boolean not null default false,
  default_method text,
  unique(id,recipe_id),
  -- Composite FKs keep a step's assets attached to the same recipe.
  foreign key(image_id,recipe_id) references public.media_assets(id,recipe_id),
  foreign key(video_id,recipe_id) references public.media_assets(id,recipe_id),
  unique(recipe_id,position)
);
-- Alternatives share preparation but own instructions, timing and media.
create table public.recipe_step_methods (
  id uuid primary key default gen_random_uuid(),
  step_id uuid not null,
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  method_key text not null,
  label text not null,
  instruction text not null,
  short_instruction text not null,
  visual_cue text not null,
  timer_seconds integer not null default 0 check(timer_seconds between 0 and 86400),
  temperature_c numeric(5,1),
  ui_details jsonb not null default '{}', -- facts, checklist, timing notes; no media URLs
  source_url text check(source_url is null or source_url ~ '^https://'),
  video_id uuid,
  kitchen_tested boolean not null default false,
  foreign key(step_id,recipe_id) references public.recipe_steps(id,recipe_id) on delete cascade,
  foreign key(video_id,recipe_id) references public.media_assets(id,recipe_id),
  unique(step_id,method_key)
);
create table public.nutrition_estimates (
  recipe_id uuid primary key references public.recipes(id) on delete cascade,
  kcal numeric(8,2) not null check(kcal >= 0),
  protein_g numeric(8,2) not null check(protein_g >= 0),
  carbs_g numeric(8,2) not null check(carbs_g >= 0),
  fat_g numeric(8,2) not null check(fat_g >= 0),
  fibre_g numeric(8,2) not null check(fibre_g >= 0),
  sodium_mg numeric(8,2) check(sodium_mg >= 0),
  basis text not null default 'per portion' check(basis = 'per portion'),
  method text not null,
  source_url text,
  calculated_at timestamptz,
  reviewed boolean not null default false
);
create table public.prep_guidance (
  recipe_id uuid primary key references public.recipes(id) on delete cascade,
  portioning text not null,
  cooling text not null,
  storage text not null,
  reheating text not null,
  source_url text not null,
  reviewed_at timestamptz
);
create index recipes_country_status_idx on public.recipes(country_code,status);
create index recipe_steps_recipe_idx on public.recipe_steps(recipe_id);
create index recipe_ingredients_recipe_idx on public.recipe_ingredients(recipe_id);
create index media_recipe_status_idx on public.media_assets(recipe_id,status);
create function public.set_recipe_updated_at() returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;
create trigger recipe_updated_at before update on public.recipes
for each row execute function public.set_recipe_updated_at();
-- Deny access by default; add only public SELECT policies.
revoke all on public.countries, public.creators, public.recipes, public.recipe_ingredients, public.media_assets, public.recipe_steps, public.recipe_step_methods, public.nutrition_estimates, public.prep_guidance from anon, authenticated;
grant select on public.countries, public.creators, public.recipes, public.recipe_ingredients, public.media_assets, public.recipe_steps, public.recipe_step_methods, public.nutrition_estimates, public.prep_guidance to anon, authenticated;
alter table public.countries enable row level security;
alter table public.creators enable row level security;
alter table public.recipes enable row level security;
alter table public.recipe_ingredients enable row level security;
alter table public.media_assets enable row level security;
alter table public.recipe_steps enable row level security;
alter table public.recipe_step_methods enable row level security;
alter table public.nutrition_estimates enable row level security;
alter table public.prep_guidance enable row level security;
create policy countries_read on public.countries for select to anon,authenticated using(true);
create policy creators_read on public.creators for select to anon,authenticated using(approved);
create policy recipes_read on public.recipes for select to anon,authenticated using(status='published');
create policy ingredients_read on public.recipe_ingredients for select to anon,authenticated using(exists(select 1 from public.recipes r where r.id=recipe_id and r.status='published'));
create policy media_read on public.media_assets for select to anon,authenticated using(status='approved' and exists(select 1 from public.recipes r where r.id=recipe_id and r.status='published'));
create policy steps_read on public.recipe_steps for select to anon,authenticated using(exists(select 1 from public.recipes r where r.id=recipe_id and r.status='published'));
create policy methods_read on public.recipe_step_methods for select to anon,authenticated using(exists(select 1 from public.recipes r where r.id=recipe_id and r.status='published'));
create policy nutrition_read on public.nutrition_estimates for select to anon,authenticated using(exists(select 1 from public.recipes r where r.id=recipe_id and r.status='published'));
create policy prep_read on public.prep_guidance for select to anon,authenticated using(exists(select 1 from public.recipes r where r.id=recipe_id and r.status='published'));
commit;
