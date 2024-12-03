import React, { useState } from "react";
import {
  Paper,
  Button,
  Typography,
  Box,
  IconButton,
  Container,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "@mui/material";
import FormikForm from "./FormicForm";
import OffersList from "./OffersList";

const OffersContent = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [offers, setOffers] = useState([]);

  const handleSubmit = (values) => {
    setOffers([...offers, values]);
    setModalIsOpen(false);
  };

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
        width: "100vw"

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
          onClick={() => setModalIsOpen(true)}
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

      {/* Add Offer Modal */}
      <Modal
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        aria-labelledby="add-offer-modal-title"
        aria-describedby="add-offer-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            width: "500px",
            maxWidth: "90%",
            p: 3,
            borderRadius: 3,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)", // Stronger shadow
            position: "relative",
          }}
        >
          <IconButton
            onClick={() => setModalIsOpen(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "grey.600",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
          >
            Add a New Offer
          </Typography>
          <FormikForm onSubmit={handleSubmit} />
        </Paper>
      </Modal>
    </Container>
  );
};

export default OffersContent;
