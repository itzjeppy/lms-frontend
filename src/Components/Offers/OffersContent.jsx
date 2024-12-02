import React, { useState } from "react";
import { Paper } from "@mui/material";
import Modal from "react-modal";
import FormikForm from './FormicForm';
import OffersList from "./OffersList";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    height: "500px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
  },
};

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
        <Paper
      sx={{
        width: '100%', // Always take full width provided by the parent
        height: '100%', // Full height of the container
        margin: 0, // No margin
        padding: 2, // Padding inside the Paper
        boxSizing: 'border-box', // Ensure padding is accounted for in dimensions
        display: 'flex', // Flex container
        flexDirection: 'column', // Stack children vertically
        position: 'relative', // Position relative for inner content alignment
      }}
    >
      <div className="offers-content">
        <h2>Your Offers</h2>
        <button
          className="add-offer-btn"
          onClick={() => setModalIsOpen(true)}
        >
          Add Offer
        </button>
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <FormikForm onSubmit={handleSubmit} />
        </Modal>
        <OffersList offers={offers} onStatusToggle={handleStatusToggle} />
      </div>
    </Paper>
  );
};

export default OffersContent;
