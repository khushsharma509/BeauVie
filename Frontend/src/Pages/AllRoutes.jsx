import { Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import RegisterLogin from "./RegisterLogin.jsx";
import React, { useEffect, useState } from "react";
import "firebase/auth";
import PageNotFound from "./PagenotFound.jsx";
import FinalMakeupPage from "../components/Makeup/FinalMakeuppage.jsx";
import FinalSkincarePage from "../components/SkincarePage/FinalSkinCarePgae.jsx";
import BathBody from "../components/BathBody/BathBody.jsx";
import Haircare from "../components/Haircare/Haircare.jsx";
import Fragarance from "../components/Fragarance/Fragarance.jsx";
import ThumbnailCarousal, {
  ImageMagnifier,
} from "../components/ProductDiscription/thumbnailcarousal.jsx";
import ProductDiscription from "../components/ProductDiscription/ProductDescription.jsx";
import FinalOrdersPage from "../components/userpage/FinalOrdersPage.jsx";
import FinalWishlistPage from "../components/userpage/FinalWishlistPage.jsx";
import FinalAddressPage from "../components/userpage/FinalAddressesPage.jsx";
import FinalRefferPage from "../components/userpage/FinalReferPage.jsx";
import Cart from "./Cart.jsx";
import PrivateRoute from "../context/PrivateRoute.jsx";
import SearchResultsPage from "./SearchResultsPage.jsx";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login-register" element={<RegisterLogin />}></Route>
      <Route path="/results" element={<SearchResultsPage/>}></Route>
      <Route path="/MakeUp" element={<FinalMakeupPage />}></Route>
      <Route path="*" element={<PageNotFound />}></Route>
      <Route path="/Haircare" element={<Haircare />}></Route>
      <Route path="/SkinCare" element={<FinalSkincarePage />}></Route>
      <Route path="/BathBody" element={<BathBody />}></Route>
      <Route path="/Fragarance" element={<Fragarance />}></Route>
      <Route path="/results/:id" element={<ProductDiscription/>}></Route>
      <Route path="/user/orders" element={<PrivateRoute><FinalOrdersPage/></PrivateRoute>}></Route>
      <Route path="/user/wishlist" element={<PrivateRoute><FinalWishlistPage/></PrivateRoute>}></Route>
      <Route path="/user/address" element={<PrivateRoute><FinalAddressPage/></PrivateRoute>}></Route>
      <Route path="/user/refer" element={<PrivateRoute><FinalRefferPage/></PrivateRoute>}></Route>
      <Route path="/Cart" element={<Cart/>}></Route>
    </Routes>
  );
}
