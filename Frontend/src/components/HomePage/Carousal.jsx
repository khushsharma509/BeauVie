import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../../styles/Carousal.css";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Carousel
        style={{ marginTop: "0px", position: "static" }}
        className="carousal"
        interval={2000}
        activeIndex={index}
        onSelect={handleSelect}
      >
        <Carousel.Item>
          <div className="carousel-image-container">
            <img className="d-block w-100" src="/images/first.gif" alt="First slide" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-image-container">
            <img className="d-block w-100" src="/images/second.jpg" alt="Second slide" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-image-container">
            <img className="d-block w-100" src="/images/third.jpg" alt="Third slide" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-image-container">
            <img className="d-block w-100" src="/images/thirteen.jpg" alt="Fourth slide" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-image-container">
            <img className="d-block w-100" src="/images/eleven.jpg" alt="Fifth slide" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-image-container">
            <img className="d-block w-100" src="/images/sixth.jpg" alt="Sixth slide" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-image-container">
            <img className="d-block w-100" src="/images/eighth.jpg" alt="Seventh slide" />
          </div>
        </Carousel.Item>
      </Carousel>
      <div className="hometopcarousel"></div>
    </>
  );
}

export default ControlledCarousel;
