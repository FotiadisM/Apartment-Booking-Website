import React from "react";
import NavBAr from "../NavBar/NavBar";

const search = (history) => {
  history.push("/main");
};

function Homepage({ history }) {
  return (
    <div className="Homepage">
      <NavBAr />

      <div className="container" style={{ maxWidth: "700px" }}>
        <h4 className="font-weight-bold mt-5" style={{ fontSize: "6em" }}>
          Where to?
        </h4>
        <hr />
        <form
          className="row border rounded p-4 mt-4 needs-validation"
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
          <div className="col-sm-6">
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
          <div className="col-sm-6">
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
              onClick={() => search(history)}
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
