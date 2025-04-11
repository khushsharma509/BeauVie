import Carousel from "react-bootstrap/Carousel";

function HotDeals() {
  const images = [
    "/images/hot1.jpeg",
    "/images/hot2.jpg",
    "/images/hot3.jpeg",
    "/images/hot5.jpg",
    "/images/hot7.jpg",
    "/images/hot9.jpg",
  ];

  return (
    <div className="BestSellers" style={{ marginTop: "80px" }}>
      <div className="titleBS">
        <h3 className="hr_tag">HOT DEALS YOU CAN'T MISS</h3>
        <h4 className="content">Get your faves before they're gone!</h4>
      </div>

      
      <Carousel style={{ marginTop: "20px" }} className="hotdeals_laptop">
        <Carousel.Item>
          <div className="d-flex justify-content-between" style={{ width: "95%", margin: "auto" }}>
            <img className="d-block w-100" style={imgStyle} src={images[0]} alt="Hot Deal 1" />
            <img className="d-block w-100" style={{ ...imgStyle, margin: "0 3%" }} src={images[1]} alt="Hot Deal 2" />
            <img className="d-block w-100" style={imgStyle} src={images[2]} alt="Hot Deal 3" />
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="d-flex justify-content-between" style={{ width: "95%", margin: "auto" }}>
            <img className="d-block w-100" style={imgStyle} src={images[3]} alt="Hot Deal 4" />
            <img className="d-block w-100" style={{ ...imgStyle, margin: "0 3%" }} src={images[4]} alt="Hot Deal 5" />
            <img className="d-block w-100" style={imgStyle} src={images[5]} alt="Hot Deal 6" />
          </div>
        </Carousel.Item>
      </Carousel>

      {/* iPad View Carousel */}
      <Carousel style={{ marginTop: "20px" }} className="hotdeals_ipad">
        {[0, 3, 2, 5].map((i) => (
          <Carousel.Item key={i}>
            <div style={{ width: "95%", margin: "auto", display: "flex", justifyContent: "center" }}>
              <img className="d-block w-100" style={imgStyle} src={images[i]} alt={`Hot Deal ${i + 1}`} />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

const imgStyle = {
  width: "25%",
  height: "300px",
  borderRadius: "10px",
};

export default HotDeals;
