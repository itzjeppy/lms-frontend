import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";

const Tier = ({ tiers, userPoints }) => {
  // Sort tiers by trigger amount
  const sortedTiers = tiers.sort((a, b) => a.triggerAmount - b.triggerAmount);

  // Maximum trigger amount for scaling
  const maxPoints = sortedTiers[sortedTiers.length - 1]?.triggerAmount || 1;

  // Current tier
  const currentTier = sortedTiers.reduce((acc, tier) => {
    return userPoints >= tier.triggerAmount ? tier : acc;
  }, null);

  return (
    <Paper
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: "1000px",
        margin: "0 auto",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
        Tier Progress
      </Typography>

      {/* Current Tier */}
      {currentTier && (
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mb: 1, color: "primary.main" }}
          >
            Current Tier: {currentTier.name}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Current Points: {userPoints}
          </Typography>
        </Box>
      )}

      {/* Progress Bar */}
      <Timeline position="alternate" sx={{ width: "100%" }}>
        {sortedTiers.map((tier, index) => (
          <TimelineItem key={tier.name}>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  bgcolor:
                    userPoints >= tier.triggerAmount ? "red" : "grey.500",
                  width: 24,
                  height: 24,
                  margin: "2px",
                }}
              />
              {index < sortedTiers.length - 1 && (
                <TimelineConnector
                  sx={{
                    bgcolor:
                      userPoints >= sortedTiers[index + 1].triggerAmount
                        ? "red"
                        : "grey.500",
                    width: 6,
                  }}
                />
              )}
              {index === sortedTiers.length - 1 && userPoints > maxPoints && (
                <TimelineConnector
                  sx={{
                    bgcolor: "primary.main",
                    width: 6,
                    height: "40px",
                  }}
                />
              )}
            </TimelineSeparator>
            <TimelineContent
              sx={{
                py: "12px",
                px: 2,
                bgcolor:
                  userPoints >= tier.triggerAmount ? tier.colour : "lightgray",
                borderRadius: "8px",
                textAlign: "center",
                width: "fit-content",
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {tier.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Trigger Amount: {tier.triggerAmount} points
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
        {/* Extra progress beyond the last tier */}
        {userPoints > maxPoints && (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  bgcolor: "primary.main",
                  width: 24,
                  height: 24,
                }}
              />
            </TimelineSeparator>
            <TimelineContent
              sx={{
                py: "12px",
                px: 2,
                bgcolor: "lightblue",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Progress Beyond Platinum
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {userPoints - maxPoints} points above
              </Typography>
            </TimelineContent>
          </TimelineItem>
        )}
      </Timeline>

      {/* Points Needed for Next Tier */}
      {sortedTiers.some((tier) => userPoints < tier.triggerAmount) && (
        <Box sx={{ mt: 3, textAlign: "center", display: "flex" }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: "text.secondary", mb: 1 }}
          >
            Points Needed for Next Tier:
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: "error.main", marginLeft: "5px" }}
          >
            {sortedTiers.find((tier) => userPoints < tier.triggerAmount)
              .triggerAmount - userPoints}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default Tier;
