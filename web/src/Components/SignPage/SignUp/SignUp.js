import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { SignUpAPI } from "../../../APIs/SignUpAPI";

const onSignUp = (e, signUpInfo, setUser, history) => {
  const form = document.getElementById("signUpForm");

  if (!form.checkValidity()) {
    e.preventDefault();
    e.stopPropagation();

    form.classList.add("was-validated");
  } else {
    e.preventDefault();
    e.stopPropagation();

    SignUpAPI(signUpInfo)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 409) {
          throw Error("Username is taken");
        } else {
          throw Error("failed to register");
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
      .catch((err) => {
        if (err.message === "Username is taken") {
          alert("Username is taken");
        } else {
          console.log(err);
        }
      });
  }
};

function SignUp({ setUser }) {
  let history = useHistory();
  const [signUpInfo, setSignUp] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    user_password: "",
    role: "",
    email: "",
    tel_number: "",
  });

  return (
    <div className="SignUp">
      <h1 className="mb-1 text-primary">Sign Up</h1>
      <hr
        className="bg-primary mt-0"
        style={{ height: ".2rem", opacity: "1" }}
      />
      <form
        className="px-4 py-3 border border-primary rounded-lg needs-validation shadow"
        id="signUpForm"
        onSubmit={(e) => onSignUp(e, signUpInfo, setUser, history)}
        noValidate={true}
      >
        <div className="row mb-2">
          <div className="col">
            <label
              htmlFor="fNameSignUp"
              className="form-label text-primary mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fNameSignUp"
              value={signUpInfo.first_name}
              onChange={(e) => {
                e.persist();
                setSignUp((prevSignUp) => ({
                  ...prevSignUp,
                  first_name: e.target.value,
                }));
              }}
              required={true}
            />
          </div>
          <div className="col">
            <label
              htmlFor="lNameSignUp"
              className="form-label text-primary mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lNameSignUp"
              value={signUpInfo.last_name}
              onChange={(e) => {
                e.persist();
                setSignUp((prevSignUp) => ({
                  ...prevSignUp,
                  last_name: e.target.value,
                }));
              }}
              required={true}
            />
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="emailSignUp" className="form-label text-primary mb-1">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="emailSignUp"
            value={signUpInfo.email}
            onChange={(e) => {
              e.persist();
              setSignUp((prevSignUp) => ({
                ...prevSignUp,
                email: e.target.value,
              }));
            }}
            required={true}
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="usernameSignUp"
            className="form-label text-primary mb-1"
          >
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="usernameSignUp"
            autoComplete="username"
            value={signUpInfo.user_name}
            onChange={(e) => {
              e.persist();
              setSignUp((prevSignUp) => ({
                ...prevSignUp,
                user_name: e.target.value,
              }));
            }}
            required={true}
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="passwordSignUp"
            className="form-label text-primary mb-1"
          >
            Password
          </label>
          <input
            type="password"
            autoComplete="new-password"
            className="form-control"
            id="passwordSignUp"
            value={signUpInfo.user_password}
            onChange={(e) => {
              e.persist();
              setSignUp((prevSignUp) => ({
                ...prevSignUp,
                user_password: e.target.value,
              }));
            }}
            required={true}
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="repeatPasswordSignUp"
            className="form-label text-primary mb-1"
          >
            Repeat password
          </label>
          <input
            type="password"
            autoComplete="new-password"
            className="form-control mb-1"
            id="repeatPasswordSignUp"
            required={true}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="telSignUp" className="form-label text-primary mb-1">
            Telephone number
          </label>
          <input
            type="tel"
            pattern="[0-9]{10}"
            autoComplete="new-password"
            className="form-control"
            id="telSignUp"
            value={signUpInfo.tel_number}
            onChange={(e) => {
              e.persist();
              setSignUp((prevSignUp) => ({
                ...prevSignUp,
                tel_number: e.target.value,
              }));
            }}
            required={true}
          />
        </div>
        <div className="d-flex justify-content-around">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="radioSignUp"
              id="userRadioSignUp"
              value="user"
              onClick={() =>
                setSignUp((prevSignUp) => ({ ...prevSignUp, role: "user" }))
              }
              required={true}
            />
            <label className="form-check-label" htmlFor="userRadioSignUp">
              User
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="radioSignUp"
              id="hostRadioSignUp"
              value="host"
              onClick={() =>
                setSignUp((prevSignUp) => ({ ...prevSignUp, role: "host" }))
              }
              required={true}
            />
            <label className="form-check-label" htmlFor="hostRadioSignUp">
              Host
            </label>
          </div>
        </div>
        <div className="mt-4 d-flex justify-content-end">
          <button type="submit" className="btn btn-primary w-50">
            Get Started
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
