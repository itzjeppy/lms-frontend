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
import { Home, CalendarToday, Menu, Info, ConfirmationNumber } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Logo from "../../Icons/Logo";

const Layout = () => {
  const drawerWidth = 240; // Full drawer width
  const collapsedWidth = 60; // Collapsed width to show only icons
  const appBarHeight = 64;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setOpen(!open);
    }
  };

  const drawerContent = (
    <Box>
      <List>
        <ListItem 
          button 
          component={Link} 
          to="./tiers" 
          sx={{ justifyContent: open ? 'initial' : 'center' }}
        >
          <ListItemIcon sx={{ justifyContent: 'center', minWidth: 0 }}>
            <Home sx={{ color: "#ECEFF5" }} />
          </ListItemIcon>
          <ListItemText 
            primary="Your Tiers" 
            sx={{ 
              color: "#ECEFF5", 
              opacity: open ? 1 : 0, 
              transition: 'opacity 0.3s ease-in-out' 
            }} 
          />
        </ListItem>
        
        <ListItem 
          button 
          component={Link} 
          to="./programs" 
          sx={{ justifyContent: open ? 'initial' : 'center' }}
        >
          <ListItemIcon sx={{ justifyContent: 'center', minWidth: 0 }}>
            <CalendarToday sx={{ color: "#ECEFF5" }} />
          </ListItemIcon>
          <ListItemText 
            primary="Your Programs" 
            sx={{ 
              color: "#ECEFF5", 
              opacity: open ? 1 : 0, 
              transition: 'opacity 0.3s ease-in-out' 
            }} 
          />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="./coupons" 
          sx={{ justifyContent: open ? 'initial' : 'center' }}
        >
          <ListItemIcon sx={{ justifyContent: 'center', minWidth: 0 }}>
            <ConfirmationNumber sx={{ color: "#ECEFF5" }} />
          </ListItemIcon>
          <ListItemText 
            primary="Your Coupons" 
            sx={{ 
              color: "#ECEFF5", 
              opacity: open ? 1 : 0, 
              transition: 'opacity 0.3s ease-in-out' 
            }} 
          />
        </ListItem>

        <Divider />

        <ListItem 
          button 
          component={Link} 
          to="./contact" 
          sx={{ justifyContent: open ? 'initial' : 'center' }}
        >
          <ListItemIcon sx={{ justifyContent: 'center', minWidth: 0 }}>
            <Info sx={{ color: "#ECEFF5" }} />
          </ListItemIcon>
          <ListItemText 
            primary="About Us" 
            sx={{ 
              color: "#ECEFF5", 
              opacity: open ? 1 : 0, 
              transition: 'opacity 0.3s ease-in-out' 
            }} 
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
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
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <IconButton component={Link} to="/" aria-label="home">
            <Logo />
          </IconButton>
          <Box flexGrow={1} />
          <IconButton>
            <Avatar alt="Profile" src="/profile.jpg" component={Link} to="./profile" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: open ? drawerWidth : collapsedWidth,
            backgroundColor: "#7F69B3",
            color: "#ECEFF5",
            boxSizing: "border-box",
            marginTop: `${appBarHeight}px`,
            transition: theme.transitions.create(["width", "transform"], {
              easing: theme.transitions.easing.easeInOut,
              duration: 400,
            }),
            overflowX: 'hidden'
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          backgroundColor: "#D0D8E8",
          p: 2,
          transition: theme.transitions.create(["margin", "width", "transform","marginLeft","marginTop"], {
            easing: theme.transitions.easing.easeInOut,
            duration: 400,
          }),
          width: `calc(100% - ${open ? drawerWidth : collapsedWidth}px)`,
          marginLeft: '0px',
          marginTop: `${appBarHeight}px`
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
