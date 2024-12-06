import React from "react";
import { useNavigate } from "react-router-dom";
import {
 Card,
 CardContent,
 Typography,
 Box,
 Switch,
 Divider,
} from "@mui/material";
const ProgramCard = ({ program, onToggle }) => {
 const { name, active, startDate, endDate } = program;
 const navigate = useNavigate();
 // Navigate to Program Details
 return (
<Box
     sx={{
       position: "relative",
       borderRadius: 3,
       overflow: "hidden",
       "&:hover": {
         boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Enhance hover effect
       },
       "&::before": {
         content: '""',
         position: "absolute",
         top: 0,
         left: 0,
         right: 0,
         bottom: 0,
         borderRadius: "12px",
         background: active
           ? "linear-gradient(135deg, #A5D6A7, #C8E6C9)" // Green gradient for active
           : "linear-gradient(135deg, #FFABAB, #FFC3A0)", // Red gradient for inactive
         zIndex: 0,
       },
       padding: "10px", // Gradient border thickness
     }}
>
<Card
       sx={{
         position: "relative",
         zIndex: 1,
         borderRadius: "12px",
         backgroundColor: "#fff",
         boxShadow: "inset 0 4px 6px rgba(0, 0, 0, 0.1)", // Inner shadow
       }}
>
<CardContent>
         {/* Program Name and Toggle */}
<Box
           sx={{
             display: "flex",
             justifyContent: "space-between",
             alignItems: "center",
             mb: 2,
           }}
>
<Typography
             variant="h5"
             sx={{ fontWeight: "bold", color: "#4A4A4A" }}
>
             {name}
</Typography>
<Switch
             checked={active}
             onChange={onToggle}
             inputProps={{ "aria-label": "Activate Program" }}
             color="primary"
           />
</Box>
<Divider sx={{ my: 2 }} />
         {/* Program Dates */}
<Typography variant="body2" sx={{ mb: 1 }}>
<strong>Start Date:</strong> {new Date(startDate).toLocaleDateString()}
</Typography>
<Typography variant="body2">
<strong>End Date:</strong> {new Date(endDate).toLocaleDateString()}
</Typography>
</CardContent>
</Card>
</Box>
 );
};
export default ProgramCard;