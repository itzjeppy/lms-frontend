import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Container,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import UserService from "../Services/UserService";
import TierService from "../Services/TierService";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tiers, setTiers] = useState([]);
  const partnerId = localStorage.getItem('partnerId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTiers = async () => {
      try {
        const response = await TierService.getTiersByPartnerId(partnerId);
        setTiers(response.data); // Assuming response.data is an array of tier objects
      } catch (error) {
        console.error("Error fetching tiers:", error);
      }
    };

    fetchTiers();
  }, [partnerId]);

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    const userData = {
      ...values,
      partnerId: partnerId  // Ensure this is not null or undefined
    };
  
    console.log("Submitting User Data:", userData); // Check the data being submitted
  
    UserService.createUser(userData)
      .then((response) => {
        console.log("User created successfully:", response.data);
        // Navigate to user list page or display success message
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
        navigate(-1);
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
            tiers: "",
            totalPoints: "",
            tierSetDate: "",
            expiry: "",
          }}
          validationSchema={Yup.object().shape({
            userId: Yup.number().required("User ID is required"),
            tiers: Yup.string().required("Tiers is required"),
            totalPoints: Yup.number().required("Total Points is required"),
            tierSetDate: Yup.date().required("Tier Set Date is required"),
            expiry: Yup.date().required("Expiry is required"),
          })}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur }) => (
            <Form>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Field
                  name="userId"
                  as={TextField}
                  label="User ID"
                  fullWidth
                  variant="outlined"
                />
                <FormControl fullWidth>
                  <InputLabel id="tier-select-label">Tier Name</InputLabel>
                  <Field
                    name="tiers"
                    as={Select}
                    labelId="tier-select-label"
                    label="Tier Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {tiers.map((tier) => (
                      <MenuItem key={tier.tierId} value={tier.tierName}>
                        {tier.tierName}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
                <Field
                  name="totalPoints"
                  as={TextField}
                  label="Total Points"
                  type="number"
                  fullWidth
                  variant="outlined"
                />
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Field
                    name="tierSetDate"
                    as={TextField}
                    label="Tier Set Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    sx={{ flex: 1 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Field
                    name="expiry"
                    as={TextField}
                    label="Expiry"
                    type="date"
                    variant="outlined"
                    fullWidth
                    sx={{ flex: 1 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                  {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
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
