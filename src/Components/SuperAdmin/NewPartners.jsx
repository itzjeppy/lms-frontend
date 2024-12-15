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
  Grid2,
  Pagination,
} from "@mui/material";
import ProgramService from "../Services/ProgramService";

const NewPartnersPage = () => {
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
        setPartners(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error getting partners", error);
        setPartners([]); // Ensure partners is always an array
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleDelete = (partnerId) => {
    SuperAdminService.deletePartner(partnerId)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error deleting partner", error);
      })
      .finally(() => {
        getPartners();
      });
  };

  const [page, setPage] = useState(1);
  const cardsPerPage = 9;

  const handleApprove = (partnerId) => {
    const programObj = {
      programName: "Default program",
      partnerId: partnerId,
      status: "true",
      defaultProgram:"true"
    };

    SuperAdminService.updatePartner(partnerId, true)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error updating partner", error);
      })
      .finally(() => {
        getPartners();
      });

    ProgramService.createProgram(programObj)
      .then((response) => {
        console.log("All Programs", response.data);
        // Ensure response.data is an array before setting it
        setPartners(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error creating program", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  let inactivePartners = [];
  try {
    inactivePartners = partners.filter(
      (partner) => !partner.status && partner.newPartner
    );
  } catch (error) {
    console.error("Error filtering partners", error);
  }

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
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography variant="h3" fontWeight="bold">
          New Partners
        </Typography>
      </Box>

      <Grid2 container spacing={2}>
        {displayedPartners.map((partner) => (
          <Grid2 item xs={12} sm={6} md={4} key={partner.partnerId}>
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
                  onClick={() => handleApprove(partner.partnerId)}
                >
                  Approve
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(partner.partnerId)}
                >
                  Deny
                </Button>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>

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

export default NewPartnersPage;
