import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout
import Layout from "../Common/Layout";

// Misc Pages
import LandingPage from "../Misc/LandingPage";
import SignIn from "../Misc/SignIn";
import SignUp from "../Misc/SignUp";

// Dashboard Pages
import OffersPage from "../Offers/OffersPage";
import AddOffers from "../Offers/AddOffers";
import CouponsPage from "../Coupons/CouponsPage";
import AddCoupons from "../Coupons/AddCoupon";
import TiersPage from "../Tiers/TiersPage";
import AddTier from "../Tiers/AddTier";
import EditTier from "../Tiers/EditTier";

import Contacts from "../Common/Contacts"
import ProfilePage from "../Misc/PartnerProfile";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<Layout />}>
        {/* Offers */}
        <Route index element={<Contacts />} /> {/* Default dashboard page */}
        <Route path="offers" element={<OffersPage />} />
        <Route path="add-offer" element={<AddOffers />} />

        {/* Coupons */}
        <Route path="coupons" element={<CouponsPage />} />
        <Route path="add-coupon" element={<AddCoupons />} />

        {/* Tiers */}   
        <Route path="tiers" element={<TiersPage />} />
        <Route path="add-tier" element={<AddTier />} />
        <Route path="edit-tier/:id" element={<EditTier />} />

        <Route path="contact" element={<Contacts/>} />
        <Route path="profile" element={<ProfilePage/>}/>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
