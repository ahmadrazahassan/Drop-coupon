import type { Category, Coupon, CouponWithStore, Store } from "./types";

/**
 * Mock data layer. All UI reads through the helper functions exported at the
 * bottom of this file, so swapping these arrays for a real API/DB later does
 * not require any component changes.
 *
 * Logos are real product favicons in /public/stores/{slug}.png — replace a file
 * there to swap a logo with no layout change.
 *
 * Offers: every `url` points to the tool's real site. Items flagged
 * `verified: true` describe genuine, publicly-documented promotions (student
 * programs, annual-billing savings, off-peak pricing, free trials). The short
 * alphanumeric strings on "code" items are illustrative placeholders that
 * demonstrate the reveal/copy flow — drop real codes in here when available.
 */

const categories: Category[] = [
  {
    slug: "ai-builders",
    name: "AI App & Web Builders",
    description:
      "Discounts on tools that build apps, sites, and internal tools from a prompt — v0, Lovable, Bolt, Bubble, and more.",
  },
  {
    slug: "ai-coding",
    name: "AI Coding Tools & IDEs",
    description:
      "Deals on AI pair programmers and editors like Cursor, Windsurf, GitHub Copilot, and Devin.",
  },
  {
    slug: "ai-chat",
    name: "AI Chat Assistants",
    description:
      "Savings on conversational assistants like ChatGPT, Claude, Gemini, Grok, and Poe.",
  },
  {
    slug: "ai-search",
    name: "AI Search Engines",
    description:
      "Offers on answer engines like Perplexity, You.com, Phind, and Kagi.",
  },
  {
    slug: "ai-software",
    name: "AI Software & Tools",
    description:
      "Promo codes for AI image, video, audio, and productivity software — Figma Weave, NVIDIA AI, Meshy, Kling, and more.",
  },
];

function store(
  slug: string,
  name: string,
  domain: string,
  categorySlug: string,
  description: string,
): Store {
  return {
    slug,
    name,
    logo: `/stores/${slug}.png`,
    description,
    url: `https://${domain}`,
    categorySlug,
  };
}

const stores: Store[] = [
  // ---- AI App & Web Builders ----
  store("v0", "v0", "v0.app", "ai-builders", "Generate UI and full-stack apps from prompts, by Vercel."),
  store("lovable", "Lovable", "lovable.dev", "ai-builders", "Build and ship full-stack web apps by chatting with AI."),
  store("base44", "Base44", "base44.com", "ai-builders", "Create custom business apps with AI — no code required."),
  store("bolt-new", "Bolt.new", "bolt.new", "ai-builders", "Prompt, run, edit, and deploy full-stack apps in the browser, by StackBlitz."),
  store("replit", "Replit", "replit.com", "ai-builders", "Cloud workspace with an AI Agent that builds and deploys apps."),
  store("create-xyz", "Create.xyz", "create.xyz", "ai-builders", "Turn plain text into sites, apps, and tools with AI."),
  store("databutton", "Databutton", "databutton.com", "ai-builders", "Build and host full-stack apps with an AI developer."),
  store("tempo", "Tempo", "tempo.new", "ai-builders", "Design and build React apps visually with AI."),
  store("softr", "Softr", "softr.io", "ai-builders", "Build client portals and internal tools on your data, with AI."),
  store("glide", "Glide", "glideapps.com", "ai-builders", "Turn spreadsheets and data into polished apps with AI."),
  store("framer", "Framer", "framer.com", "ai-builders", "Design and publish responsive websites with AI assistance."),
  store("webflow", "Webflow", "webflow.com", "ai-builders", "Visual web design and CMS with AI building blocks."),
  store("bubble", "Bubble", "bubble.io", "ai-builders", "Full-stack no-code app builder with an AI assistant."),
  store("flutterflow", "FlutterFlow", "flutterflow.io", "ai-builders", "Visually build native mobile and web apps with AI."),
  store("retool", "Retool", "retool.com", "ai-builders", "Build internal tools and apps fast, with AI."),
  store("builder-io", "Builder.io", "builder.io", "ai-builders", "Turn designs and prompts into production code, visually."),
  store("durable", "Durable", "durable.co", "ai-builders", "Generate a complete business website in seconds with AI."),
  store("dora", "Dora", "dora.run", "ai-builders", "Design and ship 3D, animated websites with AI — no code."),
  store("magic-patterns", "Magic Patterns", "magicpatterns.com", "ai-builders", "Generate and iterate on UI prototypes with AI."),
  store("locofy", "Locofy", "locofy.ai", "ai-builders", "Turn designs into front-end code with AI."),

  // ---- AI Coding Tools & IDEs ----
  store("cursor", "Cursor", "cursor.com", "ai-coding", "The AI code editor built for pair programming."),
  store("windsurf", "Windsurf", "windsurf.com", "ai-coding", "Agentic AI IDE from the Codeium team."),
  store("github-copilot", "GitHub Copilot", "github.com", "ai-coding", "AI pair programmer inside your editor, by GitHub."),
  store("cline", "Cline", "cline.bot", "ai-coding", "Autonomous coding agent for VS Code."),
  store("aider", "Aider", "aider.chat", "ai-coding", "AI pair programming in your terminal."),
  store("trae", "Trae", "trae.ai", "ai-coding", "Adaptive AI IDE by ByteDance."),
  store("zed", "Zed", "zed.dev", "ai-coding", "High-performance, AI-enabled code editor."),
  store("tabnine", "Tabnine", "tabnine.com", "ai-coding", "Private AI code completion for teams."),
  store("augment-code", "Augment Code", "augmentcode.com", "ai-coding", "AI coding platform with deep codebase context."),
  store("devin", "Devin", "devin.ai", "ai-coding", "Autonomous AI software engineer, by Cognition."),
  store("kiro", "Kiro", "kiro.dev", "ai-coding", "Agentic, spec-driven AI IDE from AWS."),
  store("cody", "Sourcegraph Cody", "sourcegraph.com", "ai-coding", "AI coding assistant with whole-codebase context."),
  store("continue", "Continue", "continue.dev", "ai-coding", "Open-source AI code assistant you can customize."),
  store("qodo", "Qodo", "qodo.ai", "ai-coding", "AI for code review, testing, and integrity."),
  store("supermaven", "Supermaven", "supermaven.com", "ai-coding", "Ultra-fast AI code completion."),
  store("warp", "Warp", "warp.dev", "ai-coding", "The agentic terminal with built-in AI."),
  store("amazon-q", "Amazon Q Developer", "aws.amazon.com", "ai-coding", "AWS's generative-AI assistant for developers."),
  store("jetbrains-ai", "JetBrains AI", "jetbrains.com", "ai-coding", "AI Assistant and the Junie agent across JetBrains IDEs."),

  // ---- AI Chat Assistants ----
  store("chatgpt", "ChatGPT", "chatgpt.com", "ai-chat", "Conversational AI assistant by OpenAI."),
  store("claude", "Claude", "claude.ai", "ai-chat", "Helpful, honest AI assistant by Anthropic."),
  store("gemini", "Gemini", "gemini.google.com", "ai-chat", "Multimodal AI assistant by Google."),
  store("grok", "Grok", "grok.com", "ai-chat", "Conversational AI by xAI."),
  store("deepseek", "DeepSeek", "deepseek.com", "ai-chat", "Open, capable AI chat and reasoning models."),
  store("le-chat", "Le Chat", "mistral.ai", "ai-chat", "AI assistant by Mistral."),
  store("microsoft-copilot", "Microsoft Copilot", "copilot.microsoft.com", "ai-chat", "AI companion across Microsoft apps and the web."),
  store("meta-ai", "Meta AI", "meta.ai", "ai-chat", "Assistant built on Llama, by Meta."),
  store("qwen", "Qwen", "chat.qwen.ai", "ai-chat", "AI chat and models by Alibaba."),
  store("poe", "Poe", "poe.com", "ai-chat", "Chat with many AI models in one app, by Quora."),
  store("character-ai", "Character.AI", "character.ai", "ai-chat", "Create and chat with AI characters."),
  store("pi", "Pi", "pi.ai", "ai-chat", "A personal, empathetic AI assistant by Inflection."),
  store("huggingchat", "HuggingChat", "huggingface.co", "ai-chat", "Open-source AI chat from Hugging Face."),
  store("kimi", "Kimi", "kimi.com", "ai-chat", "Long-context AI assistant by Moonshot AI."),
  store("cohere", "Cohere", "cohere.com", "ai-chat", "Enterprise AI assistant and models (North)."),
  store("manus", "Manus", "manus.im", "ai-chat", "General AI agent that completes tasks end to end."),

  // ---- AI Search Engines ----
  store("perplexity", "Perplexity", "perplexity.ai", "ai-search", "AI answer engine with cited sources."),
  store("you", "You.com", "you.com", "ai-search", "AI search and assistant for the web."),
  store("phind", "Phind", "phind.com", "ai-search", "AI answer engine built for developers."),
  store("komo", "Komo", "komo.ai", "ai-search", "Fast, private AI search."),
  store("andi", "Andi", "andisearch.com", "ai-search", "Conversational AI search assistant."),
  store("kagi", "Kagi", "kagi.com", "ai-search", "Premium, ad-free search with the Assistant."),
  store("brave-leo", "Brave", "brave.com", "ai-search", "Private search with the built-in Leo AI assistant."),
  store("exa", "Exa", "exa.ai", "ai-search", "Neural search API and websets for AI."),
  store("consensus", "Consensus", "consensus.app", "ai-search", "AI search over scientific research papers."),
  store("liner", "Liner", "getliner.com", "ai-search", "AI answer engine for students and researchers."),
  store("genspark", "Genspark", "genspark.ai", "ai-search", "AI agent and answer engine that builds Sparkpages."),

  // ---- AI Software & Tools ----
  store("figma-weave", "Figma Weave", "figma.com", "ai-software", "AI-assisted design and content tooling from Figma."),
  store("nvidia-ai", "NVIDIA AI", "nvidia.com", "ai-software", "AI software, models, and platforms from NVIDIA."),
  store("merlin-ai", "Merlin AI", "getmerlin.in", "ai-software", "An AI assistant extension for ChatGPT, Claude, and more."),
  store("freed", "Freed", "freed.ai", "ai-software", "AI medical scribe that writes clinical notes for clinicians."),
  store("meshy-ai", "Meshy AI", "meshy.ai", "ai-software", "Generate 3D models and textures from text or images."),
  store("hitpaw", "HitPaw", "hitpaw.com", "ai-software", "AI photo, video, and audio editing tools."),
  store("instantly", "Instantly", "instantly.ai", "ai-software", "AI cold-email outreach and lead-generation platform."),
  store("polycam", "Polycam", "poly.cam", "ai-software", "3D capture and LiDAR scanning with AI."),
  store("stratascratch", "StrataScratch", "stratascratch.com", "ai-software", "Practice real data-science and SQL interview questions."),
  store("geonode", "Geonode", "geonode.com", "ai-software", "Residential proxies and web-scraping infrastructure."),
  store("magai", "Magai", "magai.co", "ai-software", "All-in-one AI workspace for chat, images, and content."),
  store("supermeme", "Supermeme.ai", "supermeme.ai", "ai-software", "Generate memes from text in 110+ languages with AI."),
  store("popai", "PopAi", "popai.pro", "ai-software", "AI workspace for documents, presentations, and chat."),
  store("livingai", "LivingAI", "living.ai", "ai-software", "Maker of EMO and AI desktop companion robots."),
  store("retouch4me", "Retouch4me", "retouch4me.com", "ai-software", "AI photo-retouching plugins for professional editors."),
  store("receiptor-ai", "Receiptor AI", "receiptor.ai", "ai-software", "Automatically extract receipts and invoices from email."),
  store("flair-ai", "Flair AI", "flair.ai", "ai-software", "AI product photography and branded-content studio."),
  store("dewatermark", "Dewatermark", "dewatermark.ai", "ai-software", "Remove watermarks from images automatically with AI."),
  store("kling-ai", "Kling AI", "klingai.com", "ai-software", "AI video and image generation by Kuaishou."),
  store("kittl", "Kittl", "kittl.com", "ai-software", "AI-powered design platform for graphics and print."),
];

const storeBySlug = new Map(stores.map((s) => [s.slug, s]));

/** Compact helper that inherits the store's category and real URL. */
function coupon(
  id: string,
  storeSlug: string,
  type: Coupon["type"],
  discount: string,
  title: string,
  description: string,
  verified: boolean,
  expires: Coupon["expires"],
  code?: string,
): Coupon {
  const parent = storeBySlug.get(storeSlug);
  if (!parent) throw new Error(`Unknown store ${storeSlug} for coupon ${id}`);
  return {
    id,
    storeSlug,
    type,
    discount,
    title,
    description,
    verified,
    expires,
    code,
    url: parent.url,
    categorySlug: parent.categorySlug,
  };
}

// Shorthands to keep the offer list readable.
const deal = (id: string, slug: string, discount: string, title: string, desc: string, verified = false, expires: Coupon["expires"] = "ongoing") =>
  coupon(id, slug, "promo", discount, title, desc, verified, expires);
const code = (id: string, slug: string, discount: string, title: string, desc: string, codeStr: string, verified = false, expires: Coupon["expires"] = "ongoing") =>
  coupon(id, slug, "code", discount, title, desc, verified, expires, codeStr);

const coupons: Coupon[] = [
  // ---------------- AI App & Web Builders ----------------
  code("v0-1", "v0", "20% off", "20% off your first month of v0 Premium", "Apply at checkout on any paid v0 plan.", "V0PREMIUM", false, "2026-08-31"),
  deal("v0-2", "v0", "Save 20%", "Save ~20% on v0 with annual billing", "Switch to yearly billing to lower your monthly cost.", true),

  code("lovable-1", "lovable", "20% off", "20% off storewide at Lovable", "Apply this code at checkout for 20% off a Lovable subscription.", "HLGOFTY", true),
  code("lovable-2", "lovable", "20% off", "20% off storewide at Lovable", "Members-only code — paste it at checkout for 20% off.", "SIMON20YT", true),
  deal("lovable-3", "lovable", "2 months free", "Two months free on annual Lovable", "Annual billing includes roughly two months free.", true),

  code("base44-1", "base44", "15% off", "15% off any Base44 paid plan", "Apply at checkout on monthly or annual plans.", "BASE15"),
  deal("base44-2", "base44", "Save 20%", "Save ~20% with Base44 annual billing", "Yearly billing lowers the effective monthly price.", true),

  code("bolt-1", "bolt-new", "25% off", "25% off Bolt.new Pro", "Discount on your first Pro billing cycle.", "BOLT25", false, "2026-08-15"),
  deal("bolt-2", "bolt-new", "2 months free", "Two months free on annual Bolt Pro", "Annual billing includes about two months free.", true),

  code("replit-1", "replit", "25% off", "25% off your first month of Replit Core", "Apply at checkout toward the AI Agent and deployments.", "REPLIT25", false, "2026-09-15"),
  deal("replit-2", "replit", "Save 20%", "Save ~20% on annual Replit Core", "Yearly billing reduces the monthly price of Core.", true),

  code("create-1", "create-xyz", "20% off", "20% off Create.xyz Pro", "First-time subscribers save 20% on Pro.", "CREATE20"),
  deal("create-2", "create-xyz", "Save 15%", "Save ~15% on annual Create.xyz", "Annual billing lowers the monthly cost of Pro.", true),

  code("databutton-1", "databutton", "30% off", "30% off your first month of Databutton", "Discount on the first month of any paid tier.", "DBUTTON30", false, "2026-07-31"),
  deal("databutton-2", "databutton", "Save 20%", "Save ~20% with Databutton annual billing", "Yearly billing reduces the monthly price.", true),

  code("tempo-1", "tempo", "20% off", "20% off Tempo Pro", "Apply at checkout on a Pro subscription.", "TEMPO20"),
  deal("tempo-2", "tempo", "Save 15%", "Save ~15% on annual Tempo", "Annual billing lowers your monthly cost.", true),

  code("softr-1", "softr", "10% off", "10% off any Softr plan", "Discount on portals and internal-tool plans.", "SOFTR10"),
  deal("softr-2", "softr", "2 months free", "Two months free on annual Softr", "Switch to yearly billing to save.", true),

  code("glide-1", "glide", "20% off", "20% off Glide Maker plans", "Build data-driven apps for less with this code.", "GLIDE20", false, "2026-08-10"),
  deal("glide-2", "glide", "Save 20%", "Save ~20% on annual Glide", "Annual plans cost less per month.", true),

  code("framer-1", "framer", "25% off", "25% off your first year of Framer", "New annual subscriptions save 25%.", "FRAMER25", false, "2026-08-31"),
  deal("framer-2", "framer", "Save 20%", "Save ~20% on Framer with annual billing", "Yearly billing lowers the monthly price.", true),

  code("webflow-1", "webflow", "20% off", "20% off Webflow Site plans (annual)", "Discount on annual Site plan checkout.", "WEBFLOW20", false, "2026-07-31"),
  deal("webflow-2", "webflow", "Save up to 22%", "Save up to ~22% with Webflow annual billing", "Yearly plans are cheaper than paying monthly.", true),

  code("bubble-1", "bubble", "20% off", "20% off Bubble paid plans", "Apply at checkout on a monthly plan.", "BUBBLE20"),
  deal("bubble-2", "bubble", "Save ~17%", "Save ~17% on annual Bubble", "Yearly billing reduces the monthly price.", true),

  code("flutterflow-1", "flutterflow", "20% off", "20% off FlutterFlow Pro", "Apply at checkout on a Pro plan.", "FF20"),
  deal("flutterflow-2", "flutterflow", "Save 20%", "Save ~20% on annual FlutterFlow", "Yearly billing lowers the cost vs monthly.", true),

  code("retool-1", "retool", "20% off", "20% off Retool paid plans", "Discount for new individual or team plans.", "RETOOL20"),
  deal("retool-2", "retool", "Save 20%", "Save ~20% on annual Retool", "Annual billing lowers the per-seat cost.", true),

  code("builderio-1", "builder-io", "20% off", "20% off Builder.io paid plans", "Apply at checkout on a paid plan.", "BUILDER20"),
  deal("builderio-2", "builder-io", "Save 20%", "Save ~20% on annual Builder.io", "Yearly billing lowers the monthly price.", true),

  code("durable-1", "durable", "30% off", "30% off your first month of Durable", "Discount on any Durable paid plan.", "DURABLE30", false, "2026-07-20"),
  deal("durable-2", "durable", "Save 25%", "Save ~25% on annual Durable", "Yearly billing is cheaper than monthly.", true),

  code("dora-1", "dora", "20% off", "20% off Dora Pro", "Apply at checkout on a Pro plan.", "DORA20"),
  deal("dora-2", "dora", "Save 15%", "Save ~15% on annual Dora", "Annual billing lowers the monthly price.", true),

  code("magicpatterns-1", "magic-patterns", "20% off", "20% off Magic Patterns Pro", "Discount on a Pro subscription.", "MAGIC20"),
  deal("magicpatterns-2", "magic-patterns", "Save 20%", "Save ~20% on annual Magic Patterns", "Yearly billing lowers the cost.", true),

  code("locofy-1", "locofy", "20% off", "20% off Locofy Pro", "Apply at checkout on a Pro plan.", "LOCOFY20"),
  deal("locofy-2", "locofy", "Save 15%", "Save ~15% on annual Locofy", "Annual billing reduces the monthly price.", true),

  // ---------------- AI Coding Tools & IDEs ----------------
  deal("cursor-1", "cursor", "20% off", "20% off Cursor with annual billing", "Every paid Cursor plan is 20% cheaper billed yearly.", true),
  deal("cursor-2", "cursor", "Free year (students)", "Free year of Cursor Pro for students", "Verified students get a year of Pro free via SheerID (.edu).", true),
  code("cursor-3", "cursor", "20% off", "20% off your first month of Cursor Pro", "Apply at checkout on the Pro plan.", "CURSOR20", false, "2026-08-31"),

  deal("windsurf-1", "windsurf", "Free Pro (students)", "Free Windsurf Pro for verified students", "Students unlock Pro via SheerID verification.", true),
  deal("windsurf-2", "windsurf", "Save ~17%", "Save ~17% on annual Windsurf Pro", "Yearly billing is cheaper than paying monthly.", true),
  code("windsurf-3", "windsurf", "25% off", "25% off Windsurf Pro", "Apply at checkout on a Pro subscription.", "WINDSURF25", false, "2026-09-30"),

  deal("copilot-1", "github-copilot", "Free (students)", "GitHub Copilot free for verified students", "Students, teachers, and OSS maintainers get Copilot free via GitHub Education.", true),
  deal("copilot-2", "github-copilot", "Save ~17%", "Save ~17% on annual GitHub Copilot Pro", "Yearly billing ($100/yr) beats paying $10/month.", true),

  deal("cline-1", "cline", "Free & open-source", "Cline is free and open-source", "Bring your own API key — no subscription required.", true),
  deal("aider-1", "aider", "Free & open-source", "Aider is free and open-source", "Pay only for the model API you connect.", true),

  code("trae-1", "trae", "20% off", "20% off Trae Pro", "Apply at checkout on Pro features.", "TRAE20", false, "2026-07-31"),
  deal("trae-2", "trae", "Save 15%", "Save ~15% on annual Trae Pro", "Yearly billing lowers the monthly price.", true),

  code("zed-1", "zed", "20% off", "20% off Zed Pro", "Apply at checkout on the Pro AI plan.", "ZED20"),
  deal("zed-2", "zed", "Save ~17%", "Save ~17% on annual Zed Pro", "Yearly billing beats paying monthly.", true),

  code("tabnine-1", "tabnine", "15% off", "15% off Tabnine Dev", "Discount on the individual Dev plan.", "TABNINE15"),
  deal("tabnine-2", "tabnine", "Save 20%", "Save ~20% on annual Tabnine", "Annual billing lowers the per-seat cost.", true),

  code("augment-1", "augment-code", "25% off", "25% off Augment Code Pro", "Apply at checkout on a Pro plan.", "AUGMENT25", false, "2026-09-30"),
  deal("augment-2", "augment-code", "Save 20%", "Save ~20% on annual Augment Code", "Yearly billing lowers the monthly price.", true),

  code("devin-1", "devin", "20% off", "20% off your first month of Devin", "Discount on Core for the autonomous engineer.", "DEVIN20"),
  deal("devin-2", "devin", "Volume discounts", "Volume discounts on Devin Team plans", "Larger seat counts unlock lower per-seat pricing.", false),

  code("kiro-1", "kiro", "20% off", "20% off Kiro Pro", "Apply at checkout on a Pro plan.", "KIRO20"),
  deal("kiro-2", "kiro", "Save ~17%", "Save ~17% on annual Kiro", "Yearly billing is cheaper than monthly.", true),

  code("cody-1", "cody", "20% off", "20% off Sourcegraph Cody Pro", "Apply at checkout on the Pro plan.", "CODY20"),
  deal("cody-2", "cody", "Save 20%", "Save ~20% on annual Cody", "Yearly billing lowers the monthly price.", true),

  deal("continue-1", "continue", "Free & open-source", "Continue is free and open-source", "Self-host and customize your AI code assistant for free.", true),
  code("qodo-1", "qodo", "20% off", "20% off Qodo paid plans", "Apply at checkout on a Teams plan.", "QODO20"),
  code("supermaven-1", "supermaven", "20% off", "20% off Supermaven Pro", "Apply at checkout on the Pro plan.", "SUPER20"),
  code("warp-1", "warp", "20% off", "20% off Warp Pro", "Apply at checkout on a Pro plan.", "WARP20"),
  deal("amazonq-1", "amazon-q", "Save ~17%", "Save ~17% on annual Amazon Q Developer Pro", "Annual billing beats paying monthly per user.", true),
  deal("jetbrainsai-1", "jetbrains-ai", "Free (students)", "JetBrains tools free for students", "Verified students get JetBrains IDEs and AI features free via the education program.", true),
  code("jetbrainsai-2", "jetbrains-ai", "20% off", "20% off JetBrains AI Pro add-on", "Apply at checkout on the AI Pro subscription.", "JBAI20"),

  // ---------------- AI Chat Assistants ----------------
  code("chatgpt-1", "chatgpt", "20% off", "20% off your first month of ChatGPT Plus", "Apply at checkout on a Plus subscription.", "GPTPLUS20", false, "2026-08-31"),
  deal("chatgpt-2", "chatgpt", "Save ~17%", "Save ~17% on annual ChatGPT (Business)", "Yearly billing lowers the per-seat cost on team plans.", false),

  code("claude-1", "claude", "20% off", "20% off your first month of Claude Pro", "Apply at checkout on Claude Pro.", "CLAUDE20"),
  deal("claude-2", "claude", "Save ~17%", "Save ~17% on annual Claude Pro", "Yearly billing ($17/mo) beats $20 monthly.", true),

  deal("gemini-1", "gemini", "Free (students)", "Free Google AI Pro for eligible students", "Google has offered verified students Gemini AI Pro at no cost.", true),
  code("gemini-2", "gemini", "Save ~17%", "Save ~17% on annual Google AI Pro", "Yearly billing lowers the monthly price.", "GEMINI17"),

  code("grok-1", "grok", "20% off", "20% off SuperGrok", "Apply at checkout on a SuperGrok plan.", "GROK20"),
  deal("grok-2", "grok", "Save ~17%", "Save ~17% on annual SuperGrok", "Yearly billing beats paying monthly.", true),

  deal("deepseek-1", "deepseek", "Up to 75% off", "Up to 75% off DeepSeek API at off-peak hours", "API calls are heavily discounted during off-peak windows.", true),
  code("deepseek-2", "deepseek", "Bonus credits", "Bonus DeepSeek API credits with a promo", "Apply a promo on the billing page for extra credits.", "DEEPSEEK"),

  code("lechat-1", "le-chat", "20% off", "20% off Le Chat Pro", "Apply at checkout on Mistral's Le Chat Pro.", "LECHAT20"),
  deal("lechat-2", "le-chat", "Save ~17%", "Save ~17% on annual Le Chat Pro", "Yearly billing lowers the monthly price.", true),

  code("mscopilot-1", "microsoft-copilot", "20% off", "20% off your first month of Copilot Pro", "Apply at checkout on Microsoft Copilot Pro.", "MSCOPILOT20"),
  deal("mscopilot-2", "microsoft-copilot", "Bundled with 365", "Copilot included with Microsoft 365 plans", "Many Microsoft 365 subscriptions now include Copilot.", false),

  deal("metaai-1", "meta-ai", "Free", "Meta AI is free across Meta apps", "Use Meta AI free in WhatsApp, Instagram, Messenger, and the web.", true),

  code("qwen-1", "qwen", "20% off", "20% off Qwen API credits", "Apply a promo on the Qwen/DashScope billing page.", "QWEN20"),
  deal("qwen-2", "qwen", "Volume discounts", "Volume discounts on Qwen API", "Higher usage tiers lower the per-token price.", false),

  code("poe-1", "poe", "20% off", "20% off Poe Premium", "Apply at checkout on a Premium subscription.", "POE20"),
  deal("poe-2", "poe", "2 months free", "Two months free on annual Poe Premium", "Annual billing includes about two months free.", true),

  code("characterai-1", "character-ai", "20% off", "20% off c.ai+", "Apply at checkout on the c.ai+ subscription.", "CAI20"),
  deal("characterai-2", "character-ai", "Save ~17%", "Save ~17% on annual c.ai+", "Yearly billing beats paying monthly.", true),

  deal("pi-1", "pi", "Free", "Pi is free to use", "Inflection's empathetic assistant is available at no cost.", true),
  deal("huggingchat-1", "huggingchat", "Free & open-source", "HuggingChat is free and open-source", "Chat with open models at no cost.", true),

  code("kimi-1", "kimi", "20% off", "20% off Kimi paid plans", "Apply at checkout on a Kimi subscription.", "KIMI20"),
  deal("cohere-1", "cohere", "Free trial keys", "Free trial API keys from Cohere", "Build with rate-limited trial keys before production.", true),
  code("manus-1", "manus", "20% off", "20% off your first month of Manus", "Apply at checkout on a Manus plan.", "MANUS20"),

  // ---------------- AI Search Engines ----------------
  deal("perplexity-1", "perplexity", "1 free month (students)", "One free month of Perplexity Pro for students", "Verify with SheerID (.edu) for a free month of Pro.", true, "2026-05-31"),
  deal("perplexity-2", "perplexity", "50% off (students)", "Perplexity Education Pro at $10/mo", "Verified students keep Pro at half the standard price.", true),
  code("perplexity-3", "perplexity", "20% off", "20% off your first month of Perplexity Pro", "Apply at checkout on a Pro subscription.", "PPLX20"),

  code("you-1", "you", "20% off", "20% off You.com Pro", "Apply at checkout on a Pro plan.", "YOU20"),
  deal("you-2", "you", "2 months free", "Two months free on annual You.com Pro", "Annual billing includes about two months free.", true),

  code("phind-1", "phind", "20% off", "20% off Phind Pro", "Apply at checkout on a Pro subscription.", "PHIND20"),
  deal("phind-2", "phind", "Save ~17%", "Save ~17% on annual Phind Pro", "Yearly billing lowers the monthly price.", true),

  code("komo-1", "komo", "20% off", "20% off Komo Pro", "Apply at checkout on a Pro plan.", "KOMO20"),
  deal("komo-2", "komo", "Save ~17%", "Save ~17% on annual Komo Pro", "Yearly billing beats paying monthly.", true),

  deal("andi-1", "andi", "Free", "Andi search is free and ad-free", "Private conversational AI search at no cost.", true),

  code("kagi-1", "kagi", "20% off", "20% off your first month of Kagi", "Apply at checkout on a Kagi plan.", "KAGI20"),
  deal("kagi-2", "kagi", "Save ~17%", "Save ~17% on annual Kagi", "Yearly billing is cheaper than monthly.", true),

  code("braveleo-1", "brave-leo", "20% off", "20% off Leo Premium", "Apply at checkout on Brave's Leo Premium.", "BRAVE20"),
  deal("braveleo-2", "brave-leo", "Save ~17%", "Save ~17% on annual Leo Premium", "Yearly billing beats paying monthly.", true),

  deal("exa-1", "exa", "Free credits", "Free API credits to start with Exa", "New accounts get credits for neural search and websets.", true),
  code("exa-2", "exa", "20% off", "20% off Exa scale plans", "Apply a promo at checkout on a paid plan.", "EXA20"),

  code("consensus-1", "consensus", "20% off", "20% off Consensus Premium", "Apply at checkout on a Premium subscription.", "CONSENSUS20"),
  deal("consensus-2", "consensus", "Student discount", "Discounted Consensus Premium for students", "Verified students get a reduced Premium price.", false),

  code("liner-1", "liner", "20% off", "20% off Liner Pro", "Apply at checkout on a Pro subscription.", "LINER20"),
  deal("liner-2", "liner", "50% off (students)", "50% off Liner Pro for students", "Verified students get Pro at half price.", false),

  code("genspark-1", "genspark", "20% off", "20% off Genspark Plus", "Apply at checkout on a Plus plan.", "GENSPARK20"),
  deal("genspark-2", "genspark", "Save ~17%", "Save ~17% on annual Genspark Plus", "Yearly billing lowers the monthly price.", true),

  // ---------------- AI Software & Tools (community-sourced codes) ----------------
  code("figmaweave-1", "figma-weave", "30% off", "30% off a subscription plan", "Members-only code — 30% off a Figma Weave subscription plan.", "TDSunshine30", true),
  code("nvidiaai-1", "nvidia-ai", "50% off", "50% off storewide at NVIDIA AI", "Apply this code at checkout for 50% off storewide.", "DLIGTC50", true),
  code("merlinai-1", "merlin-ai", "$204 off", "$204 off a yearly subscription", "Members-only code — $204 off yearly Merlin AI plans.", "HY2", false),
  code("freed-1", "freed", "$50 off", "$50 off a Freed subscription", "Apply at checkout for $50 off your Freed plan.", "PHILLWELL50", true),
  code("meshyai-1", "meshy-ai", "$19 off", "$19 off a Studio subscription", "Apply at checkout for $19 off the Meshy AI Studio plan.", "FFBLOG", false),
  code("hitpaw-1", "hitpaw", "$5 off", "$5 off storewide at HitPaw", "Apply this code at checkout for $5 off storewide.", "AZ5OFF", true),
  code("instantly-1", "instantly", "20% off", "20% off 3 months of email outreach", "20% off three months of Instantly email-outreach plans.", "GETCLIENTS20", false),
  code("polycam-1", "polycam", "25% off", "25% off a Polycam subscription", "Apply at checkout for 25% off your subscription.", "25OFF", true),
  code("stratascratch-1", "stratascratch", "20% off", "20% off all StrataScratch plans", "Apply this code at checkout for 20% off all plans.", "ARCH10", true),
  code("geonode-1", "geonode", "10% off", "10% off storewide at Geonode", "Members-only code — 10% off storewide.", "COINGATE10", true),
  code("magai-1", "magai", "10% off", "10% off storewide at Magai", "Members-only code — 10% off storewide.", "DPFGET10", true),
  code("supermeme-1", "supermeme", "20% off", "20% off select items at Supermeme.ai", "Members-only code — 20% off select items.", "SAVEAI", true),
  code("popai-1", "popai", "20% off", "20% off a monthly subscription", "Members-only code — 20% off a PopAi monthly subscription.", "AIBOSS", true),
  code("livingai-1", "livingai", "$20 off", "$20 off EMO Go Home (White)", "Apply at checkout for $20 off the white EMO Go Home.", "EMOWHITE", true),
  code("retouch4me-1", "retouch4me", "20% off", "20% off all Retouch4me plugins", "20% off all plugins for followers of Marc Perino.", "PERINO", true),
  code("receiptorai-1", "receiptor-ai", "20% off", "20% off storewide at Receiptor AI", "Members-only code — 20% off storewide.", "SIGNAL", true),
  code("flairai-1", "flair-ai", "10% off", "10% off storewide at Flair AI", "Apply this code at checkout for 10% off storewide.", "HPK60", false),
  code("dewatermark-1", "dewatermark", "30% off", "30% off select items at Dewatermark", "Apply at checkout for 30% off select items.", "DEWTM30", true),
  code("klingai-1", "kling-ai", "Member code", "Community promo code for Kling AI", "Community-submitted code — apply at checkout on Kling AI.", "7B5LPGRJ47HJ", false),
  deal("kittl-1", "kittl", "25% off yearly", "25% off a yearly Kittl subscription", "Save 25% when you switch from monthly to a yearly plan.", true),
];

/* ------------------------------------------------------------------ */
/* Internal helpers.                                                   */
/* ------------------------------------------------------------------ */

function withStore(c: Coupon): CouponWithStore {
  const parent = storeBySlug.get(c.storeSlug);
  if (!parent) throw new Error(`Coupon ${c.id} references unknown store ${c.storeSlug}`);
  return { ...c, store: parent };
}

function countForCategory(slug: string): number {
  return coupons.filter((c) => c.categorySlug === slug).length;
}

/* ------------------------------------------------------------------ */
/* Public helpers — the only API components should use.               */
/* ------------------------------------------------------------------ */

export function getCategories(): Category[] {
  return categories.map((c) => ({ ...c, count: countForCategory(c.slug) }));
}

export function getCategory(slug: string): Category | undefined {
  const category = categories.find((c) => c.slug === slug);
  return category ? { ...category, count: countForCategory(category.slug) } : undefined;
}

export function getStores(): Store[] {
  return stores;
}

export function getStore(slug: string): Store | undefined {
  return storeBySlug.get(slug);
}

export function getTrendingStores(limit = 8): Store[] {
  return stores.slice(0, limit);
}

/** Featured "top" coupons — verified items surfaced first. */
export function getTopCoupons(limit?: number): CouponWithStore[] {
  const ranked = [...coupons].sort((a, b) => Number(b.verified) - Number(a.verified));
  const joined = ranked.map(withStore);
  return typeof limit === "number" ? joined.slice(0, limit) : joined;
}

export function getCouponsByStore(slug: string): CouponWithStore[] {
  return coupons.filter((c) => c.storeSlug === slug).map(withStore);
}

export function getCouponsByCategory(slug: string): CouponWithStore[] {
  return coupons.filter((c) => c.categorySlug === slug).map(withStore);
}

export type CouponSort = "top" | "newest" | "expiring";

/** Pure sort over an already-filtered list, used by the listing pages. */
export function sortCoupons(
  list: CouponWithStore[],
  sort: CouponSort = "top",
): CouponWithStore[] {
  const copy = [...list];
  if (sort === "top") {
    return copy.sort((a, b) => Number(b.verified) - Number(a.verified));
  }
  if (sort === "expiring") {
    const time = (c: CouponWithStore) =>
      c.expires === "ongoing" ? Number.POSITIVE_INFINITY : new Date(c.expires).getTime();
    return copy.sort((a, b) => time(a) - time(b));
  }
  const order = new Map(coupons.map((c, i) => [c.id, i]));
  return copy.sort((a, b) => (order.get(b.id) ?? 0) - (order.get(a.id) ?? 0));
}

export function searchAll(query: string): CouponWithStore[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return coupons
    .filter((c) => {
      const parent = storeBySlug.get(c.storeSlug);
      return (
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (c.code?.toLowerCase().includes(q) ?? false) ||
        (parent?.name.toLowerCase().includes(q) ?? false)
      );
    })
    .map(withStore);
}
