import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid2,
  Paper,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import CouponsCard from "../Coupons/CouponsCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Tier from "./Mytiers";

const ProgressPage = () => {
  const [showCoupons, setShowCoupons] = useState(false);
  const [showTiers, setShowTiers] = useState(false);
  const [userPoints, setUserPoints] = React.useState(7400); // Replace with actual user points
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

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: { xs: 2, md: 3 },
        bgcolor: "#f9f9f9",
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
      {showCoupons && (
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            bgcolor: "#ffffff",
            p: 2,
            borderRadius: 2,
            boxShadow: "0 1px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Grid2 container spacing={2}>
            {coupons.map((coupon) => (
              <Grid2 item xs={12} sm={6} md={4} key={coupon.couponTitle}>
                <CouponsCard coupon={coupon} />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      )}
      {showTiers && (
        <Grid2 container spacing={2}>
          <Grid2 item xs={12} sm={6} md={4}>
            <Tier tiers={tiers} userPoints={userPoints} />
          </Grid2>
        </Grid2>
      )}
    </Container>
  );
};

export default ProgressPage;
