// Fetches articles from Substack RSS feed and saves to public/articles-data.json
// Used by GitHub Actions on a schedule

const SUBSTACK_FEED = "https://shohbaxt.substack.com/feed";

async function main() {
  console.log("Fetching Substack RSS feed...");
  const res = await fetch(SUBSTACK_FEED, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; PersonalSite/1.0)",
    },
  });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const xml = await res.text();

  const articles = [];
  const items = xml.split("<item>").slice(1);

  for (const item of items) {
    const title = extract(item, "title");
    const link = extract(item, "link");
    const pubDate = extract(item, "pubDate");
    const description = extract(item, "description");
    const creator = extract(item, "dc:creator");

    // Clean HTML from description
    const cleanDesc = description
      ? decodeEntities(description.replace(/<[^>]*>/g, "")).trim().slice(0, 200)
      : null;

    articles.push({
      title: decodeEntities(title),
      url: link,
      date: pubDate ? new Date(pubDate).toISOString() : null,
      description: cleanDesc || null,
    });
  }

  console.log(`Got ${articles.length} articles`);

  const fs = await import("fs");
  const path = await import("path");
  const outPath = path.join(process.cwd(), "public", "articles-data.json");
  fs.writeFileSync(outPath, JSON.stringify({ articles, updated: new Date().toISOString() }, null, 2));
  console.log(`Written to ${outPath}`);
}

function extract(text, tag) {
  // Try CDATA first
  const cdataRegex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`);
  const cdataMatch = text.match(cdataRegex);
  if (cdataMatch) return cdataMatch[1].trim();

  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`);
  const match = text.match(regex);
  return match ? match[1].trim() : "";
}

function decodeEntities(str) {
  return str
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&rsquo;/g, "\u2019")
    .replace(/&lsquo;/g, "\u2018")
    .replace(/&ndash;/g, "\u2013")
    .replace(/&mdash;/g, "\u2014");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
