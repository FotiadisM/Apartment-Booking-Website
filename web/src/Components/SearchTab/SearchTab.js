import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import InfoTab from "./InfoTab/InfoTab";
import ListingsTab from "./ListingsTab/ListingsTab";

function SearchTab({ searchState, user, onSearch, listings }) {
  const [currList, setCurrList] = useState(null);

  useEffect(() => {
    if (listings != null) {
      setCurrList(listings[0]);
    }
  }, [listings]);

  return (
    <div className="SearchTab">
      <div className="container">
        <SearchBar searchState={searchState} onSearch={onSearch} />
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
