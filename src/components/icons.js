export const PlayIcon = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const Chevron = ({ dir = "right", className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
    />
  </svg>
);

export const CloseIcon = ({ className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const SearchIcon = ({ className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" strokeLinecap="round" />
  </svg>
);

export const PlusIcon = ({ className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    className={className}
  >
    <path strokeLinecap="round" d="M12 5v14M5 12h14" />
  </svg>
);

export const CheckIcon = ({ className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export const InfoIcon = ({ className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" d="M12 8h.01M11 12h1v5h1" />
  </svg>
);

export const BellIcon = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2a7 7 0 0 0-7 7v3.586L3.293 14.293A1 1 0 0 0 4 16h16a1 1 0 0 0 .707-1.707L19 12.586V9a7 7 0 0 0-7-7Zm0 20a3 3 0 0 0 2.995-2.824L15 19h-6a3 3 0 0 0 3 3Z" />
  </svg>
);

export const ThumbsUpIcon = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9A2 2 0 0 0 19.66 9H14Z" />
  </svg>
);

export const ShareIcon = ({ className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
  </svg>
);

export const SparkleIcon = ({ className = "h-3 w-3" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73S7.3 7.53 7.3 5.47L7.34 5C5.31 7.4 4 10.55 4 13.5 4 17.64 7.36 21 11.5 21S19 17.64 19 13.5c0-5.5-2.74-10.62-5.5-12.83Z" />
  </svg>
);
