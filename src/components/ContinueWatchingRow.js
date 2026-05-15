import { useApp } from "../context/AppContext";
import { useScroller } from "../hooks/useScroller";
import { POSTER_FALLBACK } from "../utils/constants";
import { PlayIcon } from "./icons";
import RowChevrons from "./RowChevrons";

const ContinueWatchingRow = ({ id, items }) => {
  const { ref, scroll } = useScroller();
  const { playShow, notify } = useApp();

  return (
    <section id={id} className="group/row relative mb-10 scroll-mt-24">
      <div className="mb-4 flex items-center justify-between px-6 md:px-16">
        <h2 className="text-xl font-bold text-white md:text-2xl">
          Continue Watching
        </h2>
        <button
          onClick={() => notify("Full viewing history isn't available in demo")}
          className="hidden text-xs font-medium uppercase tracking-wider text-neutral-400 transition hover:text-white md:block"
        >
          History →
        </button>
      </div>
      <div className="relative">
        <RowChevrons onLeft={() => scroll("left")} onRight={() => scroll("right")} />
        <div
          ref={ref}
          className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth px-6 pb-3 md:px-16"
        >
          {items.map(({ show, progress }) => (
            <button
              key={show.id}
              onClick={() => playShow(show)}
              className="group/card relative aspect-video w-72 flex-shrink-0 overflow-hidden rounded-2xl bg-black ring-1 ring-white/10 transition duration-300 hover:scale-[1.03] hover:ring-white/30 md:w-80"
            >
              <img
                src={show.backdrop}
                alt=""
                className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl opacity-60"
                aria-hidden
              />
              <img
                src={show.backdrop}
                alt={show.title}
                loading="lazy"
                onError={(e) => (e.currentTarget.src = POSTER_FALLBACK)}
                className="relative h-full w-full object-contain transition duration-500 group-hover/card:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover/card:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-2xl">
                  <PlayIcon className="h-7 w-7" />
                </div>
              </div>
              <div className="absolute inset-x-4 bottom-4">
                <p className="mb-1.5 truncate text-base font-bold text-white">
                  {show.title}
                </p>
                <p className="mb-2 text-[11px] uppercase tracking-wider text-neutral-300">
                  S1 · E{Math.max(1, Math.round(progress * 10))} ·{" "}
                  {Math.round((1 - progress) * 45)}m left
                </p>
                <div className="h-1 w-full overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full bg-gradient-accent"
                    style={{ width: `${Math.round(progress * 100)}%` }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContinueWatchingRow;
