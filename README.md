# 🍱 72's Food Guide in Japan

Curated Japan restaurant guide — 35 restaurants ranked from Tabelog, Michelin, World's 50 Best, and Asia's 50 Best. Personal food journal with visit tracking, ratings, and notes.

## Features

- **Ranked list** — S / A / A- / B+ / B tiers with analysis
- **Filter** by city (Tokyo / Kyoto / Osaka) and tier
- **Must-Try list** — heart any restaurant to save it
- **Food Journal** — rate, date, notes per restaurant (auto-saved)
- **Progress bar** — track how many you've visited
- **Live data** from Supabase — add more restaurants anytime

---

## Setup: Supabase (to enable live data & expansion)

> Without Supabase, the app still works with the built-in list of 35 restaurants.

### Step 1 — Create a free Supabase project
1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Create a new project (any name, any region)
3. Wait ~2 minutes for it to set up

### Step 2 — Create the table and seed data
1. In your project, go to **SQL Editor**
2. Paste the entire contents of `supabase/schema.sql`
3. Click **Run** — this creates the table and inserts all 35 restaurants

### Step 3 — Get your API keys
1. Go to **Settings → API**
2. Copy: **Project URL** and **anon / public** key

### Step 4 — Add to Vercel environment variables
1. Go to your Vercel project → **Settings → Environment Variables**
2. Add:
   - `VITE_SUPABASE_URL` = your Project URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
3. Redeploy

### Adding new restaurants
Just run an INSERT in Supabase SQL Editor:
```sql
insert into public.restaurants (id, rank, tier, name, city, area, cuisine, rating, reviews, price, price_level, michelin, global, tabelog, why_rank, signature_dish, must_order)
values (36, 36, 'B+', 'Restaurant Name', 'Tokyo', 'Shibuya', 'Sushi', 4.20, 500, '¥10,000~¥14,999', 3, '1★', '—', 'https://tabelog.com/...', 'Why you should go...', 'The signature dish', '["Dish 1","Dish 2"]');
```

---

## Local Development

```bash
npm install
cp .env.example .env.local
# fill in your Supabase keys (or leave blank to use built-in data)
npm run dev
```

## Deploy to Vercel

```bash
vercel deploy --prod
```
