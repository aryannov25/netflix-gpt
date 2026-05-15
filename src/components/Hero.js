import { useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import { HERO_AUTOPLAY_MS } from "../utils/constants";
import { Chevron, InfoIcon, PlayIcon, SparkleIcon } from "./icons";

const Slide = ({ show, active }) => {
  const { playShow, setOpenShow } = useApp();

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ease-out ${
        active ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!active}
    >
      <img
        src={show.backdrop}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
        aria-hidden
      />
      <img
        src={show.backdropHi ?? show.backdrop}
        alt={show.title}
        className="absolute right-0 top-1/2 h-[55%] -translate-y-1/2 object-contain opacity-60 sm:h-[70%] sm:opacity-80 md:right-16 md:h-[88%] md:opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--bg))] via-[rgb(var(--bg))]/85 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[rgb(var(--bg))] via-[rgb(var(--bg))]/70 to-transparent" />

      <div className="relative z-10 flex h-full max-w-[1600px] flex-col justify-end px-5 pb-20 sm:px-6 sm:pb-24 md:px-16 md:pb-28">
        <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-4 sm:gap-3">
          <span className="inline-flex h-7 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-accent px-3 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg">
            <SparkleIcon />
            Featured
          </span>
          {show.network && (
            <span className="text-xs font-medium uppercase tracking-widest text-neutral-400">
              {show.network} Original
            </span>
          )}
        </div>

        <h1 className="mb-3 max-w-3xl text-4xl font-black leading-[0.95] tracking-tight text-white drop-shadow-2xl sm:mb-4 sm:text-5xl md:text-7xl lg:text-8xl">
          {show.title}
        </h1>

        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs sm:mb-5 sm:text-sm">
          {show.rating != null && (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2.5 py-0.5 font-semibold text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              {Math.round(show.rating * 10)}% Match
            </span>
          )}
          {show.year && (
            <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-neutral-200">
              {show.year}
            </span>
          )}
          {show.runtime && (
            <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-neutral-200">
              {show.runtime} min
            </span>
          )}
          {show.genres?.slice(0, 2).map((g) => (
            <span
              key={g}
              className="rounded-full border border-white/15 px-2.5 py-0.5 text-neutral-300"
            >
              {g}
            </span>
          ))}
        </div>

        <p className="mb-5 line-clamp-3 max-w-xl text-sm leading-relaxed text-neutral-200 sm:mb-7 sm:line-clamp-none sm:text-base md:text-lg">
          {show.overview?.length > 240
            ? show.overview.slice(0, 240) + "…"
            : show.overview}
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={() => playShow(show)}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:scale-[1.03] hover:bg-white sm:px-7 sm:py-3 md:text-base"
          >
            <PlayIcon className="h-5 w-5 sm:h-6 sm:w-6" /> Play Trailer
          </button>
          <button
            onClick={() => setOpenShow(show)}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/15 sm:px-7 sm:py-3 md:text-base"
          >
            <InfoIcon className="h-5 w-5" /> More Info
          </button>
        </div>
      </div>
    </div>
  );
};

const Hero = ({ shows }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const total = shows?.length ?? 0;

  useEffect(() => {
    if (total <= 1 || paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, HERO_AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [total, paused]);

  if (!total)
    return <div className="h-[80vh] min-h-[520px] w-full bg-[rgb(var(--bg))] sm:h-[85vh] sm:min-h-[560px]" />;

  const go = (delta) => setIndex((i) => (i + delta + total) % total);

  return (
    <section
      className="group/hero relative h-[80vh] min-h-[520px] w-full overflow-hidden sm:h-[85vh] sm:min-h-[560px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {shows.map((s, i) => (
        <Slide key={s.id} show={s} active={i === index} />
      ))}

      {total > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full glass text-white opacity-0 transition group-hover/hero:opacity-100 md:left-8"
          >
            <Chevron dir="left" className="h-6 w-6" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full glass text-white opacity-0 transition group-hover/hero:opacity-100 md:right-8"
          >
            <Chevron dir="right" className="h-6 w-6" />
          </button>

          <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full glass px-3 py-2">
            {shows.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="relative h-1 overflow-hidden rounded-full bg-white/20 transition-all"
                style={{ width: i === index ? 36 : 16 }}
              >
                {i === index && (
                  <div
                    key={`${i}-${paused}`}
                    className="absolute inset-y-0 left-0 bg-white"
                    style={{
                      animation: paused
                        ? "none"
                        : `heroProgress ${HERO_AUTOPLAY_MS}ms linear forwards`,
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <style>{`
            @keyframes heroProgress {
              from { width: 0; }
              to { width: 100%; }
            }
          `}</style>
        </>
      )}
    </section>
  );
};

export default Hero;
