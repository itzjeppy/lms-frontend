import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import LandingPage from "./Components/Common/LandingPage";
import Layout from "./Components/Common/Layout";
import SignUp from "./Components/Common/SignUp";
import SignIn from "./Components/Common/SignIn";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/partner" element={<Layout />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
