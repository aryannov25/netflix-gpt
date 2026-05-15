import { useApp } from "../context/AppContext";
import { useScroller } from "../hooks/useScroller";
import { POSTER_FALLBACK } from "../utils/constants";
import RowChevrons from "./RowChevrons";

const BigNumeral = ({ n }) => (
  <span
    aria-hidden
    className="pointer-events-none relative -mr-6 inline-flex min-w-[80px] select-none justify-center text-[150px] font-black leading-[0.8] tracking-tighter text-transparent md:-mr-8 md:min-w-[120px] md:text-[200px]"
    style={{
      WebkitTextStroke: "3px rgba(255,255,255,0.2)",
      textShadow: "0 8px 60px rgba(239,68,68,0.15)",
    }}
  >
    {n}
  </span>
);

const TopTenRow = ({ id, title, items }) => {
  const { ref, scroll } = useScroller();
  const { setOpenShow } = useApp();
  const top = items.slice(0, 10);

  return (
    <section id={id} className="group/row relative mb-12 overflow-hidden scroll-mt-24">
      <div className="mb-4 flex items-center gap-3 px-6 md:px-16">
        <span className="flex h-7 items-center gap-1.5 rounded-full bg-gradient-accent px-3 text-[11px] font-bold uppercase tracking-widest text-white">
          Top 10
        </span>
        <h2 className="text-xl font-bold text-white md:text-2xl">{title}</h2>
      </div>
      <div className="relative">
        <RowChevrons onLeft={() => scroll("left")} onRight={() => scroll("right")} />
        <div
          ref={ref}
          className="no-scrollbar flex items-end gap-2 overflow-x-auto overflow-y-hidden scroll-smooth px-6 pb-3 md:px-16"
        >
          {top.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setOpenShow(m)}
              className="group/card flex flex-shrink-0 items-end transition-transform duration-300 hover:scale-[1.05]"
            >
              <BigNumeral n={i + 1} />
              <div className="relative aspect-[2/3] w-32 overflow-hidden rounded-2xl bg-black ring-1 ring-white/10 transition group-hover/card:ring-white/30 md:w-40 lg:w-44">
                <img
                  src={m.poster}
                  alt=""
                  className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl opacity-60"
                  aria-hidden
                />
                <img
                  src={m.poster}
                  alt={m.title}
                  loading="lazy"
                  onError={(e) => (e.currentTarget.src = POSTER_FALLBACK)}
                  className="relative h-full w-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition group-hover/card:opacity-100" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopTenRow;
