import React, { useEffect, useState } from "react";
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
    reviews: [
      {
        id: 1,
        userID: 1,
        userName: "DIT terminator",
        score: 5,
        date: "22/07/2019",
        text:
          "Yes yes nice apartment, yes very satisfied, I recomend yes yes, luckily didn't find any DIT students yes yes",
      },
      {
        id: 2,
        userID: 3,
        userName: "Satoshi nakamoto",
        score: 4,
        date: "22/07/2019",
        text: "Cool place",
      },
    ],
  },
  {
    id: 2,
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
    street: "Liakama 2",
    neighbourhood: "Koukaki",
    city: "Athens",
    state: "Attiki",
    zipcode: "14256",
    country: "Greece",
    latitude: "312,42",
    longtitude: "782.54",
    reviews: [
      {
        id: 1,
        userID: 1,
        userName: "DIT terminator",
        score: 5,
        date: "22/07/2019",
        text:
          "Yes yes nice apartment, yes very satisfied, I recomend yes yes, luckily didn't find any DIT students yes yes",
      },
      {
        id: 2,
        userID: 3,
        userName: "Satoshi nakamoto",
        date: "22/07/2019",
        score: 4,
        text: "Cool place",
      },
    ],
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

function SearchTab({ userState, searchState }) {
  const [search, setSearch] = searchState;
  const [listings, setListings] = useState([]);
  const [currList, setCurrList] = useState({});

  useEffect(() => {
    setListings(array);
    setCurrList(array[0]);
  }, [search]);

  return (
    <div className="SearchTab">
      <div className="container">
        <SearchBar setSearch={setSearch} />
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
  );
}

export default SearchTab;
