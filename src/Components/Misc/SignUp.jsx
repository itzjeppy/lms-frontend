import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Card,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { MuiTelInput } from "mui-tel-input";
import { useNavigate } from "react-router-dom";
import LandingBar from "./LandingBar";
 
const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: theme.spacing(4),
  padding: theme.spacing(4),
  maxWidth: "1200px",
  margin: "auto",
}));
 
const StyledCard = styled(Card)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
}));
 
const FormSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));
 
const SocialSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(3),
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
  const navigate = useNavigate();
 
  const validateInputs = () => {
    return email && password.length >= 6 && name && contactNumber.length >= 10;
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateInputs()) return;
    navigate("/signIn");
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
      <br/>
      <br/>
    <Box >
      {/* Navbar */}
      <LandingBar />
      {/* Content Container */}
 
     
      <StyledContainer sx={{height: "40%",width: "50%"}}>
       
        {/* Left Card: Sign-up Form */}
        <StyledCard>
 
       
          <Typography variant="h4" gutterBottom>
           
          <center><img
          src="/final.png"
          alt="Logo"
          style={{ height: "30%", width: "40%" }}
        /></center>
          </Typography>
          <Typography variant="h4" gutterBottom>
           
            Sign up
            <br/>
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
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
              sx={{ mt: 2 }}
            >
              Sign up
            </Button>
           
          </Box>
 
          <Typography>
              Already have an account?{" "}
              <Link href="/signIn">Sign in</Link>
            </Typography>
        </StyledCard>
      </StyledContainer>
    </Box>
    </div>
   
  );
};
 
export default SignUp;