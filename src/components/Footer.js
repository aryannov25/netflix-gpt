import { useApp } from "../context/AppContext";
import { FOOTER_LINKS, HELP_URL, SOCIAL_LINKS } from "../utils/constants";

const ICONS = {
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.54V9.83c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.45 2.91h-2.33V22c4.78-.75 8.44-4.91 8.44-9.93Z" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38a3.7 3.7 0 0 1-1.38.9c-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07Zm0 5.3a4.54 4.54 0 1 0 0 9.08 4.54 4.54 0 0 0 0-9.08Zm0 7.5a2.96 2.96 0 1 1 0-5.92 2.96 2.96 0 0 1 0 5.92Zm5.78-7.72a1.06 1.06 0 1 1-2.12 0 1.06 1.06 0 0 1 2.12 0Z" />
    </svg>
  ),
  Twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18.244 2H21.5l-7.6 8.69L23 22h-6.844l-5.36-6.94L4.5 22H1.24l8.13-9.29L1 2h7.02l4.84 6.4L18.24 2Zm-1.2 18h1.86L7.06 4H5.09l11.95 16Z" />
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-5.8 31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
    </svg>
  ),
};

const Footer = () => {
  const { notify } = useApp();

  const handleLinkClick = (label) => {
    if (label === "Help Center") {
      window.open(HELP_URL, "_blank", "noopener,noreferrer");
    } else {
      notify(`"${label}" — demo only`);
    }
  };

  return (
    <footer className="mt-12 border-t border-white/5 px-6 pb-12 pt-14 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div className="max-w-md">
            <p className="text-2xl font-black tracking-tight text-white">
              Stories that <span className="text-gradient-red">move you</span>.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              A modern streaming experience. Built with React, Tailwind, and live
              data from TVMaze.
            </p>
          </div>
          <div className="flex gap-2">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-neutral-300 transition hover:bg-white/15 hover:text-white"
              >
                {ICONS[s.label]}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-neutral-400 md:grid-cols-4">
          {FOOTER_LINKS.map((label) => (
            <button
              key={label}
              onClick={() => handleLinkClick(label)}
              className="text-left transition hover:text-white"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 md:flex-row md:items-center">
          <p className="text-xs text-neutral-500">
            © Netflix Clone — for educational use. Data from TVMaze.
          </p>
          <button
            onClick={() => notify("Service Code: NF-DEMO-2026")}
            className="rounded border border-white/15 px-2.5 py-1 text-[11px] uppercase tracking-wider text-neutral-400 hover:text-white"
          >
            Service Code
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
