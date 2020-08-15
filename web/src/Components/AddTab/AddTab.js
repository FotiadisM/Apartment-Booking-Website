import React from "react";

function AddTab() {
  return (
    <div className="AddTab mt-2 mb-3">
      <div className="container" style={{ width: "40%" }}>
        <h1 className="mb-1 text-primary">Add a new Listing</h1>
        <hr
          className="bg-primary mt-0"
          style={{ height: ".2rem", opacity: "1" }}
        />
        <div className="border border-primary rounded-lg py-3 px-4">
          <div className="row mb-2">
            <div className="col">
              <label
                htmlFor="fNameSettings"
                className="form-label text-primary mb-1"
              >
                First Name
              </label>
              <input type="text" className="form-control" id="fNameSettings" />
            </div>
            <div className="col">
              <label
                htmlFor="lNameSettings"
                className="form-label text-primary mb-1"
              >
                Last Name
              </label>
              <input type="text" className="form-control" id="lNameSettings" />
            </div>
          </div>
          <div className="mb-2">
            <label
              htmlFor="emailSettings"
              className="form-label text-primary mb-1"
            >
              Email
            </label>
            <input type="email" className="form-control" id="emailSettings" />
          </div>
          <div className="mb-2">
            <label
              htmlFor="usernameSettings"
              className="form-label text-primary mb-1"
            >
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="usernameSettings"
              autoComplete="username"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="passwordSettings"
              className="form-label text-primary mb-1"
            >
              Password
            </label>
            <input
              type="password"
              autoComplete="new-password"
              className="form-control"
              id="passwordSettings"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="telSettings"
              className="form-label text-primary mb-1"
            >
              Telephone number
            </label>
            <input
              type="tel"
              pattern="[0-9]{10}"
              autoComplete="new-password"
              className="form-control"
              id="telSettings"
            />
          </div>
          <div className="mt-4 d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTab;
