import React from "react";
import { Routes, Route } from "react-router-dom";
import OffersList from "../Offers/OffersList";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/offers" element={<OffersList />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRoutes;
