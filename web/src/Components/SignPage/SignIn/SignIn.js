import React from "react";

function SignIn() {
  return (
    <div className="SignIn">
      <h1 className="mb-1">Sign In </h1>
      <hr className="bg-white mt-0" style={{ height: ".2rem", opacity: "1" }} />
      <form className="px-4 py-3 border border-white rounded-lg">
        <div className="mb-3">
          <label htmlFor="userNameSignIn" className="form-label text-white">
            Username
          </label>
          <input
            type="text"
            autoComplete="username"
            className="form-control"
            id="userNameSignIn"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordSignIn" className="form-label text-white">
            Password
          </label>
          <input
            type="password"
            autoComplete="current-password"
            className="form-control"
            id="passwordSignIn"
            aria-describedby="forgotPassword"
          />
          <div
            id="forgotPassword"
            className="form-text text-white"
            style={{ cursor: "pointer" }}
          >
            Forgot password?
          </div>
        </div>
        <div className="mt-4 d-flex justify-content-end">
          <button type="submit" className="btn btn-light w-50">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
