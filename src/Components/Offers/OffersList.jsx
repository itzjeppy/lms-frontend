import React from "react";
import { List, ListItem, ListItemText, ListItemIcon, Switch } from "@mui/material";

const OffersList = ({ offers = [], onStatusToggle }) => {
  if (offers.length === 0) {
    return <p>No offers available.</p>; // Display message when no offers are available
  }

  return (
    <List className="offers-list">
      {offers.map((offer) => (
        <ListItem
          sx={{
            boxShadow: 2,
            backgroundColor: offer.status ? "#bbfccb" : "#fc8e86", // Use boolean directly
            borderRadius: 5,
            marginBottom: 1,
          }}
          key={offer.id} // Use offer.id for keys
          button={true}
          className={`offer-item ${offer.status ? "active" : "inactive"}`}
        >
          <div className="offer-image">
            {offer.image && (
              <img
                style={{ width: "100px", height: "100px" }}
                src={`data:image/${offer.imageType};base64,${offer.imageUrl}`}
                alt={offer.offerTitle}
              />
            )}
          </div>
          <ListItemIcon>
            {/* Icon can be placed here */}
          </ListItemIcon>
          <ListItemText
            primary={offer.offerTitle}
            secondary={
              <>
                <p className="offer-description">{offer.offerDescription}</p>
                <p className="offer-benefit">Benefit: {offer.benefit}%</p>
              </>
            }
          />
          <div className="offer-status">
            <Switch
              className="status-toggle"
              checked={offer.status} // Set checked based on boolean status
              onChange={(e) => {
                e.stopPropagation(); // Stop propagation to prevent ListItem from triggering
                onStatusToggle(offer.tier_id); // Call the toggle function
              }}
            />
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default OffersList;
