create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  name text not null,
  description text not null,
  price numeric not null check (price >= 0),
  image text not null,
  category text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  phone text not null,
  city text not null,
  address text not null,
  payment_method text not null check (payment_method in ('cod', 'card')),
  notes text not null default '',
  items jsonb not null,
  total_price numeric not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;

create policy if not exists "Profiles owner read" on public.profiles
for select using (auth.uid() = id);

create policy if not exists "Products readable by everyone" on public.products
for select using (true);

create policy if not exists "Products admin write" on public.products
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

create policy if not exists "Orders owner read" on public.orders
for select using (auth.uid() = user_id);

create policy if not exists "Orders owner insert" on public.orders
for insert with check (auth.uid() = user_id or user_id is null);

create policy if not exists "Orders admin all" on public.orders
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
