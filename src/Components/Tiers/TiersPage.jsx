import React, { useState, useEffect } from "react";
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
  ButtonGroup,
  Grid2,
  Paper,
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

const TiersContent = () => {
  const [tiers, setTiers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTiers = JSON.parse(localStorage.getItem("tiers") || "[]");
    setTiers(storedTiers);
  }, []);

  const handleAddFreeTier = () => {
    navigate("../add-tier");
  };

  const handleEdit = (id) => {
    navigate(`/edit-tier/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tier?")) {
      const updatedTiers = tiers.filter((tier) => tier.id !== id);
      setTiers(updatedTiers);
      localStorage.setItem("tiers", JSON.stringify(updatedTiers));
    }
  };

  const lightenColor = (color, percent) => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return `rgb(${Math.min(R, 255)}, ${Math.min(G, 255)}, ${Math.min(B, 255)})`;
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => navigate(-1)}
            color="primary"
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#4A4A4A",
            }}
          >
            Your Tiers
          </Typography>
        </Box>

        {tiers.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleAddFreeTier}
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            Add Tier
          </Button>
        )}
      </Box>

      {tiers.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            bgcolor: "#ffffff",
            p: 4,
            borderRadius: 2,
            boxShadow: "0 1px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
            Welcome! Create your Free Tier to get started.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleAddFreeTier}
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            Create Free Tier
          </Button>
        </Box>
      ) : (
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
          <Timeline
            sx={{
              "& .MuiTimelineItem-root:before": {
                flex: 0,
              },
            }}
          >
            {tiers.map((tier, index) => (
              <TimelineItem key={tier.id}>
                <TimelineSeparator>
                  <TimelineDot
                    style={{
                      background: `linear-gradient(to bottom right, ${tier.colour}, ${lightenColor(
                        tier.colour,
                        40
                      )})`,
                      width: "20px",
                      height: "20px",
                    }}
                  />
                  {index < tiers.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Accordion
                    defaultExpanded
                    sx={{
                      boxShadow: "none",
                      border: `3px solid`,
                      borderRadius: "10px",
                      mb: 2,
                      borderImageSource: `linear-gradient(45deg, ${tier.colour}, ${lightenColor(
                        tier.colour,
                        40
                      )})`,
                      borderImageSlice: 1,
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel-${tier.id}-content`}
                      id={`panel-${tier.id}-header`}
                    >
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {tier.name}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid2 container spacing={2}>
                        {[
                          {
                            label: "Trigger Amount",
                            value: `$${tier.triggerAmount}`,
                            icon: <InfoIcon color="primary" />,
                          },
                          {
                            label: "Trigger Duration",
                            value: `${tier.triggerDuration} months`,
                            icon: <InfoIcon color="primary" />,
                          },
                          {
                            label: "Accrual Multiplier",
                            value: tier.accrualMultiplier,
                            icon: <InfoIcon color="primary" />,
                          },
                          {
                            label: "Redemption Limit",
                            value: tier.redemptionLimitOfPurchase,
                            icon: <InfoIcon color="primary" />,
                          },
                          {
                            label: "Conversion Rate",
                            value: tier.conversion,
                            icon: <InfoIcon color="primary" />,
                          },
                          {
                            label: "Description",
                            value: tier.description,
                          },
                        ].map((item, i) => (
                          <Grid2 key={i} item xs={12} sm={6}>
                            <Paper
                              sx={{
                                p: 2,
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                bgcolor: "#f9f9f9",
                                borderRadius: 2,
                                boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                              }}
                            >
                              {item.icon}
                              <Box>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  sx={{ fontWeight: "bold", mb: 0.5 }}
                                >
                                  {item.label}
                                </Typography>
                                <Typography variant="body1">
                                  {item.value}
                                </Typography>
                              </Box>
                            </Paper>
                          </Grid2>
                        ))}
                      </Grid2>
                      <Divider sx={{ my: 2 }} />
                      {!tier.isFreeTier && (
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                          <ButtonGroup>
                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<EditIcon />}
                              onClick={() => handleEdit(tier.id)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              color="secondary"
                              startIcon={<DeleteIcon />}
                              onClick={() => handleDelete(tier.id)}
                            >
                              Delete
                            </Button>
                          </ButtonGroup>
                        </Box>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>
      )}
    </Container>
  );
};

export default TiersContent;
