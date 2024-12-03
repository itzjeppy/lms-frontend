import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Modal,
  Paper,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
import CloseIcon from "@mui/icons-material/Close";

const TiersContent = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tiers, setTiers] = useState([
    {
      id: 1,
      name: "Free Tier",
      price: "$0",
      color: "#2196F3", // Blue color for Free Tier
      details: "This is a basic free plan for individual users.",
    },
    {
      id: 2,
      name: "Silver Tier",
      price: "$10",
      color: "#C0C0C0", // Silver color
      details: "This plan is suitable for small teams.",
    },
    {
      id: 3,
      name: "Gold Tier",
      price: "$20",
      color: "#FFD700", // Gold color
      details: "This is the premium plan for large organizations.",
    },
  ]);

  const handleAddTier = (tier) => {
    setTiers([...tiers, tier]);
    setModalIsOpen(false);
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
        width: "100%",
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
          Your Tiers
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setModalIsOpen(true)}
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
      <Container
        sx={{
          paddingTop: "-10px",
          flexGrow: 2,
          overflowY: "auto",
          bgcolor: "#ffffff",
          p: 3,
          borderRadius: 2,
          boxShadow: "0 1px 6px rgba(0, 0, 0, 0.1)",
          width: "100%",
          ml: 0,
        }}
      >
        {tiers.length > 0 ? (
          <Timeline
            sx={{
              "& .MuiTimelineItem-root:before": {
                flex: 0, // Remove default gap
              },
            }}
          >
            {tiers.map((tier, index) => (
              <TimelineItem key={tier.id}>
                {/* Timeline Separator */}
                <TimelineSeparator>
                  {/* Set the color of the TimelineDot */}
                  <TimelineDot style={{ backgroundColor: tier.color }} />
                  {index < tiers.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                {/* Timeline Content */}
                <TimelineContent>
                  <Accordion
                    sx={{
                      boxShadow: "none", // Remove shadow to make it flat
                      border: "1px solid #ddd", // Optional: add a light border for distinction
                      borderRadius: 1,
                    }}
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
                        {tier.name} - {tier.price}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6B6B6B",
                        }}
                      >
                        {tier.details}
                      </Typography>
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
      </Container>

      {/* Add Tier Modal */}
      <Modal
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        aria-labelledby="add-tier-modal-title"
        aria-describedby="add-tier-modal-description"
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
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
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
            sx={{
              fontWeight: "bold",
              mb: 2,
              textAlign: "center",
            }}
          >
            Add a New Tier
          </Typography>
          {/* Replace with your form */}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() =>
                handleAddTier({
                  id: tiers.length + 1,
                  name: `New Tier ${tiers.length + 1}`,
                  price: `$${tiers.length * 10}`,
                  color: "#FF5722", // Example of a custom hex color
                  details: "Details about this new tier.",
                })
              }
            >
              Add Tier Example
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Container>
  );
};

export default TiersContent;
