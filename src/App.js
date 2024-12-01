import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, Box, ThemeProvider } from "@mui/material";
import theme from "./theme";
import Navbar from "../../lms-frontend/src/Components/Navbar.jsx";
import Sidebar from "../../lms-frontend/src/Components/Sidebar.jsx";

const App = () => {
  const appBarHeight = 64; // Define a height for the Navbar (default for Material-UI AppBar)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        {/* Main Content Wrapper */}
        <Box sx={{ display: "flex" }}>
          {/* Sidebar */}
          <Sidebar appBarHeight={appBarHeight} />
          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              marginTop: `${appBarHeight}px`, // Offset to account for the Navbar height
              backgroundColor: theme.palette.background.default,
            }}
          >
            {/* Add your page components here */}
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
