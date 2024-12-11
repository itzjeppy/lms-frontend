import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { Container } from "@mui/system";
import OfferService from "../Services/OfferService";

const schema = Yup.object().shape({
  tierId: Yup.string().required("Tier ID is required"),
  offerTitle: Yup.string().required("Offer title is required"),
  offerDescription: Yup.string().required("Offer description is required"),
  image: Yup.mixed().required("Image is required"),
  benefit: Yup.number().required("Benefit is required"),
  status: Yup.boolean().required("Status is required"),
});

const AddOffers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { programId } = location.state ; // Access the programId from the state

  const handleSubmit = (values) => {
    const {image,...value}=values
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result;
      const imageType = values.image.type;
      const base64Image = imageData.split(",")[1];

      const offer = {
        ...value,
        //imageType: imageType,
        //imageUrl: base64Image,
        programId: programId, 
      };

      console.log("Submitting new offer:", offer);

      OfferService.createOffers(offer)
        .then((response) => {
          console.log("Created offers:", response.data);
          navigate(-1);
        })
        .catch((error) => {
          console.error("Error creating offers", error);
        });
    };

    reader.readAsDataURL(values.image);
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
      }}
    >
      <Formik
        initialValues={{
          tierId: "",
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
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "#4A4A4A",
              }}
            >
              Add Offer
            </Typography>
            <Divider />
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                bgcolor: "#ffffff",
                p: 2,
                borderRadius: 2,
                boxShadow: "0 1px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Box mb={2}>
                <FormControl fullWidth error={!!ErrorMessage.tierId}>
                  <Field
                    name="tierId"
                    as={TextField}
                    label="Tier ID"
                    variant="outlined"
                  />
                  <ErrorMessage name="tierId">
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

export default AddOffers;
