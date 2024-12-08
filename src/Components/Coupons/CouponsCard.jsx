import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Modal,
  Box,
  Chip,
  ButtonGroup,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { DeleteForever, Edit, EditAttributes } from "@mui/icons-material";

// Utility function to lighten colors
const lightenColor = (color, percent) => {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return `rgb(${Math.min(R, 255)}, ${Math.min(G, 255)}, ${Math.min(B, 255)})`;
};

// Utility function to determine appropriate text color
const getTextColor = (tierColor) => {
  const r = parseInt(tierColor.substring(1, 3), 16);
  const g = parseInt(tierColor.substring(3, 5), 16);
  const b = parseInt(tierColor.substring(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
};

const CouponsCard = ({ coupon, tierColor, onEdit, onDelete }) => {
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [isActive, setIsActive] = useState(coupon.isActive);

  const lightColor = lightenColor(tierColor, 60);
  const textColor = getTextColor(tierColor);

  const handleInfoModalOpen = () => setOpenInfoModal(true);
  const handleInfoModalClose = () => setOpenInfoModal(false);

  // Toggle isActive status when the Chip is clicked
  const handleChipClick = () => {
    setIsActive((prevState) => !prevState);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Card
        sx={{
          width: "300px", // Increased width
          background: isActive? `linear-gradient(to bottom right, ${lightColor}, ${tierColor})` : 'linear-gradient(to bottom right,#9e968b,#373738)',
          borderRadius: 8,
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
          color: isActive? textColor:"#ffffff",
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
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
              {coupon.couponTitle}
            </Typography>
            <Chip
              label={isActive ? "Active" : "Inactive"}
              size="small"
              onClick={handleChipClick}
              sx={{
                color: "#fff",
                fontWeight: "bold",
                backgroundColor: isActive ? tierColor : "#C62828", // Solid darker colors
                cursor: "pointer",
              }}
            />
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.5)" }} />

          {/* Coupon Benefit */}
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Benefit: {coupon.benefit}
          </Typography>

          {/* Validity */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >

          <Typography variant="body2">
              <strong>Valid for:</strong> {coupon.validity} days
            </Typography>
          </Box>
        </CardContent>

        {/* Footer Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            backgroundColor: isActive? lightenColor(tierColor, 30): "#9e968b",
            borderTop: "1px solid rgba(255,255,255,0.3)",
          }}
        >
            <IconButton
              aria-label="info"
              onClick={handleInfoModalOpen}
              sx={{ color: isActive? textColor:"#ffffff", }}
            >
              <InfoIcon />
         </IconButton>

          <ButtonGroup variant="outlined" size="small">
            <Button
              onClick={() => onEdit(coupon)}
              sx={{
                color: isActive? textColor:"#ffffff",
                borderColor: isActive? textColor:"#ffffff",
                borderRadius: "20px",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.2)",
                },
              }}
            >
              <Edit/>
              Edit
            </Button>
            <Button
              onClick={() => onDelete(coupon)}
              sx={{
                color: isActive? textColor:"#ffffff",
                borderColor: isActive? textColor:"#ffffff",
                borderRadius: "20px",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.2)",
                },
              }}
            >
              <DeleteForever/>
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
          <Typography
            id="info-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Coupon Details
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Title:</strong> {coupon.couponTitle}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Description:</strong> {coupon.couponDescription}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Benefit:</strong> Save ${coupon.benefit}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Validity:</strong> {coupon.validity} days
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

CouponsCard.defaultProps = {
  onEdit: () => {},
  onDelete: () => {},
};

export default CouponsCard;
