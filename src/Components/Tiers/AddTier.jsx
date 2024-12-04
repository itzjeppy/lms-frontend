import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
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
import { MuiColorInput } from "mui-color-input"; // Import MuiColorInput

// Validation Schema
const schema = Yup.object().shape({
  tierName: Yup.string().required("Tier Name is required"),
  triggerAmount: Yup.number()
    .required("Trigger Amount is required")
    .min(0, "Trigger Amount cannot be negative"),
  triggerDuration: Yup.number()
    .required("Trigger Duration is required")
    .min(1, "Duration must be at least 1 month"),
  accrualMultiplier: Yup.number()
    .required("Accrual Multiplier is required")
    .min(0, "Multiplier cannot be negative"),
  redemptionLimitOfPurchase: Yup.number()
    .required("Redemption Limit is required")
    .min(0, "Limit cannot be negative"),
  conversion: Yup.number()
    .required("Conversion Rate is required")
    .min(0, "Conversion Rate cannot be negative"),
  description: Yup.string().required("Description is required"),
  couponProbability: Yup.number()
    .required("Coupon Probability is required")
    .min(0)
    .max(1, "Probability must be between 0 and 1"),
  colour: Yup.string()
    .required("Colour is required")
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Enter a valid hex color"),
});

const AddTier = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    // Save the new tier in local storage or send to backend
    const existingTiers = JSON.parse(localStorage.getItem("tiers") || "[]");
    localStorage.setItem("tiers", JSON.stringify([...existingTiers, values]));

    // Navigate back to the tiers page
    navigate(-1);
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
        maxWidth: "800px", // Responsive max width
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
        <Formik
          initialValues={{
            tierName: "",
            triggerAmount: "",
            triggerDuration: "",
            accrualMultiplier: "",
            redemptionLimitOfPurchase: "",
            conversion: "",
            description: "",
            couponProbability: "",
            colour: "#FFFFFF", // Default color
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                Add Tier
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: "grid", gap: 2 }}>
                {/* Tier Name */}
                <FormControl fullWidth>
                  <Field
                    name="tierName"
                    as={TextField}
                    label="Tier Name"
                    variant="outlined"
                  />
                  <ErrorMessage name="tierName" component={FormHelperText} />
                </FormControl>

                {/* Trigger Amount */}
                <FormControl fullWidth>
                  <Field
                    name="triggerAmount"
                    as={TextField}
                    label="Trigger Amount"
                    type="number"
                    variant="outlined"
                  />
                  <ErrorMessage
                    name="triggerAmount"
                    component={FormHelperText}
                  />
                </FormControl>

                {/* Trigger Duration */}
                <FormControl fullWidth>
                  <Field
                    name="triggerDuration"
                    as={TextField}
                    label="Trigger Duration (months)"
                    type="number"
                    variant="outlined"
                  />
                  <ErrorMessage
                    name="triggerDuration"
                    component={FormHelperText}
                  />
                </FormControl>

                {/* Accrual Multiplier */}
                <FormControl fullWidth>
                  <Field
                    name="accrualMultiplier"
                    as={TextField}
                    label="Accrual Multiplier"
                    type="number"
                    variant="outlined"
                  />
                  <ErrorMessage
                    name="accrualMultiplier"
                    component={FormHelperText}
                  />
                </FormControl>

                {/* Redemption Limit */}
                <FormControl fullWidth>
                  <Field
                    name="redemptionLimitOfPurchase"
                    as={TextField}
                    label="Redemption Limit"
                    type="number"
                    variant="outlined"
                  />
                  <ErrorMessage
                    name="redemptionLimitOfPurchase"
                    component={FormHelperText}
                  />
                </FormControl>

                {/* Conversion Rate */}
                <FormControl fullWidth>
                  <Field
                    name="conversion"
                    as={TextField}
                    label="Conversion Rate"
                    type="number"
                    variant="outlined"
                  />
                  <ErrorMessage name="conversion" component={FormHelperText} />
                </FormControl>

                {/* Description */}
                <FormControl fullWidth>
                  <Field
                    name="description"
                    as={TextField}
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={3}
                  />
                  <ErrorMessage
                    name="description"
                    component={FormHelperText}
                  />
                </FormControl>

                {/* Coupon Probability */}
                <FormControl fullWidth>
                  <Field
                    name="couponProbability"
                    as={TextField}
                    label="Coupon Probability (0-1)"
                    type="number"
                    variant="outlined"
                  />
                  <ErrorMessage
                    name="couponProbability"
                    component={FormHelperText}
                  />
                </FormControl>

                {/* Colour Picker */}
                <FormControl fullWidth>
                  <MuiColorInput
                    format="hex"
                    label="Tier Colour"
                    value={values.colour}
                    onChange={(color) => setFieldValue("colour", color)}
                  />
                  <ErrorMessage name="colour" component={FormHelperText} />
                </FormControl>
              </Box>

              {/* Submit Button */}
              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
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
      </Paper>
    </Container>
  );
};

export default AddTier;
