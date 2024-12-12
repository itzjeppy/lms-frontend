import React, { useState, useEffect } from "react";
import { Container, Box, Typography, CircularProgress, Button, Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProgramCard from "./ProgramCard";
import ProgramService from "../Services/ProgramService";
import TierService from "../Services/TierService";
import ConfirmationModal from "../Common/ConfirmationModal"; // Import the ConfirmationModal
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [programToDelete, setProgramToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await ProgramService.getProgramsByPartner(localStorage.getItem("partnerId"));
        setPrograms(response.data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTiers = async () => {
      try {
        const partnerId = localStorage.getItem('partnerId');
        const response = await TierService.getTiersByPartnerId(partnerId);
        setTiers(response.data);
      } catch (error) {
        console.error("Error fetching tiers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
    fetchTiers();
  }, []);

  const handleEdit = (program) => {
    navigate(`../edit-program/${program.programId}`, { state: { program } });
  };

  const handleStatusToggle = (program) => {
    // Toggle the status of the program
    const updatedProgram = {
      ...program,
      status: !program.status // Assuming 'status' is the field controlling the status
    };
  
    // Call the updateProgram method from the ProgramService
    ProgramService.updateProgram(updatedProgram)
      .then(() => {
        // Update the state with the new program list reflecting the toggled status
        setPrograms((prevPrograms) =>
          prevPrograms.map((p) => (p.programId === program.programId ? updatedProgram : p))
        );
      })
      .catch((error) => {
        console.error("Error updating program status:", error);
      });
  };

  const handleDelete = (programId) => {
    setProgramToDelete(programId);
    setShowDeleteDialog(true); // Open the dialog
  };

  const confirmDelete = () => {
    if (programToDelete) {
      ProgramService.deleteProgram(programToDelete)
        .then(() => {
          setPrograms((prevPrograms) =>
            prevPrograms.filter((program) => program.programId !== programToDelete)
          );
        })
        .catch((error) => {
          console.error("Error deleting program", error);
        })
        .finally(() => {
          setShowDeleteDialog(false); // Close the dialog
          setProgramToDelete(null); // Reset the program to delete
        });
    }
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false); // Close the dialog
    setProgramToDelete(null); // Reset the program to delete
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ display: "flex", flexDirection: "column", height: "100%", p: 3, bgcolor: "#f9f9f9", borderRadius: 2, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#4A4A4A" }}>
          Your Programs
        </Typography>
        {tiers.length > 0 && (
          <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} onClick={() => navigate("../add-program")}>
            Add Program
          </Button>
        )}
      </Box>

      {tiers.length === 0 ? (
        <Box sx={{ textAlign: "center", bgcolor: "#ffffff", p: 4, borderRadius: 2, boxShadow: "0 1px 6px rgba(0, 0, 0, 0.1)" }}>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
            Please create at least one tier before managing programs.
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate("../add-tier")}>
            Create Tier
          </Button>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, overflowY: "auto", bgcolor: "#ffffff", p: 2, borderRadius: 2, boxShadow: "0 1px 6px rgba(0, 0, 0, 0.1)" }}>
          <Grid2 container spacing={3}>
            {programs.length > 0 ? (
              programs.map((program) => (
                <Grid2 item xs={12} sm={6} md={4} key={program.programId}>
                  <ProgramCard
                    program={program}
                    onEdit={handleEdit}
                    onDelete={() => handleDelete(program.programId)} // Pass the programId to handleDelete
                    onToggle={() => handleStatusToggle(program)}
                  />
                </Grid2>
              ))
            ) : (
              <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center", mt: 2 }}>
                No programs available. Start by adding a new program!
              </Typography>
            )}
          </Grid2>
        </Box>
      )}

      <ConfirmationModal
        show={showDeleteDialog}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message="Are you sure you want to delete this program?"
      />
    </Container>
  );
};

export default ProgramsPage;