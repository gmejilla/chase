const APP_VERSION = 2;
const STORAGE_KEY = "chase-card-guide-v2";
const today = new Date();
const nowYear = today.getFullYear();

const STUBHUB_ICON = `<img src="./assets/stubhub-logo.png" alt="StubHub" class="brand-mark stubhub-mark">`;

const cards = {
  reserve: { name:"Chase Sapphire Reserve", short:"Sapphire Reserve", className:"card-reserve", note:"Premium travel, travel protections, direct flights/hotels, Chase Travel and high-value credits." },
  preferred: { name:"Chase Sapphire Preferred", short:"Sapphire Preferred", className:"card-preferred", note:"Gas, streaming, online grocery, select travel and a $100 Chase Travel hotel credit." },
  flex: { name:"Chase Freedom Flex", short:"Freedom Flex", className:"card-flex", note:"Q4 2026: grocery stores, dining and American Red Cross after activation." },
  unlimited: { name:"Chase Freedom Unlimited", short:"Freedom Unlimited", className:"card-unlimited", note:"3% drugstores and a 1.5% catch-all rate for non-bonus purchases." }
};

const benefits = [
  { id:"reserve-dd-15", card:"reserve", icon:"🛍️", name:"DoorDash qualifying order", value:15, cadence:"monthly", tracker:"boolean", note:"$15 monthly promo on a qualifying DoorDash order." },
  { id:"reserve-dd-10a", card:"reserve", icon:"🛍️", name:"DoorDash non-restaurant #1", value:10, cadence:"monthly", tracker:"boolean", note:"First $10 monthly non-restaurant DoorDash promo." },
  { id:"reserve-dd-10b", card:"reserve", icon:"🛍️", name:"DoorDash non-restaurant #2", value:10, cadence:"monthly", tracker:"boolean", note:"Second $10 monthly non-restaurant DoorDash promo." },
  { id:"preferred-dd-10", card:"preferred", icon:"🛍️", name:"DoorDash non-restaurant", value:10, cadence:"monthly", tracker:"boolean", note:"$10 monthly non-restaurant DoorDash promo with eligible DashPass." },
  { id:"reserve-edit-1", card:"reserve", icon:"🏨", name:"The Edit credit #1", value:250, cadence:"calendarYear", tracker:"amount", note:"First of two $250 The Edit statement-credit portions for the calendar year. Qualifying prepaid booking; 2-night minimum." },
  { id:"reserve-edit-2", card:"reserve", icon:"🏨", name:"The Edit credit #2", value:250, cadence:"calendarYear", tracker:"amount", note:"Second of two $250 The Edit statement-credit portions for the calendar year. Qualifying prepaid booking; 2-night minimum." },
  { id:"reserve-select-hotels", card:"reserve", icon:"🏨", name:"Select Chase Travel Hotels", value:250, cadence:"fixed", tracker:"amount", start:"2026-01-01", end:"2026-12-31", note:"2026 only. Prepaid 2+ night stays at eligible brands including IHG, Montage, Pendry, Omni, Virgin, Minor and Pan Pacific." },
  { id:"reserve-travel", card:"reserve", icon:"✈️", name:"$300 annual travel credit", value:300, cadence:"anniversary", tracker:"amount", resetSetting:"reserveResetDate", note:"Automatic statement credits on eligible travel purchases. Resets each account anniversary year." },
  { id:"reserve-stubhub", card:"reserve", icon:STUBHUB_ICON, name:"StubHub / viagogo credit", value:150, cadence:"halfYear", tracker:"amount", note:"Up to $150 in statement credits Jan–Jun and another $150 Jul–Dec, for up to $300 annually. Activation required. Available through Dec. 31, 2027." },
  { id:"preferred-hotel", card:"preferred", icon:"🏨", name:"$100 Chase Travel hotel credit", value:100, cadence:"anniversary", tracker:"amount", resetSetting:"preferredResetDate", note:"Up to $100 each account anniversary year on eligible hotel stays purchased through Chase Travel." },
  { id:"reserve-ttp", card:"reserve", icon:"🛂", name:"Global Entry / TSA PreCheck / NEXUS", value:120, cadence:"interval", tracker:"date", years:4, note:"Up to $120 for one eligible application fee every 4 years." },
  { id:"preferred-ttp", card:"preferred", icon:"🛂", name:"Global Entry / TSA PreCheck / NEXUS", value:120, cadence:"interval", tracker:"date", years:4, note:"Up to $120 for one eligible application fee every 4 years." },
  { id:"targeted-chase-travel-100", card:"reserve", icon:"🎯", name:"Targeted $100 Chase Travel Offer", value:100, cadence:"targeted", tracker:"boolean", start:"2026-07-01", endSetting:"targetOfferEnd", enabledSetting:"targetOfferEnabled", note:"Targeted Chase Offer: activate first, then spend $600+ in one eligible Chase Travel transaction. The public example offer expired Sep 30, 2026. This tracker defaults to Dec 31, 2026 based on your account-specific terms; edit the date in Settings if needed." }
];

const rules = [
  { id:"doordash", icon:"🛍️", title:"DoorDash", aliases:["doordash","door dash"], winner:"reserve", reward:"Use credits first", why:"Unused monthly DoorDash credits can beat the normal points return.", alternative:"After credits are used, Q4 restaurant orders can favor Freedom Flex at 7% total.", benefitIds:["reserve-dd-15","reserve-dd-10a","reserve-dd-10b","preferred-dd-10"] },
  { id:"stubhub", icon:STUBHUB_ICON, title:"StubHub / viagogo", aliases:["stubhub","stub hub","viagogo","tickets","event tickets","concert tickets"], winner:"reserve", reward:"Up to $150 credit", why:"Reserve provides up to $150 in StubHub/viagogo statement credits each half-year after activation.", alternative:"The benefit resets Jan 1 and Jul 1, for up to $300 per calendar year.", benefitIds:["reserve-stubhub"] },
  { id:"flights", icon:"✈️", title:"Flights", aliases:["flight","flights","airline","airfare","american airlines","aa","united airlines","delta","jetblue","southwest"], winner:"reserve", reward:"4x points", why:"Best for flights booked directly with the airline.", alternative:"Use Reserve through Chase Travel for 8x when portal pricing works for you.", benefitIds:["reserve-travel","targeted-chase-travel-100"] },
  { id:"ihg", icon:"🏨", title:"IHG / Select Hotels", aliases:["ihg","intercontinental","holiday inn","kimpton","crowne plaza","montage","pendry","omni","virgin hotel","minor hotel","pan pacific"], winner:"reserve", reward:"Up to $250 credit", why:"Eligible prepaid 2+ night Chase Travel stays can use the 2026 Select Chase Travel Hotels credit.", alternative:"If the property is also in The Edit, additional Reserve hotel value may apply.", benefitIds:["reserve-select-hotels","reserve-edit-1","reserve-edit-2","reserve-travel","targeted-chase-travel-100"] },
  { id:"the-edit", icon:"👑", title:"The Edit", aliases:["the edit","edit hotel","edit hotels"], winner:"reserve", reward:"Up to $500 credit", why:"Reserve gets up to $500 annually for qualifying prepaid The Edit bookings, max $250 credit per transaction.", alternative:"Eligible stays also include The Edit on-property benefits such as a $100 property credit.", benefitIds:["reserve-edit-1","reserve-edit-2","reserve-travel","targeted-chase-travel-100"] },
  { id:"hotels", icon:"🏨", title:"Hotels", aliases:["hotel","hotels","marriott","hilton","hyatt"], winner:"reserve", reward:"4x points", why:"Best for hotels booked directly with the hotel.", alternative:"Before booking, compare Chase Travel because unused Reserve or Preferred hotel credits can be more valuable than points.", benefitIds:["reserve-edit-1","reserve-edit-2","reserve-select-hotels","reserve-travel","preferred-hotel","targeted-chase-travel-100"] },
  { id:"chase-travel", icon:"🧳", title:"Chase Travel", aliases:["chase travel","travel portal","chase portal"], winner:"reserve", reward:"8x points", why:"Reserve earns 8x on Chase Travel bookings.", alternative:"Unused travel and hotel credits may make the effective return much higher.", benefitIds:["reserve-edit-1","reserve-edit-2","reserve-select-hotels","reserve-travel","preferred-hotel","targeted-chase-travel-100"] },
  { id:"rental-cars", icon:"🚙", title:"Rental Cars", aliases:["rental car","rental cars","hertz","avis","budget","enterprise","national","alamo","sixt"], winner:"reserve", reward:"8x via Chase Travel", why:"Reserve earns 8x when the rental car is booked through Chase Travel.", alternative:"For a direct rental-car booking, Preferred earns 2x on general travel; Reserve may still be preferable when its travel protections matter more.", benefitIds:["reserve-travel","targeted-chase-travel-100"] },
  { id:"dining", icon:"🍽️", title:"Restaurants / Dining", aliases:["restaurant","restaurants","dining","takeout","food delivery","mcdonalds","mcdonald's","chipotle","starbucks","wendys","wendy's","burger king","ubereats","uber eats","grubhub"], winner:"flex", reward:"7% total", why:"Q4 2026 dining stacks the Flex quarterly bonus with its normal dining earnings.", alternative:"Reserve and Preferred earn 3x dining outside the Q4 Flex bonus cap." },
  { id:"grocery", icon:"🛒", title:"Grocery Stores", aliases:["grocery","groceries","supermarket","wegmans","shoprite","shop rite","acme","aldi","lidl","trader joes","trader joe's","whole foods","sprouts"], winner:"flex", reward:"5%", why:"Q4 2026 Freedom Flex grocery bonus after activation.", alternative:"Walmart, Target, warehouse clubs and some mixed merchants are excluded." },
  { id:"red-cross", icon:"♥", title:"American Red Cross", aliases:["red cross","american red cross","donation","charity donation"], winner:"flex", reward:"5%", why:"Q4 2026 rotating category for eligible American Red Cross donations.", alternative:"Counts toward the same $1,500 combined Q4 bonus cap." },
  { id:"drugstores", icon:"💊", title:"Drugstores", aliases:["drugstore","drugstores","pharmacy","cvs","walgreens","rite aid"], winner:"unlimited", reward:"3%", why:"Freedom Unlimited earns 3% at drugstores.", alternative:"Freedom Flex also earns 3% at drugstores; Unlimited is the default pick here." },
  { id:"gas", icon:"⛽", title:"Gas Stations", aliases:["gas","gas station","gas stations","fuel","shell","exxon","mobil","sunoco","wawa gas","bp","chevron","ev charging","electric vehicle charging"], winner:"preferred", reward:"3x points", why:"Preferred earns 3x at gas stations and EV charging.", alternative:"Freedom Unlimited earns 1.5% if the purchase does not code as gas." },
  { id:"streaming", icon:"▶️", title:"Streaming Services", aliases:["streaming","youtube tv","youtube","netflix","hulu","disney plus","disney+","max","hbo max","paramount plus","paramount+","peacock","spotify","apple music","apple tv","apple tv+"], winner:"preferred", reward:"3x points", why:"Preferred earns 3x on eligible streaming services.", alternative:"Freedom Flex has Top Streaming Services as a Q1 2027 rotating category after activation." },
  { id:"online-grocery", icon:"🛍️", title:"Online Grocery", aliases:["online grocery","instacart","grocery delivery","freshdirect"], winner:"preferred", reward:"3x points", why:"Preferred earns 3x on eligible online grocery purchases.", alternative:"Target, Walmart and wholesale clubs are generally excluded from Preferred online grocery." },
  { id:"vacation-home", icon:"🏠", title:"Vacation Homes", aliases:["airbnb","vrbo","vacation home","vacation rental"], winner:"preferred", reward:"3x points", why:"Preferred earns 3x on eligible vacation-home purchases.", alternative:"Use Reserve for traditional direct hotel bookings at 4x." },
  { id:"lyft", icon:"🚕", title:"Lyft", aliases:["lyft","rideshare","ride share"], winner:"reserve", reward:"5x + $10 credit", why:"Reserve earns 5x total points on Lyft and includes a monthly in-app credit through 9/30/2027.", alternative:"Use the monthly credit before it expires." },
  { id:"peloton", icon:"🏋️", title:"Peloton", aliases:["peloton","peloton bike","peloton tread","peloton equipment"], winner:"preferred", reward:"5x points", why:"Preferred earns 5x on qualifying Peloton equipment purchases over $150 through 12/31/2027.", alternative:"Reserve has separate Peloton membership credits in current terms." },
  { id:"global-entry", icon:"🛂", title:"Global Entry / TSA PreCheck / NEXUS", aliases:["global entry","tsa precheck","precheck","nexus","trusted traveler"], winner:"reserve", reward:"Up to $120", why:"Both Sapphire cards include an eligible application-fee credit every 4 years.", alternative:"Check which card's four-year benefit is currently available.", benefitIds:["reserve-ttp","preferred-ttp"] },
  { id:"target", icon:"🎯", title:"Target", aliases:["target"], winner:"unlimited", reward:"1.5%", why:"Target is excluded from the Q4 Flex grocery category, making Freedom Unlimited the best default catch-all.", alternative:"A targeted Chase Offer can override this recommendation." },
  { id:"walmart", icon:"🛒", title:"Walmart", aliases:["walmart","walmart.com"], winner:"unlimited", reward:"1.5%", why:"Walmart is excluded from the Q4 Flex grocery category, so Freedom Unlimited is the best default.", alternative:"Check Chase Offers before large purchases." },
  { id:"costco", icon:"🏬", title:"Costco / Wholesale Clubs", aliases:["costco","sams club","sam's club","bjs","bj's","wholesale club","warehouse club"], winner:"unlimited", reward:"1.5%", why:"Wholesale clubs are not part of the Q4 Flex grocery bonus; Freedom Unlimited is your catch-all choice.", alternative:"Merchant acceptance and network rules still apply at the register." },
  { id:"amazon", icon:"📦", title:"Amazon / Online Shopping", aliases:["amazon","amazon.com","online shopping","shopping","electronics","clothing","home improvement","home depot","lowes","lowe's","best buy","apple store"], winner:"unlimited", reward:"1.5%", why:"No Q4 2026 bonus among your cards beats Freedom Unlimited for ordinary non-category shopping.", alternative:"Check Chase Offers and merchant-specific promos before large purchases." },
  { id:"general", icon:"🏷️", title:"All Other Purchases", aliases:["other","general","everything else","misc","miscellaneous","everyday purchase","non bonus"], winner:"unlimited", reward:"1.5%", why:"Freedom Unlimited gives you the highest baseline return on purchases that do not fit another bonus category.", alternative:"Avoid ordinary 1x purchases on Reserve, Preferred or Flex when Unlimited earns 1.5%." }
];

const quickSearches = ["DoorDash","StubHub","IHG","The Edit","Target","Costco","CVS","Restaurants","Groceries","Gas","Hotels"];
const defaultState = { version:APP_VERSION, settings:{
  reserveResetDate:"",
  preferredResetDate:"",
  reserveAnnualFeeDate:"",
  preferredAnnualFeeDate:"",
  targetOfferEnabled:true,
  targetOfferEnd:"2026-12-31"
}, usage:{} };
let state = loadState();
let activeCreditFilter = "all";
let editingBenefitId = null;

function loadState(){
  try {
    const raw=JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(!(raw && raw.version===APP_VERSION)) return structuredClone(defaultState);
    const next={...defaultState,...raw,settings:{...defaultState.settings,...raw.settings},usage:raw.usage||{}};
    // Migrate the legacy single $500 The Edit tracker into two $250 portions.
    if(next.usage["reserve-edit"]){
      for(const [period,record] of Object.entries(next.usage["reserve-edit"])){
        const amount=Math.max(0,Number(record?.amount)||0);
        next.usage["reserve-edit-1"]=next.usage["reserve-edit-1"]||{};
        next.usage["reserve-edit-2"]=next.usage["reserve-edit-2"]||{};
        if(!next.usage["reserve-edit-1"][period]) next.usage["reserve-edit-1"][period]={amount:Math.min(250,amount),updated:record?.updated||Date.now()};
        if(!next.usage["reserve-edit-2"][period]) next.usage["reserve-edit-2"][period]={amount:Math.min(250,Math.max(0,amount-250)),updated:record?.updated||Date.now()};
      }
      delete next.usage["reserve-edit"];
      localStorage.setItem(STORAGE_KEY,JSON.stringify(next));
    }
    return next;
  } catch { return structuredClone(defaultState); }
}
function saveState(){ localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); }
function isoDate(d){ return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }
function parseLocalDate(s){ if(!s) return null; const [y,m,d]=s.split("-").map(Number); return new Date(y,m-1,d,12); }
function addYears(d,n){ const out=new Date(d); out.setFullYear(out.getFullYear()+n); return out; }
function money(n){ return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(n||0); }
function fmtDate(d){ return d ? new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric"}).format(d) : "Set date"; }
function daysBetween(a,b){ return Math.ceil((b-a)/86400000); }
function monthKey(d=today){ return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`; }
function endOfMonth(d=today){ return new Date(d.getFullYear(),d.getMonth()+1,0,23,59,59); }

function benefitEnabled(b){ return b.enabledSetting ? !!state.settings[b.enabledSetting] : true; }
function getFixedEnd(b){ return parseLocalDate(b.endSetting ? state.settings[b.endSetting] : b.end); }
function anniversaryPeriod(resetDateString){
  const anchor=parseLocalDate(resetDateString); if(!anchor) return null;
  let start=new Date(today.getFullYear(),anchor.getMonth(),anchor.getDate(),12);
  if(start>today) start.setFullYear(start.getFullYear()-1);
  const end=addYears(start,1); end.setDate(end.getDate()-1);
  return {start,end,key:`${isoDate(start)}_${isoDate(end)}`};
}
function benefitPeriod(b){
  if(b.cadence==="monthly") return {key:monthKey(),start:new Date(today.getFullYear(),today.getMonth(),1,12),end:endOfMonth()};
  if(b.cadence==="calendarYear") return {key:String(today.getFullYear()),start:new Date(today.getFullYear(),0,1,12),end:new Date(today.getFullYear(),11,31,23,59,59)};
  if(b.cadence==="halfYear"){ const first=today.getMonth()<6; const start=new Date(today.getFullYear(),first?0:6,1,12); const end=new Date(today.getFullYear(),first?5:11,first?30:31,23,59,59); return {key:`${today.getFullYear()}_${first?"H1":"H2"}`,start,end}; }
  if(b.cadence==="fixed" || b.cadence==="targeted") return {key:`fixed_${b.start || ""}_${isoDate(getFixedEnd(b)||today)}`,start:parseLocalDate(b.start)||new Date(2000,0,1),end:getFixedEnd(b)};
  if(b.cadence==="anniversary") return anniversaryPeriod(state.settings[b.resetSetting]) || {key:`unset_${today.getFullYear()}`,start:null,end:null};
  if(b.cadence==="interval") return {key:"interval",start:null,end:null};
  return {key:"default",start:null,end:null};
}
function usageRecord(b){ const p=benefitPeriod(b); return state.usage[b.id]?.[p.key] || {}; }
function usedValue(b){
  const r=usageRecord(b);
  if(b.tracker==="boolean") return r.used ? b.value : 0;
  if(b.tracker==="amount") return Math.min(Number(r.amount)||0,b.value);
  if(b.tracker==="date") return r.date ? b.value : 0;
  return 0;
}
function isIntervalEligible(b){ const r=usageRecord(b); if(!r.date) return true; const next=addYears(parseLocalDate(r.date),b.years||4); return today>=next; }
function isActive(b){
  if(!benefitEnabled(b)) return false;
  if(b.cadence==="interval") return isIntervalEligible(b);
  const p=benefitPeriod(b); if(p.start && today<p.start) return false; if(p.end && today>p.end) return false; return true;
}
function remainingValue(b){ if(!isActive(b)) return 0; if(b.tracker==="date") return isIntervalEligible(b)?b.value:0; return Math.max(0,b.value-usedValue(b)); }
function expirationDate(b){
  if(b.cadence==="monthly") return endOfMonth();
  if(["fixed","targeted","calendarYear","halfYear"].includes(b.cadence)) return benefitPeriod(b).end;
  if(b.cadence==="anniversary") return benefitPeriod(b).end;
  return null;
}
function urgencyScore(b){
  const remaining=remainingValue(b); if(!remaining) return 9999;
  const end=expirationDate(b); if(!end) return 3650;
  return Math.max(0,daysBetween(today,end));
}
function statusFor(b){
  if(!benefitEnabled(b)) return {label:"Not tracked",className:"muted"};
  const p=benefitPeriod(b);
  if((b.cadence==="fixed"||b.cadence==="targeted") && p.end && today>p.end) return {label:"Expired",className:"expired"};
  if(b.tracker==="date"){
    const r=usageRecord(b); if(!r.date) return {label:"Available",className:"open"};
    const next=addYears(parseLocalDate(r.date),b.years||4);
    return today>=next ? {label:"Available again",className:"open"}:{label:`Next ${fmtDate(next)}`,className:"used"};
  }
  const used=usedValue(b), rem=remainingValue(b);
  if(used>=b.value) return {label:"Used",className:"used"};
  const days=urgencyScore(b);
  if(rem>0 && days<=7) return {label:`${days} day${days===1?"":"s"} left`,className:"soon"};
  return {label: used>0 ? `${money(rem)} left` : "Open", className:"open"};
}
function periodLabel(b){
  const p=benefitPeriod(b);
  if(b.cadence==="monthly") return new Intl.DateTimeFormat("en-US",{month:"long",year:"numeric"}).format(today);
  if(b.cadence==="calendarYear") return String(today.getFullYear());
  if(b.cadence==="halfYear"){ const p=benefitPeriod(b); return `${fmtDate(p.start)} – ${fmtDate(p.end)}`; }
  if(b.cadence==="anniversary") return p.start ? `${fmtDate(p.start)} – ${fmtDate(p.end)}` : "Set reset date in Settings";
  if(b.cadence==="fixed"||b.cadence==="targeted") return p.end ? `Ends ${fmtDate(p.end)}` : "Set expiration date";
  if(b.cadence==="interval") return "Every 4 years";
  return "";
}

function cardVisual(cardKey){
  const imageMap = {
    reserve: { src: "assets/sapphire-reserve-card.png", alt: "Chase Sapphire Reserve card" },
    preferred: { src: "assets/sapphire-preferred-card.png", alt: "Chase Sapphire Preferred card" },
    flex: { src: "assets/freedom-flex-card.png", alt: "Chase Freedom Flex card" },
    unlimited: { src: "assets/freedom-unlimited-card.png", alt: "Chase Freedom Unlimited card" }
  };
  const image = imageMap[cardKey];
  if(image){
    return `<div class="mini-card image-card"><img src="${image.src}" alt="${image.alt}" loading="lazy" /></div>`;
  }
  const c=cards[cardKey];
  return `<div class="mini-card ${c.className}"><span class="brand">CHASE</span><span class="card-name">${c.short.toUpperCase()}</span></div>`;
}
function normalize(value){ return value.toLowerCase().trim().replace(/[^a-z0-9+&' .-]/g,""); }
function scoreRule(rule,query){ const q=normalize(query); if(!q)return 0; let score=0; for(const alias of rule.aliases){const a=normalize(alias); if(q===a)score=Math.max(score,100); else if(a.startsWith(q))score=Math.max(score,80); else if(a.includes(q))score=Math.max(score,65); else if(q.includes(a))score=Math.max(score,60);} if(normalize(rule.title).includes(q))score=Math.max(score,70); return score; }
function findBest(query){ const ranked=rules.map(rule=>({rule,score:scoreRule(rule,query)})).sort((a,b)=>b.score-a.score); return ranked[0].score>0?ranked[0].rule:rules.find(r=>r.id==="general"); }

function relevantBenefits(rule){ return (rule.benefitIds||[]).map(id=>benefits.find(b=>b.id===id)).filter(Boolean).filter(benefitEnabled); }
function creditHintHTML(rule){
  const items=relevantBenefits(rule).map(b=>({b,remaining:remainingValue(b),status:statusFor(b)})).filter(x=>x.remaining>0 || x.status.className==="soon").sort((a,b)=>urgencyScore(a.b)-urgencyScore(b.b));
  if(!items.length) return "";
  return `<div class="credit-hints"><div class="credit-hints-title">Unused credits that may change the decision</div>${items.map(({b,remaining})=>`<button class="credit-hint" data-open-credit="${b.id}"><span>${b.icon} ${b.name}</span><strong>${money(remaining)} left</strong></button>`).join("")}</div>`;
}
function dynamicRecommendation(rule){
  if(rule.id==="doordash"){
    const reserveLeft=["reserve-dd-15","reserve-dd-10a","reserve-dd-10b"].map(id=>benefits.find(b=>b.id===id)).some(b=>remainingValue(b)>0);
    const preferredLeft=remainingValue(benefits.find(b=>b.id==="preferred-dd-10"))>0;
    if(reserveLeft) return {...rule,winner:"reserve",reward:"Use Reserve credit",why:"You still have an unused Reserve DoorDash credit this month."};
    if(preferredLeft) return {...rule,winner:"preferred",reward:"Use Preferred credit",why:"Your Reserve DoorDash credits are used, but the Preferred monthly promo is still open."};
    return {...rule,winner:"flex",reward:"7% dining",why:"Your tracked DoorDash credits are used; Q4 restaurant orders can earn 7% total on Freedom Flex."};
  }
  if(rule.id==="global-entry"){
    const r=benefits.find(b=>b.id==="reserve-ttp"), p=benefits.find(b=>b.id==="preferred-ttp");
    if(isIntervalEligible(r)) return {...rule,winner:"reserve",reward:"Up to $120",why:"Your tracked Reserve Trusted Traveler credit is available."};
    if(isIntervalEligible(p)) return {...rule,winner:"preferred",reward:"Up to $120",why:"Your Reserve credit is not currently eligible, but your tracked Preferred credit is available."};
  }
  return rule;
}
function renderResult(baseRule,queryLabel){
  const rule=dynamicRecommendation(baseRule), c=cards[rule.winner], el=document.getElementById("recommendation");
  el.innerHTML=`<div class="result-card"><div class="result-kicker">Best card for</div><h2 class="result-title">${queryLabel||rule.title}</h2><p class="result-subtitle">Matched to ${rule.title}</p><div class="result-winner">${cardVisual(rule.winner)}<div><div class="winner-name">${c.short}</div><div class="winner-why">${rule.why}</div></div><div class="reward-badge">${rule.reward}<small>best current choice</small></div></div><div class="alt-row"><span>Tip</span><span>${rule.alternative}</span></div>${creditHintHTML(rule)}</div>`;
  el.classList.remove("hidden");
  el.scrollIntoView({behavior:"smooth",block:"nearest"});
}

function renderCategories(){
  const featuredIds=["flights","hotels","chase-travel","ihg","dining","grocery","drugstores","gas","streaming","online-grocery","lyft","target","general"];
  document.getElementById("categoryList").innerHTML=featuredIds.map(id=>{const r=dynamicRecommendation(rules.find(x=>x.id===id)),c=cards[r.winner];return `<div class="category-row" data-rule="${id}" tabindex="0" role="button"><div class="cat-icon">${r.icon}</div><div><div class="cat-title">${r.title}</div><div class="cat-note">${c.short}</div></div><div class="cat-reward"><strong>${r.reward}</strong><span>best card</span></div></div>`}).join("");
}
function nextAnnualFeeDate(dateString){
  const base=parseLocalDate(dateString);
  if(!base) return null;
  let next=new Date(today.getFullYear(),base.getMonth(),base.getDate());
  if(next<new Date(today.getFullYear(),today.getMonth(),today.getDate())) next=new Date(today.getFullYear()+1,base.getMonth(),base.getDate());
  return next;
}
function annualFeeMeta(cardKey){
  const settingKey=cardKey==="reserve"?"reserveAnnualFeeDate":cardKey==="preferred"?"preferredAnnualFeeDate":null;
  if(!settingKey) return "";
  const next=nextAnnualFeeDate(state.settings[settingKey]);
  if(!next) return `<div class="card-fee-date muted">Annual fee date not set</div>`;
  const days=Math.max(0,daysBetween(today,next));
  return `<div class="card-fee-date"><strong>Annual fee:</strong> ${fmtDate(next)} <span>· ${days} day${days===1?"":"s"}</span></div>`;
}
function renderCards(){ document.getElementById("cardsGrid").innerHTML=Object.entries(cards).map(([key,c])=>`<div class="card-tile" data-card="${key}">${cardVisual(key)}<div class="card-tile-name">${c.short}</div><div class="card-tile-note">${c.note}</div>${annualFeeMeta(key)}</div>`).join(""); }
function renderChips(){ document.getElementById("quickChips").innerHTML=quickSearches.map(x=>`<button class="chip" data-query="${x}">${x}</button>`).join(""); }
function showCardWinners(cardKey){ const wins=rules.filter(r=>dynamicRecommendation(r).winner===cardKey).slice(0,8),c=cards[cardKey],el=document.getElementById("cardDetail"); el.innerHTML=`<div class="result-card"><div class="result-kicker">Where this card wins</div><h2 class="result-title">${c.short}</h2><p class="result-subtitle">${c.note}</p>${wins.map(r=>`<div class="alt-row"><span>${r.icon} ${r.title}</span><strong>${dynamicRecommendation(r).reward}</strong></div>`).join("")}</div>`; el.classList.remove("hidden"); el.scrollIntoView({behavior:"smooth",block:"nearest"}); }

function claimedInYear(year){
  let total=0;
  for(const b of benefits){
    const buckets=state.usage[b.id]||{};
    for(const [key,r] of Object.entries(buckets)){
      const belongs=key.includes(String(year)) || (b.cadence==="interval" && r.date?.startsWith(String(year)));
      if(!belongs) continue;
      if(b.tracker==="boolean" && r.used) total+=b.value;
      if(b.tracker==="amount") total+=Math.min(Number(r.amount)||0,b.value);
      if(b.tracker==="date" && r.date) total+=b.value;
    }
  }
  return total;
}
function summaryData(){
  const active=benefits.filter(benefitEnabled);
  const available=active.reduce((s,b)=>s+remainingValue(b),0);
  const expiring=active.filter(b=>remainingValue(b)>0 && urgencyScore(b)<=45).reduce((s,b)=>s+remainingValue(b),0);
  const claimed=claimedInYear(today.getFullYear());
  return {available,expiring,claimed};
}
function renderSummary(){ const s=summaryData(); document.getElementById("summaryGrid").innerHTML=`<div class="summary-card"><span>Available now</span><strong>${money(s.available)}</strong><small>across tracked credits</small></div><div class="summary-card"><span>Claimed in ${today.getFullYear()}</span><strong>${money(s.claimed)}</strong><small>saved locally</small></div><div class="summary-card warning"><span>Expiring ≤45 days</span><strong>${money(s.expiring)}</strong><small>prioritize these</small></div>`; document.getElementById("creditsYear").textContent=today.getFullYear(); }
function progressPercent(b){ return Math.min(100,Math.round((usedValue(b)/b.value)*100)); }
function creditRowHTML(b){
  const status=statusFor(b),used=usedValue(b),remaining=remainingValue(b),active=isActive(b);
  let valueLine=b.tracker==="date"?(usageRecord(b).date?`Last used ${fmtDate(parseLocalDate(usageRecord(b).date))}`:`${money(b.value)} available`):`${money(used)} used · ${money(remaining)} left`;
  if(!active && status.className==="expired") valueLine=`${money(used)} used · offer expired`;
  return `<button class="credit-row" data-open-credit="${b.id}"><div class="credit-icon">${b.icon}</div><div class="credit-main"><div class="credit-title-line"><strong>${b.name}</strong><span class="status ${status.className}">${status.label}</span></div><div class="credit-card-name">${cards[b.card].short} · ${periodLabel(b)}</div><div class="credit-value-line">${valueLine}</div>${b.tracker!=="date"?`<div class="progress"><span style="width:${progressPercent(b)}%"></span></div>`:""}</div><div class="chevron">›</div></button>`;
}
function renderUrgentCredits(){
  const urgent=benefits.filter(benefitEnabled).filter(b=>remainingValue(b)>0).sort((a,b)=>urgencyScore(a)-urgencyScore(b)).slice(0,5);
  document.getElementById("urgentCredits").innerHTML=urgent.length?urgent.map(creditRowHTML).join(""):`<div class="empty-state">No open credits are currently tracked.</div>`;
}
function renderCredits(){
  renderSummary(); renderUrgentCredits();
  const filtered=benefits.filter(benefitEnabled).filter(b=>activeCreditFilter==="all"||b.card===activeCreditFilter);
  document.getElementById("creditsList").innerHTML=filtered.map(creditRowHTML).join("");
  renderHistory(); renderCategories();
}
function monthlyUsageFor(b,month){ const key=`${today.getFullYear()}-${String(month).padStart(2,"0")}`; const r=state.usage[b.id]?.[key]||{}; if(month>today.getMonth()+1) return "future"; return r.used?"used":"open"; }
function renderHistory(){
  const monthly=benefits.filter(b=>b.cadence==="monthly"), months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  document.getElementById("historyTable").innerHTML=`<thead><tr><th>Credit</th>${months.map(m=>`<th>${m}</th>`).join("")}</tr></thead><tbody>${monthly.map(b=>`<tr><td><div class="history-credit-name">${b.name}</div><span class="history-card-label ${b.card}">${cards[b.card].short}</span></td>${months.map((m,i)=>{const status=monthlyUsageFor(b,i+1);return `<td><span class="history-dot ${status}" title="${m}"></span></td>`}).join("")}</tr>`).join("")}</tbody>`;
}

function openCreditDialog(id){
  const b=benefits.find(x=>x.id===id); if(!b)return; editingBenefitId=id;
  document.getElementById("creditDialogCard").textContent=cards[b.card].short;
  document.getElementById("creditDialogTitle").textContent=b.name;
  document.getElementById("creditDialogNote").textContent=`${b.note} ${periodLabel(b)}`;
  const r=usageRecord(b), body=document.getElementById("creditDialogBody");
  if(b.tracker==="boolean") body.innerHTML=`<label class="toggle-row modal-toggle"><span><strong>Mark this credit used</strong><small>${money(b.value)} for the current period</small></span><input type="checkbox" id="creditUsedInput" ${r.used?"checked":""}></label>`;
  if(b.tracker==="amount") body.innerHTML=`<label class="field"><span>Amount used</span><div class="money-input"><span>$</span><input id="creditAmountInput" type="number" min="0" max="${b.value}" step="1" inputmode="decimal" value="${Number(r.amount)||0}"></div><small>Maximum tracked value: ${money(b.value)}</small></label><button type="button" class="secondary-button full-width" id="markFullBtn">Mark full ${money(b.value)} used</button>`;
  if(b.tracker==="date") body.innerHTML=`<label class="field"><span>Date the credit was last used</span><input id="creditDateInput" type="date" value="${r.date||""}"><small>Leave blank if this card's benefit has not been used in the last four years.</small></label>`;
  document.getElementById("creditDialog").showModal();
  document.getElementById("markFullBtn")?.addEventListener("click",()=>{document.getElementById("creditAmountInput").value=b.value;});
}
function saveCreditDialog(){
  const b=benefits.find(x=>x.id===editingBenefitId); if(!b)return;
  const p=benefitPeriod(b); state.usage[b.id]=state.usage[b.id]||{};
  if(b.tracker==="boolean") state.usage[b.id][p.key]={used:document.getElementById("creditUsedInput").checked,updated:Date.now()};
  if(b.tracker==="amount") state.usage[b.id][p.key]={amount:Math.max(0,Math.min(b.value,Number(document.getElementById("creditAmountInput").value)||0)),updated:Date.now()};
  if(b.tracker==="date") state.usage[b.id][p.key]={date:document.getElementById("creditDateInput").value,updated:Date.now()};
  saveState(); renderCredits(); renderCards();
}
function clearCreditDialog(){ const b=benefits.find(x=>x.id===editingBenefitId); if(!b)return; const p=benefitPeriod(b); if(state.usage[b.id]) delete state.usage[b.id][p.key]; saveState(); renderCredits(); document.getElementById("creditDialog").close(); }

function syncSettingsUI(){
  document.getElementById("reserveResetDate").value=state.settings.reserveResetDate||"";
  document.getElementById("preferredResetDate").value=state.settings.preferredResetDate||"";
  document.getElementById("reserveAnnualFeeDate").value=state.settings.reserveAnnualFeeDate||"";
  document.getElementById("preferredAnnualFeeDate").value=state.settings.preferredAnnualFeeDate||"";
  document.getElementById("targetOfferEnabled").checked=!!state.settings.targetOfferEnabled;
  document.getElementById("targetOfferEnd").value=state.settings.targetOfferEnd||"2026-12-31";
}
function settingChanged(){
  state.settings.reserveResetDate=document.getElementById("reserveResetDate").value;
  state.settings.preferredResetDate=document.getElementById("preferredResetDate").value;
  state.settings.reserveAnnualFeeDate=document.getElementById("reserveAnnualFeeDate").value;
  state.settings.preferredAnnualFeeDate=document.getElementById("preferredAnnualFeeDate").value;
  state.settings.targetOfferEnabled=document.getElementById("targetOfferEnabled").checked;
  state.settings.targetOfferEnd=document.getElementById("targetOfferEnd").value||"2026-12-31";
  saveState(); renderCredits(); renderCards();
}
function exportBackup(){ const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"}); const url=URL.createObjectURL(blob),a=document.createElement("a"); a.href=url; a.download=`chase-card-guide-backup-${isoDate(today)}.json`; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000); }
async function importBackup(file){ try{ const parsed=JSON.parse(await file.text()); if(parsed.version!==APP_VERSION) throw new Error("Unsupported backup version"); state={...defaultState,...parsed,settings:{...defaultState.settings,...parsed.settings},usage:parsed.usage||{}}; saveState(); syncSettingsUI(); renderCredits(); renderCards(); alert("Backup imported."); } catch(e){ alert("Could not import that backup file."); } }

function switchTab(tab){ document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.dataset.view===tab)); document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.tab===tab)); if(tab==="credits")renderCredits(); if(tab==="settings")syncSettingsUI(); window.scrollTo({top:0,behavior:"smooth"}); }

const searchInput=document.getElementById("searchInput"),clearSearch=document.getElementById("clearSearch");
searchInput.addEventListener("input",e=>{clearSearch.style.display=e.target.value?"block":"none"; if(e.target.value.length>=2)renderResult(findBest(e.target.value),e.target.value); if(!e.target.value)document.getElementById("recommendation").classList.add("hidden");});
searchInput.addEventListener("search",()=>{if(!searchInput.value)document.getElementById("recommendation").classList.add("hidden");});
clearSearch.addEventListener("click",()=>{searchInput.value="";clearSearch.style.display="none";document.getElementById("recommendation").classList.add("hidden");searchInput.focus();});

document.addEventListener("click",e=>{
  const nav=e.target.closest("[data-tab]"); if(nav){switchTab(nav.dataset.tab);return;}
  const chip=e.target.closest("[data-query]"); if(chip){searchInput.value=chip.dataset.query;clearSearch.style.display="block";renderResult(findBest(chip.dataset.query),chip.dataset.query);}
  const row=e.target.closest("[data-rule]"); if(row){const rule=rules.find(r=>r.id===row.dataset.rule);renderResult(rule,rule.title);}
  const tile=e.target.closest("[data-card]"); if(tile)showCardWinners(tile.dataset.card);
  const credit=e.target.closest("[data-open-credit]"); if(credit)openCreditDialog(credit.dataset.openCredit);
  const filter=e.target.closest("[data-credit-filter]"); if(filter){activeCreditFilter=filter.dataset.creditFilter;document.querySelectorAll("[data-credit-filter]").forEach(x=>x.classList.toggle("active",x===filter));renderCredits();}
});
document.addEventListener("keydown",e=>{const row=e.target.closest?.("[data-rule]");if(row&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const rule=rules.find(r=>r.id===row.dataset.rule);renderResult(rule,rule.title);}});

document.getElementById("creditForm").addEventListener("submit",saveCreditDialog);
document.getElementById("creditClearBtn").addEventListener("click",clearCreditDialog);
["reserveResetDate","preferredResetDate","reserveAnnualFeeDate","preferredAnnualFeeDate","targetOfferEnabled","targetOfferEnd"].forEach(id=>document.getElementById(id).addEventListener("change",settingChanged));
document.getElementById("exportBtn").addEventListener("click",exportBackup);
document.getElementById("importInput").addEventListener("change",e=>{if(e.target.files[0])importBackup(e.target.files[0]);e.target.value="";});
document.getElementById("resetBtn").addEventListener("click",()=>{if(confirm("Reset all credit tracking and settings?")){state=structuredClone(defaultState);saveState();syncSettingsUI();renderCredits();renderCards();}});

const infoDialog=document.getElementById("infoDialog");
document.getElementById("infoBtn").addEventListener("click",()=>infoDialog.showModal());
document.getElementById("closeDialog").addEventListener("click",()=>infoDialog.close());

renderChips(); renderCategories(); renderCards(); renderCredits(); syncSettingsUI();
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
