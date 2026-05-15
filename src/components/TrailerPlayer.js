import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import {
  findTrailerId,
  videoEmbedUrl,
  youtubeSearchUrl,
} from "../utils/trailer";
import { CloseIcon, PlayIcon } from "./icons";

const TrailerPlayer = () => {
  const { playingShow, setPlayingShow } = useApp();
  const [embedUrl, setEmbedUrl] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | ready | notfound

  useEffect(() => {
    if (!playingShow) {
      setEmbedUrl(null);
      setStatus("idle");
      return;
    }

    let cancelled = false;
    setStatus("loading");
    setEmbedUrl(null);

    (async () => {
      const id = await findTrailerId(playingShow.title);
      if (cancelled) return;
      if (id) {
        setEmbedUrl(videoEmbedUrl(id));
        setStatus("ready");
      } else {
        setStatus("notfound");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [playingShow]);

  useEffect(() => {
    if (!playingShow) return;
    const onKey = (e) => e.key === "Escape" && setPlayingShow(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [playingShow, setPlayingShow]);

  if (!playingShow) return null;

  return (
    <div className="fixed inset-0 z-[110] flex flex-col bg-black">
      <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-4">
        <div className="flex min-w-0 items-center gap-2 md:gap-3">
          <span className="flex h-7 shrink-0 items-center gap-1.5 rounded-full bg-gradient-accent px-3 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg md:text-[11px]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            <span className="hidden sm:inline">Now Playing</span>
            <span className="sm:hidden">Live</span>
          </span>
          <span className="truncate text-sm font-semibold text-white md:text-base">
            {playingShow.title}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={youtubeSearchUrl(playingShow.title)}
            target="_blank"
            rel="noreferrer"
            aria-label="Open on YouTube"
            className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-neutral-200 transition hover:border-white/40 hover:text-white sm:inline-flex"
          >
            Open on YouTube ↗
          </a>
          <a
            href={youtubeSearchUrl(playingShow.title)}
            target="_blank"
            rel="noreferrer"
            aria-label="Open on YouTube"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:hidden"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-5.8 31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
            </svg>
          </a>
          <button
            onClick={() => setPlayingShow(null)}
            aria-label="Close player"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      <div className="relative flex-1 bg-black">
        {status === "loading" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-neutral-300">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-red-500" />
            <p className="text-sm">Finding trailer…</p>
          </div>
        )}

        {status === "ready" && embedUrl && (
          <iframe
            key={embedUrl}
            src={embedUrl}
            title={`${playingShow.title} trailer`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
            frameBorder="0"
          />
        )}

        {status === "notfound" && (
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={playingShow.backdrop}
              alt=""
              className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl opacity-40"
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
            <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
                Trailer unavailable
              </p>
              <h2 className="mb-4 max-w-2xl text-3xl font-black tracking-tight text-white md:text-5xl">
                We couldn't find a trailer for{" "}
                <span className="text-gradient-red">{playingShow.title}</span>
              </h2>
              <p className="mb-8 max-w-md text-sm text-neutral-300 md:text-base">
                Our trailer search service didn't return a match. You can watch it
                directly on YouTube.
              </p>
              <a
                href={youtubeSearchUrl(playingShow.title)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-black transition hover:scale-[1.03]"
              >
                <PlayIcon className="h-5 w-5" />
                Watch on YouTube
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrailerPlayer;
