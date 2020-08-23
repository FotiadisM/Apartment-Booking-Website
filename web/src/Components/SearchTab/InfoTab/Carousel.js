import React from "react";

function Carousel({ photos }) {
  return (
    <div className="Carousel">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          {photos.map((photo, i) => {
            if (i === 0) {
              return (
                <li
                  data-target="#carouselExampleIndicators"
                  className="active"
                  data-slide-to={i}
                  key={photo.id}
                ></li>
              );
            } else {
              return (
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to={i}
                  key={photo.id}
                ></li>
              );
            }
          })}
        </ol>
        <div
          className="carousel-inner rounded-top"
          style={{ transition: "height 1s" }}
        >
          {photos.map((photo, i) => {
            if (i === 0) {
              return (
                <div
                  className="carousel-item active"
                  key={photo.id}
                  // style={{ transition: "height 200ms ease-out" }}
                >
                  <img
                    src={
                      "http://" +
                      process.env.REACT_APP_BACKEND +
                      "/images/" +
                      photo.id
                    }
                    className="d-block w-100"
                    alt="listing_photo"
                  />
                </div>
              );
            } else
              return (
                <div
                  className="carousel-item"
                  key={photo.id}
                  // style={{ transition: "height 200ms ease-out" }}
                >
                  <img
                    src={
                      "http://" +
                      process.env.REACT_APP_BACKEND +
                      "/images/" +
                      photo.id
                    }
                    className="d-block w-100"
                    alt="listing_photo"
                  />
                </div>
              );
          })}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
}

export default Carousel;
