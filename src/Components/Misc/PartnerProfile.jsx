import React from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Typography, Avatar, Divider, Grid2, Paper, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const ProfilePage = () => {
  // Sample partner data
  const partner = {
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "https://via.placeholder.com/150" // Replace with actual image URL
  };

  // Sample user data for the DataGrid
  const users = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
    { id: 4, name: 'David Wilson', email: 'david@example.com' },
    { id: 5, name: 'Eva Green', email: 'eva@example.com' },
    { id: 6, name: 'Frank Castle', email: 'frank@example.com' },
    { id: 7, name: 'Grace Lee', email: 'grace@example.com' },
    { id: 8, name: 'Hank Pym', email: 'hank@example.com' },
    { id: 9, name: 'Ivy Adams', email: 'ivy@example.com' },
    { id: 10, name: 'Jack Sparrow', email: 'jack@example.com' },
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
  ];

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
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
      <Grid2 container spacing={4}>
        <Grid2 item xs={12} md={4}>
          <Avatar
            alt={partner.name}
            src={partner.profilePicture}
            sx={{ width: 200, height: 200, margin: '0 auto' }}
          />
        </Grid2>
        <Grid2 item xs={12} md={8}>
          <Typography variant="h2" sx={{ mt: 2 }}>
            {partner.name}
          </Typography>
          <Typography variant="h5" color="textSecondary">
            {partner.email}
          </Typography>
          <Button variant="contained" color="error" sx={{ my: 2 }} onClick={handleLogout}>Logout</Button>
        </Grid2>
      </Grid2>
      <Divider sx={{ my: 4 }} /> {/* Divider between profile and users */}
      <Paper
        elevation={3}
        sx={{
          p: 0, // Remove padding
          bgcolor: 'transparent', // Remove background color
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ p: 1 }}>
          Users
        </Typography>
        <div style={{ height: 'auto', width: '100%' }}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick // Disable checkbox selection
            autoHeight // Automatically adjust height based on rows
            pageSizeOptions={[5, 10, 25]}
          />
        </div>
      </Paper>
    </Container>
  );
};

export default ProfilePage;