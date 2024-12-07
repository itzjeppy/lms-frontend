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
  Switch 
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const lightenColor = (color, percent) => {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return `rgb(${Math.min(R, 255)}, ${Math.min(G, 255)}, ${Math.min(B, 255)})`;
};

const getTextColor = (tierColor) => {
  const r = parseInt(tierColor.substring(1, 3), 16);
  const g = parseInt(tierColor.substring(3, 5), 16);
  const b = parseInt(tierColor.substring(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
};

const CouponsCard = ({ coupon, tierColor, onEdit, onDelete }) => {
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const lightColor = lightenColor(tierColor, 60);
  const textColor = getTextColor(tierColor);

  const handleInfoModalOpen = () => setOpenInfoModal(true);
  const handleInfoModalClose = () => setOpenInfoModal(false);
  const handleToggleActive = () => setIsActive(!isActive);

  return (
    <div>
      <Card
        sx={{
          background: `linear-gradient(to bottom right, ${lightColor}, ${tierColor})`,
          borderRadius: 4,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
          color: textColor,
          p: 3,
          position: "relative",
          transition: "transform 0.2s, box-shadow 0.2s",
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: "0 12px 28px rgba(0, 0, 0, 0.2)"
          }
        }}
      >
        <CardContent>
          <Box 
            sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center" 
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {coupon.couponTitle}
            </Typography>
            <IconButton
              aria-label="info"
              onClick={handleInfoModalOpen}
              sx={{ color: textColor }}
            >
              <InfoIcon />
            </IconButton>
          </Box>

          <Typography variant="body2" sx={{ my: 2 }}>
            {coupon.couponDescription}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2"><strong>Benefit:</strong> ${coupon.benefit}</Typography>
            <Typography variant="body2"><strong>Validity:</strong> {coupon.validity} days</Typography>
          </Box>

        </CardContent>

        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            p: 2 
          }}
        >
          <Box>
            <Typography variant="body2">Active:</Typography>
            <Switch 
              checked={isActive} 
              onChange={handleToggleActive} 
              color="primary" 
            />
          </Box>

          <Box>
            <IconButton 
              aria-label="edit" 
              onClick={() => onEdit(coupon)} 
              sx={{ color: textColor, mr: 1 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton 
              aria-label="delete" 
              onClick={() => onDelete(coupon)} 
              sx={{ color: textColor }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
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
            bgcolor: 'background.paper', 
            boxShadow: 24, 
            p: 4, 
            borderRadius: 2, 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: 400 
          }}
        >
          <Typography id="info-modal-title" variant="h6" component="h2">
            More Details
          </Typography>
          <Typography id="info-modal-description" sx={{ mt: 2 }}>
            {coupon.couponDescription}
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
  onDelete: () => {}
};

export default CouponsCard;
