// OfferCard.js
import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const OfferCard = ({ offer }) => {
  return (
    <Card sx={{ mb: 2, bgcolor: "#f9f9f9", boxShadow: "0 1px 6px rgba(0, 0, 0, 0.1)" }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {offer.tierName}
        </Typography>
        <Typography variant="body2">Trigger Amount: ${offer.triggerAmount}</Typography>
        <Typography variant="body2">Trigger Duration: {offer.triggerDuration} months</Typography>
        <Typography variant="body2">Accrual Multiplier: {offer.accrualMultiplier}</Typography>
        <Typography variant="body2">Redemption Limit: ${offer.redemptionLimitOfPurchase}</Typography>
        <Typography variant="body2">Conversion Rate: {offer.conversion}</Typography>
        <Typography variant="body2">Description: {offer.description}</Typography>
        <Typography variant="body2">Coupon Probability: {offer.couponProbability}</Typography>
      </CardContent>
    </Card>
  );
};

export default OfferCard;