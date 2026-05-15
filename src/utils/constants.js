export const POSTER_FALLBACK =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='200' height='300' fill='%23171717'/><text x='50%25' y='50%25' fill='%23525252' font-family='sans-serif' font-size='14' text-anchor='middle' dominant-baseline='middle'>No Image</text></svg>";

export const HERO_AUTOPLAY_MS = 7000;
export const ROW_SCROLL_FRACTION = 0.85;

export const HELP_URL = "https://help.netflix.com";
export const HELP_LOGIN_URL = "https://help.netflix.com/login";

export const PROFILE_BG = {
  "bg-red-600": "#dc2626",
  "bg-blue-600": "#2563eb",
  "bg-yellow-500": "#eab308",
  "bg-purple-600": "#9333ea",
};

export const PROFILE_GRADIENT = {
  "bg-red-600": "from-red-500 to-rose-600",
  "bg-blue-600": "from-sky-500 to-indigo-600",
  "bg-yellow-500": "from-amber-400 to-orange-500",
  "bg-purple-600": "from-fuchsia-500 to-purple-600",
};

export const NAV_ITEMS = [
  { id: "home", label: "Home", target: "top" },
  { id: "series", label: "TV Shows", target: "top" },
  { id: "new", label: "New & Popular", target: "row-trending" },
  { id: "mylist", label: "My List", target: "row-my-list" },
];

export const SOCIAL_LINKS = [
  { label: "Facebook", url: "https://www.facebook.com/netflix" },
  { label: "Instagram", url: "https://www.instagram.com/netflix" },
  { label: "Twitter", url: "https://twitter.com/netflix" },
  { label: "YouTube", url: "https://www.youtube.com/user/NewOnNetflix" },
];

export const FOOTER_LINKS = [
  "Audio Description",
  "Help Center",
  "Gift Cards",
  "Media Center",
  "Investor Relations",
  "Jobs",
  "Terms of Use",
  "Privacy",
  "Cookie Preferences",
  "Corporate Information",
  "Contact Us",
  "Legal Notices",
];

export const POPULAR_QUERIES = [
  "stranger things",
  "wednesday",
  "squid game",
  "the witcher",
  "money heist",
  "the crown",
  "ozark",
  "peaky blinders",
  "the mandalorian",
  "loki",
  "bridgerton",
  "house of the dragon",
  "succession",
  "the boys",
  "black mirror",
  "narcos",
  "vikings",
  "dark",
  "lupin",
  "you",
  "house of cards",
  "the last of us",
  "shogun",
  "fallout",
  "arcane",
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "New trailers available",
    body: "Fresh trailers from your favorite series just dropped.",
    time: "2h",
  },
  {
    id: 2,
    title: "Continue watching",
    body: "You're 30% through an episode. Pick up where you left off.",
    time: "1d",
  },
  {
    id: 3,
    title: "Trending in your country",
    body: "See what everyone is watching today.",
    time: "3d",
  },
];
