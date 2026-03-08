export const SITE_URL = "https://shohbaxt.github.io";

export const SITE_DATA = {
  name: "Shohbaxt Axmedov",
  shortName: "shohbaxt",
  tagline: "Software Engineer",
  email: "shohbaxt@proton.me",
  github: "github.com/akhmedov-web",
  telegram: "t.me/akhmedov_mailbox",
  location: "Tashkent, Uzbekistan",
  bio: "I'm a software engineering student at Turin Polytechnic University in Tashkent. I build things with React, TypeScript, Node.js and Next.js. When I'm not coding, I'm probably hiking somewhere in the Chimgan mountains or running. I also run Tripz — a hiking tour platform.",
  projects: [
    { name: "Tripz.go", url: "https://tripz.page", desc: "Hiking tour platform for hiking agencies. Organizing group trips to mountains, waterfalls and peaks around Tashkent region.", tech: "Next.js, Telegram Bot API, Vercel", status: "building" },
    { name: "Coffee.Co", url: "https://coffeeco.uz", desc: "Loyalty & cashback system for coffee shop named Coffee.Co. QR-based customer identification, SMS notifications via Eskiz.uz, Loyverse POS integration.", tech: "React, Node.js, Loyverse API, Eskiz SMS", status: "in reconstruction" },
    { name: "fotografinya.uz", url: "https://fotografinya.uz", desc: "Photography studio website with animated hero section and custom typography.", tech: "Next.js, Tailwind CSS, Framer Motion", status: "active" },
    { name: "Gilamchi", url: "https://t.me/gilamchi_robot", desc: "Carpet shop management system. Full inventory, sales tracking, and reporting dashboard.", tech: "FastAPI, PostgreSQL, React TypeScript", status: "active" },
  ],
  articles: [
    { title: "Setting Up CI/CD with GitHub Actions for VPS Deployment", slug: "cicd-github-actions-vps", date: "2025-11-15", tags: ["devops", "github-actions"] },
    { title: "Integrating Payme & Click Payment Systems in Uzbekistan", slug: "payme-click-payment-integration", date: "2025-10-02", tags: ["payments", "uzbekistan"] },
    { title: "SEO for React SPAs vs Next.js: What I Learned", slug: "seo-react-spa-vs-nextjs", date: "2025-08-20", tags: ["seo", "nextjs", "react"] },
    { title: "Running a YATT: Taxes, Social Fund & Lessons", slug: "yatt-taxes-social-fund", date: "2025-07-10", tags: ["business", "uzbekistan"] },
  ],
  recentPlaces: [
    { name: "Chimgan Peak", elevation: "3309m", date: "2025-12-14", type: "peak" },
    { name: "Gulkam Waterfall", elevation: "~1200m", date: "2025-11-28", type: "waterfall" },
    { name: "Beldersay", elevation: "2880m", date: "2025-11-10", type: "peak" },
    { name: "Charvak Lake", elevation: "~900m", date: "2025-10-22", type: "lake" },
    { name: "Pulatkhan Waterfall", elevation: "~1600m", date: "2025-10-05", type: "waterfall" },
    { name: "Kyzyl-Say Canyon", elevation: "~1100m", date: "2025-09-18", type: "canyon" },
  ],
};

export const MOCK_MOVIES = [
  { title: "Oppenheimer", year: 2023, rating: "9/10", watched: "Feb 28, 2026" },
  { title: "Past Lives", year: 2023, rating: "8/10", watched: "Feb 20, 2026" },
  { title: "The Holdovers", year: 2023, rating: "8/10", watched: "Feb 12, 2026" },
  { title: "Anatomy of a Fall", year: 2023, rating: "7/10", watched: "Jan 30, 2026" },
  { title: "Poor Things", year: 2023, rating: "9/10", watched: "Jan 18, 2026" },
];

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/articles", label: "Articles" },
  { href: "/now-playing", label: "Liked Songs" },
  { href: "/running", label: "Running" },
  { href: "/movies", label: "Movies" },
  { href: "/places", label: "Hiking" },
  { href: "/contact", label: "Contact" },
];
