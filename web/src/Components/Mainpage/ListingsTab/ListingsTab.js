import React from "react";
import Card from "./Card";

function ListingsTab({ listings, setCurrList }) {
  return (
    <div className="ListingsTab">
      <hr className="mr-1" />
      <div className="row gx-0 gy-2">
        {listings.map((listing) => {
          return (
            <div className="col-12" key={listing.id}>
              <Card listing={listing} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListingsTab;
