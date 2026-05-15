import { useEffect } from "react";
import { useApp } from "../context/AppContext";
import {
  CheckIcon,
  CloseIcon,
  PlayIcon,
  PlusIcon,
  ShareIcon,
  ThumbsUpIcon,
} from "./icons";

const IconButton = ({ children, onClick, ariaLabel, active }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    aria-pressed={active}
    className={`flex h-11 w-11 items-center justify-center rounded-full border transition ${
      active
        ? "border-white bg-white text-black"
        : "border-white/30 bg-white/10 text-white backdrop-blur hover:border-white/60 hover:bg-white/20"
    }`}
  >
    {children}
  </button>
);

const Meta = ({ label, value }) => (
  <div>
    <p className="mb-1 text-xs uppercase tracking-wider text-neutral-500">
      {label}
    </p>
    <p className="text-neutral-100">{value}</p>
  </div>
);

const MovieModal = () => {
  const {
    openShow,
    setOpenShow,
    isInList,
    toggleMyList,
    isLiked,
    toggleLiked,
    playShow,
    notify,
  } = useApp();
  const open = !!openShow;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpenShow(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpenShow]);

  if (!open) return null;
  const s = openShow;
  const inList = isInList(s.id);
  const liked = isLiked(s.id);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/browse?show=${s.id}`;
    const shareText = `Watch "${s.title}" on Netflix Clone`;
    try {
      if (navigator.share) {
        await navigator.share({ title: s.title, text: shareText, url: shareUrl });
        return;
      }
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        notify("Link copied to clipboard");
        return;
      }
      notify("Sharing not supported on this device");
    } catch {
      /* user cancelled or share failed */
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 px-4 py-10 backdrop-blur-sm"
      onClick={() => setOpenShow(null)}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[rgb(var(--surface))] shadow-[0_30px_120px_-20px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpenShow(null)}
          aria-label="Close"
          className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
        >
          <CloseIcon />
        </button>

        <div className="relative aspect-video w-full overflow-hidden bg-black">
          <img
            src={s.backdrop}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl opacity-60"
            aria-hidden
          />
          <img
            src={s.backdropHi ?? s.backdrop}
            alt={s.title}
            className="absolute left-1/2 top-1/2 h-full -translate-x-1/2 -translate-y-1/2 object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--surface))] via-[rgb(var(--surface))]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
            <h2 className="mb-5 text-4xl font-black tracking-tight text-white drop-shadow-xl md:text-5xl">
              {s.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => playShow(s)}
                className="flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-black transition hover:scale-[1.03]"
              >
                <PlayIcon />
                Play
              </button>
              <IconButton
                ariaLabel={inList ? "Remove from My List" : "Add to My List"}
                active={inList}
                onClick={() => toggleMyList(s)}
              >
                {inList ? <CheckIcon /> : <PlusIcon />}
              </IconButton>
              <IconButton
                ariaLabel={liked ? "Remove rating" : "Like"}
                active={liked}
                onClick={() => toggleLiked(s)}
              >
                <ThumbsUpIcon />
              </IconButton>
              <IconButton ariaLabel="Share" onClick={handleShare}>
                <ShareIcon />
              </IconButton>
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-7 md:grid-cols-3 md:p-10">
          <div className="md:col-span-2">
            <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
              {s.rating != null && (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2.5 py-0.5 font-semibold text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  {Math.round(s.rating * 10)}% Match
                </span>
              )}
              {s.year && (
                <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-neutral-200">
                  {s.year}
                </span>
              )}
              {s.runtime && (
                <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-neutral-200">
                  {s.runtime}m
                </span>
              )}
              {s.status && (
                <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-neutral-300">
                  {s.status}
                </span>
              )}
            </div>
            <p className="text-base leading-relaxed text-neutral-200">
              {s.overview || "No description available."}
            </p>
          </div>
          <div className="space-y-3 text-sm">
            {s.genres?.length > 0 && (
              <Meta label="Genres" value={s.genres.join(", ")} />
            )}
            {s.network && <Meta label="Network" value={s.network} />}
            {s.language && (
              <Meta label="Language" value={<span className="uppercase">{s.language}</span>} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
