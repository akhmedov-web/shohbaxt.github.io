// Parses an IMDb list CSV export into public/movies-data.json
// Usage: node scripts/parse-imdb.js path/to/imdb-export.csv

const fs = require("fs");
const path = require("path");

const csvPath = process.argv[2];
if (!csvPath) {
  console.log("Usage: node scripts/parse-imdb.js <path-to-imdb-csv>");
  process.exit(1);
}

const raw = fs.readFileSync(csvPath, "utf-8");
const lines = raw.trim().split("\n");
const headers = parseCSVLine(lines[0]);

const movies = lines.slice(1).map((line) => {
  const cols = parseCSVLine(line);
  const row = {};
  headers.forEach((h, i) => (row[h] = cols[i] || ""));
  return {
    title: row["Title"],
    year: parseInt(row["Year"]) || null,
    imdbRating: row["IMDb Rating"],
    myRating: row["Your Rating"] ? `${row["Your Rating"]}/10` : null,
    genres: row["Genres"],
    director: row["Directors"],
    runtime: row["Runtime (mins)"] ? `${row["Runtime (mins)"]}m` : null,
    url: row["URL"],
    dateRated: row["Date Rated"],
  };
}).sort((a, b) => new Date(b.dateRated) - new Date(a.dateRated));

const outPath = path.join(__dirname, "..", "public", "movies-data.json");
fs.writeFileSync(outPath, JSON.stringify({ movies, updated: new Date().toISOString() }, null, 2));
console.log(`Wrote ${movies.length} movies to ${outPath}`);

function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}
