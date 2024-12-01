import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#634E94",
        zIndex: (theme) => theme.zIndex.drawer + 1, // Ensures it stays above the sidebar
      }}
    >
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          GRAVITI 
        </Typography>
        <IconButton>
          <Avatar alt="Profile" src="/profile.jpg" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
