import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import InfoTab from "./InfoTab/InfoTab";
import ListingsTab from "./ListingsTab/ListingsTab";

function SearchTab({ searchState, user }) {
  const [search] = searchState;
  const [listings, setListings] = useState([]);
  const [currList, setCurrList] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/search")
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        if (data != null) {
          setCurrList(data[0]);
        }
      });
  }, [search]);

  return (
    <div className="SearchTab">
      <div className="container">
        <SearchBar searchState={searchState} />
        <div className="row mt-1">
          <div className="col-6">
            <ListingsTab listings={listings} setCurrList={setCurrList} />
          </div>
          <div className="col-6">
            <InfoTab currList={currList} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchTab;
