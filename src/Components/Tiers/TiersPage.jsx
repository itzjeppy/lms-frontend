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
} from "@mui/material";

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
} from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete icon
import { useNavigate } from "react-router-dom";
import { TimelineContent } from "@mui/lab";

const TiersContent = () => {
  const [tiers, setTiers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load tiers from local storage or API
    const storedTiers = JSON.parse(localStorage.getItem("tiers"));
    setTiers(storedTiers);
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-tier/${id}`);
  };

  const handleDelete = (id) => {
    // Implement deletion logic here
    const updatedTiers = tiers.filter(tier => tier.id !== id);
    setTiers(updatedTiers);
    localStorage.setItem("tiers", JSON.stringify(updatedTiers));
  };

  return (
    <Container sx={{
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
    }}>
      {/* Header Section */}
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#4A4A4A" }}>
          Your Tiers
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("../add-tier")} sx={{
          fontWeight: "bold",
          textTransform: "none",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
        }}>
          Add Tier
        </Button>
      </Box>

      {/* Tiers List */}
      <Box sx={{
        flexGrow: 1,
        overflowY: "auto",
        bgcolor: "#ffffff",
        p: 2,
        borderRadius: 2,
        boxShadow: "0 1px 6px rgba(0, 0, 0, 0.1)",
      }}>
        {tiers.length > 0 ? (
          <Timeline sx={{ "& .MuiTimelineItem-root:before": { flex: 0 } }}>
            {tiers.map((tier, index) => (
              <TimelineItem key={tier.id}>
                <TimelineSeparator>
                  <TimelineDot style={{ backgroundColor: tier.color }} />
                  {index < tiers.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Accordion sx={{
                    boxShadow: "none",
                    border: "1px solid #ddd",
                    borderRadius: 1,
                    mb: 2,
                  }} style={{ backgroundColor: "#f9f9f9" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-${tier.id}-content`} id={`panel-${tier.id}-header`}>
                      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#4A4A4A" }}>
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
                      <Divider sx={{ my: 2 }} />
                      <Box sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                      }}>
                        <Button variant="outlined" color="primary" startIcon={<EditIcon />} onClick={() => handleEdit(tier.id)}>
                          Edit
                        </Button>
                        {!tier.nonDeletable && (
                          <IconButton aria-label="delete" onClick={() => handleDelete(tier.id)}>
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        ) : (
          <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center", mt: 2 }}>
            No tiers available. Start by adding a new tier!
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default TiersContent;
