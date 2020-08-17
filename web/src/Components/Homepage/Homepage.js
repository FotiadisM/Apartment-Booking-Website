import React from "react";
import { useHistory } from "react-router-dom";
import NavBAr from "../NavBar/NavBar";

function Homepage({ userState, searchState }) {
  let history = useHistory();
  const [search, setSearch] = searchState;

  return (
    <div className="Homepage">
      <NavBAr userState={userState} />

      <div className="container" style={{ maxWidth: "700px" }}>
        <h4 className="font-weight-bold mt-5" style={{ fontSize: "6em" }}>
          Where to?
        </h4>
        <hr />
        <form
          className="row border rounded p-4 mt-4 needs-validation shadow"
          onSubmit={() => history.push("/main")}
          noValidate={true}
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
              value={search.destination}
              onChange={(e) => {
                e.persist();
                setSearch((prevSearch) => ({
                  ...prevSearch,
                  destination: e.target.value,
                }));
              }}
              required={true}
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
              value={search.from}
              onChange={(e) => {
                e.persist();
                setSearch((prevSearch) => ({
                  ...prevSearch,
                  from: e.target.value,
                }));
              }}
              required={true}
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
              value={search.to}
              onChange={(e) => {
                e.persist();
                setSearch((prevSearch) => ({
                  ...prevSearch,
                  to: e.target.value,
                }));
              }}
              required={true}
            />
          </div>
          <div className="col-6 mt-3">
            <input
              type="number"
              className="form-control"
              placeholder="Add visitors"
              min="1"
              max="7"
              value={search.people}
              onChange={(e) => {
                e.persist();
                setSearch((prevSearch) => ({
                  ...prevSearch,
                  people: e.target.value,
                }));
              }}
              required={true}
            />
          </div>
          <div className="col-6 mt-3">
            <button type="submit" className="form-control btn-primary">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Homepage;
