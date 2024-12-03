import React, { useState } from "react";
import {
  Paper,
  Button,
  Typography,
  Box,
  Container,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import OffersList from "./OffersList";
import { useNavigate } from "react-router-dom";

const OffersContent = () => {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  const handleStatusToggle = (offerId) => {
    const updatedOffers = offers.map((offer) => {
      if (offer.tier_id === offerId) {
        return { ...offer, status: !offer.status };
      }
      return offer;
    });
    setOffers(updatedOffers);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: 3,
        bgcolor: "#f9f9f9", // Light background
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow
        width: "100%", // Changed to prevent overflow
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            color: "#4A4A4A",
          }}
        >
          Your Offers
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => navigate("../add-offer")} // Navigate to AddOffers component
          sx={{
            fontWeight: "bold",
            textTransform: "none", // Avoid uppercase
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          Add Offer
        </Button>
      </Box>

      {/* Offers List Section */}
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
        {offers.length > 0 ? (
          <OffersList offers={offers} onStatusToggle={handleStatusToggle} />
        ) : (
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ textAlign: "center", mt: 2 }}
          >
            No offers available. Start by adding a new offer!
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default OffersContent;