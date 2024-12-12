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
import EditOffer from "../Offers/EditOffer";
import CouponsPage from "../Coupons/CouponsPage";
import AddCoupons from "../Coupons/AddCoupon";
import EditCoupon from "../Coupons/EditCoupon";
import TiersPage from "../Tiers/TiersPage";
import AddTier from "../Tiers/AddTier";
import EditTier from "../Tiers/EditTier";

import Contacts from "../Common/Contacts";
import ProfilePage from "../Misc/PartnerProfile";

// Programs Pages
import ProgramsPage from "../Programs/ProgramsPage";
import AddProgram from "../Programs/AddProgram";
import EditProgram from "../Programs/EditProgram";

import ProgressPage from "../UserProgress/ProgressPage";
import SuperAdminBar from "../SuperAdmin/SuperAdminBar";
import AllPartnersPage from "../SuperAdmin/AllPartners";
import NewPartnersPage from "../SuperAdmin/NewPartners";
import DisabledPartnersPage from "../SuperAdmin/DisablePartners";
import ProgramDetails from "../Programs/ProgramDetails";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />

      {/* Super-Admin Routes */}
      <Route path="/admin" element={<SuperAdminBar />}>
        <Route path="allPartners" element={<AllPartnersPage />} />
        <Route path="newPartners" element={<NewPartnersPage />} />
        <Route path="disabledPartners" element={<DisabledPartnersPage />} />
      </Route>

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<Layout />}>
        {/* Offers */}
        <Route index element={<Contacts />} /> {/* Default dashboard page */}
        <Route path="offers" element={<OffersPage />} />
        <Route path="add-offer" element={<AddOffers />} />
        <Route path="edit-offer/:id" element={<EditOffer />} />
        {/* Coupons */}
        <Route path="coupons" element={<CouponsPage />} />
        <Route path="add-coupon" element={<AddCoupons />} />
        <Route path="edit-coupon/:id" element={<EditCoupon />} />
        {/* Tiers */}
        <Route path="tiers" element={<TiersPage />} />
        <Route path="add-tier" element={<AddTier />} />
        <Route path="edit-tier/:id" element={<EditTier />} />
        {/* Programs */}
        <Route path="programs" element={<ProgramsPage />} />
        <Route path="program-details/:id" element={<ProgramDetails />} />
        <Route path="add-program" element={<AddProgram />} />
        <Route path="edit-program/:id" element={<EditProgram />} />
        {/* Misc */}
        <Route path="contact" element={<Contacts />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="progress" element={<ProgressPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
