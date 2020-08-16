import React from "react";

function SignUp() {
  return (
    <div className="SignUp">
      <h1 className="mb-1 text-primary">Sign Up</h1>
      <hr
        className="bg-primary mt-0"
        style={{ height: ".2rem", opacity: "1" }}
      />
      <form className="px-4 py-3 border border-primary rounded-lg">
        <div className="row mb-2">
          <div className="col">
            <label
              htmlFor="fNameSignUp"
              className="form-label text-primary mb-1"
            >
              First Name
            </label>
            <input type="text" className="form-control" id="fNameSignUp" />
          </div>
          <div className="col">
            <label
              htmlFor="lNameSignUp"
              className="form-label text-primary mb-1"
            >
              Last Name
            </label>
            <input type="text" className="form-control" id="lNameSignUp" />
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="emailSignUp" className="form-label text-primary mb-1">
            Email
          </label>
          <input type="email" className="form-control" id="emailSignUp" />
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
          />
        </div>
        <div className="d-flex justify-content-around">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios1"
              value="option1"
            />
            <label className="form-check-label" htmlFor="exampleRadios1">
              User
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios2"
              value="option2"
            />
            <label className="form-check-label" htmlFor="exampleRadios2">
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
