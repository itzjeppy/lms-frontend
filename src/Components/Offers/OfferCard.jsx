import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
  Chip,
  ButtonGroup,
  Divider,
  Modal,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import { DeleteForever, Edit } from "@mui/icons-material";
import TierService from "../Services/TierService"; // Import your TierService

// Utility function to lighten colors
const lightenColor = (color, percent) => {
  const num = parseInt(color?.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return `rgb(${Math.min(R, 255)}, ${Math.min(G, 255)}, ${Math.min(B, 255)})`;
};

// Utility function to determine appropriate text color
const getTextColor = (tierColor) => {
  const r = parseInt(tierColor?.substring(1, 3), 16);
  const g = parseInt(tierColor?.substring(3, 5), 16);
  const b = parseInt(tierColor?.substring(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
};

const OfferCard = ({ offer, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const {
    offerId,
    offerTitle,
    offerDescription,
    benefit,
    status,
    tierId,
    imageUrl,
  } = offer;

  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [isActive, setIsActive] = useState(status);
  const [tierName, setTierName] = useState(""); // State to hold the tier name
  const [tierColor, setTierColor] = useState("#9E9E9E"); // Default color

  useEffect(() => {
    const fetchTier = async () => {
      try {
        const response = await TierService.getTierByTierId(tierId);
        setTierName(response.data.tierName); // Assuming the response has tierName
        setTierColor(response.data.color); // Assuming the response has color
      } catch (error) {
        console.error("Error fetching tier:", error);
      }
    };

    fetchTier();
  }, [tierId]);

  const lightColor = lightenColor(tierColor, 60);
  const textColor = getTextColor(tierColor);

  const handleInfoModalOpen = () => setOpenInfoModal(true);
  const handleInfoModalClose = () => setOpenInfoModal(false);

  // Toggle isActive status when the Chip is clicked
  const handleChipClick = () => {
    setIsActive((prevState) => !prevState);
  };

  const handleEditClick = () => {
    navigate(`../edit-offer/${offerId}`, { state: { offer } });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Card
        sx={{
          width: "300px",
          background: isActive
            ? `linear-gradient(to bottom right, ${lightColor}, ${tierColor})`
            : "linear-gradient(to bottom right, #9e968b, #373738)",
          borderRadius: 8,
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
          color: isActive ? textColor : "#ffffff",
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        {/* Offer Image */}
        {imageUrl && (
          <CardMedia
            component="img"
            height="140"
            image={imageUrl}
            alt="Offer Image"
            sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
          />
        )}

        <CardContent sx={{ p: 3 }}>
          {/* Title Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {offerTitle}
            </Typography>
            <Chip
              label={isActive ? "Active" : "Inactive"}
              size="small"
              onClick={handleChipClick}
              sx={{
                color: "#fff",
                fontWeight: "bold",
                backgroundColor: isActive ? tierColor : "#C62828",
                cursor: "pointer",
              }}
            />
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.5)" }} />

          {/* Key Offer Details */}
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Benefit: ${benefit}
          </Typography>

          <Box sx={{ mb: 1 }}>
            <Typography variant="body2">
              <strong>Tier:</strong> {tierName || "Loading..."}
            </Typography>
            <Typography variant="body2">
              <strong>Description:</strong> {offerDescription.slice(0, 50)}...
            </Typography>
          </Box>
        </CardContent>

        {/* Footer Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            backgroundColor: isActive ? lightenColor(tierColor, 30) : "#9e968b",
            borderTop: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          <IconButton
            aria-label="info"
            onClick={handleInfoModalOpen}
            sx={{ color: isActive ? textColor : "#ffffff" }}
          >
            <InfoIcon />
          </IconButton>

          <ButtonGroup variant="outlined" size="small">
            <Button
              onClick={handleEditClick}
              sx={{
                color: isActive ? textColor : "#ffffff",
                borderColor: isActive ? textColor : "#ffffff",
                borderRadius: "20px",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.2)",
                },
              }}
            >
              <Edit />
              Edit
            </Button>
            <Button
              onClick={() => onDelete(offerId)}
              sx={{
                color: isActive ? textColor : "#ffffff",
                borderColor: isActive ? textColor : "#ffffff",
                borderRadius: "20px",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.2)",
                },
              }}
            >
              <DeleteForever />
              Delete
            </Button>
          </ButtonGroup>
        </Box>
      </Card>

      {/* Modal for Details */}
      <Modal
        open={openInfoModal}
        onClose={handleInfoModalClose}
        aria-labelledby="info-modal-title"
        aria-describedby="info-modal-description"
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
          }}
        >
          <Typography id="info-modal-title" variant="h6" sx={{ mb: 2 }}>
            Offer Details
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Title:</strong> {offerTitle}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Description:</strong> {offerDescription}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Benefit:</strong> ${benefit}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Status:</strong> {status ? "Active" : "Inactive"}
          </Typography>

          <Button
            onClick={handleInfoModalClose}
            sx={{ mt: 2 }}
            variant="contained"
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

OfferCard.defaultProps = {
  onEdit: () => {},
  onDelete: () => {},
};

export default OfferCard;