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
          key={offer.id} // Use offer.id for keys
          button={true}
          className={`offer-item ${offer.status ? "active" : "inactive"}`}
        >
          <div className="offer-image">
            {offer.image && (
              <img
                style={{ width: "100px", height: "100px" }}
                src={`data:image/${offer.image.type};base64,${offer.image.base64}`}
                alt={offer.offerTitle}
              />
            )}
          </div> {/* Closing tag for the div wrapping the image */}
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
              onToggle={(e) => {
                e.stopPropagation(); // Stop propagation to prevent ListItem from triggering
                onStatusToggle(offer.tier_id);
              }}
            >
              {offer.status ? "Active" : "Inactive"}
            </Switch>
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default OffersList;