import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import Layout from "../../lms-frontend/src/Components/Common/Layout.jsx"; // Assuming Layout is stored here

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          {/* Main Content */}
          <Routes>
            {/* Define your routes and components here */}
            {/* Example: <Route path="/" element={<HomePage />} /> */}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
