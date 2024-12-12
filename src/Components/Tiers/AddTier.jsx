import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormHelperText,
  Container,
  Grid2,
  Slider,
  Tooltip,
  CircularProgress
} from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TierService from "../Services/TierService";

// Validation Schema
const schema = Yup.object().shape({
  tierName: Yup.string().required("Tier Name is required"),
  triggerAmount: Yup.number()
    .required("Trigger Amount is required")
    .min(0, "Trigger Amount cannot be negative"),
  triggerDuration: Yup.number()
    .when('isFreeTier', (isFreeTier) => { 
      if (!isFreeTier) {
        return Yup.number()
          .min(1, "Duration must be at least 1 month for non-free tiers")
          .required("Trigger Duration is required");
      } else {
        return Yup.number().notRequired();
      }
    }),
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
    .min(0, "Probability cannot be negative")
    .max(1, "Probability must be 1 or less"),
  colour: Yup.string()
    .required("Colour is required")
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Enter a valid hex color"),
});

const AddTier = () => {
  const navigate = useNavigate();
  const [isFreeTier, setIsFreeTier] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    const existingTiers = JSON.parse(localStorage.getItem("tiers") || "[]");
    const { isFreeTier, ...tierValues } = values;
    const partnerId = localStorage.getItem('partnerId');
    const tier = {
      partner_id: partnerId,
      ...tierValues,
    };

    TierService.createTiers(tier)
      .then((response) => {
        console.log("Created tiers:", response.data);
        localStorage.setItem("tiers", JSON.stringify([...existingTiers, tier]));
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error creating tiers", error);
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
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <Paper
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius : 2,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Formik
          initialValues={{
            tierName: "",
            triggerAmount: isFreeTier ? 0 : "",
            triggerDuration: isFreeTier ? 0 : "",
            accrualMultiplier: "",
            redemptionLimitOfPurchase: "",
            conversion: "",
            description: "",
            couponProbability: 0, // Initialize with 0
            colour: "#FFFFFF",
            isFreeTier,
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form>
              {/* Title Section */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Add New Tier
                </Typography>
                <AddCircleOutlineIcon color="primary" fontSize="large" />
              </Box>

              {/* Free Tier Toggle */}
              <FormControlLabel
                control={
                  <Switch
                    checked={isFreeTier}
                    onChange={(event) => {
                      setIsFreeTier(event.target.checked);
                      setFieldValue("isFreeTier", event.target.checked);
                      setFieldValue("triggerAmount", event.target.checked ? 0 : "");
                      setFieldValue("triggerDuration", event.target.checked ? 0 : "");
                    }}
                    color="primary"
                  />
                }
                label="Is this a Free Tier?"
                sx={{ mb: 3 }}
              />

              {/* Accordion for Form Sections */}
              <Accordion defaultExpanded sx={{ boxShadow:"none"}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Basic Details
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid2 container spacing={2}>
                    <Grid2 item xs={12}>
                      <Field
                        name="tierName"
                        as={TextField}
                        label="Tier Name"
                        fullWidth
                        variant="outlined"
                      />
                      <ErrorMessage name="tierName" component={FormHelperText} />
                    </Grid2>

                    <Grid2 item xs={6}>
                      <Field
                        name="triggerAmount"
                        as={TextField}
                        label="Trigger Amount"
                        type="number"
                        fullWidth
                        variant="outlined"
                        disabled={isFreeTier}
                      />
                      <ErrorMessage name="triggerAmount" component={FormHelperText} />
                    </Grid2>

                    <Grid2 item xs={6}>
                      <Field
                        name="triggerDuration"
                        as={TextField}
                        label="Trigger Duration (months)"
                        type="number"
                        fullWidth
                        variant="outlined"
                        disabled={isFreeTier}
                      />
                      <ErrorMessage
                        name="triggerDuration"
                        component={FormHelperText}
                      />
                    </Grid2>
                  </Grid2>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ boxShadow:"none"}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Rewards and Metrics
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid2 container spacing={2}>
                    <Grid2 item xs={6}>
                      <Field
                        name="accrualMultiplier"
                        as={TextField}
                        label="Accrual Multiplier"
                        type="number"
                        fullWidth
                        variant="outlined"
                      />
                      <ErrorMessage
                        name="accrualMultiplier"
                        component={FormHelperText}
                      />
                    </Grid2>
                    <Grid2 item xs={6}>
                      <Field
                        name="redemptionLimitOfPurchase"
                        as={TextField}
                        label="Redemption Limit"
                        type="number"
                        fullWidth
                        variant="outlined"
                      />
                      <ErrorMessage
                        name="redemptionLimitOfPurchase"
                        component={FormHelperText}
                      />
                    </Grid2>
                    <Grid2 item xs={6}>
                      <Field
                        name="conversion"
                        as={TextField}
                        label="Conversion Rate"
                        type="number"
                        fullWidth
                        variant="outlined"
                      />
                      <ErrorMessage name="conversion" component={FormHelperText} />
                    </Grid2>
                    <Grid2 item xs={6}>
                      <Typography gutterBottom>
                        Coupon Probability (0-1)
                      </Typography>
                      <Slider
                        value={values.couponProbability}
                        onChange={(event, newValue) => {
                          setFieldValue("couponProbability", newValue);
                        }}
                        step={0.01}
                        min={ 0}
                        max={1}
                        valueLabelDisplay="auto"
                        size="large"
                      />
                      <ErrorMessage
                        name="couponProbability"
                        component={FormHelperText}
                      />
                    </Grid2>
                  </Grid2>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ boxShadow:"none"}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Additional Information
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Field
                    name="description"
                    as={TextField}
                    label="Description"
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                  />
                  <ErrorMessage name="description" component={FormHelperText} />

                  <MuiColorInput
                    format="hex"
                    label="Tier Colour"
                    value={values.colour}
                    onChange={(color) => setFieldValue("colour", color)}
                    fullWidth
                    sx={{ mt: 3 }}
                  />
                  <ErrorMessage name="colour" component={FormHelperText} />
                </AccordionDetails>
              </Accordion>

              {/* Submit Button */}
              <Box sx={{ mt: 3, textAlign: "right" }}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ position: 'relative' }}
                >
                  {isSubmitting && <CircularProgress size={24} sx={{ position: 'absolute', left: '50%', top: '50%', marginLeft: '-12px', marginTop: '-12px' }} />}
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