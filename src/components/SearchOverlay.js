import { useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import { filterForKids, searchShows } from "../utils/api";
import { POSTER_FALLBACK } from "../utils/constants";
import { SearchIcon } from "./icons";

const SearchOverlay = () => {
  const { searchOpen, setSearchOpen, setOpenShow, profile } = useApp();
  const isKidsMode = profile?.id === "kids";
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!searchOpen) return;
    inputRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [searchOpen, setSearchOpen]);

  useEffect(() => {
    if (!searchOpen) {
      setQ("");
      setResults([]);
    }
  }, [searchOpen]);

  useEffect(() => {
    const term = q.trim();
    if (!term) {
      setResults([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const data = await searchShows(term);
        if (!cancelled) setResults(isKidsMode ? filterForKids(data) : data);
      } catch {
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [q, isKidsMode]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto bg-black/85 px-4 pt-24 backdrop-blur-xl md:px-12">
      <div className="mx-auto flex max-w-4xl items-center gap-3 rounded-full glass px-5 py-3 shadow-2xl">
        <SearchIcon className="h-5 w-5 text-neutral-300" />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={
            isKidsMode
              ? "Search kid-friendly shows…"
              : "Search titles, genres, networks…"
          }
          className="flex-1 bg-transparent text-base text-white outline-none placeholder:text-neutral-500"
        />
        {loading && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        )}
        <button
          onClick={() => setSearchOpen(false)}
          aria-label="Close"
          className="rounded-full bg-white/10 px-3 py-1 text-xs text-neutral-300 hover:bg-white/20 hover:text-white"
        >
          esc
        </button>
      </div>

      <div className="mx-auto mt-10 max-w-6xl pb-24">
        {!q.trim() && (
          <p className="text-center text-sm text-neutral-500">
            Start typing to search across TV shows.
          </p>
        )}
        {q.trim() && !loading && results.length === 0 && (
          <p className="text-center text-sm text-neutral-500">
            No matches for "{q}".
          </p>
        )}
        {results.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {results.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setOpenShow(s);
                  setSearchOpen(false);
                }}
                className="group/card text-left"
              >
                <div className="aspect-[2/3] overflow-hidden rounded-2xl ring-1 ring-white/10 transition group-hover/card:ring-white/30">
                  <img
                    src={s.poster}
                    alt={s.title}
                    loading="lazy"
                    onError={(e) => (e.currentTarget.src = POSTER_FALLBACK)}
                    className="h-full w-full object-cover transition duration-500 group-hover/card:scale-105"
                  />
                </div>
                <p className="mt-2 truncate text-sm font-semibold text-white">
                  {s.title}
                </p>
                <p className="text-xs text-neutral-500">
                  {s.year}
                  {s.year && s.genres?.[0] && " · "}
                  {s.genres?.[0]}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
