import React from "react";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const OffersList = ({ offers = [], onStatusToggle }) => {
  if (offers.length === 0) {
    return <p>No offers available.</p>; // Display message when no offers are available
  }

  return (
    <List className="offers-list">
      {offers.map((offer) => (
        <ListItem
          key={offer.id} // Use offer.id for keys
          component={RouterLink}
          to={`/some-path/${offer.id}`}
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
            <button
              className="status-toggle"
              onClick={(e) => {
                e.stopPropagation(); // Stop propagation to prevent ListItem from triggering
                onStatusToggle(offer.tier_id);
              }}
            >
              {offer.status ? "Active" : "Inactive"}
            </button>
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default OffersList;
