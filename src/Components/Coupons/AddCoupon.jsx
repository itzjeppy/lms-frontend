import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  Divider
} from "@mui/material";
import { Container } from "@mui/system";

const schema = Yup.object().shape({
  coupon_id: Yup.string().required("Tier ID is required"),
  couponTitle: Yup.string().required("coupon title is required"),
  couponDescription: Yup.string().required("coupon description is required"),
  validity: Yup.number().required("Validity is required"),
  benefit: Yup.number().required("Benefit is required"),
  status: Yup.boolean().required("Status is required"),
});

const AddCoupons = () => {
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    // Get the existing coupons from local storage
    const existingCoupons = localStorage.getItem("coupons");
    const coupons = existingCoupons ? JSON.parse(existingCoupons) : [];

    // Add the new coupon to the list
    coupons.push({
      ...values,
    });

    // Save the updated list to local storage
    localStorage.setItem("coupons", JSON.stringify(coupons));

    // Navigate back to the coupons page
    navigate(-1);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: 3,
        bgcolor: "#f9f9f9", // Light background
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow
        width: "100%", // Changed to prevent overflow
      }}
    >
      <Formik
        initialValues={{
          coupon_id: "",
          couponTitle: "",
          couponDescription: "",
          validity: 0,
          benefit: 0,
          status: false,
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "#4A4A4A",
              }}
            >
              Add coupon
            </Typography>
            <Divider />
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto", // Scrollable content
                bgcolor: "#ffffff", // White card background
                p: 2,
                borderRadius: 2,
                boxShadow: "0 1px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Box mb={2}>
                <FormControl fullWidth error={!!ErrorMessage.coupon_id}>
                  <Field
                    name="coupon_id"
                    as={TextField}
                    label="Coupon ID"
                    variant="outlined"
                  />
                  <ErrorMessage name="coupon_id">
                    {(msg) => <FormHelperText>{msg}</FormHelperText>}
                  </ErrorMessage>
                </FormControl>
              </Box>
              <Box mb={2}>
                <FormControl fullWidth error={!!ErrorMessage.couponTitle}>
                  <Field
                    name="couponTitle"
                    as={TextField}
                    label="coupon Title"
                    variant="outlined"
                  />
                  <ErrorMessage name="couponTitle">
                    {(msg) => <FormHelperText>{msg}</FormHelperText>}
                  </ErrorMessage>
                </FormControl>
              </Box>
              <Box mb={2}>
                <FormControl fullWidth error={!!ErrorMessage.couponDescription}>
                  <Field
                    name="couponDescription"
                    as={TextField}
                    label="coupon Description"
                    variant="outlined"
                    multiline
                    rows={4}
                  />
                  <ErrorMessage name="couponDescription">
                    {(msg) => <FormHelperText>{msg}</FormHelperText>}
                  </ErrorMessage>
                </FormControl>
              </Box>
              <Box mb={2}>
                <FormControl fullWidth error={!!ErrorMessage.validity}>
                  <Field
                    name="validity"
                    as={TextField}
                    label="Validity"
                    type="number"
                    variant="outlined"
                  />
                  <ErrorMessage name="validity">
                    {(msg) => <FormHelperText>{msg}</FormHelperText>}
                  </ErrorMessage>
                </FormControl>
              </Box>
              <Box mb={2}>
                <FormControl fullWidth error={!!ErrorMessage.benefit}>
                  <Field
                    name="benefit"
                    as={TextField}
                    label="Benefit"
                    type="number"
                    variant="outlined"
                  />
                  <ErrorMessage name="benefit">
                    {(msg) => <FormHelperText>{msg}</FormHelperText>}
                  </ErrorMessage>
                </FormControl>
              </Box>
              <Box mb={2}>
                <FormControl error={!!ErrorMessage.status}>
                  <Field name="status" as={Checkbox} color="primary" />
                  <FormControlLabel
                    control={<Checkbox name="status" />}
                    label="Status"
                  />
                  <ErrorMessage name="status">
                    {(msg) => <FormHelperText>{msg}</FormHelperText>}
                  </ErrorMessage>
                </FormControl>
              </Box>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddCoupons;
