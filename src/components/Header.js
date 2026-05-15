import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../img/Netflix_Logo.png";
import { useApp } from "../context/AppContext";
import {
  HELP_URL,
  MOCK_NOTIFICATIONS,
  NAV_ITEMS,
  PROFILE_BG,
} from "../utils/constants";
import { BellIcon, SearchIcon } from "./icons";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const menuRef = useRef(null);
  const notifRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut, setSearchOpen, notify, myList } = useApp();
  const isAppRoute = location.pathname === "/browse";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen && !notifOpen) return;
    const onDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, notifOpen]);

  const handleNav = (item) => {
    setActiveNav(item.id);
    if (item.id === "mylist" && myList.length === 0) {
      notify("Your list is empty — open a show and tap + to add");
      return;
    }
    if (item.target === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(item.target);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      notify(`Nothing in "${item.label}" yet`);
    }
  };

  const MenuItem = ({ children, onClick }) => (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-neutral-200 transition hover:bg-white/5"
    >
      {children}
    </button>
  );

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <div
        className={`pointer-events-auto mx-auto flex h-14 max-w-[1600px] items-center justify-between rounded-2xl px-3 transition-all duration-300 md:h-16 md:px-5 ${
          scrolled || !isAppRoute
            ? "glass shadow-2xl"
            : "border border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center gap-2 md:gap-6">
          <Link
            to={isAppRoute ? "/browse" : "/"}
            className="flex items-center gap-2"
          >
            <img src={Logo} alt="Netflix" className="h-6 md:h-7" />
          </Link>
          {isAppRoute && profile?.id === "kids" && (
            <span className="hidden items-center gap-1 rounded-full bg-yellow-400/20 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-widest text-yellow-300 ring-1 ring-yellow-400/40 md:inline-flex">
              Kids
            </span>
          )}
          {isAppRoute && (
            <nav className="hidden items-center gap-1 lg:flex">
              {NAV_ITEMS.map((item) => {
                const active = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item)}
                    className={`rounded-full px-3 py-1.5 text-sm transition ${
                      active
                        ? "bg-white/10 font-semibold text-white"
                        : "text-neutral-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          )}
        </div>

        {isAppRoute && (
          <div className="flex items-center gap-1 text-white md:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 transition hover:bg-white/10 hover:text-white"
            >
              <SearchIcon />
            </button>

            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setNotifOpen((v) => !v);
                  setMenuOpen(false);
                }}
                aria-label="Notifications"
                aria-haspopup="menu"
                aria-expanded={notifOpen}
                className="relative flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 transition hover:bg-white/10 hover:text-white"
              >
                <BellIcon />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[rgb(var(--surface))]" />
              </button>
              {notifOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-2 w-80 overflow-hidden rounded-xl glass shadow-2xl"
                >
                  <div className="border-b border-white/5 px-4 py-3">
                    <p className="text-sm font-semibold text-white">
                      Notifications
                    </p>
                    <p className="text-xs text-neutral-500">
                      You have {MOCK_NOTIFICATIONS.length} updates
                    </p>
                  </div>
                  <ul className="max-h-96 overflow-y-auto">
                    {MOCK_NOTIFICATIONS.map((n) => (
                      <li key={n.id}>
                        <button
                          onClick={() => {
                            notify(`Opened: ${n.title}`);
                            setNotifOpen(false);
                          }}
                          className="block w-full px-4 py-3 text-left transition hover:bg-white/5"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-medium text-white">
                                {n.title}
                              </p>
                              <p className="mt-0.5 text-xs text-neutral-400">
                                {n.body}
                              </p>
                            </div>
                            <span className="shrink-0 text-[10px] uppercase tracking-wider text-neutral-500">
                              {n.time}
                            </span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      notify("All notifications marked as read");
                      setNotifOpen(false);
                    }}
                    className="block w-full border-t border-white/5 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-neutral-300 transition hover:bg-white/5 hover:text-white"
                  >
                    Mark all as read
                  </button>
                </div>
              )}
            </div>

            <div className="relative ml-1" ref={menuRef}>
              <button
                onClick={() => {
                  setMenuOpen((v) => !v);
                  setNotifOpen(false);
                }}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                className="flex items-center gap-2"
              >
                <div
                  className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full text-sm font-bold text-white ring-1 ring-white/20"
                  style={{ background: PROFILE_BG[profile?.color] ?? "#525252" }}
                >
                  {profile?.name?.[0] ?? "U"}
                </div>
              </button>
              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-2 w-60 overflow-hidden rounded-xl glass py-2 text-sm shadow-2xl"
                >
                  {profile && (
                    <div className="border-b border-white/5 px-4 py-3">
                      <p className="text-xs uppercase tracking-wider text-neutral-500">
                        Signed in as
                      </p>
                      <p className="mt-0.5 font-semibold text-white">
                        {profile.name}
                      </p>
                    </div>
                  )}
                  <MenuItem
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/profiles");
                    }}
                  >
                    Switch Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setMenuOpen(false);
                      notify(`Plan: Premium · ${profile?.name ?? "User"}`);
                    }}
                  >
                    Account
                  </MenuItem>
                  <a
                    href={HELP_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-neutral-200 transition hover:bg-white/5"
                  >
                    Help Center ↗
                  </a>
                  <div className="my-1 border-t border-white/5" />
                  <MenuItem
                    onClick={() => {
                      setMenuOpen(false);
                      signOut();
                      navigate("/", { replace: true });
                    }}
                  >
                    Sign out
                  </MenuItem>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
