import { SITE_URL } from "@/lib/data";
import MovieList from "@/components/MovieList";

export const metadata = {
  title: "Movies",
  description: "Shohbaxt's movie log — recently watched films with ratings from IMDb.",
  alternates: { canonical: `${SITE_URL}/movies` },
};

export default function MoviesPage() {
  return (
    <div>
      <h2 className="section-title">
        Movie Log '26
        <span className="text-small" style={{ fontWeight: "normal", color: "var(--faint)", marginLeft: "8px" }}>
          from IMDb
        </span>
      </h2>
      <MovieList />
    </div>
  );
}
