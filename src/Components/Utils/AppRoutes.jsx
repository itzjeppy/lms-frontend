import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Common/Layout"; // Layout for dashboard
import OffersContent from "../Offers/OffersContent"; // Offers page
import TiersPage from "../Tiers/TiersPage"; // Tiers page
import LandingPage from "../LandingPage"; // Landing page

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} /> {/* No layout for landing page */}

      <Route path="/dashboard" element={<Layout />}> {/* Layout for dashboard routes */}
        <Route path="offers" element={<OffersContent />} />
        <Route path="tiers" element={<TiersPage />} />
        <Route path="coupons" element={<div>Coupons</div>}/>
        <Route index element={<OffersContent/>} /> {/* Default dashboard home */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;