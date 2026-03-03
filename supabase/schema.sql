-- ============================================================
-- 72's Food Guide in Japan — Supabase Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

create table if not exists public.restaurants (
  id           int primary key,
  rank         int not null,
  tier         text not null,
  name         text not null,
  city         text not null,
  area         text,
  cuisine      text,
  rating       numeric(4,2),
  reviews      int,
  price        text,
  price_level  int,
  award        text,
  michelin     text,
  global       text,
  tabelog      text,
  why_rank     text,
  signature_dish text,
  must_order   jsonb default '[]'::jsonb,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- Allow public read (no auth needed for personal app)
alter table public.restaurants enable row level security;
create policy "Public read" on public.restaurants for select using (true);
create policy "Owner insert" on public.restaurants for insert with check (true);
create policy "Owner update" on public.restaurants for update using (true);
create policy "Owner delete" on public.restaurants for delete using (true);

-- ─── Seed data ───────────────────────────────────────────────────────────────
insert into public.restaurants (id,rank,tier,name,city,area,cuisine,rating,reviews,price,price_level,award,michelin,global,tabelog,why_rank,signature_dish,must_order) values
(1,1,'S','Sugita (Nihonbashi Kakigaracho)','Tokyo','Suitengumae','Sushi',4.66,957,'¥40,000~¥49,999',4,'Tabelog Gold','3★','Asia''s 50 Best #76','https://tabelog.com/en/tokyo/A1302/A130204/13018162/','Consistently ranked #1-3 on Tabelog for years. 957 reviews at 4.66 is extraordinary. His aging technique is unmatched.','Kohada (gizzard shad) — perfectly vinegared, the benchmark for Edomae sushi.','["Kohada","Toro","Anago hand roll","Tamago"]'),
(2,2,'S','Sazenka','Tokyo','Hiroo','Chinese',4.61,837,'¥50,000~¥59,999',5,'Tabelog Gold','3★','Asia''s 50 Best #51','https://tabelog.com/en/tokyo/A1307/A130703/13205298/','Japan''s only 3-star Chinese restaurant. Fuses Cantonese mastery with Japanese seasonal ingredients.','Peking Duck — reinterpreted with Japanese precision.','["Peking Duck","Shark fin soup","Dim sum course"]'),
(3,3,'S','Dojin','Kyoto','Sanjo/Higashiyama','Japanese Kaiseki',4.66,265,'¥50,000~¥59,999',5,'Tabelog Gold','—','—','https://tabelog.com/en/kyoto/A2601/A260301/26030764/','Kyoto''s #1 on Tabelog. Embodies Kyoto''s seasonal philosophy at its purest.','Seasonal hassun — the opening appetizer plate that changes each month.','["Hassun","Owan","Grilled seasonal fish","Rice course"]'),
(4,4,'S','Ginza Shinohara','Tokyo','Ginza','Japanese Kaiseki',4.60,1317,'¥40,000~¥49,999',4,'Tabelog Gold','2★','—','https://tabelog.com/en/tokyo/A1301/A130101/13200949/','1,317 reviews at 4.60. Makes kaiseki FUN rather than stuffy. My top kaiseki pick for first-timers.','Seasonal rice pot (takikomi gohan) — cooked in a clay pot at your counter seat.','["Hassun","Owan","Yakimono","Takikomi gohan"]'),
(5,5,'S','Honkogetsu','Osaka','Namba/Dotonbori','Japanese Kaiseki',4.55,208,'¥50,000~¥59,999',5,'Tabelog Gold','3★','—','https://tabelog.com/en/osaka/A2701/A270202/27001286/','Osaka''s undisputed #1. The tableware alone (200+ year old bowls) is a museum of Japanese food culture.','Seasonal crab course (winter) — the entire multi-course experience is the signature.','["Seasonal opener","Owan","Crab course (winter)"]'),
(6,6,'A','Sushi Saitou','Tokyo','Roppongi Itchome','Sushi',4.63,1321,'¥50,000~¥59,999',5,'Tabelog Gold','3★','Asia''s 50 Best #69','https://tabelog.com/en/tokyo/A1308/A130802/13015251/','1,321 reviews at 4.63. Most-reviewed top sushi in Japan. Still legendary.','Otoro — Saitou''s tuna sourcing is the stuff of legend.','["Otoro","Uni","Kohada","Anago"]'),
(7,7,'A','Quintessence','Tokyo','Kitashinagawa','French',4.55,1867,'¥30,000~¥39,999',4,'Tabelog Silver','3★','—','https://tabelog.com/en/tokyo/A1314/A131405/13159567/','Most reviewed fine dining in Tokyo. Best value 3-star. English-friendly.','Free-range chicken roasted in hay — simple yet transcendent.','["Hay-roasted chicken","Seasonal vegetable course","Cheese course"]'),
(8,8,'A','Kasahara','Tokyo','Kagurazaka','Yakitori',4.55,464,'¥30,000~¥39,999',4,'Tabelog Gold','—','—','https://tabelog.com/en/tokyo/A1309/A130905/13266251/','4.55 for yakitori is unheard of. A once-in-a-lifetime yakitori experience.','Tsukune (chicken meatball) — dense, juicy, caramelized over binchotan.','["Tsukune","Liver","Kawa (skin)"]'),
(9,9,'A','Ninshu Rou','Kyoto','Kitaoji','Chinese',4.62,342,'¥30,000~¥39,999',4,'Tabelog Gold','—','—','https://tabelog.com/en/kyoto/A2601/A260503/26033124/','Kyoto''s most refined Chinese. Less known internationally = more bookable.','Mapo tofu — Kyoto''s most refined version.','["Mapo tofu","Peking duck","Dim sum"]'),
(10,10,'A','Den','Tokyo','Jimbocho','Japanese Kaiseki',4.30,1876,'¥20,000~¥29,999',3,'Tabelog Silver','2★','World''s 50 Best #11, Asia''s 50 Best #35','https://tabelog.com/en/tokyo/A1310/A131003/13163530/','#11 in the WORLD. The Dentucky Fried Chicken is iconic. Best value world-class restaurant in Tokyo.','Dentucky Fried Chicken — an iconic dish that breaks every kaiseki rule.','["Dentucky Fried Chicken","Monaka (seasonal)","Rice course"]'),
(11,11,'A','Ogata','Kyoto','Shijo/Karasuma','Japanese Kaiseki',4.58,558,'¥50,000~¥59,999',5,'Tabelog Gold','3★','—','https://tabelog.com/en/kyoto/A2601/A260201/26012136/','Kyoto''s most beautiful kaiseki setting. The architecture and tableware are part of the meal.','The entire progression — each course builds in a narrative arc.','["Hassun","Owan","Yakimono","Wagashi dessert"]'),
(12,12,'A','Narisawa','Tokyo','Minami Aoyama','Innovative',4.38,2340,'¥30,000~¥39,999',4,'Tabelog Silver','2★','World''s 50 Best #21','https://tabelog.com/en/tokyo/A1306/A130602/13001452/','World''s #21. 13 consecutive years on Asia''s 50 Best.','Bread of the Forest — baked at your table using cherry blossom charcoal.','["Bread of the Forest","Satoyama Scenery","Wagyu course"]'),
(13,13,'A','L''Effervescence','Tokyo','Omote Sando','French',4.51,1671,'¥50,000~¥59,999',5,'Tabelog Silver','2★','Asia''s 50 Best #66','https://tabelog.com/en/tokyo/A1306/A130602/13116356/','Sustainability-focused French. Better wine program than most Tokyo restaurants.','Turnip course — a single root vegetable elevated into something transcendent.','["Turnip course","Seasonal fish","Cheese selection"]'),
(14,14,'A','Akasaka Raimon','Tokyo','Akasaka Mitsuke','Yakiniku',4.52,538,'¥15,000~¥19,999',3,'Tabelog Gold','1★','—','https://tabelog.com/en/tokyo/A1308/A130801/13224635/','Gold award yakiniku at ¥15-19k. Best way to experience premium wagyu without kaiseki prices.','Tongue — thick-cut, salt-grilled, the Tokyo benchmark.','["Tongue","Harami","Zabuton","Kalbi"]'),
(15,15,'A-','Iida','Kyoto','Kyoto Shiyakusho Mae','Japanese Kaiseki',4.60,233,'¥50,000~¥59,999',5,'Tabelog Gold','—','—','https://tabelog.com/en/kyoto/A2601/A260202/26016833/','4.60 with Gold in Kyoto kaiseki. For the kaiseki purist.','Seasonal owan (clear soup) — the soul of kaiseki distilled.','["Owan","Hassun","Yakimono","Rice course"]'),
(16,16,'A-','Florilège','Tokyo','Minami Aoyama','French',4.25,1234,'¥20,000~¥29,999',3,'Tabelog Silver','2★','World''s 50 Best #36, Asia''s #17','https://tabelog.com/en/tokyo/A1306/A130602/13144800/','Asia''s former #2. Outstanding value at ¥20-29k with 2 Michelin stars.','Cauliflower course — prepared 3 ways, simple yet mind-blowing.','["Cauliflower course","Foie gras","Hojicha dessert"]'),
(17,17,'A-','Torishiki','Tokyo','Meguro','Yakitori',4.27,1589,'¥6,000~¥7,999',2,'Tabelog Silver','1★','—','https://tabelog.com/en/tokyo/A1316/A131601/13006730/','THE yakitori pilgrimage. Michelin star at ¥6-8k.','Liver — seared rare, creamy center, smoky exterior. Life-changing.','["Liver","Tsukune with egg yolk","Skin","Soboro don"]'),
(18,18,'A-','Sushi Arai','Tokyo','Ginza','Sushi',4.61,969,'¥50,000~¥59,999',5,'Tabelog Gold','2★','—','https://tabelog.com/en/tokyo/A1301/A130101/13188186/','Gold + 2 Michelin stars. Unique sweeter shari.','Uni nigiri — sourced from multiple regions, presented as a tasting flight.','["Uni flight","Otoro","Kohada","Anago"]'),
(19,19,'A-','Niku no Takumi Miyoshi','Kyoto','Gion','Wagyu/Beef',4.46,664,'¥60,000~¥79,999',5,'Tabelog Silver','—','—','https://tabelog.com/en/kyoto/A2601/A260301/26002222/','Kyoto''s ultimate wagyu experience. This isn''t just yakiniku — it''s beef kaiseki.','Wagyu sashimi — raw beef so tender it melts before you can chew.','["Wagyu sashimi","Chateaubriand","Sukiyaki course","Beef sushi"]'),
(20,20,'A-','Fujiya 1935','Osaka','Chuo','Innovative',4.28,876,'¥30,000~¥39,999',4,'Tabelog Silver','2★','—','https://tabelog.com/en/osaka/A2701/A270203/27001317/','From udon shop to 2 Michelin stars. Osaka''s most innovative restaurant.','Molecular foie gras — deconstructed with Japanese techniques.','["Molecular foie gras","Seasonal fish course","Wagyu course"]'),
(21,21,'B+','Tempura Kondo','Tokyo','Ginza','Tempura',4.22,1123,'¥20,000~¥29,999',3,'Tabelog Bronze','2★','—','https://tabelog.com/en/tokyo/A1301/A130101/13003256/','The sweet potato tempura that changed Japan.','Sweet potato tempura — fried twice, impossibly fluffy inside.','["Sweet potato","Ebi","Seasonal vegetable set","Kakiage"]'),
(22,22,'B+','Hajime','Osaka','Hommachi','Innovative',4.22,1234,'¥30,000~¥39,999',4,'Tabelog Silver','3★','—','https://tabelog.com/en/osaka/A2701/A270106/27055491/','Osaka''s only 3-star that isn''t kaiseki.','Mineralité — 100+ ingredients arranged to look like a forest floor.','["Mineralité","Seasonal soup","Fish course","Nature dessert"]'),
(23,23,'B+','Kyubey','Tokyo','Ginza','Sushi',4.08,2340,'¥15,000~¥19,999',3,'Tabelog Bronze','1★','—','https://tabelog.com/en/tokyo/A1301/A130101/13002070/','Since 1935. Most accessible high-quality sushi in Ginza. English menu.','Omakase lunch set — incredible value for Ginza sushi quality.','["Lunch omakase","Otoro","Uni","Tamago"]'),
(24,24,'B+','Hyotei','Kyoto','Nanzenji','Japanese Kaiseki',4.15,789,'¥30,000~¥39,999',4,'Tabelog Bronze','3★','—','https://tabelog.com/en/kyoto/A2601/A260301/26000615/','400 years old. Morning porridge (¥5,500) is the most accessible entry into Kyoto kaiseki.','Asagayu (morning porridge) — ¥5,500 for a 3-star Michelin breakfast.','["Asagayu set","Boiled egg","Seasonal appetizers"]'),
(25,25,'B+','Kiyama','Kyoto','Marutamachi','Japanese Kaiseki',4.44,596,'¥30,000~¥39,999',4,'Tabelog Silver','2★','—','https://tabelog.com/en/kyoto/A2601/A260202/26029017/','Best value kaiseki in Kyoto. Warm chef. Also serves lunch at ¥15k.','Seasonal rice course — the finale that ties everything together.','["Hassun","Owan","Seasonal grilled fish","Rice pot"]'),
(26,26,'B','Rokurinsha','Tokyo','Tokyo Station','Ramen/Tsukemen',3.78,4521,'¥1,000~¥1,999',1,null,'—','—','https://tabelog.com/en/tokyo/A1302/A130201/13008240/','4,521 reviews. Tokyo Ramen Street anchor.','Tokumori tsukemen — extra noodles, dip into intense seafood-tonkotsu broth.','["Tokumori tsukemen","Ajitama topping"]'),
(27,27,'B','Mizuno','Osaka','Dotonbori','Okonomiyaki',3.63,2345,'¥1,000~¥1,999',1,null,'—','—','https://tabelog.com/en/osaka/A2701/A270202/27002244/','THE Osaka okonomiyaki. Essential Osaka eating.','Yamaimo-yaki (mountain yam okonomiyaki) — impossibly fluffy.','["Yamaimo-yaki","Negiyaki","Modanyaki"]'),
(28,28,'B','Dotonbori Imai Honten','Osaka','Dotonbori','Udon',3.67,1876,'¥1,000~¥1,999',1,null,'—','—','https://tabelog.com/en/osaka/A2701/A270202/27001259/','Since 1893. Kitsune udon is Osaka''s soul in a bowl.','Kitsune Udon — giant sweet tofu skin over silky noodles in golden dashi.','["Kitsune udon","Tempura udon"]'),
(29,29,'B','Honke Owariya','Kyoto','Karasuma Oike','Soba',3.71,1456,'¥1,000~¥1,999',1,null,'—','—','https://tabelog.com/en/kyoto/A2601/A260202/26001139/','550 YEARS OLD. The oldest soba shop in Japan.','Horai soba — 5 small portions in stacked lacquer bowls.','["Horai soba","Nishin soba","Seasonal tempura"]'),
(30,30,'B','Tsuta','Tokyo','Sugamo','Ramen',3.85,1834,'¥1,000~¥1,999',1,null,'1★','—','https://tabelog.com/en/tokyo/A1323/A132301/13156179/','First ramen shop to earn a Michelin star. Truffle shoyu ramen.','Special soy sauce ramen — truffle oil, dashi, perfectly chewy noodles.','["Special shoyu ramen","Ajitama topping"]'),
(31,31,'B','Daruma','Osaka','Shinsekai','Kushikatsu',3.54,3210,'¥1,000~¥1,999',1,null,'—','—','https://tabelog.com/en/osaka/A2701/A270206/27003605/','3,210 reviews. Shinsekai''s most iconic kushikatsu.','Kushikatsu assortment — pork, shrimp, lotus root, quail egg, all deep-fried golden.','["Mixed kushikatsu set","Beef串","Renkon","Cheese kushikatsu"]'),
(32,32,'B','Butagumi','Tokyo','Nishi Azabu','Tonkatsu',3.82,1456,'¥2,000~¥2,999',1,null,'—','—','https://tabelog.com/en/tokyo/A1307/A130702/13005539/','Multiple heritage pork breeds. Premium tonkatsu at mid-range prices.','TOKYO-X rosu katsu — local heritage breed, incredibly juicy.','["TOKYO-X rosu","Iberico hire","Miso soup"]'),
(33,33,'B','Katsukura','Kyoto','Sanjo','Tonkatsu',3.62,1567,'¥1,000~¥1,999',1,null,'—','—','https://tabelog.com/en/kyoto/A2601/A260301/26001132/','You grind your own sesame at the table. Great lunch stop during sightseeing.','Special hire katsu set — lean fillet, perfectly crispy.','["Special hire katsu","Rosu katsu"]'),
(34,34,'B','Junsei','Kyoto','Nanzenji','Tofu',3.58,987,'¥3,000~¥3,999',2,null,'—','—','https://tabelog.com/en/kyoto/A2601/A260301/26001159/','Yudofu in a gorgeous garden setting near Nanzenji temple.','Yudofu set — silky tofu simmered in kombu dashi, dipped in ponzu.','["Yudofu course","Goma dofu","Seasonal appetizers"]'),
(35,35,'B','Rikuro Ojisan no Mise','Osaka','Namba','Dessert',3.57,2345,'~¥999',1,null,'—','—','https://tabelog.com/en/osaka/A2701/A270202/27001307/','Osaka''s famous jiggly cheesecake — ¥985 for a whole cake. Eat it warm.','Freshly baked cheesecake — still jiggling when they hand it to you.','["Original cheesecake (eat warm!)","Cheesecake with raisins"]')
on conflict (id) do update set
  rank=excluded.rank, tier=excluded.tier, name=excluded.name,
  city=excluded.city, area=excluded.area, cuisine=excluded.cuisine,
  rating=excluded.rating, reviews=excluded.reviews, price=excluded.price,
  award=excluded.award, michelin=excluded.michelin, global=excluded.global,
  tabelog=excluded.tabelog, why_rank=excluded.why_rank,
  signature_dish=excluded.signature_dish, must_order=excluded.must_order,
  updated_at=now();
