import React, { useState } from "react";
import { SignInAPI } from "../../../APIs/SignInAPI";
import { useHistory } from "react-router-dom";

const onSignIn = (e, signInInfo, setUser, history) => {
  const form = document.getElementById("signInForm");

  if (!form.checkValidity()) {
    e.preventDefault();
    e.stopPropagation();

    form.classList.add("was-validated");
  } else {
    e.preventDefault();
    e.stopPropagation();

    SignInAPI(signInInfo)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw Error("Failed to fetch");
        }
      })
      .then((data) => {
        setUser({
          isLogedIn: true,
          access_token: data.access_token,
          user: data.user,
        });
        history.push("/main");
      })
      .catch((err) => console.log(err));
  }
};

function SignIn({ setUser }) {
  let history = useHistory();
  const [signInInfo, setSingIn] = useState({
    user_name: "",
    user_password: "",
  });

  return (
    <div className="SignIn">
      <h1 className="mb-1">Sign In </h1>
      <hr className="bg-white mt-0" style={{ height: ".2rem", opacity: "1" }} />
      <form
        className="px-4 py-3 border border-white rounded-lg needs-validation shadow-lg"
        id="signInForm"
        noValidate={true}
        onSubmit={(e) => onSignIn(e, signInInfo, setUser, history)}
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
            value={signInInfo.user_name}
            onChange={(e) => {
              e.persist();
              setSingIn((prevSignIn) => ({
                ...prevSignIn,
                user_name: e.target.value,
              }));
            }}
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
            value={signInInfo.user_password}
            onChange={(e) => {
              e.persist();
              setSingIn((prevSignIn) => ({
                ...prevSignIn,
                user_password: e.target.value,
              }));
            }}
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
