import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import InfoTab from "./InfoTab/InfoTab";
import ListingsTab from "./ListingsTab/ListingsTab";

function SearchTab({ searchState, user, onSearch, listings }) {
  const [search] = searchState;
  const [currList, setCurrList] = useState(null);

  useEffect(() => {
    if (listings != null) {
      setCurrList(listings[0]);
    }
  }, [listings]);

  const onBook = () => {
    // if (user.isLogedIn === false) {
    //   return;
    // }
    console.log(search.from);
    console.log(new Date(search.from));
    console.log(new Date(search.from).toUTCString());

    fetch("http://localhost:8080/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.user.id,
        listing_id: currList.id,
        from: search.from,
        to: search.to,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="SearchTab">
      <div className="container">
        <SearchBar searchState={searchState} onSearch={onSearch} />
        <div className="row mt-1">
          <div className="col-6">
            <ListingsTab listings={listings} setCurrList={setCurrList} />
          </div>
          <div className="col-6">
            <InfoTab currList={currList} user={user} onBook={onBook} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchTab;
