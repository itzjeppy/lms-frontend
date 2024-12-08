import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Modal,
  Box,
  Divider,
  Chip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const lightenColor = (color, percent) => {
  const num = parseInt(color?.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return `rgb(${Math.min(R, 255)}, ${Math.min(G, 255)}, ${Math.min(B, 255)})`;
};

const getTextColor = (tierColor) => {
  const r = parseInt(tierColor?.substring(1, 3), 16);
  const g = parseInt(tierColor?.substring(3, 5), 16);
  const b = parseInt(tierColor?.substring(5, 7), 16);
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
    <div>
      <Card
        sx={{
          background: `linear-gradient(to bottom right, ${lightColor}, ${tierColor})`,
          borderRadius: 8,
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
          color: textColor,
          position: "relative",
          p: 2,
          overflow: "hidden",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <CardContent sx={{ p: 2 }}>
          {/* Title Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", textTransform: "uppercase" }}
            >
              {coupon.couponTitle}
            </Typography>
            <Chip
              label={isActive ? "Active" : "Inactive"}
              color={isActive ? "success" : "error"}
              size="small"
              onClick={handleChipClick} // Handle the click to toggle state
              sx={{ cursor: "pointer" }} // Optional: Add a pointer cursor for better UX
            />
          </Box>

          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
            Benefit {coupon.benefit}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography variant="body2">
              <strong>Valid for:</strong> {coupon.validity} days
            </Typography>
            <IconButton
              aria-label="info"
              onClick={handleInfoModalOpen}
              sx={{ color: textColor }}
            >
              <InfoIcon />
            </IconButton>
          </Box>
        </CardContent>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            backgroundColor: lightenColor(tierColor, 30),
            borderTop: "2px solid rgba(0,0,0,0.1)",
          }}
        >
          <Button
            onClick={() => onEdit(coupon)}
            variant="outlined"
            size="small"
            sx={{
              color: textColor,
              borderColor: textColor,
            }}
          >
            Edit
          </Button>

          <Button
            onClick={() => onDelete(coupon)}
            variant="contained"
            size="small"
            sx={{
              bgcolor: "error.main",
              color: "#fff",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            Delete
          </Button>
        </Box>
      </Card>

      {/* MODAL FOR DETAILS */}
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
    </div>
  );
};

CouponsCard.defaultProps = {
  onEdit: () => {},
  onDelete: () => {},
};

export default CouponsCard;
