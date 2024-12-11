import React from "react";
import { Container, Typography, Grid2, Paper, Avatar, Box } from "@mui/material";

const Contacts = () => {
  const teamMembers = [
    { name: "Saee Chormunge", image: "https://via.placeholder.com/150" },
    { name: "Cibi Sri Balaji M", image: "https://via.placeholder.com/150" },
    { name: "Balaji Senthilkumar", image: "https://via.placeholder.com/150" },
    { name: "Om Prakash Gupta", image: "https://via.placeholder.com/150" },
    { name: "Lakshmi Sowmya ", image: "https://via.placeholder.com/150" },
    { name: "Sadhana Madina", image: "https://via.placeholder.com/150" },
    { name: "Spoorthy Pateel", image: "https://via.placeholder.com/150" },
    { name: "K Bhavya Sri", image: "https://via.placeholder.com/150" },
    { name: "Muhammed Zaid  Farookhi", image: "https://via.placeholder.com/150" },
    { name: "Jholline Jepson J", image: "https://via.placeholder.com/150" },
  ];

  return (
    <Container
      sx={{
        mt: 4,
        mb: 4,
        p: 4,
        background: "linear-gradient(to right bottom, #e3f2fd, #e1bee7)",
        borderRadius: 3,
        boxShadow: 6,
        overflow: "hidden",
      }}
    >
      {/* Header Section */}
      <Box
      sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Meet Our Team
        </Typography>
        <Typography variant="h6" color="textSecondary">
          The brilliant minds behind the project
        </Typography>
      </Box>

      {/* Team Members Grid2 */}
      <Grid2 container spacing={4} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid2 item xs={12} sm={6} md={4} lg={3} key={index}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 4,
                bgcolor: "white",
                width: "300px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
                },
              }}
            >
              <Avatar
                src={member.image}
                alt={member.name}
                sx={{
                  width: 80,
                  height: 80,
                  mb: 2,
                  border: "3px solid #673ab7",
                }}
              />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {member.name}
              </Typography>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default Contacts;
