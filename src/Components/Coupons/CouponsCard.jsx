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
  Divider,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { DeleteForever, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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

const CouponsCard = ({ coupon, tierColor, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [isActive, setIsActive] = useState(coupon.isActive);

  const lightColor = lightenColor(tierColor, 60);
  const textColor = getTextColor(tierColor);
  const commonTextColor = isActive ? textColor : "#ffffff";

  const handleInfoModalOpen = () => setOpenInfoModal(true);
  const handleInfoModalClose = () => setOpenInfoModal(false);

  // Toggle isActive status when the Chip is clicked
  const handleChipClick = () => {
    setIsActive((prevState) => !prevState);
  };

  const handleEditClick = () => {
    console.log("Coupon ID:", coupon.couponId);
    navigate(`../edit-coupon/${coupon.couponId}`);
  };

  // Function to truncate the title
  const truncateTitle = (title) => {
    return title.length > 15 ? title.substring(0, 15) + "..." : title;
  };

  return (
    <Box sx={{ p: 2 }}>
      <Card
        sx={{
          width: "300px",
          height: "234px",
          background: isActive
            ? `linear-gradient(to bottom right, ${lightColor}, ${tierColor})`
            : "linear-gradient(to bottom right, #9e968b, #373738)",
          borderRadius: 8,
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
          color: commonTextColor,
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              noWrap
              sx={{
                textTransform: "uppercase",
                maxWidth: "150px",
                color: commonTextColor,
              }}
            >
              {truncateTitle(coupon.couponTitle)}
            </Typography>
            <Chip
              label={isActive ? "Active" : "Inactive"}
              size="small"
              onClick={handleChipClick}
              sx={{
                color: "#fff",
                backgroundColor: isActive ? tierColor : "#C62828",
                cursor: "pointer",
              }}
            />
          </Box>

          <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.5)" }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ color: commonTextColor }}>
              Max Limit:{" "}
              <span style={{ fontWeight: "normal" }}>${coupon.maxLimit}</span>
            </Typography>
            <Typography variant="body2" sx={{ color: commonTextColor }}>
              Percentage Discounted:{" "}
              <span style={{ fontWeight: "normal" }}>{coupon.percentage}%</span>
            </Typography>
            <Typography variant="body2" sx={{ color: commonTextColor }}>
              Valid for:{" "}
              <span style={{ fontWeight: "normal" }}>
                {coupon.validity} days
              </span>
            </Typography>
          </Box>
        </CardContent>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 1,
            marginTop: "-10px",
            paddingBottom: "10px",
            backgroundColor: isActive ? lightenColor(tierColor, 30) : "#9e968b",
            borderTop: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          <IconButton
            aria-label="info"
            onClick={handleInfoModalOpen}
            sx={{ color: commonTextColor }}
          >
            <InfoIcon />
          </IconButton>

          <ButtonGroup variant="outlined" size="small">
            <Button
              onClick={() => handleEditClick()}
              sx={{
                color: commonTextColor,
                borderColor: commonTextColor,
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
              onClick={() => onDelete(coupon)}
              sx={{
                color: commonTextColor,
                borderColor: commonTextColor,
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
            sx={{ mb: 2, color: commonTextColor }}
          >
            Coupon Details
          </Typography>

          <Typography variant="body1" sx={{ mb: 2, color: commonTextColor }}>
            <strong>Title:</strong> {coupon.couponTitle}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: commonTextColor }}>
            <strong>Description:</strong> {coupon.couponDescription}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: commonTextColor }}>
            <strong>Max Limit:</strong> ${coupon.maxLimit}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: commonTextColor }}>
            <strong>Percentage Discounted:</strong> {coupon.percentage}%
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: commonTextColor }}>
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
