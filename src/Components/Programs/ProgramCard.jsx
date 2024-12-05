import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Switch,
  Divider,
} from "@mui/material";

const ProgramCard = ({ program, onToggle }) => {
  const { name, active, startDate, endDate } = program;

  return (
    <Card
      sx={{
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
        bgcolor: active ? "#E8F5E9" : "#FFEBEE", // Green for active, red for inactive
        p: 2,
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 6px 30px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardContent>
        {/* Program Name */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#4A4A4A" }}
          >
            {name}
          </Typography>
          <Switch
            checked={active}
            onChange={onToggle}
            inputProps={{ "aria-label": "Activate Program" }}
            color="primary"
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Program Dates */}
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Start Date:</strong> {new Date(startDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body2">
          <strong>End Date:</strong> {new Date(endDate).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProgramCard;
