import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import Layout from "../../lms-frontend/src/Components/Common/Layout.jsx"; // Ensure this path is correct
import AppRoutes from "./Components/Utils/AppRoutes";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <AppRoutes/>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
