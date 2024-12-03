import React from "react";
import { BrowserRouter} from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import AppRoutes from "./Components/Utils/AppRoutes";
const App = () => {
  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter >
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
};
 
export default App;