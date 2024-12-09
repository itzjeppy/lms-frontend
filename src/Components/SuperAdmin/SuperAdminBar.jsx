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

const SuperAdminBar = () => {
  const drawerWidth = 240;
  const appBarHeight = 64;
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
        <ListItem button component={Link} to="allPartners">
          <ListItemIcon>
            <People sx={{ color: "#ECEFF5" }} />
          </ListItemIcon>
          <ListItemText primary="Partner Management" sx={{ color: "#ECEFF5" }} />
        </ListItem>
        <ListItem button component={Link} to="newPartners">
          <ListItemIcon>
            <AddTask sx={{ color: "#ECEFF5" }} />
          </ListItemIcon>
          <ListItemText primary="New Partners" sx={{ color: "#ECEFF5" }} />
        </ListItem>
        <ListItem button component={Link} to="disabledPartners">
          <ListItemIcon>
            <Block sx={{ color: "#ECEFF5" }} />
          </ListItemIcon>
          <ListItemText primary="Disabled Partners" sx={{ color: "#ECEFF5" }} />
        </ListItem>
        <Divider />
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
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

      <Box
        sx={{
          display: "flex",
          flex: 1,
          marginTop: `${appBarHeight}px`,
        }}
      >
        <Drawer
          variant={isMobile ? "temporary" : "persistent"}
          open={isMobile ? mobileOpen : open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
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

        <Box
          sx={{
            flexGrow: 1,
            marginLeft: isMobile || !open ? `${-drawerWidth}px` : 0,
            overflow: "auto",
            backgroundColor: "#D0D8E8",
            p: 1,
            transition: theme.transitions.create(["margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            backgroundImage: "url('/final.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default SuperAdminBar;
