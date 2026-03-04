import { useState, useEffect, useCallback } from "react";
import { supabase, isSupabaseReady } from "./lib/supabase";
import HotelList from "./HotelList";

// ─── Fallback data (used if Supabase is not yet configured) ───────────────────
const FALLBACK_RESTAURANTS = [
  { id:1, rank:1, tier:"S", name:"Sugita (Nihonbashi Kakigaracho)", city:"Tokyo", area:"Suitengumae", cuisine:"Sushi", rating:4.66, reviews:957, price:"¥40,000~¥49,999", priceLevel:4, award:"Tabelog Gold", michelin:"3★", global:"Asia's 50 Best #76", tabelog:"https://tabelog.com/en/tokyo/A1302/A130204/13018162/", whyRank:"Consistently ranked #1-3 on Tabelog for years. 957 reviews at 4.66 is extraordinary — most sushi at this tier have <300. His aging technique is unmatched. Reservation: near-impossible but worth trying.", signatureDish:"Kohada (gizzard shad) — perfectly vinegared, the benchmark for Edomae sushi.", mustOrder:["Kohada","Toro","Anago hand roll","Tamago"] },
  { id:2, rank:2, tier:"S", name:"Sazenka", city:"Tokyo", area:"Hiroo", cuisine:"Chinese", rating:4.61, reviews:837, price:"¥50,000~¥59,999", priceLevel:5, award:"Tabelog Gold", michelin:"3★", global:"Asia's 50 Best #51", tabelog:"https://tabelog.com/en/tokyo/A1307/A130703/13205298/", whyRank:"Japan's only 3-star Chinese restaurant. Fuses Cantonese mastery with Japanese seasonal ingredients.", signatureDish:"Peking Duck — reinterpreted with Japanese precision.", mustOrder:["Peking Duck","Shark fin soup","Dim sum course"] },
  { id:3, rank:3, tier:"S", name:"Dojin", city:"Kyoto", area:"Sanjo/Higashiyama", cuisine:"Japanese Kaiseki", rating:4.66, reviews:265, price:"¥50,000~¥59,999", priceLevel:5, award:"Tabelog Gold", michelin:"—", global:"—", tabelog:"https://tabelog.com/en/kyoto/A2601/A260301/26030764/", whyRank:"Kyoto's #1 on Tabelog. Embodies Kyoto's seasonal philosophy at its purest.", signatureDish:"Seasonal hassun — the opening appetizer plate that changes each month.", mustOrder:["Hassun","Owan","Grilled seasonal fish","Rice course"] },
  { id:4, rank:4, tier:"S", name:"Ginza Shinohara", city:"Tokyo", area:"Ginza", cuisine:"Japanese Kaiseki", rating:4.60, reviews:1317, price:"¥40,000~¥49,999", priceLevel:4, award:"Tabelog Gold", michelin:"2★", global:"—", tabelog:"https://tabelog.com/en/tokyo/A1301/A130101/13200949/", whyRank:"1,317 reviews at 4.60. Chef Shinohara makes kaiseki FUN rather than stuffy. My top kaiseki pick for first-timers.", signatureDish:"Seasonal rice pot (takikomi gohan) — cooked in a clay pot at your counter seat.", mustOrder:["Hassun","Owan","Yakimono","Takikomi gohan"] },
  { id:5, rank:5, tier:"S", name:"Honkogetsu", city:"Osaka", area:"Namba/Dotonbori", cuisine:"Japanese Kaiseki", rating:4.55, reviews:208, price:"¥50,000~¥59,999", priceLevel:5, award:"Tabelog Gold", michelin:"3★", global:"—", tabelog:"https://tabelog.com/en/osaka/A2701/A270202/27001286/", whyRank:"Osaka's undisputed #1. The tableware alone (200+ year old bowls) makes this a museum of Japanese food culture.", signatureDish:"Seasonal crab course (winter) — the entire multi-course experience is the signature.", mustOrder:["Seasonal opener","Owan","Crab course (winter)"] },
  { id:6, rank:6, tier:"A", name:"Sushi Saitou", city:"Tokyo", area:"Roppongi Itchome", cuisine:"Sushi", rating:4.63, reviews:1321, price:"¥50,000~¥59,999", priceLevel:5, award:"Tabelog Gold", michelin:"3★", global:"Asia's 50 Best #69", tabelog:"https://tabelog.com/en/tokyo/A1308/A130802/13015251/", whyRank:"1,321 reviews at 4.63 — most-reviewed top sushi in Japan. Still legendary despite being near-impossible to book.", signatureDish:"Otoro — Saitou's tuna sourcing is the stuff of legend.", mustOrder:["Otoro","Uni","Kohada","Anago"] },
  { id:7, rank:7, tier:"A", name:"Quintessence", city:"Tokyo", area:"Kitashinagawa", cuisine:"French", rating:4.55, reviews:1867, price:"¥30,000~¥39,999", priceLevel:4, award:"Tabelog Silver", michelin:"3★", global:"—", tabelog:"https://tabelog.com/en/tokyo/A1314/A131405/13159567/", whyRank:"The most reviewed fine dining in Tokyo. Best value 3-star. English-friendly.", signatureDish:"Free-range chicken roasted in hay — simple yet transcendent.", mustOrder:["Hay-roasted chicken","Seasonal vegetable course","Cheese course"] },
  { id:8, rank:8, tier:"A", name:"Kasahara", city:"Tokyo", area:"Kagurazaka", cuisine:"Yakitori", rating:4.55, reviews:464, price:"¥30,000~¥39,999", priceLevel:4, award:"Tabelog Gold", michelin:"—", global:"—", tabelog:"https://tabelog.com/en/tokyo/A1309/A130905/13266251/", whyRank:"4.55 for yakitori is unheard of. A once-in-a-lifetime yakitori experience.", signatureDish:"Tsukune (chicken meatball) — dense, juicy, caramelized over binchotan.", mustOrder:["Tsukune","Liver","Kawa (skin)"] },
  { id:9, rank:9, tier:"A", name:"Ninshu Rou", city:"Kyoto", area:"Kitaoji", cuisine:"Chinese", rating:4.62, reviews:342, price:"¥30,000~¥39,999", priceLevel:4, award:"Tabelog Gold", michelin:"—", global:"—", tabelog:"https://tabelog.com/en/kyoto/A2601/A260503/26033124/", whyRank:"Kyoto's most refined Chinese. Gold Award. Less known internationally = more bookable.", signatureDish:"Mapo tofu — Kyoto's most refined version.", mustOrder:["Mapo tofu","Peking duck","Dim sum"] },
  { id:10, rank:10, tier:"A", name:"Den", city:"Tokyo", area:"Jimbocho", cuisine:"Japanese Kaiseki", rating:4.30, reviews:1876, price:"¥20,000~¥29,999", priceLevel:3, award:"Tabelog Silver", michelin:"2★", global:"World's 50 Best #11, Asia's 50 Best #35", tabelog:"https://tabelog.com/en/tokyo/A1310/A131003/13163530/", whyRank:"#11 in the WORLD. The 'Dentucky Fried Chicken' is iconic. Best value world-class restaurant in Tokyo.", signatureDish:"Dentucky Fried Chicken — an iconic dish that breaks every kaiseki rule.", mustOrder:["Dentucky Fried Chicken","Monaka (seasonal)","Rice course"] },
  { id:11, rank:11, tier:"A", name:"Ogata", city:"Kyoto", area:"Shijo/Karasuma", cuisine:"Japanese Kaiseki", rating:4.58, reviews:558, price:"¥50,000~¥59,999", priceLevel:5, award:"Tabelog Gold", michelin:"3★", global:"—", tabelog:"https://tabelog.com/en/kyoto/A2601/A260201/26012136/", whyRank:"Kyoto's most beautiful kaiseki setting. The architecture and tableware are part of the meal.", signatureDish:"The entire progression — each course builds in a narrative arc.", mustOrder:["Hassun","Owan","Yakimono","Wagashi dessert"] },
  { id:12, rank:12, tier:"A", name:"Narisawa", city:"Tokyo", area:"Minami Aoyama", cuisine:"Innovative", rating:4.38, reviews:2340, price:"¥30,000~¥39,999", priceLevel:4, award:"Tabelog Silver", michelin:"2★", global:"World's 50 Best #21", tabelog:"https://tabelog.com/en/tokyo/A1306/A130602/13001452/", whyRank:"World's #21. 13 consecutive years on Asia's 50 Best. The 'Satoyama Cuisine' concept is uniquely Japanese.", signatureDish:"Bread of the Forest — baked at your table using cherry blossom charcoal.", mustOrder:["Bread of the Forest","Satoyama Scenery","Wagyu course"] },
  { id:13, rank:13, tier:"A", name:"L'Effervescence", city:"Tokyo", area:"Omote Sando", cuisine:"French", rating:4.51, reviews:1671, price:"¥50,000~¥59,999", priceLevel:5, award:"Tabelog Silver", michelin:"2★", global:"Asia's 50 Best #66", tabelog:"https://tabelog.com/en/tokyo/A1306/A130602/13116356/", whyRank:"Sustainability-focused French. Better wine program than most Tokyo restaurants.", signatureDish:"Turnip course — a single root vegetable elevated into something transcendent.", mustOrder:["Turnip course","Seasonal fish","Cheese selection"] },
  { id:14, rank:14, tier:"A", name:"Akasaka Raimon", city:"Tokyo", area:"Akasaka Mitsuke", cuisine:"Yakiniku", rating:4.52, reviews:538, price:"¥15,000~¥19,999", priceLevel:3, award:"Tabelog Gold", michelin:"1★", global:"—", tabelog:"https://tabelog.com/en/tokyo/A1308/A130801/13224635/", whyRank:"Gold award yakiniku at ¥15-19k — exceptional value. Best way to experience premium wagyu without kaiseki prices.", signatureDish:"Tongue — thick-cut, salt-grilled, the benchmark for yakiniku tongue in Tokyo.", mustOrder:["Tongue","Harami","Zabuton","Kalbi"] },
  { id:15, rank:15, tier:"A-", name:"Iida", city:"Kyoto", area:"Kyoto Shiyakusho Mae", cuisine:"Japanese Kaiseki", rating:4.60, reviews:233, price:"¥50,000~¥59,999", priceLevel:5, award:"Tabelog Gold", michelin:"—", global:"—", tabelog:"https://tabelog.com/en/kyoto/A2601/A260202/26016833/", whyRank:"4.60 with Gold in Kyoto kaiseki. Deeply traditional, for the kaiseki purist.", signatureDish:"Seasonal owan (clear soup) — the soul of kaiseki distilled.", mustOrder:["Owan","Hassun","Yakimono","Rice course"] },
  { id:16, rank:16, tier:"A-", name:"Florilège", city:"Tokyo", area:"Minami Aoyama", cuisine:"French", rating:4.25, reviews:1234, price:"¥20,000~¥29,999", priceLevel:3, award:"Tabelog Silver", michelin:"2★", global:"World's 50 Best #36, Asia's #17", tabelog:"https://tabelog.com/en/tokyo/A1306/A130602/13144800/", whyRank:"Asia's former #2. At ¥20-29k with 2 Michelin stars, outstanding value. Book exactly 1 month ahead.", signatureDish:"Cauliflower course — prepared 3 ways, simple yet mind-blowing.", mustOrder:["Cauliflower course","Foie gras","Hojicha dessert"] },
  { id:17, rank:17, tier:"A-", name:"Torishiki", city:"Tokyo", area:"Meguro", cuisine:"Yakitori", rating:4.27, reviews:1589, price:"¥6,000~¥7,999", priceLevel:2, award:"Tabelog Silver", michelin:"1★", global:"—", tabelog:"https://tabelog.com/en/tokyo/A1316/A131601/13006730/", whyRank:"THE yakitori that launched a pilgrimage. Michelin star at ¥6-8k = absurd value.", signatureDish:"Liver — seared rare, creamy center, smoky exterior. Life-changing.", mustOrder:["Liver","Tsukune with egg yolk","Skin","Soboro don"] },
  { id:18, rank:18, tier:"A-", name:"Sushi Arai", city:"Tokyo", area:"Ginza", cuisine:"Sushi", rating:4.61, reviews:969, price:"¥50,000~¥59,999", priceLevel:5, award:"Tabelog Gold", michelin:"2★", global:"—", tabelog:"https://tabelog.com/en/tokyo/A1301/A130101/13188186/", whyRank:"Gold + 2 Michelin stars. Sushi Arai's rice seasoning is unique — slightly sweeter shari.", signatureDish:"Uni nigiri — sourced from multiple regions, presented as a tasting flight.", mustOrder:["Uni flight","Otoro","Kohada","Anago"] },
  { id:19, rank:19, tier:"A-", name:"Niku no Takumi Miyoshi", city:"Kyoto", area:"Gion", cuisine:"Wagyu/Beef", rating:4.46, reviews:664, price:"¥60,000~¥79,999", priceLevel:5, award:"Tabelog Silver", michelin:"—", global:"—", tabelog:"https://tabelog.com/en/kyoto/A2601/A260301/26002222/", whyRank:"Kyoto's ultimate wagyu experience. Artisan preparation elevates each cut.", signatureDish:"Wagyu sashimi — raw beef so tender it melts before you can chew.", mustOrder:["Wagyu sashimi","Chateaubriand","Sukiyaki course","Beef sushi"] },
  { id:20, rank:20, tier:"A-", name:"Fujiya 1935", city:"Osaka", area:"Chuo", cuisine:"Innovative", rating:4.28, reviews:876, price:"¥30,000~¥39,999", priceLevel:4, award:"Tabelog Silver", michelin:"2★", global:"—", tabelog:"https://tabelog.com/en/osaka/A2701/A270203/27001317/", whyRank:"From udon shop to 2 Michelin stars. Osaka's most innovative restaurant.", signatureDish:"Molecular foie gras — deconstructed with Japanese techniques.", mustOrder:["Molecular foie gras","Seasonal fish course","Wagyu course"] },
  { id:21, rank:21, tier:"B+", name:"Tempura Kondo", city:"Tokyo", area:"Ginza", cuisine:"Tempura", rating:4.22, reviews:1123, price:"¥20,000~¥29,999", priceLevel:3, award:"Tabelog Bronze", michelin:"2★", global:"—", tabelog:"https://tabelog.com/en/tokyo/A1301/A130101/13003256/", whyRank:"The sweet potato tempura that changed Japan. Master Kondo's technique is mesmerizing.", signatureDish:"Sweet potato tempura — fried twice, impossibly fluffy inside.", mustOrder:["Sweet potato","Ebi","Seasonal vegetable set","Kakiage"] },
  { id:22, rank:22, tier:"B+", name:"Hajime", city:"Osaka", area:"Hommachi", cuisine:"Innovative", rating:4.22, reviews:1234, price:"¥30,000~¥39,999", priceLevel:4, award:"Tabelog Silver", michelin:"3★", global:"—", tabelog:"https://tabelog.com/en/osaka/A2701/A270106/27055491/", whyRank:"Osaka's only 3-star that isn't kaiseki. Nature-inspired dishes are visually stunning.", signatureDish:"Mineralité — 100+ ingredients arranged to look like a forest floor.", mustOrder:["Mineralité","Seasonal soup","Fish course","Nature dessert"] },
  { id:23, rank:23, tier:"B+", name:"Kyubey", city:"Tokyo", area:"Ginza", cuisine:"Sushi", rating:4.08, reviews:2340, price:"¥15,000~¥19,999", priceLevel:3, award:"Tabelog Bronze", michelin:"1★", global:"—", tabelog:"https://tabelog.com/en/tokyo/A1301/A130101/13002070/", whyRank:"Since 1935. Most accessible high-quality sushi in Ginza. English menu. Walk-ins sometimes possible.", signatureDish:"Omakase lunch set — incredible value for Ginza sushi quality.", mustOrder:["Lunch omakase","Otoro","Uni","Tamago"] },
  { id:24, rank:24, tier:"B+", name:"Hyotei", city:"Kyoto", area:"Nanzenji", cuisine:"Japanese Kaiseki", rating:4.15, reviews:789, price:"¥30,000~¥39,999", priceLevel:4, award:"Tabelog Bronze", michelin:"3★", global:"—", tabelog:"https://tabelog.com/en/kyoto/A2601/A260301/26000615/", whyRank:"400 years old. Morning porridge (¥5,500) is the most accessible entry into Kyoto kaiseki.", signatureDish:"Asagayu (morning porridge) — ¥5,500 for a 3-star Michelin breakfast.", mustOrder:["Asagayu set","Boiled egg (Edo-era signature)","Seasonal appetizers"] },
  { id:25, rank:25, tier:"B+", name:"Kiyama", city:"Kyoto", area:"Marutamachi", cuisine:"Japanese Kaiseki", rating:4.44, reviews:596, price:"¥30,000~¥39,999", priceLevel:4, award:"Tabelog Silver", michelin:"2★", global:"—", tabelog:"https://tabelog.com/en/kyoto/A2601/A260202/26029017/", whyRank:"Best value kaiseki in Kyoto. Warm, approachable chef. Also serves lunch at ¥15k.", signatureDish:"Seasonal rice course — the finale that ties everything together.", mustOrder:["Hassun","Owan","Seasonal grilled fish","Rice pot"] },
  { id:26, rank:26, tier:"B", name:"Rokurinsha", city:"Tokyo", area:"Tokyo Station", cuisine:"Ramen/Tsukemen", rating:3.78, reviews:4521, price:"¥1,000~¥1,999", priceLevel:1, award:null, michelin:"—", global:"—", tabelog:"https://tabelog.com/en/tokyo/A1302/A130201/13008240/", whyRank:"4,521 reviews — the people have spoken. Tokyo Ramen Street's anchor tenant.", signatureDish:"Tokumori tsukemen — extra noodles, dip into intense seafood-tonkotsu broth.", mustOrder:["Tokumori tsukemen","Ajitama topping"] },
  { id:27, rank:27, tier:"B", name:"Mizuno", city:"Osaka", area:"Dotonbori", cuisine:"Okonomiyaki", rating:3.63, reviews:2345, price:"¥1,000~¥1,999", priceLevel:1, award:null, michelin:"—", global:"—", tabelog:"https://tabelog.com/en/osaka/A2701/A270202/27002244/", whyRank:"THE Osaka okonomiyaki. Cooked in front of you. Essential Osaka eating.", signatureDish:"Yamaimo-yaki (mountain yam okonomiyaki) — impossibly fluffy.", mustOrder:["Yamaimo-yaki","Negiyaki","Modanyaki"] },
  { id:28, rank:28, tier:"B", name:"Dotonbori Imai Honten", city:"Osaka", area:"Dotonbori", cuisine:"Udon", rating:3.67, reviews:1876, price:"¥1,000~¥1,999", priceLevel:1, award:null, michelin:"—", global:"—", tabelog:"https://tabelog.com/en/osaka/A2701/A270202/27001259/", whyRank:"Since 1893. Kitsune udon is Osaka's soul in a bowl.", signatureDish:"Kitsune Udon — giant sweet tofu skin over silky noodles in golden dashi.", mustOrder:["Kitsune udon","Tempura udon"] },
  { id:29, rank:29, tier:"B", name:"Honke Owariya", city:"Kyoto", area:"Karasuma Oike", cuisine:"Soba", rating:3.71, reviews:1456, price:"¥1,000~¥1,999", priceLevel:1, award:null, michelin:"—", global:"—", tabelog:"https://tabelog.com/en/kyoto/A2601/A260202/26001139/", whyRank:"550 YEARS OLD. The oldest soba shop in Japan. A Kyoto institution.", signatureDish:"Horai soba — 5 small portions in stacked lacquer bowls with different toppings.", mustOrder:["Horai soba","Nishin soba","Seasonal tempura"] },
  { id:30, rank:30, tier:"B", name:"Tsuta", city:"Tokyo", area:"Sugamo", cuisine:"Ramen", rating:3.85, reviews:1834, price:"¥1,000~¥1,999", priceLevel:1, award:null, michelin:"1★", global:"—", tabelog:"https://tabelog.com/en/tokyo/A1323/A132301/13156179/", whyRank:"First ramen shop to earn a Michelin star. Truffle shoyu ramen.", signatureDish:"Special soy sauce ramen — truffle oil, dashi, and perfectly chewy noodles.", mustOrder:["Special shoyu ramen","Ajitama topping"] },
  { id:31, rank:31, tier:"B", name:"Daruma", city:"Osaka", area:"Shinsekai", cuisine:"Kushikatsu", rating:3.54, reviews:3210, price:"¥1,000~¥1,999", priceLevel:1, award:null, michelin:"—", global:"—", tabelog:"https://tabelog.com/en/osaka/A2701/A270206/27003605/", whyRank:"3,210 reviews. Shinsekai's most iconic kushikatsu. Essential Osaka street-food culture.", signatureDish:"Kushikatsu assortment — pork, shrimp, lotus root, quail egg, all deep-fried golden.", mustOrder:["Mixed kushikatsu set","Beef串","Renkon","Cheese kushikatsu"] },
  { id:32, rank:32, tier:"B", name:"Butagumi", city:"Tokyo", area:"Nishi Azabu", cuisine:"Tonkatsu", rating:3.82, reviews:1456, price:"¥2,000~¥2,999", priceLevel:1, award:null, michelin:"—", global:"—", tabelog:"https://tabelog.com/en/tokyo/A1307/A130702/13005539/", whyRank:"Choose from multiple heritage pork breeds. Premium tonkatsu at mid-range prices.", signatureDish:"TOKYO-X rosu katsu — local heritage breed, incredibly juicy.", mustOrder:["TOKYO-X rosu","Iberico hire","Miso soup"] },
  { id:33, rank:33, tier:"B", name:"Katsukura", city:"Kyoto", area:"Sanjo", cuisine:"Tonkatsu", rating:3.62, reviews:1567, price:"¥1,000~¥1,999", priceLevel:1, award:null, michelin:"—", global:"—", tabelog:"https://tabelog.com/en/kyoto/A2601/A260301/26001132/", whyRank:"You grind your own sesame at the table. Great lunch stop during sightseeing.", signatureDish:"Special hire katsu set — lean fillet, perfectly crispy.", mustOrder:["Special hire katsu","Rosu katsu","Grind the sesame yourself"] },
  { id:34, rank:34, tier:"B", name:"Junsei", city:"Kyoto", area:"Nanzenji", cuisine:"Tofu", rating:3.58, reviews:987, price:"¥3,000~¥3,999", priceLevel:2, award:null, michelin:"—", global:"—", tabelog:"https://tabelog.com/en/kyoto/A2601/A260301/26001159/", whyRank:"Yudofu in a gorgeous garden setting near Nanzenji. Pure Kyoto experience.", signatureDish:"Yudofu set — silky tofu simmered in kombu dashi, dipped in ponzu.", mustOrder:["Yudofu course","Goma dofu","Seasonal appetizers"] },
  { id:35, rank:35, tier:"B", name:"Rikuro Ojisan no Mise", city:"Osaka", area:"Namba", cuisine:"Dessert", rating:3.57, reviews:2345, price:"~¥999", priceLevel:1, award:null, michelin:"—", global:"—", tabelog:"https://tabelog.com/en/osaka/A2701/A270202/27001307/", whyRank:"Osaka's famous jiggly cheesecake — ¥985 for a whole cake. Eat it warm.", signatureDish:"Freshly baked cheesecake — still jiggling when they hand it to you.", mustOrder:["Original cheesecake (eat warm!)","Cheesecake with raisins"] },
];

const TIERS = {
  S: "bg-gradient-to-r from-amber-100 to-yellow-50 border-amber-300",
  A: "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200",
  "A-": "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200",
  "B+": "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200",
  B: "bg-gradient-to-r from-stone-50 to-gray-50 border-stone-200",
};

const CITIES = ["All", "Tokyo", "Kyoto", "Osaka"];

// ─── Sub-components ───────────────────────────────────────────────────────────
const StarInput = ({ value, onChange, size = "w-6 h-6" }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <button key={i} onClick={() => onChange(i === value ? 0 : i)} className={`${size} transition-transform hover:scale-125`}>
        <svg viewBox="0 0 20 20" className={i <= value ? "text-amber-400" : "text-gray-300"}>
          <path fill="currentColor" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      </button>
    ))}
  </div>
);

const TierBadge = ({ tier }) => (
  <span className={`text-xs px-2 py-0.5 rounded font-black ${
    tier === "S" ? "bg-amber-400 text-amber-900"
    : tier === "A" ? "bg-blue-500 text-white"
    : tier === "A-" ? "bg-purple-500 text-white"
    : tier === "B+" ? "bg-green-500 text-white"
    : "bg-stone-500 text-white"
  }`}>{tier}</span>
);

const CityDot = ({ city }) => (
  <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${
    city === "Tokyo" ? "bg-red-500" : city === "Kyoto" ? "bg-purple-500" : "bg-blue-500"
  }`} />
);

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [usingSupabase, setUsingSupabase] = useState(false);

  const [journal, setJournal] = useState({});
  const [mustTry, setMustTry] = useState({});
  const [view, setView] = useState("ranked");
  const [city, setCity] = useState("All");
  const [tierFilter, setTierFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  // Load restaurants (Supabase → fallback to hardcoded)
  useEffect(() => {
    const load = async () => {
      if (isSupabaseReady) {
        try {
          // 5-second timeout — fall back to hardcoded if Supabase hangs
          const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Supabase timeout")), 5000)
          );
          const query = supabase
            .from("restaurants")
            .select("*")
            .order("rank", { ascending: true });
          const { data, error } = await Promise.race([query, timeout]);
          if (!error && data && data.length > 0) {
            const normalised = data.map((r) => ({
              ...r,
              mustOrder: Array.isArray(r.must_order)
                ? r.must_order
                : typeof r.must_order === "string"
                ? JSON.parse(r.must_order || "[]")
                : [],
            }));
            setRestaurants(normalised);
            setUsingSupabase(true);
            setLoadingData(false);
            return;
          }
        } catch (e) {
          console.warn("Supabase load failed, using fallback data:", e.message);
        }
      }
      setRestaurants(FALLBACK_RESTAURANTS);
      setLoadingData(false);
    };
    load();
  }, []);

  // Load journal & must-try from localStorage
  useEffect(() => {
    try {
      const j = localStorage.getItem("fg-journal");
      if (j) setJournal(JSON.parse(j));
      const m = localStorage.getItem("fg-musttry");
      if (m) setMustTry(JSON.parse(m));
    } catch {}
  }, []);

  const saveJournal = useCallback((data) => {
    setJournal(data);
    localStorage.setItem("fg-journal", JSON.stringify(data));
  }, []);

  const saveMustTry = useCallback((data) => {
    setMustTry(data);
    localStorage.setItem("fg-musttry", JSON.stringify(data));
  }, []);

  const toggleMustTry = (id) => {
    const next = { ...mustTry };
    if (next[id]) delete next[id]; else next[id] = true;
    saveMustTry(next);
  };

  const updateJournal = (id, field, value) => {
    const next = {
      ...journal,
      [id]: { ...(journal[id] || {}), [field]: value, updatedAt: new Date().toISOString() },
    };
    if (!next[id].visitedAt && field === "myRating" && value > 0)
      next[id].visitedAt = new Date().toISOString();
    saveJournal(next);
  };

  const filtered = restaurants.filter((r) => {
    if (city !== "All" && r.city !== city) return false;
    if (tierFilter !== "All" && r.tier !== tierFilter) return false;
    if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.cuisine.toLowerCase().includes(search.toLowerCase())) return false;
    if (view === "musttry" && !mustTry[r.id]) return false;
    if (view === "visited" && !journal[r.id]?.myRating) return false;
    return true;
  });

  const visitedCount = restaurants.filter((r) => journal[r.id]?.myRating).length;
  const mustTryCount = Object.keys(mustTry).length;

  // ── Detail modal ──────────────────────────────────────────────────────────
  const DetailModal = ({ r }) => {
    const entry = journal[r.id] || {};
    const [comment, setComment] = useState(entry.comment || "");
    const [dishes, setDishes] = useState(entry.favDishes || "");
    const [date, setDate] = useState(entry.visitDate || "");

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3"
        onClick={() => setSelected(null)}>
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-5 py-4 rounded-t-2xl z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <TierBadge tier={r.tier} />
                  <span className="text-xs font-bold text-gray-400">#{r.rank}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    r.city === "Tokyo" ? "bg-red-50 text-red-700"
                    : r.city === "Kyoto" ? "bg-purple-50 text-purple-700"
                    : "bg-blue-50 text-blue-700"
                  }`}>{r.city}</span>
                  {r.michelin && r.michelin !== "—" && (
                    <span className="text-xs bg-red-600 text-white px-1.5 py-0.5 rounded font-bold">{r.michelin}</span>
                  )}
                </div>
                <h2 className="text-xl font-black text-gray-900">{r.name}</h2>
                <p className="text-sm text-gray-500">{r.area} · {r.cuisine} · {r.price}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => toggleMustTry(r.id)}
                  className={`p-2 rounded-lg transition-all ${mustTry[r.id] ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-300 hover:text-red-400"}`}>
                  <svg className="w-5 h-5" fill={mustTry[r.id] ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button onClick={() => setSelected(null)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm flex-wrap">
              <span className="font-bold text-amber-600">Tabelog {r.rating}</span>
              <span className="text-gray-400">{Number(r.reviews).toLocaleString()} reviews</span>
              {r.award && r.award !== "null" && <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded">{r.award}</span>}
              {r.global && r.global !== "—" && (
                <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">{r.global}</span>
              )}
            </div>
          </div>

          <div className="px-5 py-4 space-y-4">
            {/* Why this rank */}
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <h3 className="font-bold text-sm text-amber-900 mb-1">Why #{r.rank} — My Analysis</h3>
              <p className="text-sm text-amber-800 leading-relaxed">{r.whyRank || r.why_rank}</p>
            </div>

            {/* Must order */}
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <h3 className="font-bold text-sm text-green-900 mb-2">Must-Order Dishes</h3>
              <div className="flex flex-wrap gap-1.5">
                {(r.mustOrder || r.must_order || []).map((d, i) => (
                  <span key={i} className="text-xs bg-white border border-green-200 px-2 py-1 rounded-full text-green-800">
                    {["🥇", "🥈", "🥉", "🍽️"][Math.min(i, 3)]} {d}
                  </span>
                ))}
              </div>
              <p className="text-xs text-green-700 mt-2 italic">Signature: {r.signatureDish || r.signature_dish}</p>
            </div>

            {/* My Journal */}
            <div className="border-2 border-dashed border-amber-200 rounded-xl p-4 bg-amber-50/30">
              <h3 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
                📓 My Food Journal{" "}
                {entry.myRating
                  ? <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Visited ✓</span>
                  : <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Not yet visited</span>}
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">My Rating</label>
                  <StarInput value={entry.myRating || 0} onChange={(v) => updateJournal(r.id, "myRating", v)} size="w-8 h-8" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Visit Date</label>
                  <input type="date" value={date}
                    onChange={(e) => { setDate(e.target.value); updateJournal(r.id, "visitDate", e.target.value); }}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-amber-400 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Dishes I Liked</label>
                  <input type="text" value={dishes}
                    onChange={(e) => setDishes(e.target.value)}
                    onBlur={() => updateJournal(r.id, "favDishes", dishes)}
                    placeholder="e.g. Otoro, Kohada, Tamago..."
                    className="text-sm border border-gray-200 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-amber-400 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">My Notes</label>
                  <textarea value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onBlur={() => updateJournal(r.id, "comment", comment)}
                    placeholder="How was the experience? What stood out? Would you go back?..."
                    rows={3}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-amber-400 focus:outline-none resize-none" />
                </div>
              </div>
            </div>

            <a href={r.tabelog} target="_blank" rel="noopener noreferrer"
              className="block text-center text-sm text-amber-600 hover:text-amber-800 font-medium py-2">
              View on Tabelog →
            </a>
          </div>
        </div>
      </div>
    );
  };

  // ── Loading state ─────────────────────────────────────────────────────────
  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-400">Loading restaurants…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-black tracking-tight">🍱 72's Food Guide in Japan</h1>
              <p className="text-xs text-gray-400 mt-0.5">
                Curated from Tabelog · Michelin · World's 50 Best · Asia's 50 Best · {restaurants.length} restaurants ranked
                {usingSupabase && <span className="ml-2 bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded text-xs">live data</span>}
              </p>
            </div>
            <div className="flex gap-2 text-xs flex-shrink-0">
              <div className="bg-green-500/20 text-green-300 px-2.5 py-1 rounded-lg">{visitedCount} visited</div>
              <div className="bg-red-500/20 text-red-300 px-2.5 py-1 rounded-lg">{mustTryCount} must-try</div>
            </div>
          </div>

          {/* View tabs */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {[["ranked","📊 Ranked"],["musttry","❤️ Must-Try"],["visited","✅ Visited"],["hotel","🏨 Hotel List"]].map(([v, label]) => (
              <button key={v} onClick={() => setView(v)}
                className={`text-sm px-3 py-1.5 rounded-lg font-medium transition-all ${view === v ? "bg-white text-gray-900 shadow" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}>
                {label}
                {v === "musttry" && mustTryCount > 0 && <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5">{mustTryCount}</span>}
                {v === "visited" && visitedCount > 0 && <span className="ml-1 bg-green-500 text-white text-xs rounded-full px-1.5">{visitedCount}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Hotel List Tab */}
        {view === "hotel" && <HotelList />}

        {/* Main ranked/musttry/visited content */}
        {view !== "hotel" && <><div className="flex flex-wrap gap-2 mb-4">
          <div className="flex-1 min-w-[200px]">
            <input type="text" placeholder="Search restaurants or cuisine…" value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:outline-none bg-white" />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {CITIES.map((c) => (
              <button key={c} onClick={() => setCity(c)}
                className={`text-xs px-3 py-2 rounded-lg font-medium transition-all ${city === c ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {["All","S","A","A-","B+","B"].map((t) => (
              <button key={t} onClick={() => setTierFilter(t)}
                className={`text-xs px-2.5 py-2 rounded-lg font-medium transition-all ${tierFilter === t ? "bg-amber-500 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-amber-50"}`}>
                {t === "All" ? "All Tiers" : t}
              </button>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        {view === "ranked" && (
          <div className="bg-white rounded-xl border border-gray-200 p-3 mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-gray-600">Tasting Progress</span>
              <span className="text-xs text-gray-400">{visitedCount}/{restaurants.length} restaurants</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full transition-all"
                style={{ width: `${(visitedCount / restaurants.length) * 100}%` }} />
            </div>
          </div>
        )}

        {/* List */}
        <div className="space-y-2">
          {filtered.map((r) => {
            const entry = journal[r.id] || {};
            return (
              <div key={r.id} onClick={() => setSelected(r)}
                className={`rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md group ${TIERS[r.tier]} ${entry.myRating ? "ring-2 ring-green-300" : ""}`}>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 text-center">
                    <div className="text-lg font-black text-gray-400">#{r.rank}</div>
                    <TierBadge tier={r.tier} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <h3 className="font-bold text-gray-900 group-hover:text-amber-700 transition-colors">{r.name}</h3>
                      {mustTry[r.id] && <span className="text-red-500 text-sm">❤️</span>}
                      {entry.myRating > 0 && <span className="text-green-500 text-sm">✅</span>}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1 flex-wrap">
                      <CityDot city={r.city} /><span>{r.city}</span>
                      <span>·</span><span>{r.cuisine}</span>
                      <span>·</span><span>{r.area}</span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-1">{r.signatureDish || r.signature_dish}</p>
                    {entry.myRating > 0 && (
                      <div className="mt-2 flex items-center gap-3 flex-wrap">
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map((i) => (
                            <svg key={i} className={`w-3.5 h-3.5 ${i <= entry.myRating ? "text-amber-400" : "text-gray-200"}`} viewBox="0 0 20 20">
                              <path fill="currentColor" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                        {entry.favDishes && <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Liked: {entry.favDishes}</span>}
                        {entry.visitDate && <span className="text-xs text-gray-400">{entry.visitDate}</span>}
                      </div>
                    )}
                    {entry.comment && <p className="text-xs text-gray-500 mt-1 italic line-clamp-1">"{entry.comment}"</p>}
                    {/* Tabelog link */}
                    <a href={r.tabelog} target="_blank" rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 mt-2 text-xs text-amber-600 hover:text-amber-800 font-medium bg-amber-50 hover:bg-amber-100 px-2 py-1 rounded-lg transition-colors">
                      📋 Book on Tabelog
                    </a>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-lg font-black text-amber-600">{r.rating}</div>
                    <div className="text-xs text-gray-400">{Number(r.reviews).toLocaleString()}</div>
                    <div className="flex gap-1 mt-1 justify-end flex-wrap">
                      {r.michelin && r.michelin !== "—" && <span className="text-xs bg-red-600 text-white px-1.5 py-0.5 rounded font-bold">{r.michelin}</span>}
                      {r.global && r.global !== "—" && <span className="text-xs bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded">50 Best</span>}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{r.price?.split("~")[0]}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <span className="text-5xl block mb-3">
              {view === "musttry" ? "❤️" : view === "visited" ? "✅" : "🍽️"}
            </span>
            <h3 className="text-lg font-bold text-gray-600 mb-1">
              {view === "musttry" ? "No must-try restaurants yet"
               : view === "visited" ? "No visited restaurants yet"
               : "No results found"}
            </h3>
            <p className="text-sm text-gray-400">
              {view === "musttry" ? "Tap the heart on any restaurant to add it"
               : view === "visited" ? "Rate a restaurant to mark it as visited"
               : "Try different filters"}
            </p>
          </div>
        )}

        <div className="text-center py-6 text-xs text-gray-400 space-y-1">
          <p>Rankings by Claude · Tabelog · Michelin Guide 2026 · World's 50 Best 2025 · Asia's 50 Best 2025</p>
          <p>Your journal is saved locally and persists across sessions 💾</p>
        </div>
        </>}
      </div>

      {selected && <DetailModal r={selected} />}
    </div>
  );
}
