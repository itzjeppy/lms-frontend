import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Common/Layout";
import OffersContent from "../Offers/OffersContent";
import TiersPage from "../Tiers/TiersPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout as the parent route */}
      <Route path="/" element={<Layout />}>
        {/* Child routes */}
        <Route path="offers" element={<OffersContent />} />
        <Route path="tiers" element={<TiersPage/>} />
        <Route path="coupons" element={<div>Your Coupons Content</div>} />
        <Route path="contact" element={<div>Contact Us Content</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
