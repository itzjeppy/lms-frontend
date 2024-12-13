import React, { useState, useEffect } from "react";
import superAdminService from "../Services/SuperAdminService";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  Box,
} from "@mui/material";
import SuperAdminService from "../Services/SuperAdminService";

const AllPartnersPage = () => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
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

  const handleDeactivate = (partnerId) => {
        SuperAdminService.updatePartner(partnerId, false).then((response) => {
          console.log(response.data);}).catch((error) => {
            console.error("Error getting partners", error);
          }).finally(() => {
            getPartners();
          });
      };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Filter active partners
  const activePartners = partners.filter((partner) => partner.status);
  console.log(activePartners)

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
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h3" fontWeight="bold">
          Partner Management
        </Typography>
      </Box>

      {/* Pagination Section */}
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={activePartners.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />

      {/* Table Section */}
      <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight="bold">Partner's Name</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Email</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Contact Number</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Date Joined</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography fontWeight="bold">Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activePartners
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((partner) => (
                <TableRow key={partner.partnerId}>
                  <TableCell>{partner.partnerName}</TableCell>
                  <TableCell>{partner.email}</TableCell>
                  <TableCell>{"+" + partner.countryCode + " " + partner.contact}</TableCell>
                  <TableCell>{partner.dateJoined}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeactivate(partner.partnerId)}
                    >
                      Deactivate
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AllPartnersPage;
