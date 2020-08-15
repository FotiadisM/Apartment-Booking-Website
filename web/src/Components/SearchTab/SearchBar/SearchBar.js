import React from "react";

function SearchBar({ searchState }) {
  const [search, setSearch] = searchState;

  return (
    <form className="row rounded needs-validation g-2" noValidate>
      <div className="col-sm-4">
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
          required
        />
      </div>
      <div className="col-sm-2">
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
          required
        />
      </div>
      <div className="col-sm-2">
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
          required
        />
      </div>
      <div className="col-sm-2">
        <input
          type="number"
          className="form-control"
          placeholder="Add visitors"
          max="7"
          min="1"
          value={search.people}
          onChange={(e) => {
            e.persist();
            setSearch((prevSearch) => ({
              ...prevSearch,
              people: e.target.value,
            }));
          }}
          required
        />
      </div>
      <div className="col-sm-2">
        <button type="submit" className="form-control btn-primary">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
