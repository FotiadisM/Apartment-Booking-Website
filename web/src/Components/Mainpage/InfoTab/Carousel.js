import React from "react";
import logo from "../../../assets/room.jpg";

function Carousel({ images }) {
  return (
    <div className="Carousel">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner rounded-top">
          <div className="carousel-item active">
            <img src={logo} className="d-block w-100" alt="listing_photo" />
          </div>
          <div className="carousel-item">
            <img src={logo} className="d-block w-100" alt="listing_photo" />
          </div>
          <div className="carousel-item">
            <img src={logo} className="d-block w-100" alt="listing_photo" />
          </div>
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
