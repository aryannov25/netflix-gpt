import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const AppContext = createContext(null);

const read = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v == null ? fallback : JSON.parse(v);
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

export const AppProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => read("nf:profile", null));
  const [myList, setMyList] = useState(() => read("nf:myList", []));
  const [liked, setLiked] = useState(() => read("nf:liked", []));
  const [openShow, setOpenShow] = useState(null);
  const [playingShow, setPlayingShow] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

  const playShow = useCallback((show) => {
    setOpenShow(null);
    setPlayingShow(show);
  }, []);

  useEffect(() => write("nf:profile", profile), [profile]);
  useEffect(() => write("nf:myList", myList), [myList]);
  useEffect(() => write("nf:liked", liked), [liked]);

  const isInList = useCallback((id) => myList.includes(id), [myList]);
  const isLiked = useCallback((id) => liked.includes(id), [liked]);

  const notify = useCallback((message) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ message, id: Date.now() });
    toastTimerRef.current = setTimeout(() => setToast(null), 2500);
  }, []);

  const toggleMyList = useCallback(
    (show) => {
      const id = typeof show === "object" ? show.id : show;
      const title = typeof show === "object" ? show.title : null;
      setMyList((prev) => {
        const has = prev.includes(id);
        notify(
          has
            ? title
              ? `Removed "${title}" from My List`
              : "Removed from My List"
            : title
              ? `Added "${title}" to My List`
              : "Added to My List"
        );
        return has ? prev.filter((x) => x !== id) : [...prev, id];
      });
    },
    [notify]
  );

  const toggleLiked = useCallback(
    (show) => {
      const id = typeof show === "object" ? show.id : show;
      const title = typeof show === "object" ? show.title : null;
      setLiked((prev) => {
        const has = prev.includes(id);
        notify(
          has
            ? "Removed your rating"
            : title
              ? `You liked "${title}"`
              : "Liked"
        );
        return has ? prev.filter((x) => x !== id) : [...prev, id];
      });
    },
    [notify]
  );

  const signOut = useCallback(() => {
    setProfile(null);
    setOpenShow(null);
    setPlayingShow(null);
    setSearchOpen(false);
  }, []);

  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        myList,
        toggleMyList,
        isInList,
        liked,
        toggleLiked,
        isLiked,
        openShow,
        setOpenShow,
        playingShow,
        setPlayingShow,
        playShow,
        searchOpen,
        setSearchOpen,
        toast,
        notify,
        signOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};

export const PROFILES = [
  { id: "aryan", name: "Aryan", color: "bg-red-600" },
  { id: "family", name: "Family", color: "bg-blue-600" },
  { id: "kids", name: "Kids", color: "bg-yellow-500" },
  { id: "guest", name: "Guest", color: "bg-purple-600" },
];
