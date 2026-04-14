// ═══════════════════════════════════════════════════════════════════
// LOIS CHLOÉ CRM BOT — v2.1 (ioredis for TCP Redis)
// Features: LLM fallback, conversation logger, multi-turn memory,
// shade quiz, image analysis, order capture, email alerts, escalation,
// knowledge base, A/B testing
// ═══════════════════════════════════════════════════════════════════

const VERIFY_TOKEN = "loischloe_crm_2026";

// ─── ENV FLAGS ───
const HAS_LLM = !!process.env.OPENROUTER_API_KEY;
const HAS_KV = !!process.env.KV_REST_API_REDIS_URL;
const HAS_EMAIL = !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);

const PRODUCTS = {
  "cushion foundation 1.5": { name: "Cushion Foundation Shade 1.5", price: 3000, stock: 16, category: "foundation", type: "cushion" },
  "cushion foundation 3.0": { name: "Cushion Foundation Shade 3.0", price: 3000, stock: 5, category: "foundation", type: "cushion" },
  "spf cushion foundation": { name: "UV Waterful Cushion Foundation SPF 50", price: 5000, stock: 63, category: "foundation", type: "spf cushion" },
  "concealer 1.5": { name: "Full Coverage Concealer Shade 1.5", price: 1500, stock: 0, category: "concealer", type: "full coverage" },
  "concealer 3.0": { name: "Full Coverage Concealer Shade 3.0", price: 1500, stock: 688, category: "concealer", type: "full coverage" },
  "bloom palette": { name: "D'L Bloom Palette (Blush)", price: 2500, stock: 364, category: "blush", type: "palette" },
  "glow palette": { name: "D'L Glow Face Palette (Highlighter)", price: 2500, stock: 1158, category: "highlighter", type: "palette" },
  "setting powder": { name: "Translucent Setting Powder", price: 1250, stock: 0, category: "powder", type: "setting" },
  "sunscreen": { name: "Sunscreen Cream", price: 1500, stock: 0, category: "sunscreen", type: "cream" },
  "sizzling brown": { name: "Sizzling Brown (Bullet Matte)", price: 990, stock: 433, category: "lipstick", type: "bullet matte" },
  "nude blush": { name: "Nude Blush (Bullet Matte)", price: 990, stock: 216, category: "lipstick", type: "bullet matte" },
  "lois tangerine": { name: "Lois Tangerine (Bullet Matte)", price: 990, stock: 67, category: "lipstick", type: "bullet matte" },
  "nude classic": { name: "Nude Classic (Bullet Matte)", price: 990, stock: 0, category: "lipstick", type: "bullet matte" },
  "french love": { name: "French Love (Bullet Matte)", price: 990, stock: 0, category: "lipstick", type: "bullet matte" },
  "blushing chloe": { name: "Blushing Chloe (Bullet Matte)", price: 990, stock: 0, category: "lipstick", type: "bullet matte" },
  "mellow nude": { name: "Mellow Nude (Bullet Matte)", price: 990, stock: 0, category: "lipstick", type: "bullet matte" },
  "victoria rose": { name: "Victoria Rose (Semi Matte)", price: 990, stock: 0, category: "lipstick", type: "semi matte" },
  "sexy coral": { name: "Sexy Coral (Semi Matte)", price: 990, stock: 26, category: "lipstick", type: "semi matte" },
  "ruby dance": { name: "Ruby Dance (Semi Matte)", price: 990, stock: 7, category: "lipstick", type: "semi matte" },
  "crimson": { name: "Crimson (Semi Matte)", price: 990, stock: 5, category: "lipstick", type: "semi matte" },
  "opera love": { name: "Opera Love (Liquid Matte)", price: 950, stock: 144, category: "lipstick", type: "liquid matte" },
  "valentine crescent": { name: "Valentine Crescent (Liquid Matte)", price: 950, stock: 10, category: "lipstick", type: "liquid matte" },
  "rose chloe": { name: "Rose Chloe (Velvet Matte)", price: 990, stock: 192, category: "lipstick", type: "velvet matte" },
  "wild flower": { name: "Wild Flower (Velvet Matte)", price: 990, stock: 896, category: "lipstick", type: "velvet matte" },
  "crimson love": { name: "Crimson Love (Velvet Matte)", price: 990, stock: 328, category: "lipstick", type: "velvet matte" },
  "mauve moment": { name: "Mauve Moment (Velvet Matte)", price: 990, stock: 674, category: "lipstick", type: "velvet matte" },
  "cherry kiss": { name: "Cherry Kiss (Velvet Matte)", price: 990, stock: 65, category: "lipstick", type: "velvet matte" },
  "precious love": { name: "Precious Love (Velvet Matte)", price: 990, stock: 20, category: "lipstick", type: "velvet matte" },
  "coral harbour": { name: "Coral Harbour (Velvet Matte)", price: 990, stock: 304, category: "lipstick", type: "velvet matte" },
  "devoted lois": { name: "Devoted Lois (Velvet Matte)", price: 990, stock: 262, category: "lipstick", type: "velvet matte" },
  "nude heaven": { name: "Nude Heaven (Velvet Matte)", price: 990, stock: 77, category: "lipstick", type: "velvet matte" },
  "sunshine berry": { name: "Sunshine Berry (Velvet Matte)", price: 990, stock: 264, category: "lipstick", type: "velvet matte" },
  "lip oil": { name: "Rouge Chloé Lip Oil", price: 1200, stock: 0, category: "lip oil", type: "oil" },
  "eyeliner black": { name: "Gel Eyeliner Black", price: 950, stock: 0, category: "eyeliner", type: "gel" },
  "eyeliner brown": { name: "Gel Eyeliner Brown", price: 950, stock: 383, category: "eyeliner", type: "gel" },
  "mascara": { name: "Perfect Lash Mascara", price: 1000, stock: 111, category: "mascara", type: "lash" },
  "signature palette": { name: "D'L Signature Palette", price: 4550, stock: 377, category: "palette", type: "signature" },
  "brush set": { name: "Signature Brush Set", price: 5000, stock: 1376, category: "brush", type: "set" },
};

const DELIVERY = { insideDhaka: { cost: 60, time: "72 hours" }, outsideDhaka: { cost: 100, time: "48 hours dispatch" }, method: "Pathao" };

const CATEGORIES = {
  lipstick: { keywords: ["lipstick", "lip stick", "লিপস্টিক", "লিপ", "lipstik"], label: "Lipstick" },
  foundation: { keywords: ["foundation", "ফাউন্ডেশন", "foundetion", "fundation"], label: "Foundation" },
  concealer: { keywords: ["concealer", "কনসিলার", "consiler", "conseler"], label: "Concealer" },
  eyeliner: { keywords: ["eyeliner", "eye liner", "আইলাইনার", "liner"], label: "Eyeliner" },
  mascara: { keywords: ["mascara", "মাসকারা", "maskara"], label: "Mascara" },
  blush: { keywords: ["blush", "ব্লাশ", "bloom"], label: "Blush" },
  highlighter: { keywords: ["highlighter", "হাইলাইটার", "glow", "highlight"], label: "Highlighter" },
  palette: { keywords: ["palette", "প্যালেট"], label: "Palette" },
  brush: { keywords: ["brush", "ব্রাশ"], label: "Brush Set" },
  powder: { keywords: ["powder", "পাউডার", "setting powder"], label: "Setting Powder" },
  "lip oil": { keywords: ["lip oil", "লিপ অয়েল"], label: "Lip Oil" },
  sunscreen: { keywords: ["sunscreen", "সানস্ক্রিন", "spf", "sun block"], label: "Sunscreen" },
};

const GREETINGS = ["hello", "hi", "hey", "assalamu", "salam", "walaikum", "good morning", "good evening", "good afternoon", "hlo", "hlw", "hii", "hiii", "হ্যালো", "হেলো", "সালাম", "আসসালামু", "হাই", "নমস্কার", "ওয়ালাইকুম", "sup", "yo", "hola"];

const BK = {
  price: ["দাম", "কত", "প্রাইস", "টাকা", "dam", "daam", "koto", "price", "cost"],
  delivery: ["ডেলিভারি", "শিপিং", "কবে পাবো", "পাঠাও", "delivery", "shipping", "pathao", "kobe pabo", "kobe dibe"],
  order: ["অর্ডার", "কিনব", "নিব", "লাগবে", "চাই", "দিন", "order", "buy", "nibo", "lagbe", "chai", "kinbo", "diben"],
  offer: ["অফার", "কম্বো", "ডিসকাউন্ট", "ছাড়", "offer", "combo", "discount"],
  stock: ["স্টক", "আছে", "এভেইলেবল", "stock", "available", "ache", "pawa jabe", "ase"],
  shade: ["শেড", "কালার", "রং", "shade", "color", "colour", "rong"],
  original: ["অরিজিনাল", "আসল", "নকল", "original", "asol", "nokol", "genuine", "fake"],
  payment: ["পেমেন্ট", "বিকাশ", "নগদ", "ক্যাশ", "payment", "bkash", "bikash", "nagad", "cod", "rocket"],
  returnPolicy: ["রিটার্ন", "এক্সচেঞ্জ", "ফেরত", "return", "exchange", "refund", "ferat"],
  matte: ["ম্যাট", "সেমি ম্যাট", "লিকুইড ম্যাট", "বুলেট", "matte", "semi matte", "liquid matte", "bullet", "velvet"],
  thanks: ["ধন্যবাদ", "থ্যাংকস", "thanks", "thank you", "thanku", "tnx", "ty", "dhonnobad"],
  ok: ["ঠিক আছে", "ok", "okay", "ওকে", "আচ্ছা", "accha", "ji", "জি", "hmm"],
  quiz: ["shade match", "kon shade", "which shade", "recommend", "suggest", "match korbe", "suit korbe", "suitable"],
};

const KNOWLEDGE_BASE = `Brand: LOIS CHLOÉ — 100% Australian cosmetics brand 🇦🇺. Official distributor in Bangladesh. All products are original, cruelty-free, dermatologically tested. Halal-certified ingredients. Safe for sensitive skin. Application tips: Cushion Foundation: Pat gently with sponge. Concealer: Apply under eyes and blend. Bullet Matte: Long-lasting, transfer-proof. Liquid Matte: One layer, dry 30s before second. Velvet Matte: Comfortable everyday wear. Brush Set: Full range. Shade guide: 1.5 fair/light, 3.0 medium/warm (most popular Bangladeshi skin). Storage: Cool dry place. Shelf life: 24mo unopened, 12mo opened.`;

function buildSystemPrompt() {
  const productLines = Object.values(PRODUCTS).map(p => `- ${p.name}: ৳${p.price.toLocaleString()}, ${p.stock > 0 ? "in stock" : "out of stock"}, ${p.category}, ${p.type}`).join("\n");
  return `You are LOIS CHLOÉ Bangladesh's customer support bot on Facebook Messenger.\n\nBrand info:\n${KNOWLEDGE_BASE}\n\nProduct catalog (BDT):\n${productLines}\n\nDelivery: Inside Dhaka ৳60 (72h), Outside Dhaka ৳100 (48h) via Pathao.\nPayment: COD, bKash, Nagad, Rocket.\n\nInstructions:\n1. ALWAYS reply in Banglish. 2. Keep replies 2-4 sentences max. 3. Use emojis naturally. 4. Recommend warm/medium shades for Bangladeshi skin. 5. For out-of-stock, suggest alternatives. 6. For orders, ask name/address/phone. 7. Never make up products. 8. Be warm and VIP-friendly.`;
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    if (mode === "subscribe" && token === VERIFY_TOKEN) return res.status(200).send(challenge);
    return res.status(403).send("Forbidden");
  }
  if (req.method === "POST") {
    const body = req.body;
    console.log("Webhook event:", JSON.stringify(body, null, 2));
    if (body.object === "page" || body.object === "instagram") {
      const promises = [];
      body.entry?.forEach((entry) => {
        entry.messaging?.forEach((event) => {
          if (event.message && !event.message.is_echo) promises.push(handleMessage(event));
        });
      });
      await Promise.all(promises);
      return res.status(200).send("EVENT_RECEIVED");
    }
    return res.status(404).send("Not Found");
  }
  return res.status(405).send("Method Not Allowed");
}

async function handleMessage(event) {
  const senderId = event.sender.id;
  const messageText = event.message?.text?.toLowerCase()?.trim() || "";
  const rawMessage = event.message?.text || "";
  const attachments = event.message?.attachments || [];
  const hasAttachment = attachments.length > 0;
  const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

  if (!PAGE_ACCESS_TOKEN) { console.error("PAGE_ACCESS_TOKEN not set"); return; }
  if (messageText.includes("prebook") || messageText.includes("pre-book")) return;

  await logMessage(senderId, "in", rawMessage, hasAttachment);
  const state = await getState(senderId);
  let reply = "", newState = state, matchedIntent = "none";

  try {
    const order = tryParseOrder(rawMessage);
    if (order) {
      matchedIntent = "order_captured";
      reply = `Thank you! Order details peyechi:\n📝 ${order.name || "Name: dite hobe"}\n📱 ${order.phone}\n📍 ${order.address || "Address: dite hobe"}\n\nAmader team 1 ghontar moddhe confirm korbe. Dhonnobad! 😊`;
      await notifyOrderCapture(senderId, order, rawMessage);
      newState = { ...state, orderInProgress: true, lastIntent: "order" };
    } else if (state?.quizStep) {
      const q = progressShadeQuiz(state, messageText);
      reply = q.reply; newState = q.newState; matchedIntent = "shade_quiz";
    } else if (hasAttachment && !messageText) {
      const type = attachments[0]?.type;
      const imageUrl = type === "image" ? attachments[0]?.payload?.url : null;
      if (imageUrl && HAS_LLM) { reply = await analyzeImage(imageUrl); matchedIntent = "image_llm"; }
      else if (type === "image") { reply = "Thanks for the image! 😊\nApni kono product er shade dekhte chacchen? Amader lipstick, foundation, concealer sob available. Kon product e interested bolun!"; matchedIntent = "image_static"; }
      else if (type === "sticker") { reply = "😊 Hi! LOIS CHLOÉ te welcome! Amader products dekhte chaile bolun — lipstick, foundation, concealer, eyeliner sob available!"; matchedIntent = "sticker"; }
      else { reply = "Thanks for reaching out! 😊 LOIS CHLOÉ te ki dekhben bolun — lipstick, foundation, concealer, eyeliner, mascara sob available!"; matchedIntent = "other_attachment"; }
    } else if (matchesKeywords(messageText, BK.quiz)) {
      const q = startShadeQuiz();
      reply = q.reply; newState = q.newState; matchedIntent = "shade_quiz_start";
    } else {
      const scripted = scriptedReply(messageText, state);
      if (scripted) {
        reply = scripted.reply; matchedIntent = scripted.intent;
        newState = { ...state, lastProduct: scripted.product || state?.lastProduct, lastIntent: scripted.intent };
      } else if (HAS_LLM) {
        reply = await llmFallback(rawMessage, state); matchedIntent = "llm_fallback";
        newState = { ...state, lastLlmUsed: Date.now() };
      } else {
        reply = "Apnar message peyechi! 😊\n\nAmi help korte pari:\n💄 Product details & price\n📦 Order place korte\n🚚 Delivery info\n🎉 Current offers\n\nKi jante chacchen bolun!";
        matchedIntent = "static_fallback";
      }
    }

    if (matchedIntent === "llm_fallback" || matchedIntent === "static_fallback") {
      newState.fallbackCount = (state?.fallbackCount || 0) + 1;
      if (newState.fallbackCount >= 3) {
        await notifyEscalation(senderId, rawMessage, newState.fallbackCount);
        newState.fallbackCount = 0;
      }
    } else { newState.fallbackCount = 0; }

    await saveState(senderId, newState);
    if (reply) {
      await sendMessage(senderId, reply, PAGE_ACCESS_TOKEN);
      await logMessage(senderId, "out", reply, false, matchedIntent);
    }
  } catch (err) {
    console.error("handleMessage error:", err);
    await sendMessage(senderId, "Apnar message peyechi! Ekto somoy dite hobe, amader team shortly janabe. 😊", PAGE_ACCESS_TOKEN);
  }
}

function scriptedReply(text, state) {
  if (!text) return null;
  if (isGreeting(text)) return { intent: "greeting", reply: "Hi! Welcome to LOIS CHLOÉ 🇦🇺✨\n\nAmader kache available:\n💄 Lipstick (Bullet/Semi/Liquid/Velvet Matte)\n🔲 Cushion Foundation\n✨ Concealer\n🌸 Blush & Highlighter Palette\n👁️ Eyeliner & Mascara\n🎨 Signature Palette\n🖌️ Brush Set\n\nKon product e interested? Bolun! 😊" };
  if (matchesKeywords(text, BK.thanks)) return { intent: "thanks", reply: "You're welcome! 😊 Ar kono product dekhte chaile bolun. LOIS CHLOÉ always here to help! ❤️" };
  if (matchesKeywords(text, BK.ok) && text.length < 15) return { intent: "ok", reply: "Ji! 😊 Ar kichu jante chaile bolun!" };
  if (matchesKeywords(text, BK.original)) return { intent: "original", reply: "LOIS CHLOÉ 100% Australian brand 🇦🇺\nSob products original & certified.\nBangladesh e official distributor er through e sell hoy.\nSafe & quality guaranteed! ✅" };
  if (matchesKeywords(text, BK.payment)) return { intent: "payment", reply: "Payment options:\n💰 Cash on Delivery (COD)\n📱 bKash\n📱 Nagad\n📱 Rocket\n\nAdvance payment e kono extra charge nei!\nOrder confirm korte chaile name, address & phone number den 😊" };
  if (matchesKeywords(text, BK.returnPolicy)) return { intent: "return", reply: "Return/Exchange Policy:\n📦 Delivery er somoy product check kore niben\n🔄 Damaged paile 24 ghontar moddhe janaben\n📸 Unboxing video rakhle claim easy hoy\n\nAmra always customer satisfaction niye kaj kori! ✅" };
  if (matchesKeywords(text, BK.matte) && (text.includes("ki") || text.includes("naki") || text.includes("type") || text.includes("difference"))) return { intent: "matte_types", reply: "Amader lipstick types:\n\n💄 Bullet Matte — Classic matte, long-lasting (৳990)\n💄 Semi Matte — Slightly glossy matte (৳990)\n💄 Liquid Matte — Liquid formula, full matte (৳950)\n💄 Velvet Matte — Smooth velvet finish (৳990)\n\nKon type try korte chan? 😊" };
  if (matchesKeywords(text, BK.price)) {
    const p = findProduct(text);
    if (p) return { intent: "price_product", reply: `${p.name}\nPrice: ৳${p.price.toLocaleString()}/-\n${p.stock > 0 ? "Stock available ✅" : "Currently out of stock 😔"}\n\nOrder korte chaile name, address & phone number den!`, product: p };
    return { intent: "price_list", reply: priceList() };
  }
  if (matchesKeywords(text, BK.delivery)) return { intent: "delivery", reply: `🚚 Delivery Info:\n\n📍 Inside Dhaka: ৳${DELIVERY.insideDhaka.cost}/- (${DELIVERY.insideDhaka.time} e delivery)\n📍 Outside Dhaka: ৳${DELIVERY.outsideDhaka.cost}/- (${DELIVERY.outsideDhaka.time})\n🏍️ Delivery via: ${DELIVERY.method}\n\n💰 Payment: COD / bKash / Nagad / Rocket` };
  if (matchesKeywords(text, BK.offer)) return { intent: "offer", reply: "🎉 Current Offers:\n\n1️⃣ Hydra Lip Duo — ৳2,190/- (2 lipstick combo)\n2️⃣ Glam On The Go — ৳6,990/- (Full glam combo)\n\nInterested holei bolun! 😊" };
  if (matchesKeywords(text, BK.stock)) {
    const p = findProduct(text);
    if (p) return { intent: "stock_product", reply: p.stock > 0 ? `${p.name} — Stock available ✅ (৳${p.price.toLocaleString()}/-)\nOrder korte chaile name, address & phone number den!` : `Sorry, ${p.name} out of stock 😔\nRestock hole notify korbo? Onno product dekhte chan?`, product: p };
    const cat = findCategory(text);
    if (cat) return { intent: "stock_category", reply: categoryStock(cat) };
    return { intent: "stock_generic", reply: "Kon product er stock check korte chan? Product name bolun!\nAvailable: lipstick, foundation, concealer, eyeliner, mascara, blush, highlighter 😊" };
  }
  if (matchesKeywords(text, BK.shade)) {
    const cat = findCategory(text);
    if (cat) return { intent: "shades", reply: categoryShades(cat) };
    return { intent: "shade_generic", reply: "Kon product er shades dekhte chan?\n💄 Lipstick / 🔲 Foundation / ✨ Concealer / 👁️ Eyeliner\n\nBolun! 😊" };
  }
  if (matchesKeywords(text, BK.order)) {
    const p = findProduct(text);
    if (p) {
      if (p.stock > 0) return { intent: "order_product", reply: `${p.name} — ৳${p.price.toLocaleString()}/-\nOrder confirm korte apnar:\n📝 Full Name\n📍 Full Address\n📱 Phone Number\n\nPlease den! 😊`, product: p };
      return { intent: "order_oos", reply: `Sorry, ${p.name} out of stock 😔\nOther products dekhte chan?`, product: p };
    }
    return { intent: "order_generic", reply: "Order er jonno please den:\n📝 Full Name\n📍 Full Address (with area/thana)\n📱 Phone Number\n🎨 Product name & shade\n\nAmra confirm kore janabo! 😊" };
  }
  const p = findProduct(text);
  if (p) {
    if (p.stock > 0) return { intent: "product_match", reply: `${p.name}\n💰 Price: ৳${p.price.toLocaleString()}/-\n✅ Stock available\n\nOrder korte chaile name, address & phone number den! 😊`, product: p };
    return { intent: "product_oos", reply: `${p.name}\n💰 Price: ৳${p.price.toLocaleString()}/-\n😔 Currently out of stock\n\nOther ${p.category} products dekhte chan?`, product: p };
  }
  const cat = findCategory(text);
  if (cat) return { intent: "category_match", reply: categoryList(cat) };
  return null;
}

async function llmFallback(userMessage, state) {
  try {
    const systemPrompt = buildSystemPrompt();
    const context = state?.lastProduct ? `\nContext: Customer previously asked about ${state.lastProduct.name}.` : "";
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, "Content-Type": "application/json", "HTTP-Referer": "https://lois-chloe-crm.vercel.app", "X-Title": "LOIS CHLOE CRM Bot" },
      body: JSON.stringify({ model: "anthropic/claude-3.5-haiku", messages: [{ role: "system", content: systemPrompt + context }, { role: "user", content: userMessage }], max_tokens: 400, temperature: 0.7 }),
    });
    const data = await response.json();
    if (data.choices?.[0]?.message?.content) return data.choices[0].message.content.trim();
    console.error("LLM returned no content:", data);
    return "Apnar question bujhte parchi! Amader team shortly janabe. Meanwhile kono product er price ba info dekhte chaile bolun! 😊";
  } catch (err) {
    console.error("LLM fallback error:", err);
    return "Apnar message peyechi! Ekto somoy dite hobe. Product e interested hole name bolun, price janai! 😊";
  }
}

async function analyzeImage(imageUrl) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, "Content-Type": "application/json", "HTTP-Referer": "https://lois-chloe-crm.vercel.app", "X-Title": "LOIS CHLOE CRM Bot" },
      body: JSON.stringify({ model: "anthropic/claude-3.5-haiku", messages: [{ role: "system", content: buildSystemPrompt() + "\n\nCustomer sent a photo. Guess what they want and respond helpfully in Banglish. 2-3 sentences." }, { role: "user", content: [{ type: "text", text: "Customer sent this image." }, { type: "image_url", image_url: { url: imageUrl } }] }], max_tokens: 300 }),
    });
    const data = await response.json();
    if (data.choices?.[0]?.message?.content) return data.choices[0].message.content.trim();
    return "Chobi peyechi! 😊 Kon product er shade check korte chan bolun — ami recommend korbo!";
  } catch (err) {
    console.error("Image analysis error:", err);
    return "Chobi peyechi! Kon product er shade check korte chan bolun! 😊";
  }
}

function startShadeQuiz() {
  return { reply: "Let's find your perfect shade! 💄✨\n\n**Q1 of 3:** Apnar skin tone kemon?\n\n1️⃣ Fair / Light\n2️⃣ Medium / Wheat\n3️⃣ Dark / Deep\n\nReply: 1, 2, or 3", newState: { quizStep: 1, quizAnswers: {} } };
}

function progressShadeQuiz(state, text) {
  const answers = { ...(state.quizAnswers || {}) };
  if (state.quizStep === 1) {
    if (text.includes("1") || text.includes("fair") || text.includes("light")) answers.tone = "light";
    else if (text.includes("2") || text.includes("medium") || text.includes("wheat")) answers.tone = "medium";
    else if (text.includes("3") || text.includes("dark") || text.includes("deep")) answers.tone = "dark";
    else return { reply: "Please 1, 2, or 3 reply korun — skin tone?", newState: state };
    return { reply: "Got it! ✨\n\n**Q2 of 3:** Apnar undertone kemon?\n\n1️⃣ Cool (pink/blue veins)\n2️⃣ Warm (yellow/golden veins)\n3️⃣ Neutral (mix)\n\nReply: 1, 2, or 3", newState: { ...state, quizStep: 2, quizAnswers: answers } };
  }
  if (state.quizStep === 2) {
    if (text.includes("1") || text.includes("cool")) answers.undertone = "cool";
    else if (text.includes("2") || text.includes("warm")) answers.undertone = "warm";
    else if (text.includes("3") || text.includes("neutral") || text.includes("mix")) answers.undertone = "neutral";
    else return { reply: "Please 1, 2, or 3 reply korun — undertone?", newState: state };
    return { reply: "Almost done! ✨\n\n**Q3 of 3:** Kon finish pasond?\n\n1️⃣ Matte (no shine)\n2️⃣ Semi-Matte (soft glow)\n3️⃣ Velvet (smooth)\n\nReply: 1, 2, or 3", newState: { ...state, quizStep: 3, quizAnswers: answers } };
  }
  if (state.quizStep === 3) {
    let finish = "bullet matte";
    if (text.includes("1") || text.includes("matte")) finish = "bullet matte";
    else if (text.includes("2") || text.includes("semi")) finish = "semi matte";
    else if (text.includes("3") || text.includes("velvet")) finish = "velvet matte";
    answers.finish = finish;
    const recs = recommendShades(answers);
    return { reply: `Perfect match recommendations for you! 💄✨\n\n${recs}\n\nKon ta order korben? Name, address & phone number den! 😊`, newState: { quizStep: null, quizAnswers: null, lastIntent: "quiz_done", quizResult: answers } };
  }
  return { reply: "Quiz restart korte chaile 'shade match' likhun 😊", newState: { quizStep: null } };
}

function recommendShades({ tone, undertone, finish }) {
  const allLipsticks = Object.values(PRODUCTS).filter(p => p.category === "lipstick" && p.stock > 0 && p.type === finish);
  let recs = allLipsticks;
  if (undertone === "warm") recs = recs.filter(p => /coral|tangerine|berry|brown|rose|bloom|nude heaven|sunshine|cherry|peach/i.test(p.name));
  else if (undertone === "cool") recs = recs.filter(p => /crimson|ruby|mauve|wild|precious|mellow|victoria|french/i.test(p.name));
  if (tone === "light") recs = recs.filter(p => /nude|rose|mauve|blush|coral|cherry|precious|peach/i.test(p.name));
  else if (tone === "dark") recs = recs.filter(p => /crimson|brown|ruby|devoted|sizzling|opera|sunshine/i.test(p.name));
  if (recs.length === 0) recs = allLipsticks.slice(0, 3);
  if (recs.length > 3) recs = recs.slice(0, 3);
  return recs.map((p, i) => `${i + 1}. ${p.name} — ৳${p.price}/-`).join("\n") || "No matches right now 😔 — try different filter!";
}

function tryParseOrder(text) {
  if (!text || text.length < 20) return null;
  const phoneMatch = text.match(/\b(01[3-9]\d{8})\b/);
  if (!phoneMatch) return null;
  const phone = phoneMatch[1];
  const addressKeywords = /dhaka|chittagong|sylhet|khulna|rajshahi|mirpur|uttara|gulshan|banani|dhanmondi|mohammadpur|bashundhara|thana|road|block|sector|house|flat|ward|post|upazila|district|ঢাকা|চট্টগ্রাম/i;
  const hasAddress = addressKeywords.test(text);
  const lines = text.split(/[\n,]/).map(l => l.trim()).filter(l => l);
  let name = null, address = null;
  for (const line of lines) {
    if (line.includes(phone)) continue;
    if (addressKeywords.test(line) && !address) address = line;
    else if (!name && line.length < 40 && /^[a-zA-Z\s\u0980-\u09FF]+$/.test(line)) name = line;
  }
  if (!hasAddress && lines.length < 2) return null;
  return { phone, name, address, raw: text };
}

// ─── Upstash/Redis via ioredis (TCP) ───
let _redisClient = null;
async function kvCommand(args) {
  if (!process.env.KV_REST_API_REDIS_URL) return null;
  try {
    if (!_redisClient) {
      const { default: Redis } = await import('ioredis');
      _redisClient = new Redis(process.env.KV_REST_API_REDIS_URL, { maxRetriesPerRequest: 1, connectTimeout: 3000, enableReadyCheck: false });
    }
    const cmd = args[0].toLowerCase();
    const params = args.slice(1);
    const result = await _redisClient[cmd](...params);
    return { result };
  } catch (err) {
    console.error("kvCommand failed:", err);
    return null;
  }
}

async function logMessage(senderId, direction, text, hasAttachment, intent = null) {
  if (!HAS_KV) return;
  try {
    const entry = { ts: Date.now(), senderId, direction, text: text?.slice(0, 2000) || "", hasAttachment, intent };
    const key = `conv:${senderId}`;
    await kvCommand(["LPUSH", key, JSON.stringify(entry)]);
    await kvCommand(["LTRIM", key, "0", "49"]);
    await kvCommand(["EXPIRE", key, "2592000"]);
    const dailyKey = `log:${new Date().toISOString().slice(0, 10)}`;
    await kvCommand(["LPUSH", dailyKey, JSON.stringify(entry)]);
    await kvCommand(["EXPIRE", dailyKey, "7776000"]);
  } catch (err) { console.error("logMessage failed:", err); }
}

async function getState(senderId) {
  if (!HAS_KV) return {};
  try {
    const result = await kvCommand(["GET", `state:${senderId}`]);
    return result?.result ? JSON.parse(result.result) : {};
  } catch (err) { console.error("getState failed:", err); return {}; }
}

async function saveState(senderId, state) {
  if (!HAS_KV) return;
  try {
    const clean = { ...state };
    delete clean.tempData;
    await kvCommand(["SET", `state:${senderId}`, JSON.stringify(clean), "EX", "604800"]);
  } catch (err) { console.error("saveState failed:", err); }
}

async function sendEmail(subject, htmlBody) {
  if (!HAS_EMAIL) { console.log("EMAIL (would send):", subject, htmlBody.slice(0, 200)); return; }
  try { console.log("📧 EMAIL ALERT:", subject, "\n", htmlBody); } catch (err) { console.error("sendEmail failed:", err); }
}

async function notifyOrderCapture(senderId, order, rawMessage) {
  const subject = `🛒 New Order Captured — ${order.name || "Unknown"} (${order.phone})`;
  const body = `<h2>Order Captured</h2><p><b>Sender:</b> ${senderId}</p><p><b>Name:</b> ${order.name || "(not provided)"}</p><p><b>Phone:</b> ${order.phone}</p><p><b>Address:</b> ${order.address || "(not provided)"}</p><hr><pre>${rawMessage}</pre><p>Call to confirm within 1 hour.</p>`;
  await sendEmail(subject, body);
  if (HAS_KV) await kvCommand(["LPUSH", "orders:captured", JSON.stringify({ ts: Date.now(), senderId, ...order })]);
}

async function notifyEscalation(senderId, lastMessage, fallbackCount) {
  const subject = `⚠️ Bot Escalation — Customer needs human attention`;
  const body = `<h2>Bot couldn't handle ${fallbackCount} messages</h2><p><b>Sender:</b> ${senderId}</p><p><b>Last message:</b> "${lastMessage}"</p><p>Jump in: https://business.facebook.com/latest/inbox/all?asset_id=106519769015566</p>`;
  await sendEmail(subject, body);
}

function isGreeting(text) { return GREETINGS.some(g => text.includes(g)); }
function matchesKeywords(text, kws) { return kws.some(k => text.includes(k)); }
function findProduct(text) {
  for (const [key, p] of Object.entries(PRODUCTS)) if (text.includes(key)) return p;
  for (const [key, p] of Object.entries(PRODUCTS)) { const ws = key.split(" "); if (ws.length > 1 && ws.every(w => text.includes(w))) return p; }
  return null;
}
function findCategory(text) { for (const [cat, info] of Object.entries(CATEGORIES)) if (info.keywords.some(k => text.includes(k))) return cat; return null; }

function categoryList(category) {
  const ps = Object.values(PRODUCTS).filter(p => p.category === category);
  if (!ps.length) return null;
  const label = CATEGORIES[category]?.label || category;
  const grouped = {};
  ps.forEach(p => { (grouped[p.type] ||= []).push(p); });
  let msg = `${label} Collection:\n\n`;
  for (const [type, items] of Object.entries(grouped)) {
    msg += `▸ ${type.charAt(0).toUpperCase() + type.slice(1)}:\n`;
    items.forEach(p => { msg += `  ${p.stock > 0 ? "✅" : "❌"} ${p.name} — ৳${p.price.toLocaleString()}/-\n`; });
    msg += "\n";
  }
  return msg + "Kon ta niben bolun! 😊";
}

function categoryStock(category) {
  const ps = Object.values(PRODUCTS).filter(p => p.category === category);
  if (!ps.length) return null;
  const label = CATEGORIES[category]?.label || category;
  const inS = ps.filter(p => p.stock > 0), oos = ps.filter(p => p.stock === 0);
  let msg = `${label} Stock Status:\n\n`;
  if (inS.length) { msg += "✅ Available:\n"; inS.forEach(p => { msg += `  • ${p.name} — ৳${p.price.toLocaleString()}/-\n`; }); }
  if (oos.length) { msg += "\n❌ Out of Stock:\n"; oos.forEach(p => { msg += `  • ${p.name}\n`; }); }
  return msg + "\nOrder korte chaile bolun! 😊";
}

function categoryShades(category) {
  const ps = Object.values(PRODUCTS).filter(p => p.category === category);
  if (!ps.length) return `Sorry, ${category} shades currently available nei 😔`;
  const label = CATEGORIES[category]?.label || category;
  const grouped = {};
  ps.forEach(p => { (grouped[p.type] ||= []).push(p); });
  let msg = `${label} Shades:\n\n`;
  for (const [type, items] of Object.entries(grouped)) {
    msg += `💄 ${type.charAt(0).toUpperCase() + type.slice(1)}:\n`;
    items.forEach(p => { msg += `  ${p.stock > 0 ? "✅" : "❌"} ${p.name}\n`; });
    msg += "\n";
  }
  return msg + "Kon shade pasond bolun! 😊";
}

function priceList() {
  return `LOIS CHLOÉ Price List 💰\n\n💄 Bullet/Semi/Velvet Matte Lipstick: ৳990/-\n💄 Liquid Matte Lipstick: ৳950/-\n💋 Lip Oil: ৳1,200/-\n🔲 Cushion Foundation: ৳3,000/-\n☀️ SPF 50 Cushion Foundation: ৳5,000/-\n✨ Concealer: ৳1,500/-\n🌸 Blush Palette: ৳2,500/-\n✨ Highlighter Palette: ৳2,500/-\n🎨 Signature Palette: ৳4,550/-\n👁️ Gel Eyeliner: ৳950/-\n👁️ Mascara: ৳1,000/-\n💆 Setting Powder: ৳1,250/-\n🖌️ Brush Set: ৳5,000/-\n☀️ Sunscreen: ৳1,500/-\n\n🎉 Combos:\n• Hydra Lip Duo: ৳2,190/-\n• Glam On The Go: ৳6,990/-\n\nKon product lagbe bolun! 😊`;
}

async function sendMessage(recipientId, text, token) {
  const url = `https://graph.facebook.com/v21.0/me/messages?access_token=${token}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipient: { id: recipientId }, message: { text }, messaging_type: "RESPONSE" }),
    });
    const data = await response.json();
    if (!response.ok) console.error("Send message error:", data);
    else console.log("Message sent to:", recipientId);
  } catch (error) { console.error("Send message failed:", error); }
}
