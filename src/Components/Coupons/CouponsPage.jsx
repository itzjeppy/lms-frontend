import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid2 as MuiGrid,
  CircularProgress,
  useTheme,
  useMediaQuery
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import CouponsCard from "./CouponsCard";
import CouponService from "../Services/CouponService";
import TierService from "../Services/TierService";

const CouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [tiers, setTiers] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchCouponsAndTiers = async () => {
    try {
      const couponsResponse = await CouponService.getCoupons();
      setCoupons(couponsResponse.data);
      const partnerId = localStorage.getItem('partnerId');
      const tiersResponse = await TierService.getTiersByPartnerId(partnerId);
      const tiersMap = {};
      tiersResponse.data.forEach(tier => {
        tiersMap[tier.tierId] = tier.colour;
      });
      setTiers(tiersMap);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCouponsAndTiers();
  }, []);

  const handleDelete = (couponId) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      CouponService.deletecoupon(couponId)
        .then(() => {
          setCoupons((prevCoupons) =>
            prevCoupons.filter((coupon) => coupon.couponId !== couponId)
          );
        })
        .catch((error) => {
          console.error("Error deleting coupon", error);
        });
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          aagnItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: { xs: 2, md: 3 },
        bgcolor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: isMobile ? "column" : "row",
          mb: 3,
          gap: 2,
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{
            fontWeight: "bold",
            color: "#4A4A4A",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Standalone Coupons
        </Typography>

        {Object.keys(tiers).length > 0 && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate("../add-coupon")}
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            Add Coupon
          </Button>
        )}
      </Box>

      {/* Display Create Tier Message if No Tiers Exist */}
      {Object.keys(tiers).length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            bgcolor: "#ffffff",
            p: 4,
            borderRadius: 2,
            boxShadow: "0 1px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
            Please create at least one tier before managing standalone coupons.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate("../add-tier")}
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            Create Tier
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            bgcolor: "#ffffff",
            p: 2,
            borderRadius: 2,
            boxShadow: "0 1px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {coupons.length > 0 ? (
            <MuiGrid container spacing={isMobile ? 2 : 3}>
              {coupons.map((coupon) => (
                <MuiGrid item xs={12} sm={6} md={4} key={coupon.couponId}>
                  <CouponsCard
                    coupon={coupon}
                    tierColor={tiers[coupon.tierId] || "#cccccc"}
                    onDelete={handleDelete}
                  />
                </MuiGrid>
              ))}
            </MuiGrid>
          ) : (
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ textAlign: "center", mt: 2 }}
            >
              No coupons available. Start by adding a new coupon!
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
};

export default CouponsPage;
