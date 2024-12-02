import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, IconButton, Avatar, Box, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Container, Paper } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Home, LocalOffer, ConfirmationNumber, Mail, Menu } from "@mui/icons-material";
import Logo from '../../Icons/Logo';
import OffersContent from "../Offers/OffersContent";

const Layout = () => {
  const drawerWidth = 240;
  const appBarHeight = 64; // Height of the AppBar
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/offers');
  }, []);

  return (
    <>
      <AppBar
        position="fixed" // Changed from 'sticky' to 'fixed'
        sx={{
          backgroundColor: "#634E94",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: "100%"
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
            <ListItem button component={Link} to='/offers'>
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
        marginLeft: open ? `${drawerWidth-15}px` : -2,
        paddingTop: 1,
        paddingBottom: 1,
        marginTop: `${appBarHeight}px`, // Added top margin to compensate for the fixed AppBar
        height: `calc(100vh - ${appBarHeight}px)`,
        overflow: 'auto',
        transition: theme => theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        })
      }}>
        <Box sx={{
          width: '100%', // Full width
          height: '100%', // Full height
          p: 0 // No padding, let the child components handle their own padding
        }}>
          <Outlet  sidebarOpen={open} />
        </Box>
      </Container>
    </>
  );
};

export default Layout;
