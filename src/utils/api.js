const BASE = "https://api.tvmaze.com";

const stripHtml = (html) =>
  (html ?? "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

const toShow = (s) => ({
  id: s.id,
  title: s.name,
  poster: s.image?.original ?? s.image?.medium ?? null,
  backdrop: s.image?.original ?? s.image?.medium ?? null,
  rating: s.rating?.average ?? null,
  year: s.premiered ? s.premiered.slice(0, 4) : null,
  genres: s.genres ?? [],
  language: s.language ?? null,
  network: s.network?.name ?? s.webChannel?.name ?? null,
  runtime: s.runtime ?? s.averageRuntime ?? null,
  status: s.status ?? null,
  weight: s.weight ?? 0,
  overview: stripHtml(s.summary),
});

export const fetchShows = async () => {
  const res = await fetch(`${BASE}/shows?page=0`);
  if (!res.ok) throw new Error(`TVMaze ${res.status}`);
  const data = await res.json();
  return data.map(toShow).filter((s) => s.poster);
};

export const fetchPopular = async (queries) => {
  const results = await Promise.all(
    queries.map((q) =>
      fetch(`${BASE}/singlesearch/shows?q=${encodeURIComponent(q)}`)
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null)
    )
  );
  return results
    .filter(Boolean)
    .map(toShow)
    .filter((s) => s.poster);
};

export const fetchAiringToday = async (country = "US") => {
  const res = await fetch(`${BASE}/schedule?country=${country}`);
  if (!res.ok) throw new Error(`TVMaze ${res.status}`);
  const data = await res.json();
  const seen = new Set();
  const shows = [];
  for (const item of data) {
    if (!item.show || seen.has(item.show.id)) continue;
    seen.add(item.show.id);
    const s = toShow(item.show);
    if (s.poster) shows.push(s);
  }
  return shows;
};

export const searchShows = async (q) => {
  const res = await fetch(`${BASE}/search/shows?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error(`TVMaze ${res.status}`);
  const data = await res.json();
  return data.map((d) => toShow(d.show)).filter((s) => s.poster);
};

const KIDS_INCLUDE = new Set(["Children", "Family"]);
const KIDS_EXCLUDE = new Set([
  "Adult",
  "Crime",
  "Horror",
  "Thriller",
  "War",
  "Espionage",
  "Mystery",
]);

export const isKidsContent = (show) => {
  const genres = show.genres ?? [];
  const include = genres.some((g) => KIDS_INCLUDE.has(g));
  const exclude = genres.some((g) => KIDS_EXCLUDE.has(g));
  return include && !exclude;
};

export const filterForKids = (shows) => shows.filter(isKidsContent);

export const buildKidsRows = (shows) => {
  const byWeight = [...shows].sort((a, b) => b.weight - a.weight);
  const byRating = [...shows]
    .filter((s) => s.rating != null)
    .sort((a, b) => b.rating - a.rating);
  const byYear = [...shows]
    .filter((s) => s.year)
    .sort((a, b) => Number(b.year) - Number(a.year));
  const byGenre = (g) =>
    shows.filter((s) => s.genres.includes(g)).slice(0, 14);

  return [
    { id: "kids-trending", title: "Trending for Kids", items: byWeight.slice(0, 14) },
    { id: "kids-new", title: "New for Kids", items: byYear.slice(0, 14) },
    { id: "kids-top", title: "Top Rated Family Picks", items: byRating.slice(0, 14) },
    { id: "kids-anime", title: "Anime", items: byGenre("Anime") },
    { id: "kids-adventure", title: "Adventures", items: byGenre("Adventure") },
    { id: "kids-comedy", title: "Funny Cartoons", items: byGenre("Comedy") },
    { id: "kids-fantasy", title: "Magic & Fantasy", items: byGenre("Fantasy") },
    { id: "kids-popular", title: "More for Kids", items: byWeight.slice(14, 28) },
  ].filter((r) => r.items.length > 0);
};

export const buildRows = (shows, airingToday = [], popular = []) => {
  const byWeight = [...shows].sort((a, b) => b.weight - a.weight);
  const byRating = [...shows]
    .filter((s) => s.rating != null)
    .sort((a, b) => b.rating - a.rating);
  const byYear = [...shows]
    .filter((s) => s.year)
    .sort((a, b) => Number(b.year) - Number(a.year));
  const byGenre = (g) =>
    shows.filter((s) => s.genres.includes(g)).slice(0, 14);
  const trendingFromAir = [...airingToday]
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 14);
  const popularByWeight = [...popular].sort((a, b) => b.weight - a.weight);

  return [
    {
      id: "trending",
      title: trendingFromAir.length
        ? "Trending Now · Airing Today"
        : "Trending Now",
      items: trendingFromAir.length ? trendingFromAir : byWeight.slice(0, 14),
    },
    {
      id: "popular",
      title: "Popular on Netflix",
      items: popularByWeight.length
        ? popularByWeight.slice(0, 14)
        : byWeight.slice(0, 14),
    },
    { id: "new", title: "New Releases", items: byYear.slice(0, 14) },
    { id: "top", title: "Top Rated", items: byRating.slice(0, 14) },
    { id: "drama", title: "Critically Acclaimed Drama", items: byGenre("Drama") },
    { id: "comedy", title: "Comedies", items: byGenre("Comedy") },
    { id: "scifi", title: "Sci-Fi & Fantasy", items: byGenre("Science-Fiction") },
    { id: "crime", title: "Crime & Thrillers", items: byGenre("Crime") },
  ].filter((r) => r.items.length > 0);
};

export const pickHeroes = (shows, count = 5) => {
  return shows
    .filter((s) => s.overview && s.rating != null && s.backdrop)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, count);
};
