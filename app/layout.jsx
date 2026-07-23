import "./globals.css";
import Link from "next/link";
import { SITE_DATA, SITE_URL } from "@/lib/data";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shohbaxt Axmedov — Software Engineer | Tashkent, Uzbekistan",
    template: "%s | Shohbaxt Axmedov",
  },
  description:
    "Shohbaxt Axmedov (Shohbaxt) — Software Engineer from Tashkent, Uzbekistan. Building web apps with React, Next.js, TypeScript & Node.js. Creator of Tripz hiking platform.",
  keywords: [
    "Shohbaxt Axmedov",
    "Shohbaxt",
    "Shohbaxt developer",
    "software engineer Tashkent",
    "React developer Uzbekistan",
    "Next.js developer",
    "Turin Polytechnic Tashkent",
    "web developer Tashkent",
  ],
  authors: [{ name: "Shohbaxt Axmedov", url: SITE_URL }],
  creator: "Shohbaxt Axmedov",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Shohbaxt Axmedov",
    title: "Shohbaxt Axmedov — Software Engineer",
    description:
      "Software Engineer from Tashkent, Uzbekistan. Building web apps with React, Next.js, TypeScript & Node.js.",
  },
  twitter: {
    card: "summary",
    title: "Shohbaxt Axmedov — Software Engineer",
    description:
      "Software Engineer from Tashkent, Uzbekistan. Building web apps with React, Next.js, TypeScript & Node.js.",
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

const jsonLdSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shohbaxt Axmedov",
    alternateName: "Shohbaxt",
    url: SITE_URL,
    email: SITE_DATA.email,
    jobTitle: "Software Engineer",
    description: SITE_DATA.bio,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tashkent",
      addressCountry: "UZ",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Turin Polytechnic University in Tashkent",
    },
    sameAs: [
      `https://${SITE_DATA.github}`,
      `https://t.me/${SITE_DATA.telegram.replace("@", "")}`,
    ],
    knowsAbout: [
      "React", "Next.js", "TypeScript", "Node.js", "JavaScript",
      "Web Development", "Software Engineering",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shohbaxt Axmedov",
    alternateName: "Shohbaxt",
    url: SITE_URL,
    description: "Personal website of Shohbaxt Axmedov — Software Engineer from Tashkent, Uzbekistan.",
    author: { "@type": "Person", name: "Shohbaxt Axmedov" },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/articles?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: ["Home", "Projects", "Articles", "Contact"],
    url: [
      SITE_URL,
      `${SITE_URL}/projects`,
      `${SITE_URL}/articles`,
      `${SITE_URL}/contact`,
    ],
  },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ThemeProvider>
          {jsonLdSchemas.map((schema, i) => (
            <script
              key={i}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
          ))}
          <div className="page-wrapper">
            <header className="site-header">
                <h1 className="site-title">
                  <Link href="/">{SITE_DATA.shortName}</Link>
                </h1>
              <ThemeToggle />
            </header>

            <Nav />

            <main>{children}</main>

            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
