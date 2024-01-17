import React from "react";
import Header from "./Header";

const Login = () => {
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/594f8025-139a-4a35-b58d-4ecf8fdc507c/d3c4e455-f0bf-4003-b7cd-511dda6da82a/IN-en-20240108-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="bg"
        />
      </div>
      <form className="text-white w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 rounded-lg bg-opacity-80">
        <h1 className="text-2xl py-4 font-bold">Sign In</h1>
        <input
          className="p-4 my-4 w-full bg-gray-700"
          type="text"
          placeholder="Email"
        />
        <input
          className="p-4 my-4 w-full bg-gray-700"
          type="password"
          placeholder="Password"
        />
        <button className="px-2 py-2 my-2 bg-red-700 w-full">Sign In</button>
        <p className="py-2">New to Netflix? Sign up now.</p>
      </form>
    </div>
  );
};

export default Login;
