import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Avatar, Box, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { Home, LocalOffer, Mail, ConfirmationNumber, Menu } from "@mui/icons-material";
import Logo from '../../Icons/Logo';

const Layout = () => {
  const drawerWidth = 240;
  const appBarHeight = 64;
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#634E94",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          height: `${appBarHeight}px`
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

      <Container sx={{ marginLeft: open ? `${drawerWidth}px` : 0, padding: 3, marginTop: `${appBarHeight}px`, transition: theme => theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }) }}>
      </Container>
    </>
  );
};

export default Layout;
