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
  Paper,
  Divider,
} from "@mui/material";
import { Container } from "@mui/system";

const schema = Yup.object().shape({
  tier_id: Yup.string().required("Tier ID is required"),
  offerTitle: Yup.string().required("Offer title is required"),
  offerDescription: Yup.string().required("Offer description is required"),
  image: Yup.mixed().required("Image is required"),
  benefit: Yup.number().required("Benefit is required"),
  status: Yup.boolean().required("Status is required"),
});

const AddOffers = () => {
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result;
      const imageType = values.image.type;
      const base64Image = imageData.split(",")[1];

      // Get the existing offers from local storage
      const existingOffers = localStorage.getItem("offers");
      const offers = existingOffers ? JSON.parse(existingOffers) : [];

      // Add the new offer to the list
      offers.push({
        ...values,
        image: {
          type: imageType,
          base64: base64Image,
        },
      });

      // Save the updated list to local storage
      localStorage.setItem("offers", JSON.stringify(offers));

      // Navigate back to the offers page
      navigate("/offers");
    };
    reader.readAsDataURL(values.image);
  };

  return (
    <Container
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      paddingRight: '100px',
      p: 3,
      bgcolor: "#f9f9f9", // Light background
      borderRadius: 2,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow
      width: "100vw"
    }}
    >
    <Formik
      initialValues={{
        tier_id: "",
        offerTitle: "",
        offerDescription: "",
        image: "",
        benefit: 0,
        status: false,
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <Typography variant="h3">
            Add Offer
          </Typography>
          <Divider/>
          <Box mb={2}>
            <FormControl fullWidth error={!!ErrorMessage.tier_id}>
              <Field
                name="tier_id"
                as={TextField}
                label="Tier ID"
                variant="outlined"
              />
              <ErrorMessage name="tier_id">
                {(msg) => <FormHelperText>{msg}</FormHelperText>}
              </ErrorMessage>
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth error={!!ErrorMessage.offerTitle}>
              <Field
                name="offerTitle"
                as={TextField}
                label="Offer Title"
                variant="outlined"
              />
              <ErrorMessage name="offerTitle">
                {(msg) => <FormHelperText>{msg}</FormHelperText>}
              </ErrorMessage>
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth error={!!ErrorMessage.offerDescription}>
              <Field
                name="offerDescription"
                as={TextField}
                label="Offer Description"
                variant="outlined"
                multiline
                rows={4}
              />
              <ErrorMessage name="offerDescription">
                {(msg) => <FormHelperText>{msg}</FormHelperText>}
              </ErrorMessage>
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth error={!!ErrorMessage.image}>
              <input
                type="file"
                name="image"
                accept=".jpg, .png"
                onChange={(event) =>
                  setFieldValue("image", event.target.files[0])
                }
              />
              <ErrorMessage name="image">
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
          <Box mb ={2}>
            <FormControl error={!!ErrorMessage.status}>
              <Field
                name="status"
                as={Checkbox}
                color="primary"
              />
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
        </Form>
      )}
    </Formik>
    </Container>
  );
};

export default AddOffers;