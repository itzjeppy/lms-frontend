import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Card,
  Alert,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { MuiTelInput } from "mui-tel-input";
import { useNavigate } from "react-router-dom";
import LandingBar from "./LandingBar";
import PartnerService from "../Services/PartnerService";

const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#F3F4F6",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: "450px",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
}));

const FormSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(4),
}));

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateInputs = () => {
    const isEmailValid = email.includes("@") && email.includes(".");
    const isPasswordValid = password.length >= 6;
    const isContactValid = contactNumber.length >= 10;
    return name && isEmailValid && isPasswordValid && isContactValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const partner = {
      partnerName: name,
      email,
      password,
      contact: contactNumber.replace(/\s+/g, ""),
      countryCode,
    };

    PartnerService.registerPartner(partner)
      .then((response) => {
        console.log("Sign up successful:", response.data);
        navigate("/signIn");
      })
      .catch((error) => {
        console.error("Error in signing up", error);
        setError("Sign up failed. Please try again.");
      });
  };

  const handleTelChange = (value) => {
    const spaceIndex = value.indexOf(" ");
    if (spaceIndex !== -1) {
      const code = value.substring(0, spaceIndex);
      const number = value.substring(spaceIndex + 1);
      setCountryCode(code);
      setContactNumber(number);
    } else {
      setContactNumber(value);
    }
  };

  return (
    <div>
      <LandingBar />
      <StyledContainer sx={{display: "flex", justifyContent:"center", alignContent: "center", marginTop:"30px"}}>
        <StyledCard>
          <LogoContainer>
            <img 
              src="/final.png" 
              alt="Logo" 
              style={{ height: "80px", width: "auto" }} 
            />
          </LogoContainer>

          <Typography 
            variant="h4" 
            sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
          >
            Sign Up
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <FormSection>
              <FormControl fullWidth>
                <FormLabel>Full Name</FormLabel>
                <TextField
                  variant="outlined"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel>Email</FormLabel>
                <TextField
                  variant="outlined"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel>Password</FormLabel>
                <TextField
                  type="password"
                  variant="outlined"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  helperText={password && password.length < 6 ? "Password must be at least 6 characters" : ""}
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel>Contact Number</FormLabel>
                <MuiTelInput
                  fullWidth
                  value={`${countryCode} ${contactNumber}`}
                  onChange={handleTelChange}
                  required
                />
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 2, 
                  borderRadius: "20px", 
                  height: "48px", 
                  fontWeight: "bold",
                }}
                disabled={!validateInputs()}
              >
                Sign up
              </Button>

              <Typography 
                variant="body2" 
                sx={{ textAlign: "center", mt: 2 }}
              >
                Already have an account?{" "}
                <Link href="/signIn" sx={{ color: "primary.main", fontWeight: "bold" }}>
                  Sign in
                </Link>
              </Typography>
            </FormSection>
          </Box>
        </StyledCard>
      </StyledContainer>
    </div>
  );
};

export default SignUp;
