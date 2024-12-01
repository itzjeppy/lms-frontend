import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#634E94", // Navbar color
      contrastText: "#ECEFF5", // Navbar text color
    },
    secondary: {
      main: "#7F69B3", // Sidebar color
      contrastText: "#ECEFF5", // Sidebar text color`
    },
    background: {
      default: "#D0D8E8", // Background color
    },
    text: {
      primary: "#293251", // Main text in content area
      secondary: "#555F80", // Subtitle text in content area
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          zIndex: 1301, // Higher than Drawer (default is 1100)
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#7F69B3",
          color: "#ECEFF5", // Sidebar text color
        },
      },
    },
  },
});

export default theme;
