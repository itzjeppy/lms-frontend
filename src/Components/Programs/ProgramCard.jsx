import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Switch,
  Divider,
  IconButton,
  Button,
  Chip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const ProgramCard = ({ program, onToggle }) => {
  const { name, active, startDate, endDate } = program;
  const navigate = useNavigate();

  // Preset gradients for consistent styling
  const backgroundGradient = active
    ? "linear-gradient(to bottom right, #A5D6A7, #66BB6A)" // Green for active
    : "linear-gradient(to bottom right, #FFABAB, #FF7043)"; // Red for inactive

  const handleNavigate = () => {
    navigate("/program-details"); // Replace with actual route
  };

  return (
    <Box sx={{ p: 2 }}>
      <Card
        sx={{
          background: backgroundGradient,
          borderRadius: 8,
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
          color: "#fff",
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
              sx={{ fontWeight: "bold", textTransform: "uppercase" }}
            >
              {name}
            </Typography>
            <Chip
              label={active ? "Active" : "Inactive"}
              color={active ? "success" : "error"}
              onClick={onToggle}
              size="small"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                backgroundColor: active ? "#4CAF50" : "#D32F2F",
                marginLeft: "10px",
              }}
            />
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.5)" }} />

          {/* Program Dates */}
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Start Date:</strong>{" "}
            {new Date(startDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2">
            <strong>End Date:</strong> {new Date(endDate).toLocaleDateString()}
          </Typography>
        </CardContent>

        {/* Footer Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            backgroundColor: "rgba(255,255,255,0.1)",
            borderTop: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          <Button
            onClick={handleNavigate}
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#fff",
              color: active ? "#388E3C" : "#D32F2F",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.9)",
              },
            }}
          >
            Details
          </Button>

        </Box>
      </Card>
    </Box>
  );
};

export default ProgramCard;
