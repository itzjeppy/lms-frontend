import React from 'react';
import { Container, Typography, Grid, Paper, Grid2 } from '@mui/material';

const Contacts = () => {
  const teamMembers = [
    "Saee Chormunge",
    "Jholline Jepson",
    "Cibi Sri Balaji",
    "Balaji Senthilkumar",
    "Lakshmi Sowmya",
    "Sadhana",
    "Spoorthy Pateel",
    "Bhavya Sri",
    "Mohammed Zaid Farooki",
    "Om Prakash Gupta"
  ];

  return (
    <Container
      sx={{
        mt: 4,
        mb: 4,
        p: 3,
        bgcolor: '#f5f5f5',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Created by
      </Typography>
      <Grid2 container spacing={2} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid2 item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                bgcolor: '#ffffff',
                borderRadius: 2,
                textAlign: 'center',
                transition: '0.3s',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'scale(1.02)',
                },
              }}
            >
              <Typography variant="h6" color="primary">
                {member}
              </Typography>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default Contacts;