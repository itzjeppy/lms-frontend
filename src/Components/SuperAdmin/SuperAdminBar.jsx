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
  Popper,
  Paper,
  Button,
  ClickAwayListener,
} from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { People, Block, Menu, AddTask } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Logo from "../../Icons/Logo";

const drawerWidth = 240;
const collapsedWidth = 60; // Width for the icon-only drawer
const appBarHeight = 64;

const SuperAdminBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setOpen(!open);
    }
  };

  const handleProfileClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const openPopper = Boolean(anchorEl);
  const id = openPopper ? "simple-popper" : undefined;

  const drawerContent = (
    <Box>
      <List>
        <ListItem 
          button 
          component={Link} 
          to="allPartners" 
          sx={{ justifyContent: open ? "initial" : "center" }}
        >
          <ListItemIcon sx={{ justifyContent: 'center', minWidth: 0 }}>
            <People sx={{ color: "#ECEFF5" }} />
          </ListItemIcon>
          <ListItemText 
            primary="Our Partners" 
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
          to="newPartners" 
          sx={{ justifyContent: open ? "initial" : "center" }}
        >
          <ListItemIcon sx={{ justifyContent: 'center', minWidth: 0 }}>
            <AddTask sx={{ color: "#ECEFF5" }} />
          </ListItemIcon>
          <ListItemText 
            primary="New Partners" 
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
          to="disabledPartners" 
          sx={{ justifyContent: open ? "initial" : "center" }}
        >
          <ListItemIcon sx={{ justifyContent: 'center', minWidth: 0 }}>
            <Block sx={{ color: "#ECEFF5" }} />
          </ListItemIcon>
          <ListItemText 
            primary="Disabled Partners" 
            sx={{ 
              color: "#ECEFF5", 
              opacity: open ? 1 : 0, 
              transition: 'opacity 0.3s ease-in-out' 
            }} 
          />
        </ListItem>

        <Divider />
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
          <IconButton onClick={handleProfileClick}>
            <Avatar alt="Profile" src="/profile.jpg" />
          </IconButton>
          <Popper id={id} open={openPopper} anchorEl={anchorEl} placement="bottom-end">
            <ClickAwayListener onClickAway={handleClickAway}>
              <Paper sx={{ p: 1 }}>
                <Button variant="contained" color="error" onClick={handleLogout} fullWidth>
                  LOGOUT
                </Button>
              </Paper>
            </ClickAwayListener>
          </Popper>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : open}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
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
          marginTop: `${appBarHeight}px`,
          backgroundImage: "url('/final.png')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default SuperAdminBar;
