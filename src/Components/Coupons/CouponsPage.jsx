import React, { useState, useEffect } from "react";
import { Paper, Button, Typography, Box, Container } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CouponsList from "./CouponsList";
import { useNavigate } from "react-router-dom";

const CouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const existingCoupons = localStorage.getItem("coupons");
    if (existingCoupons) {
      setCoupons(JSON.parse(existingCoupons));
    }
    setLoading(false);
  }, []);

  const handleStatusToggle = (couponId) => {
    const updatedCoupons = coupons.map((coupon) => {
      if (coupon.coupon_id === couponId) {
        return { ...coupon, status: !coupon.status };
      }
      return coupon;
    });
    setCoupons(updatedCoupons);
    localStorage.setItem("coupons", JSON.stringify(updatedCoupons));
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: { xs: 2, md: 3 }, // Adjust padding for small and larger screens
        bgcolor: "#f9f9f9", // Light background
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow
        maxWidth: "1200px", // Limit maximum width
        margin: "0 auto", // Center horizontally
        width: "100%",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "space-between" }, // Center align on small screens
          flexDirection: { xs: "column", md: "row" }, // Stack vertically on small screens
          alignItems: "center",
          mb: 2,
          gap: { xs: 2, md: 0 }, // Add spacing between elements on small screens
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#4A4A4A",
            textAlign: { xs: "center", md: "left" }, // Center align on small screens
          }}
        >
          Your Coupons
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => navigate("../add-coupon")} // Navigate to AddCoupons component
          sx={{
            fontWeight: "bold",
            textTransform: "none", // Avoid uppercase
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          Add Coupon
        </Button>
      </Box>

      {/* Coupons List Section */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto", // Scrollable content
          bgcolor: "#ffffff", // White card background
          p: 2,
          borderRadius: 2,
          boxShadow: "0 1px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
        }}
      >
        {coupons.length > 0 ? (
          <CouponsList coupons={coupons} onStatusToggle={handleStatusToggle} />
        ) : (
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ textAlign: "center", mt: 2 }}
          >
            No coupons available. Start by adding a new coupon!
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default CouponsPage;
