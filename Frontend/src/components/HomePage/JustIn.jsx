import FourCardsCarousel from "./FourCardsCarousal";
import { JustinData } from "./justindata";

export default function JustIn() {
  return (
    <div className="BestSellers" style={{ marginTop: "80px" }}>
      <div className="titleBS">
        <h3 className="hr_tag">SAY HELLO TO YOUR NEW GLOW</h3>
        <h4 className="content">Hot new arrivals, just dropped!</h4>
      </div>

      <FourCardsCarousel BestSellersData={JustinData} />
    </div>
  );
}
