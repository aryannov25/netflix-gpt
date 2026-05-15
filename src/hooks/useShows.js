import { useEffect, useState } from "react";
import { fetchAiringToday, fetchPopular, fetchShows } from "../utils/api";
import { POPULAR_QUERIES } from "../utils/constants";

export const useShows = () => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    shows: [],
    airingToday: [],
    popular: [],
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [catalog, todays, popular] = await Promise.all([
          fetchShows(),
          fetchAiringToday().catch(() => []),
          fetchPopular(POPULAR_QUERIES).catch(() => []),
        ]);
        if (cancelled) return;

        const byId = new Map();
        for (const s of catalog) byId.set(s.id, s);
        for (const s of todays) byId.set(s.id, s);
        for (const s of popular) byId.set(s.id, s);

        setState({
          loading: false,
          error: null,
          shows: Array.from(byId.values()),
          airingToday: todays,
          popular,
        });
      } catch (e) {
        if (cancelled) return;
        setState((s) => ({ ...s, loading: false, error: e.message }));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
};
