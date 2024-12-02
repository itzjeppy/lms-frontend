import React from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Box, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { Home, LocalOffer, Sell, Mail, ConfirmationNumber } from "@mui/icons-material";

const Sidebar = ({ appBarHeight }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          marginTop: `${appBarHeight}px`, // Offset the drawer to be below the Navbar
          backgroundColor: "#7F69B3",
          color: "#ECEFF5",
          boxSizing: "border-box",
          display: "flex", // Ensures proper layout
          flexDirection: "column", // Stack items vertically
          justifyContent: "space-between", // Distribute space between sections
        },
      }}
    >
      <Box>
        {/* Top Section of Sidebar */}
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
        </List>
      </Box>
      <Box>
        {/* Divider and Contact Us Section */}
        <Divider />
        <List>
          <ListItem button component={Link} to="/contact">
            <ListItemIcon>
              <Mail sx={{ color: "#ECEFF5" }} />
            </ListItemIcon>
            <ListItemText primary="Contact Us" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
