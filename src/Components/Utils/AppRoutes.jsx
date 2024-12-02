import React from "react";
import { Routes, Route } from "react-router-dom";
import OffersContent from "../Offers/OffersContent";
import Layout from "../Common/Layout";
 
const AppRoutes = () => {
  return (
<Routes>
<Route path="/" element={<Layout />}>
<Route path="offers" element={<OffersContent />} />
</Route>
</Routes>
  );
};
 
export default AppRoutes;