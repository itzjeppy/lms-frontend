import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  IconButton,
  CircularProgress,
  Grid2,
  Button,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import ProgramCard from "./ProgramCard"; // Import the custom ProgramCard component
import ProgramService from "../Services/ProgramsService"; // Simulate API call

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await ProgramService.getPrograms();
        setPrograms(response.data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const handleToggleProgram = (programId) => {
    setPrograms((prevPrograms) =>
      prevPrograms.map((program) =>
        program.id === programId
          ? { ...program, active: !program.active }
          : program
      )
    );
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
    sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: { xs: 2, md: 3 }, // Adjust padding for small and larger screens
        bgcolor: "#f9f9f9", // Light background
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow
        maxWidth: "1200px", // Limit maximum width
        margin: "0 auto", // Center horizontally
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
        <IconButton
          color="inherit"
          edge="start"
          aria-label="go back"
          onClick={() => navigate(-1)}
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
          Your Programs
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => navigate("../add-program")} // Navigate to AddOffers component
          sx={{
            fontWeight: "bold",
            textTransform: "none", // Avoid uppercase
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          Add Program
        </Button>
      </Box>

      {/* Programs List Section */}
      <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto", // Scrollable content
                bgcolor: "#ffffff", // White card background
                p: 2,
                borderRadius: 2,
                boxShadow: "0 1px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
              }}
        >
      <Grid2 container spacing={3}>
        {programs.length > 0 ? (
          programs.map((program) => (
            <Grid2 item xs={12} sm={6} md={4} key={program.id}>
              <ProgramCard
                program={program}
                onToggle={() => handleToggleProgram(program.id)}
              />
            </Grid2>
          ))
        ) : (
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ textAlign: "center", mt: 2 }}
          >
            No programs available. Start by adding a new program!
          </Typography>
        )}
      </Grid2>
      </Box>
    </Container> 
  );
};

export default ProgramsPage;
