import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateSignInData, validateSignUpData } from "../utils/validate";
import { HELP_LOGIN_URL, HELP_URL } from "../utils/constants";
import Logo from "../img/Netflix_Logo.png";

const BG =
  "https://assets.nflxext.com/ffe/siteui/vlv3/77c412a9-62ea-48a0-a5ee-466e11e851d5/web/IN-en-20260511-TRIFECTA-perspective_f0af4f75-4cc5-42bd-b0c5-2b65b8b50e03_large.jpg";

const Input = ({ inputRef, type, placeholder }) => (
  <input
    ref={inputRef}
    type={type}
    placeholder={placeholder}
    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-white/40 focus:bg-white/10"
  />
);

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setError] = useState(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";
    const msg = isSignIn
      ? validateSignInData(email, password)
      : validateSignUpData(nameRef.current?.value ?? "", email, password);
    if (msg) {
      setError(msg);
      return;
    }
    setError(null);
    navigate("/profiles");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <img
        src={BG}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        aria-hidden
      />

      <div className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <img src={Logo} alt="Netflix" className="h-7 md:h-8" />
        <a
          href={HELP_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/15"
        >
          Help
        </a>
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-88px)] items-center justify-center px-4 pb-16">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-3xl border border-white/10 bg-black/40 p-10 shadow-[0_30px_120px_-20px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
            Welcome
          </p>
          <h1 className="mb-8 text-4xl font-black tracking-tight text-white">
            {isSignIn ? (
              <>
                Sign in to <span className="text-gradient-red">continue</span>
              </>
            ) : (
              <>
                Create your <span className="text-gradient-red">account</span>
              </>
            )}
          </h1>

          <div className="space-y-3">
            {!isSignIn && (
              <Input inputRef={nameRef} type="text" placeholder="Full Name" />
            )}
            <Input
              inputRef={emailRef}
              type="email"
              placeholder="Email address"
            />
            <Input
              inputRef={passwordRef}
              type="password"
              placeholder="Password"
            />
          </div>

          {error && (
            <p className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-sm font-medium text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-gradient-accent py-3.5 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:scale-[1.01] hover:shadow-red-500/40"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>

          <div className="mt-4 flex items-center justify-between text-xs text-neutral-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-red-500" />
              Remember me
            </label>
            <a
              href={HELP_LOGIN_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              Need help?
            </a>
          </div>

          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-widest text-neutral-500">
              or
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <p className="text-center text-sm text-neutral-400">
            {isSignIn ? "New to Netflix?" : "Already registered?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsSignIn((v) => !v);
                setError(null);
              }}
              className="font-semibold text-white hover:text-gradient-red hover:underline"
            >
              {isSignIn ? "Sign up now" : "Sign in"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
