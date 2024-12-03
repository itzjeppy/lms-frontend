import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Common/Layout"; // Layout for dashboard
import OffersContent from "../Offers/OffersContent"; // Offers page
import AddOffers from "../Offers/AddOffers"; // Import AddOffers component
import TiersPage from "../Tiers/TiersPage"; // Tiers page
import LandingPage from "../LandingPage"; // Landing page

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} /> {/* No layout for landing page */}

      <Route path="/dashboard" element={<Layout />}> {/* Layout for dashboard routes */}
        <Route path="offers" element={<OffersContent />} />
        <Route path="add-offer" element={<AddOffers />} /> {/* New route for AddOffers */}
        <Route path="tiers" element={<TiersPage />} />
        <Route path="coupons" element={<div>Coupons</div>}/>
        <Route index element={<OffersContent />} /> {/* Default dashboard home */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;