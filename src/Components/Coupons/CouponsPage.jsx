import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Grid2, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import CouponsCard from "./CouponsCard";

const CouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [tiers, setTiers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCoupons = JSON.parse(localStorage.getItem("coupons") || "[]");
    setCoupons(storedCoupons);

    const storedTiers = JSON.parse(localStorage.getItem("tiers") || "[]");
    setTiers(storedTiers);
  }, []);

  const getTierColor = (tierId) => {
    const tier = tiers.find((tier) => tier.id === tierId);
    return tier ? tier.colour : "#cccccc";
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: 3,
        bgcolor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        Standalone Coupons
      </Typography>

      <Box sx={{ mb: 3, textAlign: "right" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => navigate("../add-coupon")}
        >
          Add Coupon
        </Button>
      </Box>

      <Grid2 container spacing={3}>
        {coupons.length > 0 ? (
          coupons.map((coupon) => (
            <Grid2 item xs={12} sm={6} md={4} key={coupon.couponTitle}>
              <CouponsCard
                coupon={coupon}
                tierColor={getTierColor(coupon.tierId)}
              />
            </Grid2>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: "center", width: "100%" }}>
            No coupons available. Add some!
          </Typography>
        )}
      </Grid2>
    </Container>
  );
};

export default CouponsPage;
