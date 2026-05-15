import MovieCard from "./MovieCard";
import RowChevrons from "./RowChevrons";
import { useScroller } from "../hooks/useScroller";

const MovieRow = ({ id, title, items }) => {
  const { ref, scroll, scrollToEnd } = useScroller();

  return (
    <section id={id} className="group/row relative mb-10 scroll-mt-24">
      <div className="mb-4 flex items-center justify-between px-6 md:px-16">
        <h2 className="text-xl font-bold text-white md:text-2xl">{title}</h2>
        <button
          onClick={scrollToEnd}
          className="hidden text-xs font-medium uppercase tracking-wider text-neutral-400 transition hover:text-white md:block"
        >
          See all →
        </button>
      </div>
      <div className="relative">
        <RowChevrons onLeft={() => scroll("left")} onRight={() => scroll("right")} />
        <div
          ref={ref}
          className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth px-6 pb-3 md:px-16"
        >
          {items.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieRow;
