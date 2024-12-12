import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams, useLocation } from "react-router-dom";
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
import ProgramService from "../Services/ProgramService";
import { format } from "date-fns";

const schema = Yup.object().shape({
  programName: Yup.string().required("Program Name is required"),
  startDate: Yup.date().required("Start Date is required"),
  endDate: Yup.date()
    .required("End Date is required")
    .min(Yup.ref("startDate"), "End Date must be after Start Date"),
  status: Yup.boolean().required("Program Status is required"),
});

const EditProgram = ({ handleEdit }) => {
  const { programId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [initialValues, setInitialValues] = useState({
    programName: "",
    startDate: "",
    endDate: "",
    status: false,
  });
  const [formValues, setFormValues] = useState(initialValues);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const programToEdit = location.state?.program;
    if (programToEdit) {
      const formattedStartDate = format(
        new Date(programToEdit.startDate),
        "yyyy-MM-dd"
      );
      const formattedEndDate = format(
        new Date(programToEdit.endDate),
        "yyyy-MM-dd"
      );

      setInitialValues({
        ...programToEdit,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
      setFormValues({
        ...programToEdit,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
      setLoading(false);
    } else {
      const fetchPrograms = async () => {
        try {
          const response = await ProgramService.getAllPrograms();
          const program = response.data.find(
            (program) => program.ProgramId === parseInt(programId, 10)
          );
          if (program) {
            const formattedStartDate = format(
              new Date(program.startDate),
              "yyyy-MM-dd"
            );
            const formattedEndDate = format(
              new Date(program.endDate),
              "yyyy-MM-dd"
            );

            setInitialValues({
              ...program,
              startDate: formattedStartDate,
              endDate: formattedEndDate,
            });
            setFormValues({
              ...program,
              startDate: formattedStartDate,
              endDate: formattedEndDate,
            });
          } else {
            console.error("Program not found!");
          }
        } catch (error) {
          console.error("Error fetching programs:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPrograms();
    }
  }, [programId, location.state]);

  const handleSubmit = (values) => {
    console.log("Form values before submission:", values);

    const { coupons, offers, startDate, endDate, ...progValues } = values;
    const formattedStartDate = format(
      new Date(values.startDate),
      "yyyy-MM-dd HH:mm:ss.SSS"
    );
    const formattedEndDate = format(
      new Date(values.endDate),
      "yyyy-MM-dd HH:mm:ss.SSS"
    );
    const partner = localStorage.getItem('partnerId');
    const newValue = {
      partnerId: partner,
      ...progValues,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    console.log("Payload to update program:", newValue);

    ProgramService.updateProgram(newValue)
      .then((response) => {
        console.log("Update response:", response);
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error updating program:", error);
        alert("Failed to update program: " + error.response.data.detail);
      });
  };

  if (loading) {
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
          initialValues={formValues}
          validationSchema={schema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                Edit Program
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: "grid", gap: 2 }}>
                <FormControl fullWidth>
                  <Field
                    name="programName"
                    as={TextField}
                    label="Program Name"
                    variant="outlined"
                    placeholder={initialValues.programName}
                    value={values.programName}
                    onChange={(e) => setFieldValue("programName", e.target.value)}
                  />
                  <ErrorMessage name="programName" component={FormHelperText} />
                </FormControl>

                <FormControl fullWidth>
                  <Field
                    name="startDate"
                    as={TextField}
                    label="Start Date"
                    type="date"
                    variant="outlined"
                    value={values.startDate}
                    onChange={(e) => setFieldValue("startDate", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                  <ErrorMessage name="startDate" component={FormHelperText} />
                </FormControl>

                <FormControl fullWidth>
                  <Field
                    name="endDate"
                    as={TextField}
                    label="End Date"
                    type="date"
                    variant="outlined"
                    value={values.endDate}
                    onChange={(e) => setFieldValue("endDate", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                  <ErrorMessage name="endDate" component={FormHelperText} />
                </FormControl>

                <FormControlLabel
                  control={
                    <Switch
                      checked={values.status}
                      onChange={(e) => setFieldValue("status", e.target.checked)}
                    />
                  }
                  label="Active"
                  sx={{ justifyContent: "flex-start" }}
                />
              </Box>

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
