import React from "react";
import Card from "./Card";

function ListingsTab({ listings, setCurrList }) {
  return (
    <div className="ListingsTab">
      <hr />
      <div className="row gx-0 gy-3">
        {listings.map((listing) => {
          return (
            <div className="col-12" key={listing.id}>
              <Card listing={listing} setCurrList={setCurrList} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListingsTab;
