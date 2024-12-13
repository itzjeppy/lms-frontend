import React, { useState, useEffect } from "react";
import SuperAdminService from "../Services/SuperAdminService";
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
  const [partners, setPartners] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    useEffect(() => {
      setIsSubmitting(true);
      getPartners();
    }, []);
    const getPartners = () => {
      SuperAdminService.getAllPartners()
      .then((response) => {
        console.log("All Partners", response.data);
        setPartners(response.data);
      })
      .catch((error) => {
        console.error("Error getting partners", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
    }

  const [page, setPage] = useState(1);
  const cardsPerPage = 9;

   const handleApprove = (partnerId) => {
      SuperAdminService.updatePartner(partnerId, true).then((response) => {
        console.log(response.data);}).catch((error) => {
          console.error("Error getting partners", error);
        }).finally(() => {
          getPartners();
        });
    };

  const handleDelete = (partnerId) => {
      SuperAdminService.deletePartner(partnerId)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error getting partners", error);
        })
        .finally(() => {
          getPartners();
        });
    };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Filter partners with isActive status as false
  const inactivePartners = partners.filter((partner) => !partner.status && !partner.newPartner);

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
                  {partner.partnerName}
                </Typography>
                <Typography variant="body1">{partner.dateJoined}</Typography>
                <Typography variant="body2">{partner.email}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() =>
                    handleApprove(partner.partnerId)
                  }
                >
                  Re-enable
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() =>
                    handleDelete(partner.partnerId)
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
