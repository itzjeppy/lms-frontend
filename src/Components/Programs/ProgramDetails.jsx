import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  Container,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import OfferService from "../Services/OfferService"; // Adjust the import based on your service structure
import CouponService from "../Services/CouponService"; // Import the CouponService
import OfferCard from "../Offers/OfferCard";
import CouponsCard from "../Coupons/CouponsCard";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProgramDetails = () => {
  const [offers, setOffers] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgramDetails = async () => {
      try {
        // Fetch offers using OfferService
        const offersResponse = await OfferService.getOffers();
        setOffers(offersResponse.data);

        // Fetch coupons using CouponService
        const couponsResponse = await CouponService.getCoupons();
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
          aria-label="open drawer"
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
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Offers
        </Typography>
        {offers.length > 0 ? (
          offers.map((offer) => <OfferCard key={offer.partner_id} offer={offer} />)
        ) : (
          <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center", mt: 2 }}>
            No offers available. Start by adding a new offer!
          </Typography>
        )}
        {/* Add Offer Button */}
        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: "#e0f7fa",
            borderRadius: 2,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate("../add-offer")}
            sx={{
              fontWeight: " bold",
              textTransform: "none",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            Add Offer
          </Button>
        </Box>
      </Box>

      {/* Coupons Section */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          bgcolor: "#ffffff",
          p: 2,
          borderRadius: 2,
          boxShadow: "0 1px 6px rgba(0, 0, 0, 0.1)",
          mt: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Coupons
        </Typography>
        {coupons.length > 0 ? (
          coupons.map((coupon) => <CouponsCard key={coupon.id} coupon={coupon} />)
        ) : (
          <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center", mt: 2 }}>
            No coupons available. Start by adding a new coupon!
          </Typography>
        )}
        {/* Add Coupon Button */}
        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: "#e0f7fa",
            borderRadius: 2,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate("../add-coupon")}
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            Add Coupon
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProgramDetails;