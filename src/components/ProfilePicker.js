import { useNavigate } from "react-router-dom";
import { PROFILES, useApp } from "../context/AppContext";
import { PROFILE_GRADIENT } from "../utils/constants";

const Avatar = ({ name, color }) => {
  const initial = name[0].toUpperCase();
  return (
    <div
      className={`flex h-32 w-32 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br text-4xl font-black text-white shadow-2xl transition duration-300 group-hover:scale-105 group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] md:h-40 md:w-40 md:text-5xl ${
        PROFILE_GRADIENT[color] ?? "from-neutral-500 to-neutral-700"
      }`}
    >
      {initial}
    </div>
  );
};

const ProfilePicker = () => {
  const { setProfile, notify } = useApp();
  const navigate = useNavigate();

  const pick = (p) => {
    setProfile(p);
    navigate("/browse");
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16 text-white">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
        Profile
      </p>
      <h1 className="mb-12 text-4xl font-black tracking-tight md:mb-16 md:text-6xl">
        Who's <span className="text-gradient-red">watching</span>?
      </h1>
      <div className="flex flex-wrap items-start justify-center gap-6 md:gap-10">
        {PROFILES.map((p) => (
          <button
            key={p.id}
            onClick={() => pick(p)}
            className="group flex flex-col items-center gap-4 outline-none"
          >
            <Avatar name={p.name} color={p.color} />
            <span className="text-base font-medium text-neutral-400 transition group-hover:text-white md:text-lg">
              {p.name}
            </span>
          </button>
        ))}
      </div>
      <button
        onClick={() => notify("Profile management not available in demo")}
        className="mt-14 rounded-full border border-white/15 px-6 py-2.5 text-sm font-medium tracking-wider text-neutral-300 transition hover:border-white hover:text-white md:mt-20"
      >
        Manage Profiles
      </button>
    </div>
  );
};

export default ProfilePicker;
