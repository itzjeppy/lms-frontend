import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Button,
  Grid2 as MuiGrid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import ProgramCard from "./ProgramCard"; // Import the custom ProgramCard component
import ProgramService from "../Services/ProgramService"; // Simulate API call
import TierService from "../Services/TierService";

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [tiers, setTiers] = useState([]); // Load tiers for validation
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect if the screen is mobile

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await ProgramService.getAllPrograms();
        setPrograms(response.data); 
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTiers = async()=>{
        try {
          const response = await TierService.getTiersByPartnerId("5ef61c8d-c9eb-4ad1-aadd-041a5a889c33");
          setTiers(response.data); 
        } catch (error) {
          console.error("Error fetching tiers:", error);
        } finally {
          setLoading(false);
        }
    }

    fetchPrograms();
    fetchTiers();
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
        p: { xs: 2, md: 3 },
        bgcolor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        maxWidth: "1000px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: isMobile ? "column" : "row", // Adjust layout based on screen size
          mb: 3,
          gap: 2, // Space between items
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            color="inherit"
            edge="start"
            aria-label="go back"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant={isMobile ? "h5" : "h4"} // Smaller font size for mobile
            sx={{
              fontWeight: "bold",
              color: "#4A4A4A",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Your Programs
          </Typography>
        </Box>

        {tiers.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate("../add-program")} // Navigate to Add Program component
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            Add Program
          </Button>
        )}
      </Box>

      {/* Programs List Section */}
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
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ mb: 2 }}
          >
            Please create at least one tier before managing programs.
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
            Create Tier
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto", // Scrollable content
            bgcolor: "#ffffff",
            p: 2,
            borderRadius: 2,
            boxShadow: "0 1px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <MuiGrid container spacing={isMobile ? 2 : 3}>
            {programs.length > 0 ? (
              programs.map((program) => (
                <MuiGrid item xs={12} sm={6} md={4} key={program.id}>
                  {/* Responsive card layout */}
                  <ProgramCard
                    program={program}
                    onToggle={() => handleToggleProgram(program.id)}
                  />
                </MuiGrid>
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
          </MuiGrid>
        </Box>
      )}
    </Container>
  );
};

export default ProgramsPage;
