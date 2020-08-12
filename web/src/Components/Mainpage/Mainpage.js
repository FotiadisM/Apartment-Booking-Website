import React, { useEffect, useState } from "react";
import NavBAr from "../NavBar/NavBar";
import SearchBar from "./SearchBar/SearchBar";
import InfoTab from "./InfoTab/InfoTab";
import ListingsTab from "./ListingsTab/ListingsTab";

const array = [
  {
    id: 1,
    user_id: 2,
    user_name: "Mike Fotiadis",
    price_day: 32,
    bed_num: 2,
    room_num: 1,
    bathroom_num: 1,
    has_living_room: true,
    square_meters: 78,
    description: "Blah Blah very nice book it pls",
    type: "apartment",
    rules: "no DIT students",
    review_num: 623,
    review_avrg: 4.2,
    street: "Papanikolaou 14",
    neighbourhood: "Koukaki",
    city: "Athens",
    state: "Attiki",
    zipcode: "14256",
    country: "Greece",
    latitude: "312,42",
    longtitude: "782.54",
  },
  {
    id: 2,
    name: "Mike's Hotel",
    price: 12,
    bedNums: 2,
  },
  {
    id: 3,
    name: "Mike's Hotel",
    price: 12,
    bedNums: 2,
  },
  {
    id: 4,
    name: "Mike's Hotel",
    price: 12,
    bedNums: 2,
  },
  {
    id: 5,
    name: "Mike's Hotel",
    price: 12,
    bedNums: 2,
  },
  {
    id: 6,
    name: "Mike's Hotel",
    price: 12,
    bedNums: 2,
  },
  {
    id: 7,
    name: "Mike's Hotel",
    price: 12,
    bedNums: 2,
  },
  {
    id: 8,
    name: "Mike's Hotel",
    price: 12,
    bedNums: 2,
  },
];

function Mainpage({ searchState }) {
  const [search, setSearch] = searchState;
  const [listings, setListings] = useState([]);
  const [currList, setCurrList] = useState({});

  useEffect(() => {
    setListings(array);
    setCurrList(array[0]);
  }, [search]);

  return (
    <div className="Mainpage d-flex flex-column" style={{ height: "100%" }}>
      <div className="flex-grow-0 flex-shrink-1" style={{ flexBasis: "auto" }}>
        <NavBAr />
      </div>
      <div
        className="my-4 flex-grow-1 flex-shrink-1"
        style={{ flexBasis: "auto" }}
      >
        <div className="container">
          <SearchBar />
          <div className="row mt-1">
            <div className="col-6">
              <ListingsTab listings={listings} setCurrList={setCurrList} />
            </div>
            <div className="col-6">
              <InfoTab currList={currList} />
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex-grow-0 flex-shrink-0 bg-light"
        style={{ flexBasis: "120px" }}
      >
        footer
      </div>
    </div>
  );
}

export default Mainpage;
