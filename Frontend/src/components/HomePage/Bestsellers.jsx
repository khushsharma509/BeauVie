import BestsellersCardCarousel from "./BestsellersCardCarousal";
import { BestSellersData } from "./bestsellerdata";

export default function BestSellers() {
  return (
    <div className="BestSellers">
      
      <div class="titleBS">
        <h3 class=" hr_tag">THE ULTIMATE LINEUP </h3>
        <h4 class="content"> Get your hands on highly rated hits + fresh picks.</h4>

      </div>

      <div className="main_bestsellers">
        <BestsellersCardCarousel BestSellersData={BestSellersData} />
      </div>
    </div>
  );
}
