import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Typography, Avatar, Divider, Grid, Paper, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import UserService from "../Services/UserService";
import TierService from "../Services/TierService";
import PartnerService from '../Services/PartnerService';
 
const ProfilePage = () => {
  const [users, setUsers] = useState([]);
  const [partner, setPartner] = useState({});
 
  const columns = [
    { field: 'id', headerName: 'Id', width: 200 },
    { field: 'userID', headerName: 'User ID', width: 90 },
    { field: 'totalPoints', headerName: 'Total Points', width: 150 },
    { field: 'tierName', headerName: 'Tier Name', width: 150 },
  ];
 
  const navigate = useNavigate();
 
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
 
  useEffect(() => {
    const partnerId = localStorage.getItem('partnerId');
 
    const fetchPartner = async () => {
      try {
        const response = await PartnerService.getPartnerById(partnerId);
        const partnerData = response.data;
        setPartner(partnerData);
      } catch (error) {
        console.error("Error fetching partner details:", error);
      }
    };
 
    const fetchUsers = async () => {
      try {
        const response = await UserService.getUserByPartnerId(partnerId);
        const usersWithTier = await Promise.all(response.data.map(async (user) => {
          const tierResponse = await TierService.getTierByTierId(user.tiers.tierId);
          return {
            id: user.uId,
            userID: user.userId,
            totalPoints: user.totalPoints,
            tierName: tierResponse.data.tierName,
          };
        }));
        setUsers(usersWithTier);
      } catch (error) {
        console.error("Error fetching users or tier names:", error);
      }
    };
 
    fetchPartner();
    fetchUsers();
  }, []);
 
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
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Avatar
            alt={partner.name}
            src="https://via.placeholder.com/150"
            sx={{ width: 200, height: 200, margin: '0 auto' }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h2" sx={{ mt: 2 }}>
            {partner.partnerName}
          </Typography>
          <Typography variant="h5" color="textSecondary">
            {partner.email}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            +{partner.countryCode} {partner.contact}
          </Typography>
          <Button variant="contained" color="error" sx={{ my: 2 }} onClick={handleLogout}>Logout</Button>
        </Grid>
      </Grid>
      <Divider sx={{ my: 4 }} />
      <Paper
        elevation={3}
        sx={{
          p: 0,
          bgcolor: 'transparent',
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
            rowsPerPageOptions={[5, 10, 25]}
            autoHeight
          />
        </div>
      </Paper>
    </Container>
  );
};
 
export default ProfilePage;