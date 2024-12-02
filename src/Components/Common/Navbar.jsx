import React from "react"; 
import { AppBar, Toolbar, Typography, IconButton, Avatar, SvgIcon, Box } from "@mui/material"; 
import Logo from '../../Icons/Logo'

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
        <Logo/>
        <Box flexGrow={1} /> {/* This Box pushes all content to the right */}
        <IconButton> 
          <Avatar alt="Profile" src="/profile.jpg" /> 
        </IconButton> 
      </Toolbar> 
    </AppBar> 
  ); 
}; 

export default Navbar; 
