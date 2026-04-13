const VERIFY_TOKEN = "loischloe_crm_2026";

// ─── PRODUCT DATABASE ───
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
  // Bullet Matte Lipsticks
  "sizzling brown": { name: "Sizzling Brown (Bullet Matte)", price: 990, stock: 433, category: "lipstick", type: "bullet matte" },
  "nude blush": { name: "Nude Blush (Bullet Matte)", price: 990, stock: 216, category: "lipstick", type: "bullet matte" },
  "lois tangerine": { name: "Lois Tangerine (Bullet Matte)", price: 990, stock: 67, category: "lipstick", type: "bullet matte" },
  "nude classic": { name: "Nude Classic (Bullet Matte)", price: 990, stock: 0, category: "lipstick", type: "bullet matte" },
  "french love": { name: "French Love (Bullet Matte)", price: 990, stock: 0, category: "lipstick", type: "bullet matte" },
  "blushing chloe": { name: "Blushing Chloe (Bullet Matte)", price: 990, stock: 0, category: "lipstick", type: "bullet matte" },
  "mellow nude": { name: "Mellow Nude (Bullet Matte)", price: 990, stock: 0, category: "lipstick", type: "bullet matte" },
  // Semi Matte Lipsticks
  "victoria rose": { name: "Victoria Rose (Semi Matte)", price: 990, stock: 0, category: "lipstick", type: "semi matte" },
  "sexy coral": { name: "Sexy Coral (Semi Matte)", price: 990, stock: 26, category: "lipstick", type: "semi matte" },
  "ruby dance": { name: "Ruby Dance (Semi Matte)", price: 990, stock: 7, category: "lipstick", type: "semi matte" },
  "crimson": { name: "Crimson (Semi Matte)", price: 990, stock: 5, category: "lipstick", type: "semi matte" },
  // Liquid Matte Lipsticks
  "opera love": { name: "Opera Love (Liquid Matte)", price: 950, stock: 144, category: "lipstick", type: "liquid matte" },
  "valentine crescent": { name: "Valentine Crescent (Liquid Matte)", price: 950, stock: 10, category: "lipstick", type: "liquid matte" },
  // Velvet Matte Lipsticks (new range)
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
  // Other products
  "lip oil": { name: "Rouge Chloé Lip Oil", price: 1200, stock: 0, category: "lip oil", type: "oil" },
  "eyeliner black": { name: "Gel Eyeliner Black", price: 950, stock: 0, category: "eyeliner", type: "gel" },
  "eyeliner brown": { name: "Gel Eyeliner Brown", price: 950, stock: 383, category: "eyeliner", type: "gel" },
  "mascara": { name: "Perfect Lash Mascara", price: 1000, stock: 111, category: "mascara", type: "lash" },
  "signature palette": { name: "D'L Signature Palette", price: 4550, stock: 377, category: "palette", type: "signature" },
  "brush set": { name: "Signature Brush Set", price: 5000, stock: 1376, category: "brush", type: "set" },
};

const OFFERS = {
  "hydra lip duo": { name: "Hydra Lip Duo", price: 2190, description: "2 lipstick combo offer" },
  "glam on the go": { name: "Glam On The Go", price: 6990, description: "Full glam combo offer" },
};

const DELIVERY = {
  insideDhaka: { cost: 60, time: "72 hours" },
  outsideDhaka: { cost: 100, time: "48 hours dispatch" },
  method: "Pathao",
};

// ─── CATEGORY MAP (for category-level queries) ───
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

// ─── GREETINGS ───
const GREETINGS = [
  "hello", "hi", "hey", "assalamu", "salam", "walaikum",
  "good morning", "good evening", "good afternoon",
  "hlo", "hlw", "hii", "hiii", "hiiii",
  "হ্যালো", "হেলো", "সালাম", "আসসালামু", "হাই", "নমস্কার",
  "ওয়ালাইকুম", "শুভ সকাল", "শুভ সন্ধ্যা",
  "sup", "yo", "hola",
];

// ─── BANGLA KEYWORD MAPS ───
const BANGLA_KEYWORDS = {
  price: ["দাম", "কত", "প্রাইস", "টাকা", "কত টাকা", "dam", "daam", "koto", "koto taka", "price", "cost"],
  delivery: ["ডেলিভারি", "শিপিং", "কবে পাবো", "কবে পাব", "পাঠাও", "delivery", "shipping", "pathao", "kobe pabo", "kobe dibe"],
  order: ["অর্ডার", "কিনব", "নিব", "লাগবে", "চাই", "দিন", "order", "buy", "nibo", "lagbe", "chai", "kinbo", "din", "diben"],
  offer: ["অফার", "কম্বো", "ডিসকাউন্ট", "ছাড়", "offer", "combo", "discount"],
  stock: ["স্টক", "আছে", "পাওয়া যাবে", "এভেইলেবল", "stock", "available", "ache", "pawa jabe", "ase"],
  shade: ["শেড", "কালার", "রং", "কোন শেড", "shade", "color", "colour", "rong", "kon shade"],
  original: ["অরিজিনাল", "আসল", "নকল না তো", "original", "asol", "nokol", "genuine", "real", "fake"],
  payment: ["পেমেন্ট", "বিকাশ", "নগদ", "ক্যাশ অন", "payment", "bkash", "bikash", "nagad", "cod", "cash on delivery", "rocket"],
  returnPolicy: ["রিটার্ন", "এক্সচেঞ্জ", "ফেরত", "return", "exchange", "refund", "ferat"],
  matte: ["ম্যাট", "সেমি ম্যাট", "লিকুইড ম্যাট", "বুলেট", "matte", "semi matte", "liquid matte", "bullet", "velvet"],
  thanks: ["ধন্যবাদ", "থ্যাংকস", "thanks", "thank you", "thanku", "tnx", "ty", "dhonnobad", "ধন্যবাদ"],
  ok: ["ঠিক আছে", "ok", "okay", "ওকে", "আচ্ছা", "accha", "ji", "জি", "hmm"],
};

// ─── MAIN HANDLER ───
export default async function handler(req, res) {
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }
    return res.status(403).send("Forbidden");
  }

  if (req.method === "POST") {
    const body = req.body;
    console.log("Webhook event:", JSON.stringify(body, null, 2));

    if (body.object === "page" || body.object === "instagram") {
      const promises = [];
      body.entry?.forEach((entry) => {
        entry.messaging?.forEach((event) => {
          if (event.message && !event.message.is_echo) {
            promises.push(handleMessage(event));
          }
        });
      });
      await Promise.all(promises);
      return res.status(200).send("EVENT_RECEIVED");
    }
    return res.status(404).send("Not Found");
  }
  return res.status(405).send("Method Not Allowed");
}

// ─── MESSAGE HANDLER ───
async function handleMessage(event) {
  const senderId = event.sender.id;
  const messageText = event.message?.text?.toLowerCase()?.trim() || "";
  const hasAttachment = event.message?.attachments?.length > 0;
  const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

  if (!PAGE_ACCESS_TOKEN) {
    console.error("PAGE_ACCESS_TOKEN not set");
    return;
  }

  // Skip prebook conversations
  if (messageText.includes("prebook") || messageText.includes("pre-book") || messageText.includes("pre book")) {
    console.log("Skipping prebook conversation");
    return;
  }

  let reply = "";

  // 1. Handle attachments (images, stickers, reactions from ad clicks)
  if (hasAttachment && !messageText) {
    const attachmentType = event.message.attachments[0]?.type;
    if (attachmentType === "image") {
      reply = "Thanks for the image! 😊\nApni ki kono product er shade dekhte chacchen? Amader lipstick, foundation, concealer sob available.\nKon product e interested bolun!";
    } else if (attachmentType === "sticker") {
      reply = "😊 Hi! LOIS CHLOÉ te welcome!\nAmader products dekhte chaile bolun — lipstick, foundation, concealer, eyeliner sob available!";
    } else if (attachmentType === "audio" || attachmentType === "video") {
      reply = "Thanks! Apnar message ta peyechi.\nKono product er details ba price jante chaile bolun, ami help korbo! 😊";
    } else {
      reply = "Thanks for reaching out! 😊\nLOIS CHLOÉ te ki dekhben bolun — lipstick, foundation, concealer, eyeliner, mascara sob available!";
    }
    await sendMessage(senderId, reply, PAGE_ACCESS_TOKEN);
    return;
  }

  // If only attachment with text, process the text part
  if (!messageText && !hasAttachment) return;

  // 2. Greetings
  if (isGreeting(messageText)) {
    reply = "Hi! Welcome to LOIS CHLOÉ 🇦🇺✨\n\nAmader kache available products:\n💄 Lipstick (Bullet/Semi/Liquid/Velvet Matte)\n🔲 Cushion Foundation\n✨ Concealer\n🌸 Blush & Highlighter Palette\n👁️ Eyeliner & Mascara\n🎨 Signature Palette\n🖌️ Brush Set\n\nKon product e interested? Bolun! 😊";
  }
  // 3. Thanks / acknowledgement
  else if (matchesKeywords(messageText, BANGLA_KEYWORDS.thanks)) {
    reply = "You're welcome! 😊\nAr kono product dekhte chaile bolun. LOIS CHLOÉ always here to help! ❤️";
  }
  // 4. Simple OK / acknowledgement
  else if (matchesKeywords(messageText, BANGLA_KEYWORDS.ok) && messageText.length < 15) {
    reply = "Ji! 😊 Ar kichu jante chaile bolun!";
  }
  // 5. Originality / authenticity questions
  else if (matchesKeywords(messageText, BANGLA_KEYWORDS.original)) {
    reply = "LOIS CHLOÉ 100% Australian brand 🇦🇺\nAmar sob products original and certified.\nBangladesh e official distributor er through e sell hoy.\nSafe & quality guaranteed! ✅";
  }
  // 6. Payment method questions
  else if (matchesKeywords(messageText, BANGLA_KEYWORDS.payment)) {
    reply = "Payment options:\n💰 Cash on Delivery (COD)\n📱 bKash\n📱 Nagad\n📱 Rocket\n\nAdvance payment e kono extra charge nei!\nOrder confirm korte chaile name, address & phone number den 😊";
  }
  // 7. Return/exchange policy
  else if (matchesKeywords(messageText, BANGLA_KEYWORDS.returnPolicy)) {
    reply = "Return/Exchange Policy:\n📦 Delivery er somoy product check kore niben\n🔄 Damaged product paile 24 ghontar moddhe janaben\n📸 Unboxing video rakhle claim easy hoy\n\nAmra always customer satisfaction niye kaj kori! ✅";
  }
  // 8. Matte type questions
  else if (matchesKeywords(messageText, BANGLA_KEYWORDS.matte) && (messageText.includes("ki") || messageText.includes("naki") || messageText.includes("type") || messageText.includes("difference") || messageText.includes("parthokko"))) {
    reply = "Amader lipstick types:\n\n💄 Bullet Matte — Classic matte finish, long-lasting (৳990)\n💄 Semi Matte — Slightly glossy matte finish (৳990)\n💄 Liquid Matte — Liquid formula, full matte (৳950)\n💄 Velvet Matte — Smooth velvet finish, comfortable (৳990)\n\nKon type try korte chan? Shade dekhte chaile bolun! 😊";
  }
  // 9. Price queries
  else if (matchesKeywords(messageText, BANGLA_KEYWORDS.price)) {
    // Check if asking price of a specific product
    const product = findProduct(messageText);
    if (product) {
      reply = `${product.name}\nPrice: ৳${product.price.toLocaleString()}/-\n${product.stock > 0 ? "Stock available ✅" : "Currently out of stock 😔"}\n\nOrder korte chaile name, address & phone number den!`;
    } else {
      reply = generatePriceList();
    }
  }
  // 10. Delivery queries
  else if (matchesKeywords(messageText, BANGLA_KEYWORDS.delivery)) {
    reply = `🚚 Delivery Info:\n\n📍 Inside Dhaka: ৳${DELIVERY.insideDhaka.cost}/- (${DELIVERY.insideDhaka.time} e delivery)\n📍 Outside Dhaka: ৳${DELIVERY.outsideDhaka.cost}/- (${DELIVERY.outsideDhaka.time})\n🏍️ Delivery via: ${DELIVERY.method}\n\n💰 Payment: COD / bKash / Nagad / Rocket`;
  }
  // 11. Offer/combo queries
  else if (matchesKeywords(messageText, BANGLA_KEYWORDS.offer)) {
    reply = "🎉 Current Offers:\n\n1️⃣ Hydra Lip Duo — ৳2,190/- (2 lipstick combo)\n2️⃣ Glam On The Go — ৳6,990/- (Full glam combo)\n\nInterested holei bolun, details janai! 😊";
  }
  // 12. Stock availability queries
  else if (matchesKeywords(messageText, BANGLA_KEYWORDS.stock)) {
    const product = findProduct(messageText);
    if (product) {
      reply = product.stock > 0
        ? `${product.name} — Stock available ✅ (৳${product.price.toLocaleString()}/-)\nOrder korte chaile name, address & phone number den!`
        : `Sorry, ${product.name} ekhon out of stock 😔\nNotify korbo restock hole? Ar onno product dekhte chan?`;
    } else {
      // Check for category
      const cat = findCategory(messageText);
      if (cat) {
        reply = generateCategoryStock(cat);
      } else {
        reply = "Kon product er stock check korte chan? Product name bolun!\nAmader available categories: lipstick, foundation, concealer, eyeliner, mascara, blush, highlighter 😊";
      }
    }
  }
  // 13. Shade queries
  else if (matchesKeywords(messageText, BANGLA_KEYWORDS.shade)) {
    const cat = findCategory(messageText);
    if (cat) {
      reply = generateCategoryShades(cat);
    } else {
      reply = "Kon product er shades dekhte chan?\n💄 Lipstick shades\n🔲 Foundation shades\n✨ Concealer shades\n👁️ Eyeliner colors\n\nBolun ki lagbe! 😊";
    }
  }
  // 14. Order intent
  else if (matchesKeywords(messageText, BANGLA_KEYWORDS.order)) {
    const product = findProduct(messageText);
    if (product) {
      if (product.stock > 0) {
        reply = `${product.name} — ৳${product.price.toLocaleString()}/-\nOrder confirm korte apnar:\n📝 Full Name\n📍 Full Address\n📱 Phone Number\n\nPlease den! 😊`;
      } else {
        reply = `Sorry, ${product.name} ekhon out of stock 😔\nOther products dekhte chan?`;
      }
    } else {
      reply = "Order er jonno please den:\n📝 Full Name\n📍 Full Address (with area/thana)\n📱 Phone Number\n🎨 Product name & shade\n\nAmra confirm kore details janabo! 😊";
    }
  }
  // 15. Specific product match
  else {
    const product = findProduct(messageText);
    if (product) {
      if (product.stock > 0) {
        reply = `${product.name}\n💰 Price: ৳${product.price.toLocaleString()}/-\n✅ Stock available\n\nOrder korte chaile name, address & phone number den! 😊`;
      } else {
        reply = `${product.name}\n💰 Price: ৳${product.price.toLocaleString()}/-\n😔 Currently out of stock\n\nOther ${product.category} products dekhte chan?`;
      }
    } else {
      // 16. Category-level match
      const cat = findCategory(messageText);
      if (cat) {
        reply = generateCategoryList(cat);
      } else {
        // 17. Improved fallback
        reply = "Apnar message peyechi! 😊\n\nAmi help korte pari:\n💄 Product er details & price\n📦 Order place korte\n🚚 Delivery info\n🎉 Current offers\n\nKi jante chacchen bolun! Othoba ekta product name bolun — lipstick, foundation, concealer, eyeliner, mascara 😊";
      }
    }
  }

  if (reply) {
    await sendMessage(senderId, reply, PAGE_ACCESS_TOKEN);
  }
}

// ─── HELPER FUNCTIONS ───

function isGreeting(text) {
  return GREETINGS.some((g) => text.includes(g));
}

function matchesKeywords(text, keywords) {
  return keywords.some((k) => text.includes(k));
}

function findProduct(text) {
  // Exact key match first
  for (const [key, product] of Object.entries(PRODUCTS)) {
    if (text.includes(key)) return product;
  }
  // Multi-word partial match
  for (const [key, product] of Object.entries(PRODUCTS)) {
    const words = key.split(" ");
    if (words.length > 1 && words.every((w) => text.includes(w))) return product;
  }
  return null;
}

function findCategory(text) {
  for (const [cat, info] of Object.entries(CATEGORIES)) {
    if (info.keywords.some((k) => text.includes(k))) return cat;
  }
  return null;
}

function generateCategoryList(category) {
  const products = Object.values(PRODUCTS).filter((p) => p.category === category);
  if (products.length === 0) return null;

  const catLabel = CATEGORIES[category]?.label || category;
  let msg = `${catLabel} Collection:\n\n`;

  // Group by type
  const grouped = {};
  products.forEach((p) => {
    if (!grouped[p.type]) grouped[p.type] = [];
    grouped[p.type].push(p);
  });

  for (const [type, items] of Object.entries(grouped)) {
    msg += `▸ ${type.charAt(0).toUpperCase() + type.slice(1)}:\n`;
    items.forEach((p) => {
      const status = p.stock > 0 ? "✅" : "❌";
      msg += `  ${status} ${p.name} — ৳${p.price.toLocaleString()}/-\n`;
    });
    msg += "\n";
  }

  msg += "Kon ta niben bolun! 😊";
  return msg;
}

function generateCategoryStock(category) {
  const products = Object.values(PRODUCTS).filter((p) => p.category === category);
  if (products.length === 0) return null;

  const catLabel = CATEGORIES[category]?.label || category;
  const inStock = products.filter((p) => p.stock > 0);
  const outOfStock = products.filter((p) => p.stock === 0);

  let msg = `${catLabel} Stock Status:\n\n`;

  if (inStock.length > 0) {
    msg += "✅ Available:\n";
    inStock.forEach((p) => {
      msg += `  • ${p.name} — ৳${p.price.toLocaleString()}/-\n`;
    });
  }

  if (outOfStock.length > 0) {
    msg += "\n❌ Out of Stock:\n";
    outOfStock.forEach((p) => {
      msg += `  • ${p.name}\n`;
    });
  }

  msg += "\nOrder korte chaile bolun! 😊";
  return msg;
}

function generateCategoryShades(category) {
  const products = Object.values(PRODUCTS).filter((p) => p.category === category);
  if (products.length === 0) return `Sorry, ${category} shades currently available nei 😔`;

  const catLabel = CATEGORIES[category]?.label || category;
  let msg = `${catLabel} Shades/Options:\n\n`;

  const grouped = {};
  products.forEach((p) => {
    if (!grouped[p.type]) grouped[p.type] = [];
    grouped[p.type].push(p);
  });

  for (const [type, items] of Object.entries(grouped)) {
    msg += `💄 ${type.charAt(0).toUpperCase() + type.slice(1)}:\n`;
    items.forEach((p) => {
      const status = p.stock > 0 ? "✅" : "❌";
      msg += `  ${status} ${p.name}\n`;
    });
    msg += "\n";
  }

  msg += "Kon shade pasond bolun! 😊";
  return msg;
}

function generatePriceList() {
  return `LOIS CHLOÉ Price List 💰\n\n💄 Bullet/Semi/Velvet Matte Lipstick: ৳990/-\n💄 Liquid Matte Lipstick: ৳950/-\n💋 Lip Oil: ৳1,200/-\n🔲 Cushion Foundation: ৳3,000/-\n☀️ SPF 50 Cushion Foundation: ৳5,000/-\n✨ Concealer: ৳1,500/-\n🌸 Blush Palette: ৳2,500/-\n✨ Highlighter Palette: ৳2,500/-\n🎨 Signature Palette: ৳4,550/-\n👁️ Gel Eyeliner: ৳950/-\n👁️ Mascara: ৳1,000/-\n💆 Setting Powder: ৳1,250/-\n🖌️ Brush Set: ৳5,000/-\n☀️ Sunscreen: ৳1,500/-\n\n🎉 Combos:\n• Hydra Lip Duo: ৳2,190/-\n• Glam On The Go: ৳6,990/-\n\nKon product lagbe bolun! 😊`;
}

// ─── SEND MESSAGE ───
async function sendMessage(recipientId, text, token) {
  const url = `https://graph.facebook.com/v21.0/me/messages?access_token=${token}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: { text },
        messaging_type: "RESPONSE",
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("Send message error:", data);
    } else {
      console.log("Message sent to:", recipientId);
    }
  } catch (error) {
    console.error("Send message failed:", error);
  }
}
