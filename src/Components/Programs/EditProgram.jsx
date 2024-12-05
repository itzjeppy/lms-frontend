import React, { useEffect, useState } from "react";
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
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Container } from "@mui/system";

// Validation Schema
const schema = Yup.object().shape({
  programName: Yup.string().required("Program Name is required"),
  startDate: Yup.date().required("Start Date is required"),
  endDate: Yup.date()
    .required("End Date is required")
    .min(Yup.ref("startDate"), "End Date must be after Start Date"),
  isActive: Yup.boolean().required("Program Status is required"),
});

const EditProgram = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const programs = JSON.parse(localStorage.getItem("programs") || "[]");
    const programToEdit = programs.find((program) => program.id === parseInt(id, 10));

    if (programToEdit) {
      setInitialValues(programToEdit);
    } else {
      console.error("Program not found!");
      navigate(-1); // Redirect back if not found
    }
  }, [id, navigate]);

  const handleSubmit = (values) => {
    const programs = JSON.parse(localStorage.getItem("programs") || "[]");
    const updatedPrograms = programs.map((program) =>
      program.id === parseInt(id, 10) ? values : program
    );

    localStorage.setItem("programs", JSON.stringify(updatedPrograms));
    navigate(-1); // Navigate back
  };

  if (!initialValues) {
    return <div>Loading...</div>;
  }

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
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                Edit Program
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: "grid", gap: 2 }}>
                {/* Program Name */}
                <FormControl fullWidth>
                  <Field
                    name="programName"
                    as={TextField}
                    label="Program Name"
                    variant="outlined"
                  />
                  <ErrorMessage name="programName" component={FormHelperText} />
                </FormControl>

                {/* Start Date */}
                <FormControl fullWidth>
                  <Field
                    name="startDate"
                    as={TextField}
                    label="Start Date"
                    type="date"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                  <ErrorMessage name="startDate" component={FormHelperText} />
                </FormControl>

                {/* End Date */}
                <FormControl fullWidth>
                  <Field
                    name="endDate"
                    as={TextField}
                    label="End Date"
                    type="date"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                  <ErrorMessage name="endDate" component={FormHelperText} />
                </FormControl>

                {/* Program Status */}
                <FormControlLabel
                  control={
                    <Switch
                      checked={values.isActive}
                      onChange={(e) => setFieldValue("isActive", e.target.checked)}
                    />
                  }
                  label="Active"
                  sx={{ justifyContent: "flex-start" }}
                />
              </Box>

              {/* Submit Button */}
              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                >
                  Save Changes
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default EditProgram;
