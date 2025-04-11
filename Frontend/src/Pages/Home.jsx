import BestSellers from "../components/HomePage/Bestsellers";
import ControlledCarousel from "../components/HomePage/Carousal";
import Navbar from "../components/Navbar";
import "../styles/Home.css";


import HotDeals from "../components/HomePage/HotDeals";
import JustIn from "../components/HomePage/JustIn";


import NewlyLaunched from "../components/HomePage/NewlyLaunched";

import Footer from "../components/Footer";

import Toppicks from "../components/HomePage/Toppicks";

import { useContext, useState } from "react";
import { Appcontext } from "../context/AppContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

let Hotdealsdata = [
  "https://d32baadbbpueqt.cloudfront.net/Homepage/ee7aec73-2712-4b13-b979-8af7326e6219.jpg",
  "https://d32baadbbpueqt.cloudfront.net/Homepage/6f66062a-1a39-4252-852b-646acb35d9af.jpg",
  "https://d32baadbbpueqt.cloudfront.net/Homepage/6359ed8e-1f43-44aa-b602-5142a7bfbd9f.jpg",
  "https://d32baadbbpueqt.cloudfront.net/Homepage/7b0cbcd1-1433-484d-8ae1-6f54f52e73fa.jpg",
  "https://d32baadbbpueqt.cloudfront.net/Homepage/ee7aec73-2712-4b13-b979-8af7326e6219.jpg",
  "https://d32baadbbpueqt.cloudfront.net/Homepage/6f66062a-1a39-4252-852b-646acb35d9af.jpg",
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { Loginstate } = useContext(Appcontext);
  const [show, setShow] = useState(true);
  console.log(Loginstate);
  setTimeout(() => {
    setLoading(false);
  }, 1000);

  
  return (
    <>
      <Navbar />
      <div id="add_div"></div>
      <ControlledCarousel />
      <BestSellers />
     
      <HotDeals DataCard={Hotdealsdata} />
      <NewlyLaunched />
      <JustIn />
      
      <Toppicks />
      
      <Footer />
    </>
  );
}
