import React from "react";

const search = () => {
  alert("hello");
};

function Homepage() {
  return (
    <div className="Homepage">
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

      <div className="container" style={{ maxWidth: "700px" }}>
        <h4 className="font-weight-bold mt-5" style={{ fontSize: "6em" }}>
          Where to?
        </h4>
        <hr />
        <form
          className="border rounded p-4 mt-4 row needs-validation"
          noValidate
        >
          <div className="col-12 mb-2">
            <label htmlFor="destination" className="form-label">
              Destination
            </label>
            <input
              type="text"
              className="form-control"
              id="destination"
              placeholder="Where would you like to go?"
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="from" className="form-label">
              From:
            </label>
            <input
              type="date"
              className="form-control"
              id="from"
              placeholder="Add date"
              required
            />
          </div>
          <div className="col-6">
            <label htmlFor="to" className="form-label">
              To:
            </label>
            <input
              type="date"
              className="form-control"
              id="to"
              placeholder="Add date"
              required
            />
          </div>
          <div className="col-6 mt-3">
            <input
              type="number"
              className="form-control"
              placeholder="Add visitors"
              required
              max="7"
            />
          </div>
          <div className="col-6 mt-3">
            <button
              type="submit"
              className="form-control btn-primary"
              onClick={() => search()}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Homepage;
