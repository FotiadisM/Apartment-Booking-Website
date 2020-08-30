import React from "react";

function SettingsPage({ userState }) {
  const [user] = userState;

  return (
    <div className="SettingsTab mt-2 mb-3">
      <div className="container" style={{ width: "40%" }}>
        <h1 className="mb-1 text-primary">Settings</h1>
        <hr
          className="bg-primary mt-0"
          style={{ height: ".2rem", opacity: "1" }}
        />
        <form className="border border-primary rounded-lg py-3 px-4">
          <div className="row mb-2">
            <div className="col">
              <label
                htmlFor="fNameSettings"
                className="form-label text-primary mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fNameSettings"
                value={user.user.first_name}
              />
            </div>
            <div className="col">
              <label
                htmlFor="lNameSettings"
                className="form-label text-primary mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lNameSettings"
                value={user.user.last_name}
              />
            </div>
          </div>
          <div className="mb-2">
            <label
              htmlFor="emailSettings"
              className="form-label text-primary mb-1"
            >
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="emailSettings"
              value={user.user.email}
            />
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
              value={user.user.user_name}
            />
          </div>
          {/* <div className="mb-2">
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
          </div> */}
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
              value={user.user.tel_number}
            />
          </div>
          <div className="mt-4 d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SettingsPage;
