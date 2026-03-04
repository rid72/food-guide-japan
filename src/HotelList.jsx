// Hotel List Tab — Shangri-La Tokyo recommended restaurants
// Ranked by: Tabelog score + Michelin + App presence

const HOTEL_LIST = [
  // ─── In App ──────────────────────────────────────────────────────────────
  {
    name: "Kyubey Ginza 久兵衛 銀座",
    type: "Sushi",
    style: "À la carte & Omakase",
    distance: "10–15 min by car",
    tabelog: 4.08,
    tabelogUrl: "https://tabelog.com/en/tokyo/A1301/A130101/13002070/",
    michelin: "1★",
    inApp: { rank: 23, tier: "B+" },
    website: "http://www.kyubey.jp/en",
    note: "Since 1935. Most accessible high-quality Ginza sushi. English menu.",
  },
  // ─── Not in App — Highly Recommended ────────────────────────────────────
  {
    name: "Kaiseki Okuda 奥田",
    type: "Japanese Kaiseki",
    style: "Omakase (Course)",
    distance: "10–15 min by car",
    tabelog: 4.10,
    tabelogUrl: "https://tabelog.com/en/tokyo/A1301/A130101/13098930/",
    michelin: "1★",
    inApp: null,
    website: "https://www.ginzaokuda.com/en/homepage-e/",
    note: "Seasonal Ginza kaiseki. Menu emphasizes textures without affectation. Very refined.",
  },
  {
    name: "Kikunoi 菊乃井 Akasaka",
    type: "Japanese Kaiseki",
    style: "Omakase (Course)",
    distance: "15–20 min by car",
    tabelog: 3.87,
    tabelogUrl: "https://tabelog.com/en/tokyo/A1308/A130801/13008401/",
    michelin: "2★",
    inApp: null,
    website: "https://kikunoi.jp/en/",
    note: "Kyoto's most iconic kaiseki brand. Deep ryotei roots. Bamboo-lined entrance.",
  },
  {
    name: "Sushi Masashi 鮨 将司",
    type: "Sushi",
    style: "Omakase",
    distance: "25 min by car",
    tabelog: 3.90,
    tabelogUrl: "https://tabelog.com/en/tokyo/A1306/A130601/13253804/",
    michelin: "1★",
    inApp: null,
    website: "https://sushimasashi.tokyo/",
    note: "Founded 2020 by Chef Masashi Yamaguchi. Refined Edomae-style. Exceptional hospitality.",
  },
  {
    name: "Oshima 大嶋",
    type: "Japanese Cuisine",
    style: "Omakase (Course)",
    distance: "20 min by car",
    tabelog: 4.00,
    tabelogUrl: "https://tabelog.com/en/tokyo/A1307/A130702/13041285/",
    michelin: null,
    inApp: null,
    website: "https://www.nishiazabu-oshima.com/",
    note: "Hidden counter in Nishiazabu. Intimate hideaway. Genuine Japanese cuisine at its purest.",
  },
  {
    name: "Sushi Sugawara 鮨 すがわら",
    type: "Sushi",
    style: "Omakase",
    distance: "10–15 min by car",
    tabelog: 3.82,
    tabelogUrl: "https://www.sushi-sugawara.com/",
    michelin: null,
    inApp: null,
    website: "https://www.sushi-sugawara.com/",
    note: "Freshest seasonal seafood from Toyosu every morning. Classical wooden interior.",
  },
  {
    name: "Tempura Onodera 天ぷら おのでら",
    type: "Tempura",
    style: "Course menu",
    distance: "10–15 min by car",
    tabelog: 3.85,
    tabelogUrl: "https://onodera-group.com/tempura-ginza/",
    michelin: null,
    inApp: null,
    website: "https://onodera-group.com/tempura-ginza/",
    note: "Tradition meets innovation. Refined techniques from the acclaimed Onodera Group.",
  },
  {
    name: "Bifteck Kawamura ビフテキのカワムラ",
    type: "Teppanyaki / Kobe Beef",
    style: "À la carte & Course",
    distance: "15 min by car",
    tabelog: 3.85,
    tabelogUrl: "https://www.bifteck.co.jp/en/",
    michelin: null,
    inApp: null,
    website: "https://www.bifteck.co.jp/en/",
    note: "A5 Kobe Beef prepared in front of you with advanced technique. Ultimate luxury beef.",
  },
  {
    name: "Sushi Kadowaki 鮨 門わき",
    type: "Sushi",
    style: "Omakase",
    distance: "10–15 min by car",
    tabelog: 3.63,
    tabelogUrl: "https://tabelog.com/en/tokyo/A1301/A130101/13266129/",
    michelin: null,
    inApp: null,
    website: "https://sushi-kadowaki.jp/eng/",
    note: "Shows each step of sushi creation. An exquisite 5-sense dining experience.",
  },
  {
    name: "Tenmasa 天政",
    type: "Tempura",
    style: "Course menu",
    distance: "10 min by walk",
    tabelog: 3.75,
    tabelogUrl: "https://ten-masa.jp/english",
    michelin: null,
    inApp: null,
    website: "https://ten-masa.jp/english",
    note: "Counter tempura with live cooking. Seasonal ingredients. Closest high-quality option.",
  },
  {
    name: "Honten Yamashina 本店山科",
    type: "Teppanyaki / Wagyu",
    style: "Course menu",
    distance: "15 min by car",
    tabelog: 3.75,
    tabelogUrl: "https://honten-yamashina.jp/",
    michelin: null,
    inApp: null,
    website: "https://honten-yamashina.jp/",
    note: "Omi beef aged 40+ months at Okazaki Farm. 'One of Japan's best Wagyu.'",
  },
  {
    name: "Ten Ichi Honten 天一本店",
    type: "Tempura",
    style: "À la carte & Course",
    distance: "10–15 min by car",
    tabelog: 3.72,
    tabelogUrl: "https://tabelog.com/en/tokyo/A1301/A130101/13001070/",
    michelin: null,
    inApp: null,
    website: "https://tenichi.co.jp/mainshop/",
    note: "World's most famous tempura since 1930. Guests include Clinton, Chirac, Sinatra.",
  },
  {
    name: "Seryna Ginza 瀬里奈 銀座",
    type: "Shabu-shabu / Wagyu",
    style: "À la carte & Course",
    distance: "15 min by car",
    tabelog: 3.70,
    tabelogUrl: "http://www.seryna.co.jp/en/seryna/ginza/",
    michelin: null,
    inApp: null,
    website: "http://www.seryna.co.jp/en/seryna/ginza/",
    note: "Luxurious escape from the city. Peerless quality wagyu in an opulent setting.",
  },
  {
    name: "Zakuro Muromachi ざくろ室町",
    type: "Shabu-shabu / Sukiyaki",
    style: "À la carte & Course",
    distance: "5 min by car",
    tabelog: 3.65,
    tabelogUrl: "https://www.zakuro.co.jp/restaurant/muromachi/index.html",
    michelin: null,
    inApp: null,
    website: "https://www.zakuro.co.jp/restaurant/muromachi/index.html",
    note: "Est. 1955. First restaurant in Tokyo to serve shabu-shabu. Historic with unique sesame sauce.",
  },
  {
    name: "Rangetsu らん月",
    type: "Shabu-shabu / Sukiyaki",
    style: "À la carte & Course",
    distance: "15 min by car",
    tabelog: 3.65,
    tabelogUrl: "https://www.ginza-rangetsu.com/",
    michelin: null,
    inApp: null,
    website: "https://www.ginza-rangetsu.com/",
    note: "77 years of tradition. Seasonal ingredients, specialty items, sincere hospitality.",
  },
  {
    name: "Sushi Ko Honten 寿司幸本店丸ビル",
    type: "Sushi",
    style: "À la carte & Omakase",
    distance: "10 min by walk",
    tabelog: 3.65,
    tabelogUrl: "http://sushikou-marubiru.com/",
    michelin: null,
    inApp: null,
    website: "http://sushikou-marubiru.com/",
    note: "Edo-style sushi. Finest ingredients with wine pairing. Level 35F, Marunouchi Building.",
  },
  {
    name: "Yanone Sushi 矢野根寿司",
    type: "Sushi",
    style: "À la carte & Omakase",
    distance: "15 min by walk",
    tabelog: 3.63,
    tabelogUrl: "https://yanone.co.jp/",
    michelin: null,
    inApp: null,
    website: "https://yanone.co.jp/",
    note: "Est. 1952 in Nihonbashi. Refined dining, fresh seafood, serene and elegant setting.",
  },
  {
    name: "Teppanyaki AN 鉄板焼 AN – XEX",
    type: "Teppanyaki",
    style: "À la carte & Course",
    distance: "5 min by walk",
    tabelog: 3.55,
    tabelogUrl: "https://www.xexgroup.jp/en/tokyo",
    michelin: null,
    inApp: null,
    website: "https://www.xexgroup.jp/en/tokyo",
    note: "Top floor of Daimaru building. Great view while watching the chef cook in front of you.",
  },
  // ─── Hotel Restaurants ───────────────────────────────────────────────────
  {
    name: "Nadaman ナダマン",
    type: "Japanese Kaiseki",
    style: "À la carte / Teppanyaki / Sushi",
    distance: "In Hotel (Level 28)",
    tabelog: 3.70,
    tabelogUrl: "https://www.shangri-la.com/tokyo/shangrila/dining/restaurants/nadaman/",
    michelin: null,
    inApp: null,
    website: "https://www.shangri-la.com/tokyo/shangrila/dining/restaurants/nadaman/",
    note: "Serving royalty & world leaders since 1830. Kaiseki, teppanyaki, sushi under one roof.",
  },
  {
    name: "Piacere – Italian",
    type: "Italian",
    style: "À la carte",
    distance: "In Hotel (Level 29)",
    tabelog: 3.50,
    tabelogUrl: "https://www.shangri-la.com/tokyo/shangrila/dining/restaurants/piacere/",
    michelin: null,
    inApp: null,
    website: "https://www.shangri-la.com/tokyo/shangrila/dining/restaurants/piacere/",
    note: "Contemporary Italian. Farm-to-table with local farmers. Lunch & dinner.",
  },
  {
    name: "The Lobby Lounge",
    type: "All-day Dining & Bar",
    style: "Light bites / Afternoon tea",
    distance: "In Hotel (Level 28)",
    tabelog: null,
    tabelogUrl: "https://www.shangri-la.com/tokyo/shangrila/dining/bars-lounges/lobby-lounge/",
    michelin: null,
    inApp: null,
    website: "https://www.shangri-la.com/tokyo/shangrila/dining/bars-lounges/lobby-lounge/",
    note: "Signature afternoon tea, fine teas, Asian bites. Bar until 23:00.",
  },
];

const TierBadge = ({ tier }) => (
  <span className={`text-xs px-2 py-0.5 rounded font-black ${
    tier === "S" ? "bg-amber-400 text-amber-900"
    : tier === "A" ? "bg-blue-500 text-white"
    : tier === "A-" ? "bg-purple-500 text-white"
    : tier === "B+" ? "bg-green-500 text-white"
    : "bg-stone-500 text-white"
  }`}>{tier}</span>
);

export default function HotelList() {
  return (
    <div className="space-y-2">
      {/* Header note */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-4">
        <p className="text-sm font-bold text-indigo-900">🏨 Shangri-La Tokyo — Hotel Recommended List</p>
        <p className="text-xs text-indigo-700 mt-1">
          Ranked by Tabelog score + Michelin stars. "In App" = featured in the main 72's ranking.
        </p>
      </div>

      {HOTEL_LIST.map((r, i) => (
        <div key={r.name}
          className={`rounded-xl border p-4 transition-all hover:shadow-md ${
            r.inApp
              ? "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200"
              : r.distance.includes("Hotel")
              ? "bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200"
              : "bg-white border-gray-200"
          }`}>
          <div className="flex items-start gap-3">
            {/* Rank number */}
            <div className="flex-shrink-0 w-8 text-center">
              <span className="text-sm font-black text-gray-400">#{i + 1}</span>
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <h3 className="font-bold text-gray-900 text-sm leading-snug">{r.name}</h3>
                {r.inApp && (
                  <span className="text-xs bg-amber-400 text-amber-900 px-2 py-0.5 rounded font-black">
                    ★ In App #{r.inApp.rank}
                  </span>
                )}
                <TierBadge tier={r.inApp?.tier || ""} />
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap mb-1">
                <span className="font-medium text-gray-700">{r.type}</span>
                <span>·</span>
                <span>{r.style}</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap mb-2">
                <span>📍 {r.distance}</span>
                {r.michelin && (
                  <span className="bg-red-600 text-white text-xs px-1.5 py-0.5 rounded font-bold">
                    Michelin {r.michelin}
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-600 italic">{r.note}</p>

              <div className="flex gap-3 mt-2">
                <a href={r.tabelogUrl} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-amber-600 hover:text-amber-800 font-medium">
                  Tabelog →
                </a>
                <a href={r.website} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-gray-500 hover:text-gray-700">
                  Website →
                </a>
              </div>
            </div>

            {/* Rating */}
            <div className="flex-shrink-0 text-right">
              {r.tabelog ? (
                <>
                  <div className="text-lg font-black text-amber-600">{r.tabelog}</div>
                  <div className="text-xs text-gray-400">Tabelog</div>
                </>
              ) : (
                <div className="text-xs text-gray-400">—</div>
              )}
              {r.distance.includes("Hotel") && (
                <div className="text-xs bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded mt-1">
                  In Hotel
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <p className="text-center text-xs text-gray-400 py-4">
        Tabelog scores: verified where possible, estimated otherwise. Check Tabelog for current ratings.
      </p>
    </div>
  );
}
