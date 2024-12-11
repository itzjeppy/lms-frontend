import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  Container,
  Grid as MuiGrid,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate, useParams } from "react-router-dom";
import OfferService from "../Services/OfferService";
import CouponService from "../Services/CouponService";
import OfferCard from "../Offers/OfferCard";
import CouponsCard from "../Coupons/CouponsCard";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProgramDetails = () => {
  const [offers, setOffers] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams(); // Extract the ID from the URL

  useEffect(() => {
    const fetchProgramDetails = async () => {
      try {
        const offersResponse = await OfferService.getOfferByProgramId(id);
        setOffers(offersResponse.data);

        const couponsResponse = await CouponService.getCouponByProgramId(id);
        setCoupons(couponsResponse.data);
      } catch (error) {
        console.error("Error fetching program details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "space-between" },
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          mb: 2,
          gap: { xs: 2, md: 0 },
        }}
      >
        <IconButton
          color="inherit"
          edge="start"
          aria-label="go back"
          onClick={() => navigate(-1)}
          sx={{ mr: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#4A4A4A",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Program Details
        </Typography>
      </Box>

      {/* Offers Section */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Offers
      </Typography>

      <MuiGrid container spacing={3}>
        {offers.map((offer) => (
          <MuiGrid item xs={12} sm={6} md={4} key={offer.id}>
            <OfferCard offer={offer} />
          </MuiGrid>
        ))}

        {/* Add New Offer Card */}
        <MuiGrid item xs={12} sm={6} md={4}>
          <Box
            onClick={() => navigate("../add-offer", { state: { programId: id } })}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f3f4f6",
              borderRadius: 8,
              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <AddCircleOutlineIcon fontSize="large" color="primary" />
          </Box>
        </MuiGrid>
      </MuiGrid>

      <Typography variant="h5" sx={{ fontWeight: "bold", mt: 4, mb: 2 }}>
        Coupons
      </Typography>

      <MuiGrid container spacing={3}>
        {coupons.map((coupon) => (
          <MuiGrid item xs={12} sm={6} md={4} key={coupon.id}>
            <CouponsCard coupon={coupon} />
          </MuiGrid>
        ))}

        {/* Add New Coupon Card */}
        <MuiGrid item xs={12} sm={6} md={4}>
          <Box
            onClick={() => navigate("../add-coupon", { state: { programId: id } })}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f3f4f6",
              borderRadius: 8,
              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <AddCircleOutlineIcon fontSize="large" color="primary" />
          </Box>
        </MuiGrid>
      </MuiGrid>
    </Container>
  );
};

export default ProgramDetails;