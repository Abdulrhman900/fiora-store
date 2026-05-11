create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  slug text not null unique,
  name text not null,
  description text not null,
  price numeric not null check (price >= 0),
  category text not null,
  image text,
  image_url text,
  featured boolean not null default false,
  variants jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  phone text not null,
  city text not null,
  address text not null,
  payment_method text not null check (payment_method in ('mada', 'visa', 'tabby', 'tamara')),
  notes text not null default '',
  items jsonb not null,
  total_price numeric not null,
  status text not null default 'pending' check (status in ('pending', 'shipped', 'completed')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;

drop policy if exists "Profiles owner read" on public.profiles;
create policy "Profiles owner read" on public.profiles
for select using (auth.uid() = id);

drop policy if exists "Products readable by everyone" on public.products;
create policy "Products readable by everyone" on public.products
for select using (true);

drop policy if exists "Products admin write" on public.products;
create policy "Products admin write" on public.products
for all using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

drop policy if exists "Orders owner read" on public.orders;
create policy "Orders owner read" on public.orders
for select using (auth.uid() = user_id);

drop policy if exists "Orders owner insert" on public.orders;
create policy "Orders owner insert" on public.orders
for insert with check (auth.uid() = user_id or user_id is null);

drop policy if exists "Orders admin all" on public.orders;
create policy "Orders admin all" on public.orders
for all using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

insert into public.products (id, slug, name, description, price, category, image, image_url, featured, variants) values
('1', 'sports-starter-box', 'بوكس البداية الرياضية ✨', 'كل احتياجاتك الرياضية في بوكس واحد أنيق ومتكامل، يجمع بين الراحة والعملية ليكون خيارك المثالي لبدء أو تطوير روتينك الرياضي بكل سهولة.', 279, 'featured', null, '/logo.png', true, '[]'::jsonb),
('2', 'sports-set', 'طقم لبس رياضي', 'قطعتين (ليقنز + تيشيرت) طقم مريح وعصري يمنحك حرية الحركة أثناء التمرين، بخامة ناعمة تمتص العرق وتناسب جميع الأنشطة الرياضية.', 100, 'clothing', null, null, false, '[{"name":"المقاس","options":["S","M","L","XL"]}]'::jsonb),
('3', 'headband', 'ربطة رأس', 'ربطة رأس أنيقة تثبت الشعر وتمنع التعرق من الإزعاج، مثالية للتمارين اليومية.', 12, 'accessories', null, null, false, '[{"name":"اللون","options":["رمادي","ابيض","بنفسجي","اسود"]}]'::jsonb),
('4', 'lunch-box', 'لانش بوكس', 'علبة طعام عملية وخفيفة تحافظ على وجبتك طازجة.', 18, 'home', null, null, false, '[]'::jsonb),
('5', 'fitness-gloves', 'قفازات رياضية', 'قفازات مصممة لحماية اليدين وتوفير قبضة قوية أثناء التمارين، لراحة وأداء أفضل.', 30, 'accessories', null, null, false, '[]'::jsonb),
('6', 'jump-rope', 'حبل القفز', 'حبل قفز خفيف وسهل الاستخدام، مثالي لتمارين الكارديو وحرق السعرات في أي وقت.', 39, 'fitness', null, null, false, '[]'::jsonb),
('7', 'sport-socks', 'جوارب رياضية', 'جوارب مريحة بخامة ناعمة ومرنة، توفر دعمًا للقدم وتناسب جميع أنواع التمارين.', 20, 'clothing', null, null, false, '[{"name":"اللون","options":["وردي","ابيض","اسود","رمادي","بيج"]}]'::jsonb),
('8', 'resistance-belt', 'حزام المقاومه', 'حزام مرن وخفيف يساعد على تنويع التمارين وتقوية العضلات بسهولة في المنزل أو النادي.', 15, 'fitness', null, null, false, '[]'::jsonb),
('10', 'smart-bottle', 'زجاجة رياضية ذكية', 'زجاجة أنيقة وعملية مزودة بشاشة رقمية لعرض درجة حرارة المشروب، تحافظ على مشروبك مناسبًا طوال اليوم وترافقك في النادي أو أثناء التنقل.', 16, 'accessories', null, null, false, '[]'::jsonb)
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  category = excluded.category,
  image = excluded.image,
  image_url = excluded.image_url,
  featured = excluded.featured,
  variants = excluded.variants;

insert into public.profiles (id, full_name, role)
values ('00000000-0000-0000-0000-000000000001', 'Admin Seed', 'admin')
on conflict (id) do update set full_name = excluded.full_name, role = excluded.role;
