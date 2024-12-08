import React, { useState, useEffect } from "react";
import { List, ListItem } from "@mui/material";
import Switch from "@mui/material/Switch";

const CouponsList = ({ coupons = [], onStatusToggle }) => {
  const [tiers, setTiers] = useState([]);
  const [tierNames, setTierNames] = useState([]);

  useEffect(() => {
    const storedTiers = localStorage.getItem("tiers");
    if (storedTiers) {
      const tiersData = JSON.parse(storedTiers);
      setTiers(tiersData);
      const tierNamesData = tiersData.map((tier) => tier.tierName);
      setTierNames(tierNamesData);
    }
  }, []);

  const getTierColor = (tierName) => {
    const tier = tiers.find((tier) => tier.tierName === tierName);
    console.log(tier);
    return tier ? tier.colour : "#ffffff";
  };
  if (coupons.length === 0) {
    return <p>No coupons available.</p>;
  }

  const darkenColor = (color) => {
    const hexColor = color?.replace("#", "");
    const r = parseInt(hexColor?.substring(0, 2), 16);
    const g = parseInt(hexColor?.substring(2, 4), 16);
    const b = parseInt(hexColor?.substring(4, 6), 16);
    const darkerR = Math.round(r * 0.8);
    const darkerG = Math.round(g * 0.8);
    const darkerB = Math.round(b * 0.8);
    return `#${darkerR.toString(16).padStart(2, "0")}${darkerG
      .toString(16)
      .padStart(2, "0")}${darkerB.toString(16).padStart(2, "0")}`;
  };

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
            width: "auto",
            height: "auto",
            margin: "10px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: coupon.status
              ? darkenColor(getTierColor(coupon.tierName))
              : getTierColor(coupon.tierName),
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
                textAlign: "center",
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
