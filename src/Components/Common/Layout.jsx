import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar, SvgIcon, Box, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Container, Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { Home, LocalOffer, Sell, Mail, ConfirmationNumber, Menu } from "@mui/icons-material";
import Logo from '../../Icons/Logo';

const Layout = () => {
  const drawerWidth = 240;
  const appBarHeight = 64; // Adjust this value as needed based on your AppBar's height
  const [open, setOpen] = useState(false); // State to manage Drawer open/close

  const handleDrawerToggle = () => {
    setOpen(!open); // Toggle the state to open/close the Drawer
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#634E94",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          height: `${appBarHeight}px`, // Ensure AppBar has a fixed height
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
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

      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            backgroundColor: "#7F69B3",
            color: "#ECEFF5",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginTop: `${appBarHeight}px`,
          },
        }}
      >
        <Box>
          <List>
            <ListItem button component={Link} to="/tiers">
              <ListItemIcon>
                <Home sx={{ color: "#ECEFF5" }} />
              </ListItemIcon>
              <ListItemText sx={{ color: "#ECEFF5" }} primary="Your Tiers" />
            </ListItem>
            <ListItem button component={Link} to="/offers">
              <ListItemIcon>
                <LocalOffer sx={{ color: "#ECEFF5" }} />
              </ListItemIcon>
              <ListItemText sx={{ color: "#ECEFF5" }} primary="Your Offers" />
            </ListItem>
            <ListItem button component={Link} to="/coupons">
              <ListItemIcon>
                <ConfirmationNumber sx={{ color: "#ECEFF5" }} />
              </ListItemIcon>
              <ListItemText sx={{ color: "#ECEFF5" }} primary="Your Coupons" />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to="/contact">
              <ListItemIcon>
                <Mail sx={{ color: "#ECEFF5" }} />
              </ListItemIcon>
              <ListItemText sx={{ color: "#ECEFF5" }} primary="Contact Us" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Container sx={{
    marginLeft: open ? `${drawerWidth}px` : 0,
    padding: 3,
    marginTop: `${appBarHeight}px`,
    transition: theme => theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  })
}}>
  <Container>
    <Outlet /> {/* This renders the selected component based on the sidebar link clicked */}
    </Container>
    </Container>
    </>
  );
};

export default Layout;
