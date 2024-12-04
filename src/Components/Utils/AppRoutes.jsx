import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Common/Layout"; // Layout for dashboard
import AddOffers from "../Offers/AddOffers"; // Import AddOffers component
import TiersPage from "../Tiers/TiersPage"; // Tiers page
import LandingPage from "../Misc/LandingPage"
import SignIn from "../Misc/SignIn";
import SignUp from "../Misc/SignUp"
import OffersPage from "../Offers/OffersPage";
import CouponsPage from "../Coupons/CouponsPage";
import AddCoupons from "../Coupons/AddCoupon";

const AppRoutes = () => {
  return (
    <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
      <Route path="/dashboard" element={<Layout />}> {/* Layout for dashboard routes */}
        <Route path="offers" element={<OffersPage />} />
        <Route path="add-offer" element={<AddOffers />} /> {/* New route for AddOffers */}
        <Route path="add-coupon" element={<AddCoupons />} />{" "}
        <Route path="tiers" element={<TiersPage />} />
        <Route path="coupons" element={<CouponsPage />}/>
        <Route index element={<OffersPage />} /> {/* Default dashboard home */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
