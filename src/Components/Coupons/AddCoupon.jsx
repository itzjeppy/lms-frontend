import React, { useState, useEffect } from "react";
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
  Paper,
  Divider,
  MenuItem,
  Tooltip,
  Container,
} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const schema = Yup.object().shape({
  couponTitle: Yup.string().required("Coupon title is required"),
  couponDescription: Yup.string().required("Coupon description is required"),
  tierId: Yup.string().required("Tier is required"), 
  validity: Yup.number().required("Validity is required"),
  benefit: Yup.number().required("Benefit is required"),
  status: Yup.boolean(),
});

const AddCoupons = () => {
  const navigate = useNavigate();
  const [tiers, setTiers] = useState([]);

  useEffect(() => {
    const storedTiers = localStorage.getItem("tiers");
    if (storedTiers) {
      setTiers(JSON.parse(storedTiers));
    }
  }, []);

  const handleSubmit = (values) => {
    const existingCoupons = localStorage.getItem("coupons");
    const coupons = existingCoupons ? JSON.parse(existingCoupons) : [];
    coupons.push(values);
    localStorage.setItem("coupons", JSON.stringify(coupons));
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
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <Paper
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ fontWeight: "bold", mb: 2, textAlign: 'center' }}
        >
          Add New Coupon
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Formik
          initialValues={{
            couponTitle: "",
            couponDescription: "",
            tierId: "",
            validity: 0,
            benefit: 0,
            status: false,
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <Typography variant="h6" sx={{ mb: 2 }}>
                📄 **Coupon Details**
              </Typography>

              <Box sx={{ display: "grid", gap: 2 }}>
                <FormControl fullWidth>
                  <Field
                    name="couponTitle"
                    as={TextField}
                    label="Coupon Title"
                    variant="outlined"
                    placeholder="Enter coupon title (e.g., 10% Off)"
                  />
                  <ErrorMessage name="couponTitle" component={FormHelperText} />
                </FormControl>

                <FormControl fullWidth>
                  <Field
                    name="couponDescription"
                    as={TextField}
                    label="Coupon Description"
                    variant="outlined"
                    multiline
                    rows={3}
                    placeholder="Provide a brief description of the coupon"
                  />
                  <ErrorMessage name="couponDescription" component={FormHelperText} />
                </FormControl>

                <FormControl fullWidth>
                  <Field
                    name="tierId"
                    as={TextField}
                    select
                    label="Select Tier"
                    variant="outlined"
                    onChange={(event) => setFieldValue("tierId", event.target.value)}
                  >
                    {tiers.length > 0 ? (
                      tiers.map((tier) => (
                        <MenuItem key={tier.id} value={tier.id}>
                          {tier.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No tiers available</MenuItem>
                    )}
                  </Field>
                  <ErrorMessage name="tierId" component={FormHelperText} />
                </FormControl>

                <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                  ⚙️ **Coupon Settings**
                </Typography>

                <FormControl fullWidth>
                  <Field
                    name="validity"
                    as={TextField}
                    label="Validity (in days)"
                    type="number"
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <Tooltip title="How long the coupon is valid for">
                          <CalendarTodayIcon />
                        </Tooltip>
                      ),
                    }}
                  />
                  <ErrorMessage name="validity" component={FormHelperText} />
                </FormControl>

                <FormControl fullWidth>
                  <Field
                    name="benefit"
                    as={TextField}
                    label="Benefit Amount"
                    type="number"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <AttachMoneyIcon color="primary" />
                      ),
                    }}
                  />
                  <ErrorMessage name="benefit" component={FormHelperText} />
                </FormControl>

                <FormControl>
                  <FormControlLabel
                    control={<Field name="status" as={Checkbox} color="primary" />}
                    label="Activate Coupon"
                  />
                </FormControl>
              </Box>

              <Box 
                sx={{ 
                  mt: 4, 
                  display: "flex", 
                  justifyContent: "flex-end" 
                }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{
                    fontWeight: "bold",
                    textTransform: "none",
                    py: 1.5,
                    px: 4,
                  }}
                >
                  Add Coupon
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default AddCoupons;
