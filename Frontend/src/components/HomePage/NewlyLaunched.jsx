import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function NewlyLaunched() {
  return (
    <div className="BestSellers" style={{ marginTop: "80px" }}>
      <div className="titleBS">
        <h3 className="hr_tag">NEWLY LAUNCHED</h3>
        <h4 className="content">Get your hands on highly rated hits + fresh picks.</h4>
      </div>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        style={{ width: "95%", marginTop: "0px" }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            style={{ width: "100%", height: "400px", borderRadius: "10px" }}
            src="/images/firstNew.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ width: "100%", height: "400px", borderRadius: "10px" }}
            src="/images/secondNew.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ width: "100%", height: "400px", borderRadius: "10px" }}
            src="/images/forthNew.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ width: "100%", height: "400px", borderRadius: "10px" }}
            src="https://d32baadbbpueqt.cloudfront.net/Homepage/89e51326-1363-44e1-94f1-d5bd00bd2ca9.gif"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ width: "100%", height: "400px", borderRadius: "10px" }}
            src="/images/fifthNew.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ width: "100%", height: "400px", borderRadius: "10px" }}
            src="/images/sixthNew.jpg"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
