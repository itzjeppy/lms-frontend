import React, { useState } from "react";
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

const AllPartnersPage = () => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const [partners, setPartners] = useState(
    Array.from({ length: 30 }, (_, i) => ({
      name: `Partner ${i + 1}`,
      company: `Company ${i + 1}`,
      email: `partner${i + 1}@company.com`,
      dateJoined: `${i + 1}/12/2024`,
      isActive: true,
    }))
  );

  const handleDeactivate = (index) => {
    setPartners((prev) =>
      prev.map((partner, i) =>
        i === index ? { ...partner, isActive: false } : partner
      )
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Filter active partners
  const activePartners = partners.filter((partner) => partner.isActive);

  return (
    <Container
      sx={{
        mt: 2,
        mb: 4,
        p: 2,
        // background: "linear-gradient(to right bottom, #e3f2fd, #e1bee7)",
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
                <Typography fontWeight="bold">Company Name</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Email</Typography>
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
              .map((partner, index) => (
                <TableRow key={index}>
                  <TableCell>{partner.name}</TableCell>
                  <TableCell>{partner.company}</TableCell>
                  <TableCell>{partner.email}</TableCell>
                  <TableCell>{partner.dateJoined}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeactivate(partners.indexOf(partner))}
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
