import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  FormHelperText,
  Box,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { Container } from "@mui/system";

const EditTier = () => {
  const { id } = useParams(); // Get the ID of the tier to edit from the URL
  const navigate = useNavigate();

  // Fetch the tier data from a local source (replace with an API call if needed)
  const getTierById = (id) => {
    const storedTiers = JSON.parse(localStorage.getItem("tiers") || "[]");
    return storedTiers.find((tier) => tier.id === parseInt(id, 10));
  };

  const tier = getTierById(id);

  if (!tier) {
    return (
      <Container>
        <Typography variant="h5" color="error" sx={{ textAlign: "center", mt: 4 }}>
          Tier not found!
        </Typography>
      </Container>
    );
  }

  const schema = Yup.object().shape({
    name: Yup.string().required("Tier name is required"),
    triggerAmount: Yup.number().required("Trigger amount is required"),
    triggerDuration: Yup.number().required("Trigger duration is required"),
    accrualMultiplier: Yup.number().required("Accrual multiplier is required"),
    redemptionLimitOfPurchase: Yup.number().required("Redemption limit is required"),
    conversion: Yup.number().required("Conversion is required"),
    description: Yup.string().required("Description is required"),
    couponProbability: Yup.number()
      .min(0, "Probability cannot be less than 0")
      .max(1, "Probability cannot be greater than 1")
      .required("Coupon probability is required"),
  });

  const handleSubmit = (values) => {
    // Update the tier data in local storage (replace with API call if needed)
    const storedTiers = JSON.parse(localStorage.getItem("tiers") || "[]");
    const updatedTiers = storedTiers.map((storedTier) =>
      storedTier.id === parseInt(id, 10) ? { ...storedTier, ...values } : storedTier
    );
    localStorage.setItem("tiers", JSON.stringify(updatedTiers));

    navigate(-1); // Go back to the previous page
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
        bgcolor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Formik
        initialValues={{
          name: tier.name || "",
          triggerAmount: tier.triggerAmount || 0,
          triggerDuration: tier.triggerDuration || 0,
          accrualMultiplier: tier.accrualMultiplier || 0,
          redemptionLimitOfPurchase: tier.redemptionLimitOfPurchase || 0,
          conversion: tier.conversion || 0,
          description: tier.description || "",
          couponProbability: tier.couponProbability || 0,
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#4A4A4A",
                mb: 2,
              }}
            >
              Edit Tier
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: "#ffffff",
                boxShadow: "0 1px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Form Fields */}
              <Box mb={2}>
                <FormControl fullWidth>
                  <Field
                    name="name"
                    as={TextField}
                    label="Tier Name"
                    variant="outlined"
                  />
                  <ErrorMessage name="name">
                    {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                  </ErrorMessage>
                </FormControl>
              </Box>

              <Box mb={2}>
                <FormControl fullWidth>
                  <Field
                    name="triggerAmount"
                    as={TextField}
                    label="Trigger Amount"
                    type="number"
                    variant="outlined"
                  />
                  <ErrorMessage name="triggerAmount">
                    {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                  </ErrorMessage>
                </FormControl>
              </Box>

              <Box mb={2}>
                <FormControl fullWidth>
                  <Field
                    name="triggerDuration"
                    as={TextField}
                    label="Trigger Duration (months)"
                    type="number"
                    variant="outlined"
                  />
                  <ErrorMessage name="triggerDuration">
                    {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                  </ErrorMessage>
                </FormControl>
              </Box>

              <Box mb={2}>
                <FormControl fullWidth>
                  <Field
                    name="accrualMultiplier"
                    as={TextField}
                    label="Accrual Multiplier"
                    type="number"
                    variant="outlined"
                  />
                  <ErrorMessage name="accrualMultiplier">
                    {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                  </ErrorMessage>
                </FormControl>
              </Box>

              <Box mb={2}>
                <FormControl fullWidth>
                  <Field
                    name="redemptionLimitOfPurchase"
                    as={TextField}
                    label="Redemption Limit of Purchase"
                    type="number"
                    variant="outlined"
                  />
                  <ErrorMessage name="redemptionLimitOfPurchase">
                    {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                  </ErrorMessage>
                </FormControl>
              </Box>

              <Box mb={2}>
                <FormControl fullWidth>
                  <Field
                    name="conversion"
                    as={TextField}
                    label="Conversion Rate"
                    type="number"
                    variant="outlined"
                  />
                  <ErrorMessage name="conversion">
                    {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                  </ErrorMessage>
                </FormControl>
              </Box>

              <Box mb={2}>
                <FormControl fullWidth>
                  <Field
                    name="description"
                    as={TextField}
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={3}
                  />
                  <ErrorMessage name="description">
                    {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                  </ErrorMessage>
                </FormControl>
              </Box>

              <Box mb={2}>
                <FormControl fullWidth>
                  <Field
                    name="couponProbability"
                    as={TextField}
                    label="Coupon Probability (0-1)"
                    type="number"
                    variant="outlined"
                  />
                  <ErrorMessage name="couponProbability">
                    {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                  </ErrorMessage>
                </FormControl>
              </Box>

              {/* Submit Button */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Save Changes
                </Button>
              </Box>
            </Paper>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EditTier;
