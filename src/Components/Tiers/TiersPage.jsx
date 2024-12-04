import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const TiersContent = () => {
  const [tiers, setTiers] = useState([
    {
      id: 1,
      name: "Free Tier",
      triggerAmount: 0,
      triggerDuration: 0,
      accrualMultiplier: 1.0,
      redemptionLimitOfPurchase: 0,
      conversion: 0.0,
      description: "This is a basic free plan for individual users.",
      couponProbability: 0.0,
      color: "#2196F3",
      nonDeletable: true, // Mark Free Tier as non-deletable
    },
    {
      id: 2,
      name: "Silver Tier",
      triggerAmount: 5000,
      triggerDuration: 6,
      accrualMultiplier: 1.2,
      redemptionLimitOfPurchase: 2000,
      conversion: 0.01,
      description: "This plan is suitable for small teams.",
      couponProbability: 0.7,
      color: "#C0C0C0",
    },
    {
      id: 3,
      name: "Gold Tier",
      triggerAmount: 10000,
      triggerDuration: 12,
      accrualMultiplier: 1.5,
      redemptionLimitOfPurchase: 5000,
      conversion: 0.02,
      description: "This is the premium plan for large organizations.",
      couponProbability: 1.0,
      color: "#FFD700",
    },
  ]);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    const tierToDelete = tiers.find((tier) => tier.id === id);

    // Prevent deleting non-deletable tiers
    if (tierToDelete?.nonDeletable) {
      alert("The Free Tier cannot be deleted.");
      return;
    }

    // Prevent deleting the last remaining tier
    if (tiers.length === 1) {
      alert("At least one tier must exist.");
      return;
    }

    setTiers(tiers.filter((tier) => tier.id !== id));
  };

  const handleEdit = (id) => {
    navigate(`/edit-tier/${id}`);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: { xs: 2, md: 3 },
        bgcolor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "space-between" },
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          mb: 2,
          gap: { xs: 2, md: 0 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#4A4A4A",
          }}
        >
          Your Tiers
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => navigate("../add-tier")}
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          Add Tier
        </Button>
      </Box>

      {/* Tiers Timeline Section */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          bgcolor: "#ffffff",
          p: 2,
          borderRadius: 2,
          boxShadow: "0 1px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {tiers.length > 0 ? (
          <Timeline
            sx={{
              "& .MuiTimelineItem-root:before": {
                flex: 0,
              },
            }}
          >
            {tiers.map((tier, index) => (
              <TimelineItem key={tier.id}>
                {/* Timeline Separator */}
                <TimelineSeparator>
                  <TimelineDot style={{ backgroundColor: tier.color }} />
                  {index < tiers.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                {/* Timeline Content */}
                <TimelineContent>
                  <Accordion
                    sx={{
                      boxShadow: "none",
                      border: "1px solid #ddd",
                      borderRadius: 1,
                      mb: 2,
                    }}
                    style={{ backgroundColor: "#f9f9f9" }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel-${tier.id}-content`}
                      id={`panel-${tier.id}-header`}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#4A4A4A",
                        }}
                      >
                        {tier.name}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Trigger Amount:</strong> ${tier.triggerAmount}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Trigger Duration:</strong> {tier.triggerDuration} months
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Accrual Multiplier:</strong> {tier.accrualMultiplier}x
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Redemption Limit:</strong> ${tier.redemptionLimitOfPurchase}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Conversion:</strong> {tier.conversion * 100}%
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Coupon Probability:</strong> {tier.couponProbability * 100}%
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Description:</strong> {tier.description}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: 2,
                        }}
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<EditIcon />}
                          onClick={() => handleEdit(tier.id)}
                        >
                          Edit
                        </Button>
                        {!tier.nonDeletable && (
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(tier.id)}
                          >
                            Delete
                          </Button>
                        )}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        ) : (
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ textAlign: "center", mt: 2 }}
          >
            No tiers available. Start by adding a new tier!
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default TiersContent;
