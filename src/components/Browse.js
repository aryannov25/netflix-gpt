import { useMemo } from "react";
import Header from "./Header";
import Hero from "./Hero";
import MovieRow from "./MovieRow";
import TopTenRow from "./TopTenRow";
import ContinueWatchingRow from "./ContinueWatchingRow";
import MovieModal from "./MovieModal";
import SearchOverlay from "./SearchOverlay";
import TrailerPlayer from "./TrailerPlayer";
import Footer from "./Footer";
import { useShows } from "../hooks/useShows";
import { useApp } from "../context/AppContext";
import {
  buildKidsRows,
  buildRows,
  filterForKids,
  pickHeroes,
} from "../utils/api";

const Skeleton = () => (
  <div className="min-h-screen">
    <Header />
    <div className="h-[80vh] animate-pulse bg-white/[0.03] sm:h-[85vh]" />
    <div className="space-y-10 px-6 pt-10 md:px-16">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i}>
          <div className="mb-4 h-6 w-56 animate-pulse rounded-lg bg-white/[0.06]" />
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 8 }).map((_, j) => (
              <div
                key={j}
                className="aspect-[2/3] w-40 flex-shrink-0 animate-pulse rounded-2xl bg-white/[0.06] md:w-48 lg:w-52"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const pickContinueWatching = (shows) =>
  shows.slice(2, 10).map((show, i) => ({
    show,
    progress: 0.15 + ((i * 11) % 70) / 100,
  }));

const Browse = () => {
  const {
    loading,
    error,
    shows: allShows,
    airingToday: allAiring,
    popular: allPopular,
  } = useShows();
  const { myList, profile } = useApp();
  const isKidsMode = profile?.id === "kids";

  const shows = useMemo(
    () => (isKidsMode ? filterForKids(allShows) : allShows),
    [allShows, isKidsMode]
  );

  const airingToday = useMemo(
    () => (isKidsMode ? filterForKids(allAiring) : allAiring),
    [allAiring, isKidsMode]
  );

  const popular = useMemo(
    () => (isKidsMode ? filterForKids(allPopular) : allPopular),
    [allPopular, isKidsMode]
  );

  const heroes = useMemo(
    () => pickHeroes(popular.length ? popular : shows, 5),
    [popular, shows]
  );

  const rows = useMemo(
    () =>
      isKidsMode
        ? buildKidsRows(shows)
        : buildRows(shows, airingToday, popular),
    [shows, airingToday, popular, isKidsMode]
  );

  const myListItems = useMemo(
    () => shows.filter((s) => myList.includes(s.id)),
    [shows, myList]
  );

  const continueWatching = useMemo(
    () => (shows.length ? pickContinueWatching(shows) : []),
    [shows]
  );

  const topTen = useMemo(() => {
    if (!shows.length) return [];
    return [...shows]
      .filter((s) => s.rating != null)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10);
  }, [shows]);

  if (loading) return <Skeleton />;

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center text-white">
        <Header />
        <h2 className="mb-2 text-3xl font-black">Something went wrong</h2>
        <p className="text-neutral-400">Couldn't load shows: {error}</p>
      </div>
    );
  }

  if (isKidsMode && shows.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center text-white">
        <Header />
        <h2 className="mb-2 text-3xl font-black">No kid-friendly shows found</h2>
        <p className="max-w-md text-neutral-400">
          We couldn't find anything in the catalog matching the Kids profile.
          Try a different profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <Header />
      <Hero shows={heroes} />
      <main className="relative z-20 pb-16">
        {continueWatching.length > 0 && (
          <ContinueWatchingRow id="row-continue" items={continueWatching} />
        )}
        {topTen.length > 0 && (
          <TopTenRow
            id="row-top-10"
            title={
              isKidsMode
                ? "Top 10 Kids Shows Today"
                : "Top 10 in Your Country Today"
            }
            items={topTen}
          />
        )}
        {myListItems.length > 0 && (
          <MovieRow id="row-my-list" title="My List" items={myListItems} />
        )}
        {rows.map((row, i) => (
          <MovieRow
            key={row.id}
            id={i === 0 ? "row-trending" : `row-${row.id}`}
            title={row.title}
            items={row.items}
          />
        ))}
      </main>
      <Footer />
      <MovieModal />
      <SearchOverlay />
      <TrailerPlayer />
    </div>
  );
};

export default Browse;
