import { useApp } from "../context/AppContext";
import { POSTER_FALLBACK } from "../utils/constants";
import { PlayIcon } from "./icons";

const MovieCard = ({ movie }) => {
  const { setOpenShow, playShow } = useApp();
  return (
    <div className="group/card relative w-32 flex-shrink-0 sm:w-40 md:w-48 lg:w-52">
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-black ring-1 ring-white/5 transition duration-300 group-hover/card:z-10 group-hover/card:scale-[1.06] group-hover/card:ring-white/20">
        <img
          src={movie.poster}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl opacity-60"
          aria-hidden
        />
        <button
          onClick={() => setOpenShow(movie)}
          className="absolute inset-0 block h-full w-full"
          aria-label={`Details for ${movie.title}`}
        >
          <img
            src={movie.poster}
            alt={movie.title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = POSTER_FALLBACK;
            }}
            className="relative h-full w-full object-contain"
          />
        </button>

        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 transition group-hover/card:opacity-100 md:block" />

        <button
          onClick={(e) => {
            e.stopPropagation();
            playShow(movie);
          }}
          aria-label={`Play ${movie.title}`}
          className="absolute left-1/2 top-1/2 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 scale-90 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-2xl transition duration-200 hover:bg-white/90 group-hover/card:scale-100 group-hover/card:opacity-100 md:flex"
        >
          <PlayIcon className="h-7 w-7" />
        </button>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-2 p-3 text-left opacity-0 transition duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100 md:block">
          <p className="line-clamp-2 text-sm font-semibold text-white">
            {movie.title}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[10px]">
            {movie.rating != null && (
              <span className="rounded-full bg-green-500/20 px-1.5 py-0.5 font-bold text-green-400">
                {Math.round(movie.rating * 10)}%
              </span>
            )}
            {movie.year && (
              <span className="text-neutral-300">{movie.year}</span>
            )}
            {movie.genres?.[0] && (
              <span className="text-neutral-400">· {movie.genres[0]}</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-2 px-1 md:hidden">
        <p className="line-clamp-1 text-xs font-medium text-white">
          {movie.title}
        </p>
        {(movie.year || movie.rating != null) && (
          <p className="mt-0.5 truncate text-[10px] text-neutral-400">
            {movie.rating != null && (
              <span className="text-green-400">
                {Math.round(movie.rating * 10)}%
              </span>
            )}
            {movie.rating != null && movie.year && " · "}
            {movie.year}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
