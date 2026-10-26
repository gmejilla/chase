const cards = {
  reserve: {
    name: "Chase Sapphire Reserve",
    short: "Sapphire Reserve",
    className: "card-reserve",
    note: "Premium travel, travel protections, direct flights/hotels and Chase Travel."
  },
  preferred: {
    name: "Chase Sapphire Preferred",
    short: "Sapphire Preferred",
    className: "card-preferred",
    note: "Gas, streaming, online grocery and selected travel categories."
  },
  flex: {
    name: "Chase Freedom Flex",
    short: "Freedom Flex",
    className: "card-flex",
    note: "Q4 2026: grocery stores, dining and Red Cross after activation."
  },
  unlimited: {
    name: "Chase Freedom Unlimited",
    short: "Freedom Unlimited",
    className: "card-unlimited",
    note: "3% drugstores and a 1.5% catch-all rate for non-bonus purchases."
  }
};

const rules = [
  { id:"flights", icon:"✈️", title:"Flights", aliases:["flight","flights","airline","airfare","american airlines","aa","united airlines","delta","jetblue","southwest"], winner:"reserve", reward:"4x points", why:"Best for flights booked directly with the airline.", alternative:"Use Reserve through Chase Travel for 8x when portal pricing works for you." },
  { id:"hotels", icon:"🏨", title:"Hotels", aliases:["hotel","hotels","marriott","hilton","hyatt","ihg","intercontinental","holiday inn","omni","virgin hotel","pendry","montage"], winner:"reserve", reward:"4x points", why:"Best for hotels booked directly with the hotel.", alternative:"Eligible Chase Travel hotel credits can make Reserve significantly better." },
  { id:"chase-travel", icon:"🧳", title:"Chase Travel", aliases:["chase travel","travel portal","chase portal"], winner:"reserve", reward:"8x points", why:"Reserve earns 8x on Chase Travel bookings.", alternative:"Also the card tied to your $300 travel credit and eligible hotel credits." },
  { id:"rental-cars", icon:"🚙", title:"Rental Cars", aliases:["rental car","rental cars","hertz","avis","budget","enterprise","national","alamo","sixt"], winner:"reserve", reward:"8x via Chase Travel", why:"Reserve earns 8x when the rental car is booked through Chase Travel.", alternative:"For a direct rental-car booking, Preferred earns 2x on general travel; Reserve may still be preferable when its travel protections matter more to you." },
  { id:"dining", icon:"🍽️", title:"Restaurants / Dining", aliases:["restaurant","restaurants","dining","takeout","food delivery","mcdonalds","mcdonald's","chipotle","starbucks","wendys","wendy's","burger king","doordash","ubereats","uber eats","grubhub"], winner:"flex", reward:"7% total", why:"Q4 2026 dining stacks the Flex quarterly bonus with its normal dining earnings.", alternative:"Reserve and Preferred earn 3x dining outside the Q4 Flex bonus cap." },
  { id:"grocery", icon:"🛒", title:"Grocery Stores", aliases:["grocery","groceries","supermarket","wegmans","shoprite","shop rite","acme","aldi","lidl","trader joes","trader joe's","whole foods","sprouts"], winner:"flex", reward:"5%", why:"Q4 2026 Freedom Flex grocery bonus after activation.", alternative:"Walmart, Target, warehouse clubs and some mixed merchants are excluded." },
  { id:"red-cross", icon:"♥", title:"American Red Cross", aliases:["red cross","american red cross","donation","charity donation"], winner:"flex", reward:"5%", why:"Q4 2026 rotating category for eligible American Red Cross donations.", alternative:"Counts toward the same $1,500 combined Q4 bonus cap." },
  { id:"drugstores", icon:"💊", title:"Drugstores", aliases:["drugstore","drugstores","pharmacy","cvs","walgreens","rite aid"], winner:"unlimited", reward:"3%", why:"Freedom Unlimited earns 3% at drugstores.", alternative:"Freedom Flex also earns 3% at drugstores; Unlimited is the default pick here." },
  { id:"gas", icon:"⛽", title:"Gas Stations", aliases:["gas","gas station","gas stations","fuel","shell","exxon","mobil","sunoco","wawa gas","bp","chevron","ev charging","electric vehicle charging"], winner:"preferred", reward:"3x points", why:"Preferred earns 3x at gas stations and EV charging.", alternative:"Freedom Unlimited earns 1.5% if the purchase does not code as gas." },
  { id:"streaming", icon:"▶️", title:"Streaming Services", aliases:["streaming","youtube tv","youtube","netflix","hulu","disney plus","disney+","max","hbo max","paramount plus","paramount+","peacock","spotify","apple music","apple tv","apple tv+"], winner:"preferred", reward:"3x points", why:"Preferred earns 3x on eligible streaming services.", alternative:"Freedom Flex has Top Streaming Services as a Q1 2027 rotating category after activation." },
  { id:"online-grocery", icon:"🛍️", title:"Online Grocery", aliases:["online grocery","instacart","grocery delivery","freshdirect"], winner:"preferred", reward:"3x points", why:"Preferred earns 3x on eligible online grocery purchases.", alternative:"Target, Walmart and wholesale clubs are generally excluded from Preferred online grocery." },
  { id:"vacation-home", icon:"🏠", title:"Vacation Homes", aliases:["airbnb","vrbo","vacation home","vacation rental"], winner:"preferred", reward:"3x points", why:"Preferred earns 3x on vacation homes at eligible top brands such as Airbnb and Vrbo.", alternative:"Use Reserve for traditional direct hotel bookings at 4x." },
  { id:"lyft", icon:"🚕", title:"Lyft", aliases:["lyft","rideshare","ride share"], winner:"reserve", reward:"5x + $10 credit", why:"Reserve earns 5x total points on Lyft and includes a monthly in-app credit through 9/30/2027.", alternative:"Use the monthly credit before it expires." },
  { id:"peloton", icon:"🏋️", title:"Peloton", aliases:["peloton","peloton bike","peloton tread","peloton equipment"], winner:"preferred", reward:"5x points", why:"Preferred earns 5x on qualifying Peloton equipment purchases over $150 through 12/31/2027.", alternative:"Reserve has separate Peloton membership credits and elevated hardware earnings in current terms." },
  { id:"target", icon:"🎯", title:"Target", aliases:["target"], winner:"unlimited", reward:"1.5%", why:"Target is excluded from the Q4 Flex grocery category, making Freedom Unlimited the best default catch-all.", alternative:"A targeted Chase Offer can override this recommendation." },
  { id:"walmart", icon:"🛒", title:"Walmart", aliases:["walmart","walmart.com"], winner:"unlimited", reward:"1.5%", why:"Walmart is excluded from the Q4 Flex grocery category, so Freedom Unlimited is the best default.", alternative:"Check Chase Offers before large purchases." },
  { id:"costco", icon:"🏬", title:"Costco / Wholesale Clubs", aliases:["costco","sams club","sam's club","bjs","bj's","wholesale club","warehouse club"], winner:"unlimited", reward:"1.5%", why:"Wholesale clubs are not part of the Q4 Flex grocery bonus; Freedom Unlimited is your catch-all choice.", alternative:"Merchant acceptance and network rules still apply at the register." },
  { id:"amazon", icon:"📦", title:"Amazon / Online Shopping", aliases:["amazon","amazon.com","online shopping","shopping","electronics","clothing","home improvement","home depot","lowes","lowe's","best buy","apple store"], winner:"unlimited", reward:"1.5%", why:"No Q4 2026 bonus among your cards beats Freedom Unlimited for ordinary non-category shopping.", alternative:"Check Chase Offers and merchant-specific promos before large purchases." },
  { id:"general", icon:"🏷️", title:"All Other Purchases", aliases:["other","general","everything else","misc","miscellaneous","everyday purchase","non bonus"], winner:"unlimited", reward:"1.5%", why:"Freedom Unlimited gives you the highest baseline return on purchases that do not fit another bonus category.", alternative:"Avoid putting ordinary 1x purchases on Reserve, Preferred or Flex when Unlimited earns 1.5%." }
];

const quickSearches = ["Target","Costco","CVS","Restaurants","Groceries","Gas","Streaming","Hotels"];

function cardVisual(cardKey) {
  const c = cards[cardKey];
  return `<div class="mini-card ${c.className}"><span class="brand">CHASE</span><span class="card-name">${c.short.toUpperCase()}</span></div>`;
}

function normalize(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9+&' .-]/g, "");
}

function scoreRule(rule, query) {
  const q = normalize(query);
  if (!q) return 0;
  let score = 0;
  for (const alias of rule.aliases) {
    const a = normalize(alias);
    if (q === a) score = Math.max(score, 100);
    else if (a.startsWith(q)) score = Math.max(score, 80);
    else if (a.includes(q)) score = Math.max(score, 65);
    else if (q.includes(a)) score = Math.max(score, 60);
  }
  if (normalize(rule.title).includes(q)) score = Math.max(score, 70);
  return score;
}

function findBest(query) {
  const ranked = rules.map(rule => ({ rule, score: scoreRule(rule, query) })).sort((a,b)=>b.score-a.score);
  return ranked[0].score > 0 ? ranked[0].rule : rules.find(r=>r.id === "general");
}

function renderResult(rule, queryLabel) {
  const c = cards[rule.winner];
  const el = document.getElementById("recommendation");
  el.innerHTML = `
    <div class="result-card">
      <div class="result-kicker">Best card for</div>
      <h2 class="result-title">${queryLabel || rule.title}</h2>
      <p class="result-subtitle">Matched to ${rule.title}</p>
      <div class="result-winner">
        ${cardVisual(rule.winner)}
        <div><div class="winner-name">${c.short}</div><div class="winner-why">${rule.why}</div></div>
        <div class="reward-badge">${rule.reward}<small>best current rate</small></div>
      </div>
      <div class="alt-row"><span>Tip</span><span>${rule.alternative}</span></div>
    </div>`;
  el.classList.remove("hidden");
  el.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function renderCategories() {
  const featuredIds = ["flights","hotels","chase-travel","dining","grocery","drugstores","gas","streaming","online-grocery","lyft","target","general"];
  const list = document.getElementById("categoryList");
  list.innerHTML = featuredIds.map(id => {
    const r = rules.find(x=>x.id===id); const c=cards[r.winner];
    return `<div class="category-row" data-rule="${id}" tabindex="0" role="button">
      <div class="cat-icon">${r.icon}</div>
      <div><div class="cat-title">${r.title}</div><div class="cat-note">${c.short}</div></div>
      <div class="cat-reward"><strong>${r.reward}</strong><span>best card</span></div>
    </div>`;
  }).join("");
}

function renderCards() {
  const grid = document.getElementById("cardsGrid");
  grid.innerHTML = Object.entries(cards).map(([key,c]) => `
    <div class="card-tile" data-card="${key}">
      ${cardVisual(key)}
      <div class="card-tile-name">${c.short}</div>
      <div class="card-tile-note">${c.note}</div>
    </div>`).join("");
}

function renderChips() {
  const chips = document.getElementById("quickChips");
  chips.innerHTML = quickSearches.map(x=>`<button class="chip" data-query="${x}">${x}</button>`).join("");
}

function showCardWinners(cardKey) {
  const wins = rules.filter(r=>r.winner===cardKey).slice(0,6);
  const c=cards[cardKey];
  const el=document.getElementById("recommendation");
  el.innerHTML=`<div class="result-card"><div class="result-kicker">Where this card wins</div><h2 class="result-title">${c.short}</h2><p class="result-subtitle">${c.note}</p>${wins.map(r=>`<div class="alt-row"><span>${r.icon} ${r.title}</span><strong>${r.reward}</strong></div>`).join("")}</div>`;
  el.classList.remove("hidden");
  el.scrollIntoView({behavior:"smooth",block:"nearest"});
}

const searchInput=document.getElementById("searchInput");
const clearSearch=document.getElementById("clearSearch");
searchInput.addEventListener("input", e=>{
  clearSearch.style.display=e.target.value ? "block" : "none";
  if (e.target.value.length >= 2) renderResult(findBest(e.target.value), e.target.value);
  if (!e.target.value) document.getElementById("recommendation").classList.add("hidden");
});
searchInput.addEventListener("search", ()=>{ if(!searchInput.value) document.getElementById("recommendation").classList.add("hidden"); });
clearSearch.addEventListener("click",()=>{ searchInput.value=""; clearSearch.style.display="none"; document.getElementById("recommendation").classList.add("hidden"); searchInput.focus(); });

document.addEventListener("click", e=>{
  const chip=e.target.closest("[data-query]");
  if(chip){ searchInput.value=chip.dataset.query; clearSearch.style.display="block"; renderResult(findBest(chip.dataset.query), chip.dataset.query); }
  const row=e.target.closest("[data-rule]");
  if(row){ const rule=rules.find(r=>r.id===row.dataset.rule); renderResult(rule,rule.title); }
  const tile=e.target.closest("[data-card]");
  if(tile) showCardWinners(tile.dataset.card);
});

document.addEventListener("keydown",e=>{
  const row=e.target.closest?.("[data-rule]");
  if(row && (e.key==="Enter" || e.key===" ")){ e.preventDefault(); const rule=rules.find(r=>r.id===row.dataset.rule); renderResult(rule,rule.title); }
});

const infoDialog=document.getElementById("infoDialog");
document.getElementById("infoBtn").addEventListener("click",()=>infoDialog.showModal());
document.getElementById("closeDialog").addEventListener("click",()=>infoDialog.close());

renderChips(); renderCategories(); renderCards();

if ("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
