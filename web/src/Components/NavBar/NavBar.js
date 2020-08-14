import React from "react";
import LogedOut from "./LogedOut";
import LogedIn from "./LogedIn";

function NavBAr({ userState }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
      <div className="container">
        <div className="navbar-brand">Homebnb</div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav mr-auto mb-2 mb-lg-0 mb-0">
            <li className="nav-item">
              <div className="nav-link" style={{ cursor: "pointer" }}>
                About
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link" style={{ cursor: "pointer" }}>
                Become a Host
              </div>
            </li>
          </ul>
          <div>
            {userState[0].isLogedIn ? (
              <LogedIn userState={userState} />
            ) : (
              <LogedOut />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBAr;
