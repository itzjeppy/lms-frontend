import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Grid,
  Pagination,
} from "@mui/material";

const DisabledPartnersPage = () => {
  const [partners, setPartners] = useState(
    Array.from({ length: 30 }, (_, i) => ({
      name: `Existing Partner ${i + 1}`,
      company: `Existing Company ${i + 1}`,
      email: `existingpartner${i + 1}@example.com`,
      dateJoined: `${i + 1}/12/2024`,
      isActive: false,
    }))
  );

  const [page, setPage] = useState(1);
  const cardsPerPage = 9;

  const handleApprove = (index) => {
    setPartners((prev) =>
      prev.map((partner, i) =>
        i === index ? { ...partner, isActive: true } : partner
      )
    );
  };

  const handleDeny = (index) => {
    setPartners((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Filter partners with isActive status as false
  const inactivePartners = partners.filter((partner) => !partner.isActive);

  const displayedPartners = inactivePartners.slice(
    (page - 1) * cardsPerPage,
    page * cardsPerPage
  );

  return (
    <Container
      sx={{
        mt: 2,
        mb: 4,
        p: 2,
        background: "#ECEFF5",
        borderRadius: 3,
        boxShadow: 6,
        overflow: "hidden",
      }}
    >
      {/* Header Section */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography variant="h3" fontWeight="bold">
          Disabled Partners
        </Typography>
      </Box>

      {/* Cards Section */}
      <Grid container spacing={2}>
        {displayedPartners.map((partner, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                border: `2px solid #634e94`,
                backgroundColor: "transparent",
                color: "#634e94",
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography variant="h5" fontWeight="bold">
                  {partner.name}
                </Typography>
                <Typography variant="body1">{partner.company}</Typography>
                <Typography variant="body2">{partner.email}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() =>
                    handleApprove(index + (page - 1) * cardsPerPage)
                  }
                >
                  Re-enable
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() =>
                    handleDeny(index + (page - 1) * cardsPerPage)
                  }
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Section */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(inactivePartners.length / cardsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default DisabledPartnersPage;
