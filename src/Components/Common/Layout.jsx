import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { Home, LocalOffer, ConfirmationNumber, Mail, Menu } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Logo from '../../Icons/Logo';

const Layout = () => {
  const drawerWidth = 240;
  const appBarHeight = 64; // Height of the AppBar
  const [mobileOpen, setMobileOpen] = useState(false); // State to toggle mobile drawer
  const [open, setOpen] = useState(true); // Persistent drawer state for desktop

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Check if screen is mobile

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen); // Toggle mobile drawer
    } else {
      setOpen(!open); // Toggle persistent drawer
    }
  };

  const drawerContent = (
    <Box>
      <List>
        <ListItem button component={Link} to="./tiers">
          <ListItemIcon><Home sx={{ color: "#ECEFF5" }} /></ListItemIcon>
          <ListItemText primary="Your Tiers" sx={{ color: "#ECEFF5" }} />
        </ListItem>
        <ListItem button component={Link} to="./offers">
          <ListItemIcon><LocalOffer sx={{ color: "#ECEFF5" }} /></ListItemIcon>
          <ListItemText primary="Your Offers" sx={{ color: "#ECEFF5" }} />
        </ListItem>
        <ListItem button component={Link} to="./coupons">
          <ListItemIcon><ConfirmationNumber sx={{ color: "#ECEFF5" }} /></ListItemIcon>
          <ListItemText primary="Your Coupons" sx={{ color: "#ECEFF5" }} />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="./contact">
          <ListItemIcon><Mail sx={{ color: "#ECEFF5" }} /></ListItemIcon>
          <ListItemText primary="Contact Us" sx={{ color: "#ECEFF5" }} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Ensure the layout fills the viewport
      }}
    >
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#634E94",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            aria-label="open drawer"
            onClick={handleDrawerToggle} // Toggle Drawer
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Logo />
          <Box flexGrow={1} />
          <IconButton>
            <Avatar alt="Profile" src="/profile.jpg" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          flex: 1, // Allow the content to grow and fill the remaining space
          marginTop: `${appBarHeight}px`,
        }}
      >
        {/* Drawer (Responsive) */}
        <Drawer
          variant={isMobile ? "temporary" : "persistent"}
          open={isMobile ? mobileOpen : open} // Use mobileOpen for temporary mode
          onClose={handleDrawerToggle} // Close the drawer in mobile view
          ModalProps={{
            keepMounted: true, // Improve performance on mobile
          }}
          sx={{
            width: isMobile ? "auto" : drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              backgroundColor: "#7F69B3",
              color: "#ECEFF5",
              boxSizing: "border-box",
              marginTop: isMobile ? `${appBarHeight - 10}px` : `${appBarHeight}px`,
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1, // Fill remaining space
            marginLeft: isMobile || !open ? `${-drawerWidth}px` : 0, // Adjust margin dynamically
            overflow: "auto", // Enable scrolling for content
            backgroundColor: "#D0D8E8", // Matches background color
            p: 1, // Add padding around content
            transition: theme.transitions.create(["margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
