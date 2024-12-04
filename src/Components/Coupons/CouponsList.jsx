import React from "react";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Switch from "@mui/material/Switch";

const CouponsList = ({ coupons = [], onStatusToggle }) => {
  if (coupons.length === 0) {
    return <p>No coupons available.</p>;
  }

  return (
    <List
      className="coupons-list"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {coupons.map((coupon, index) => (
        <ListItem
          key={index}
          style={{
            width: "250px",
            height: "250px",
            margin: "10px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`, // Generate a random background color
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 style={{ fontWeight: "bold", marginRight: "20px" }}>
              {coupon.couponTitle}
            </h1>
            <Switch
              checked={coupon.status}
              onChange={(event) => onStatusToggle(coupon.coupon_id)}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                padding: "10px",
                background: "gray",
                borderRadius: "30%",
                width: "45%",
              }}
            >
              <p>Validity: {coupon.validity}</p>
              <p>{coupon.couponDescription}</p>
            </div>
            <div
              style={{
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
                borderRadius: "30%",
                width: "45%",
                background: "white",
              }}
            >
              <p>Benefits: {coupon.benefit}%</p>
            </div>
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default CouponsList;
