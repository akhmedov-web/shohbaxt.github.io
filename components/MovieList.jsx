"use client";

import { useState, useEffect } from "react";

export default function MovieList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/movies-data.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ color: "var(--muted)", padding: "20px 0" }}>Loading...</p>;
  }

  if (!data || !data.movies || data.movies.length === 0) {
    return <p style={{ color: "var(--muted)" }}>No movies yet.</p>;
  }

  const { movies } = data;

  return (
    <>
      {/* Mobile cards */}
      <div className="hide-desktop">
        {movies.map((m, i) => (
          <a key={i} href={m.url} target="_blank" rel="noopener noreferrer" className="mini-card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontWeight: "bold", fontSize: "13px" }}>{m.title}</span>
              <span className="font-mono text-small">{m.myRating}</span>
            </div>
            <div className="text-small" style={{ marginTop: "2px", color: "var(--muted)" }}>
              {m.year} &middot; {m.director} &middot; <span style={{ color: "var(--faint)" }}>IMDb {m.imdbRating}</span>
            </div>
          </a>
        ))}
      </div>

      {/* Desktop table */}
      <table className="data-table hide-mobile">
        <thead>
          <tr>
            <th style={{ width: "20px" }}>#</th>
            <th>Title</th>
            <th>Year</th>
            <th>Director</th>
            <th>IMDb</th>
            <th>My Rating</th>
            <th style={{ whiteSpace: "nowrap" }}>Rated</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m, i) => (
            <tr key={i}>
              <td style={{ color: "var(--faint)", textAlign: "center" }}>{i + 1}</td>
              <td>
                <a href={m.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: "bold", color: "inherit" }}>
                  {m.title}
                </a>
              </td>
              <td>{m.year}</td>
              <td className="text-small">{m.director}</td>
              <td className="font-mono text-small">{m.imdbRating}</td>
              <td className="font-mono">{m.myRating}</td>
              <td className="text-small" style={{ color: "var(--faint)", whiteSpace: "nowrap" }}>{m.dateRated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
