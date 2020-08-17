import React from "react";

const onSignIn = (e) => {
  const form = document.getElementById("signInForm");

  if (!form.checkValidity()) {
    e.preventDefault();
    e.stopPropagation();
  }

  form.classList.add("was-validated");
};

function SignIn() {
  return (
    <div className="SignIn">
      <h1 className="mb-1">Sign In </h1>
      <hr className="bg-white mt-0" style={{ height: ".2rem", opacity: "1" }} />
      <form
        className="px-4 py-3 border border-white rounded-lg needs-validation shadow-lg"
        id="signInForm"
        noValidate={true}
        onSubmit={(e) => onSignIn(e)}
      >
        <div className="mb-3">
          <label htmlFor="userNameSignIn" className="form-label text-white">
            Username
          </label>
          <input
            type="text"
            autoComplete="username"
            className="form-control"
            id="userNameSignIn"
            required={true}
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
            required={true}
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
