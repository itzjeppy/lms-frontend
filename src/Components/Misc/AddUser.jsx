import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Container,
  CircularProgress,
} from "@mui/material";
import UserService from "../Services/UserService";

const AddUser = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    UserService.createUser(values)
      .then((response) => {
        console.log("User created successfully:", response.data);
        // Navigate to user list page or display success message
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: 3,
        bgcolor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Paper
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: "10px" }}>
          Add User
        </Typography>
        <Formik
          initialValues={{
            userId: "",
            partner: "",
            tiers: "",
            totalPoints: "",
            tierSetDate: "",
            expiry: "",
            tierTransactionAmount: "",
            totalTransactionAmount: "",
          }}
          validationSchema={Yup.object().shape({
            userId: Yup.number().required("User ID is required"),
            partner: Yup.string().required("Partner is required"),
            tierName: Yup.string().required("Tiers is required"),
            totalPoints: Yup.number().required("Total Points is required"),
            tierSetDate: Yup.date().required("Tier Set Date is required"),
            expiry: Yup.date().required("Expiry is required"),
            tierTransactionAmount: Yup.number().required(
              "Tier Transaction Amount is required"
            ),
            totalTransactionAmount: Yup.number().required(
              "Total Transaction Amount is required"
            ),
          })}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Field
                  name="userId"
                  as={TextField}
                  label="User ID"
                  fullWidth
                  variant="outlined"
                  error={touched.userId && Boolean(errors.userId)}
                  helperText={touched.userId && errors.userId}
                />
                <Field
                  name="partner"
                  as={TextField}
                  label="Partner"
                  fullWidth
                  variant="outlined"
                  error={touched.partner && Boolean(errors.partner)}
                  helperText={touched.partner && errors.partner}
                />
                <Field
                  name="tierName"
                  as={TextField}
                  label="Tier Name"
                  fullWidth
                  variant="outlined"
                  error={touched.tierName && Boolean(errors.tierName)}
                  helperText={touched.tierName && errors.tierName}
                />
                <Field
                  name="totalPoints"
                  as={TextField}
                  label="Total Points"
                  type="number"
                  fullWidth
                  variant="outlined"
                  error={touched.totalPoints && Boolean(errors.totalPoints)}
                  helperText={touched.totalPoints && errors.totalPoints}
                />
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Field
                    name="tierSetDate"
                    as={TextField}
                    label="Tier Set Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    sx={{ flex: 1 }} // Takes equal space
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder=""
                    error={touched.tierSetDate && Boolean(errors.tierSetDate)}
                    helperText={touched.tierSetDate && errors.tierSetDate}
                  />
                  <Field
                    name="expiry"
                    as={TextField}
                    label="Expiry"
                    type="date"
                    variant="outlined"
                    fullWidth
                    sx={{ flex: 1 }} // Takes equal space
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder=""
                    error={touched.expiry && Boolean(errors.expiry)}
                    helperText={touched.expiry && errors.expiry}
                  />
                </Box>
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Field
                    name="tierTransactionAmount"
                    as={TextField}
                    label="Tier Transaction Amount"
                    type="number"
                    fullWidth
                    variant="outlined"
                    error={
                      touched.tierTransactionAmount &&
                      Boolean(errors.tierTransactionAmount)
                    }
                    helperText={
                      touched.tierTransactionAmount &&
                      errors.tierTransactionAmount
                    }
                  />
                  <Field
                    name="totalTransactionAmount"
                    as={TextField}
                    label="Total Transaction Amount"
                    type="number"
                    fullWidth
                    variant="outlined"
                  />
                </Box>
              </Box>
              <Box sx={{ mt: 3, textAlign: "right" }}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  {isSubmitting && (
                    <CircularProgress
                      size={24}
                      sx={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        marginLeft: "-12px",
                        marginTop: "-12px",
                      }}
                    />
                  )}
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default AddUser;
