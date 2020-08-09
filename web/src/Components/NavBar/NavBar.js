import React from "react";

function NavBAr() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
      <div className="container">
        <a className="navbar-brand" href="/#">
          Homebnb
        </a>
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
          <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#">
                Become a Host
              </a>
            </li>
          </ul>
          <div className="d-flex">
            <button className="mr-2 btn btn-outline-primary px-3">
              Log In
            </button>
            <button className="ml-2 btn btn-primary px-3">Sign Up</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBAr;
