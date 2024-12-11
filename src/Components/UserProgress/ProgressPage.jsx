import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Container, Box, Button, Grid2 } from "@mui/material";
import CouponsCard from "../Coupons/CouponsCard";
import Tier from "./Mytiers";

const ProgressPage = () => {
  const [showCoupons, setShowCoupons] = useState(false);
  const [showTiers, setShowTiers] = useState(false);
  const [userPoints, setUserPoints] = useState(7400); // Replace with actual user points
  const [coupons, setCoupons] = useState([]);
  const [tiers, setTiers] = useState([]);

  useEffect(() => {
    const storedCoupons = JSON.parse(localStorage.getItem("coupons") || "[]");
    setCoupons(storedCoupons);
    const storedTiers = JSON.parse(localStorage.getItem("tiers") || "[]");
    setTiers(storedTiers);
  }, []);

  const handleShowCoupons = () => {
    setShowCoupons(true);
    setShowTiers(false);
  };

  const handleShowTiers = () => {
    setShowTiers(true);
    setShowCoupons(false);
  };

  const carouselSettings = (itemsCount) => ({
    dots: true,
    infinite: itemsCount > 1,
    speed: 500,
    slidesToShow: Math.min(3, itemsCount), // Show fewer slides if items are less than 3
    slidesToScroll: 1,
    arrows: itemsCount > 1,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: Math.min(2, itemsCount),
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(1, itemsCount),
        },
      },
    ],
  });

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: { xs: 2, md: 3 },
        bgcolor: "#f9f9f9",
        alignSelf: "center",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleShowCoupons}
          sx={{ mr: 2 }}
        >
          My Coupons
        </Button>
        <Button variant="contained" color="primary" onClick={handleShowTiers}>
          My Tiers
        </Button>
      </Box>

      <div
        style={{ justifyContent: "center", display: "flex", height: "100%" }}
      >
        {/* Coupons Carousel */}
        {showCoupons && (
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "hidden",
              bgcolor: "#ffffff",
              p: 2,
              borderRadius: 2,
              boxShadow: "0 1px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Slider {...carouselSettings(coupons.length)}>
              {coupons.map((coupon) => (
                <Box key={coupon.couponTitle} sx={{ px: 1 }}>
                  <CouponsCard coupon={coupon} />
                </Box>
              ))}
            </Slider>
          </Box>
        )}

        {/* Tiers Carousel */}
        {showTiers && (
          <Grid2 container spacing={2}>
            <Grid2 item xs={12} sm={6} md={4}>
              <Tier tiers={tiers} userPoints={userPoints} />
            </Grid2>
          </Grid2>
        )}
      </div>
    </Container>
  );
};

export default ProgressPage;
