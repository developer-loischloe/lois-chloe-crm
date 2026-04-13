// Lois Chloé CRM - Messenger & Instagram Webhook Server
// Deployed on Vercel as a serverless function

const VERIFY_TOKEN = "loischloe_crm_2026";

// Product catalog with prices and stock
const PRODUCTS = {
  // FACE
  "cushion foundation 1.5": { name: "Cushion Foundation Shade 1.5", price: 3000, stock: 16 },
  "cushion foundation 3.0": { name: "Cushion Foundation Shade 3.0", price: 3000, stock: 5 },
  "spf cushion foundation": { name: "UV Waterful Cushion Foundation SPF 50", price: 5000, stock: 63 },
  "concealer 1.5": { name: "Full Coverage Concealer Shade 1.5", price: 1500, stock: 0 },
  "concealer 3.0": { name: "Full Coverage Concealer Shade 3.0", price: 1500, stock: 688 },
  "bloom palette": { name: "D'L Bloom Palette (Blush)", price: 2500, stock: 364 },
  "glow palette": { name: "D'L Glow Face Palette (Highlighter)", price: 2500, stock: 1158 },
  "setting powder": { name: "Translucent Setting Powder", price: 1250, stock: 0 },
  "sunscreen": { name: "Sunscreen Cream", price: 1500, stock: 0 },

  // LIPS - Bullet Matte
  "sizzling brown": { name: "Sizzling Brown (Bullet Matte)", price: 990, stock: 433 },
  "nude blush": { name: "Nude Blush (Bullet Matte)", price: 990, stock: 216 },
  "lois tangerine": { name: "Lois Tangerine (Bullet Matte)", price: 990, stock: 67 },
  "nude classic": { name: "Nude Classic (Bullet Matte)", price: 990, stock: 0 },
  "french love": { name: "French Love (Bullet Matte)", price: 990, stock: 0 },
  "blushing chloe": { name: "Blushing Chloe (Bullet Matte)", price: 990, stock: 0 },
  "mellow nude": { name: "Mellow Nude (Bullet Matte)", price: 990, stock: 0 },

  // LIPS - Semi Matte
  "victoria rose": { name: "Victoria Rose (Semi Matte)", price: 990, stock: 0 },
  "sexy coral": { name: "Sexy Coral (Semi Matte)", price: 990, stock: 26 },
  "ruby dance": { name: "Ruby Dance (Semi Matte)", price: 990, stock: 7 },
  "crimson": { name: "Crimson (Semi Matte)", price: 990, stock: 5 },

  // LIPS - Liquid Matte
  "opera love": { name: "Opera Love (Liquid Matte)", price: 950, stock: 144 },
  "valentine crescent": { name: "Valentine Crescent (Liquid Matte)", price: 950, stock: 10 },

  // LIPS - New Stock
  "rose chloe": { name: "Rose Chloe", price: 990, stock: 192 },
  "wild flower": { name: "Wild Flower", price: 990, stock: 896 },
  "crimson love": { name: "Crimson Love", price: 990, stock: 328 },
  "mauve moment": { name: "Mauve Moment", price: 990, stock: 674 },

  // LIPS - Other Old Stock
  "cherry kiss": { name: "Cherry Kiss", price: 990, stock: 65 },
  "precious love": { name: "Precious Love", price: 990, stock: 20 },
  "coral harbour": { name: "Coral Harbour", price: 990, stock: 304 },
  "devoted lois": { name: "Devoted Lois", price: 990, stock: 262 },
  "nude heaven": { name: "Nude Heaven", price: 990, stock: 77 },
  "sunshine berry": { name: "Sunshine Berry", price: 990, stock: 264 },

  // LIP OIL
  "lip oil": { name: "Rouge Chloé Lip Oil", price: 1200, stock: 0 },

  // EYES
  "eyeliner black": { name: "Gel Eyeliner Black", price: 950, stock: 0 },
  "eyeliner brown": { name: "Gel Eyeliner Brown", price: 950, stock: 383 },
  "mascara": { name: "Perfect Lash Mascara", price: 1000, stock: 111 },
  "signature palette": { name: "D'L Signature Palette", price: 4550, stock: 377 },

  // TOOLS
  "brush set": { name: "Signature Brush Set", price: 5000, stock: 1376 },
};

// Active offers
const OFFERS = {
  "hydra lip duo": { name: "Hydra Lip Duo", price: 2190, description: "2 lipstick combo offer" },
  "glam on the go": { name: "Glam On The Go", price: 6990, description: "Full glam combo offer" },
};

// Delivery info
const DELIVERY = {
  insideDhaka: { cost: 60, time: "72 hours" },
  outsideDhaka: { cost: 100, time: "48 hours dispatch" },
  method: "Pathao",
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Webhook verification
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verified!");
      return res.status(200).send(challenge);
    } else {
      return res.status(403).send("Forbidden");
    }
  }

  if (req.method === "POST") {
    const body = req.body;
    console.log("Received webhook event:", JSON.stringify(body, null, 2));

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

async function handleMessage(event) {
  const senderId = event.sender.id;
  const messageText = event.message?.text?.toLowerCase() || "";
  const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

  if (!PAGE_ACCESS_TOKEN) {
    console.error("PAGE_ACCESS_TOKEN not set");
    return;
  }

  // Skip if prebook related
  if (messageText.includes("prebook") || messageText.includes("pre-book") || messageText.includes("pre book")) {
    console.log("Skipping prebook conversation");
    return;
  }

  let reply = "";

  // Check for greetings
  if (isGreeting(messageText)) {
    reply = "Hi! Welcome to LOIS CHLOÉ 🇦🇺\nAmader kache lipstick, foundation, concealer, eyeliner, mascara sob available.\nKon product e interested bolun!";
  }
  // Check for price inquiry
  else if (messageText.includes("price") || messageText.includes("dam") || messageText.includes("daam") || messageText.includes("koto") || messageText.includes("cost")) {
    reply = generatePriceList();
  }
  // Check for delivery inquiry
  else if (messageText.includes("delivery") || messageText.includes("shipping") || messageText.includes("pathao") || messageText.includes("kobe pabo")) {
    reply = `Delivery info:\nInside Dhaka: ৳${DELIVERY.insideDhaka.cost}, within ${DELIVERY.insideDhaka.time}\nOutside Dhaka: ৳${DELIVERY.outsideDhaka.cost}\nDispatch within 48 hours\nDelivery via ${DELIVERY.method}`;
  }
  // Check for offers
  else if (messageText.includes("offer") || messageText.includes("combo") || messageText.includes("discount")) {
    reply = "Current offers:\n1. Hydra Lip Duo - ৳2,190/-\n2. Glam On The Go - ৳6,990/-\nInterested holei bolun!";
  }
  // Check for order intent
  else if (messageText.includes("order") || messageText.includes("buy") || messageText.includes("nibo") || messageText.includes("lagbe") || messageText.includes("chai")) {
    reply = "Order er jonno apnar name, full address ar phone number ta den please!";
  }
  // Check for specific product mentions
  else {
    const matchedProduct = findProduct(messageText);
    if (matchedProduct) {
      if (matchedProduct.stock > 0) {
        reply = `${matchedProduct.name}\nPrice: ৳${matchedProduct.price}/-\nStock available ✅\nOrder korte chaile name, address ar phone number den!`;
      } else {
        reply = `Sorry, ${matchedProduct.name} ekhon out of stock 😔\nOther products dekhte chan?`;
      }
    } else {
      // Default response
      reply = "Apnar query bujhte parchi! Kon product e interested? Amader kache lipstick, foundation, concealer, eyeliner, mascara, brush set available. Bolun ki lagbe!";
    }
  }

  if (reply) {
    await sendMessage(senderId, reply, PAGE_ACCESS_TOKEN);
  }
}

function isGreeting(text) {
  const greetings = ["hello", "hi", "hey", "assalamu", "salam", "good morning", "good evening", "good afternoon", "hlo", "hlw", "হ্যালো", "হেলো", "সালাম", "আসসালামু", "হাই", "নমস্কার"];
  return greetings.some((g) => text.includes(g));
}

function findProduct(text) {
  for (const [key, product] of Object.entries(PRODUCTS)) {
    if (text.includes(key)) return product;
  }
  // Fuzzy match on product names
  for (const [key, product] of Object.entries(PRODUCTS)) {
    const words = key.split(" ");
    if (words.length > 1 && words.every((w) => text.includes(w))) return product;
  }
  return null;
}

function generatePriceList() {
  return `LOIS CHLOÉ Price List:\n\n💄 Lipstick (Bullet/Semi Matte): ৳990/-\n💄 Liquid Matte Lipstick: ৳950/-\n💋 Lip Oil: ৳1,200/-\n🔲 Foundation: ৳3,000/-\n☀️ SPF Cushion Foundation: ৳5,000/-\n✨ Concealer: ৳1,500/-\n🌸 Blush Palette: ৳2,500/-\n✨ Highlighter Palette: ৳2,500/-\n👁️ Eyeliner: ৳950/-\n👁️ Mascara: ৳1,000/-\n🎨 Signature Palette: ৳4,550/-\n🖌️ Brush Set: ৳5,000/-\n\nKon product lagbe bolun!`;
}

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
