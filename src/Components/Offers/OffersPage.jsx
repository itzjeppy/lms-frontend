import React, { useState , useEffect} from "react";
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

const OffersPage = () => {
  const [offers, setOffers] = useState([]);
   const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
    const existingOffers = localStorage.getItem("offers");
    if (existingOffers) {
      setOffers(JSON.parse(existingOffers));
    }
    setLoading(false);
  }, []);

  const handleStatusToggle = (offerId) => {
    const updatedOffers = offers.map((offer) => {
      if (offer.tier_id === offerId) {
        return { ...offer, status: !offer.status };
      }
      return offer;
    });
    setOffers(updatedOffers);
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

export default OffersPage;
