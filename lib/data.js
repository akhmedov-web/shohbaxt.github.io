export const SITE_URL = "https://shohbaxt.github.io";

export const SITE_DATA = {
  name: "Shohbaxt Axmedov",
  shortName: "shohbaxt",
  tagline: "Software Engineer",
  email: "shohbaxt@proton.me",
  github: "github.com/shohbaxt",
  telegram: "t.me/akhmedov_mailbox",
  location: "Tashkent, Uzbekistan",
  bio: "I'm a software engineering student at Turin Polytechnic University in Tashkent. I build things with React, TypeScript, Node.js and Next.js. When I'm not coding, I'm probably hiking somewhere or running. I'm also building Tripz — a hiking tour platform.",
  projects: [
    { name: "Tripz", url: "#", desc: "Streamlined platform helping Uzbekistan's hiking agencies digitize bookings, manage trips, and grow their business.", tech: "Next.js, TypeScript, Tailwind CSS, MUI, SWR", status: "building" },
    { name: "Original Travel", url: "#", desc: "The visitor website and a Telegram bot for browsing and booking tours of local travel agency called Original Travel.", tech: "React, Tailwind CSS, MUI, Telegraf, Express", status: "building" },
    { name: "Coffeeco.uz", url: "https://coffeeco.uz", desc: "As a Fullstack JavaScript developer, it's my very first fullstack app. It's a loyalty & cashback system for coffee shop named Coffee.Co. QR-based customer identification, SMS notifications via Eskiz.uz, Loyverse POS integration.", tech: "React, Tailwind CSS, Express, MySQL, Supabase, Eskiz SMS", status: "active" },
    { name: "Fotografinya.uz", url: "https://fotografinya.uz", desc: "Portfolio website for a Tashkent-based photographer. Includes portfolio gallery, services & pricing, session booking form, and contact section.", tech: "React, Vite, Tailwind CSS, Motion, MUI", status: "active" },
    { name: "EduMasters", url: "https://edu-masters-teachers.vercel.app/login", desc: "CRM system for an education center in Kashkadarya. Teacher dashboard, student registration, and scheduling.", tech: "React, Vite, Ant Design, Tailwind CSS", status: "active" },
  ],
  recentPlaces: [
    { name: "Pik Pionerskiy", elevation: "2336m", date: "2026-02-15", type: "peak" },
    { name: "Shohqo'rg'on", elevation: "2025m", date: "2026-02-01", type: "peak" },
    { name: "Begiztosh", elevation: "2025m", date: "2026-02-01", type: "peak" },
    { name: "Kichik Chimyon", elevation: "2099m", date: "2026-01-19", type: "peak" },
    { name: "Qo'ng'irbuqa", elevation: "1981m", date: "2026-01-11", type: "peak" },
    { name: "Paltau", elevation: null, date: "2025-11-16", type: "waterfall" },
    { name: "Shohqo'rg'on", elevation: "2025m", date: "2025-09-20", type: "peak" },
    { name: "Begiztosh", elevation: "2025m", date: "2025-09-20", type: "peak" },
    { name: "Obiqashqa", elevation: "3099m", date: "2025-08-10", type: "peak" },
    { name: "Katta Chimyon", elevation: "3309m", date: "2025-06-22", type: "peak" },
    { name: "Nefrit", elevation: null, date: "2025-04-29", type: "lake" },
    { name: "Gulkam", elevation: null, date: "2025-04-28", type: "waterfall" },
    { name: "Kichik Chimyon", elevation: "2099m", date: "2025-04-28", type: "peak" },
  ],
};

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/articles", label: "Articles" },
  { href: "/now-playing", label: "Liked Songs" },
  { href: "/running", label: "Runs" },
  { href: "/movies", label: "Movies" },
  { href: "/places", label: "Hikes" },
  { href: "/contact", label: "Contact" },
];
