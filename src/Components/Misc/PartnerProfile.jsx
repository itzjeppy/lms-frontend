import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
 Avatar,
 Box,
 Button,
 Container,
 Divider,
 Grid,
 Paper,
 Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import UserService from "../Services/UserService";
import TierService from "../Services/TierService";
import PartnerService from "../Services/PartnerService";
const ProfilePage = () => {
 const [users, setUsers] = useState([]);
 const [partner, setPartner] = useState({});
 const navigate = useNavigate();
 const columns = [
   { field: "id", headerName: "ID", width: 200 },
   { field: "userID", headerName: "User ID", width: 120 },
   { field: "totalPoints", headerName: "Total Points", width: 150 },
   { field: "tierName", headerName: "Tier Name", width: 150 },
   {
     field: "details",
     headerName: "Details",
     width: 150,
     renderCell: (params) => (
<Button
         variant="outlined"
         color="primary"
         size="small"
         onClick={() =>
           navigate("../user-details", { state: { uId: params.row.id } })
         }
>
         View
</Button>
     ),
   },
 ];
 const handleLogout = () => {
   localStorage.removeItem("user");
   navigate("/");
 };
 useEffect(() => {
   const partnerId = localStorage.getItem("partnerId");
   const fetchPartner = async () => {
     try {
       const response = await PartnerService.getPartnerById(partnerId);
       setPartner(response.data);
     } catch (error) {
       console.error("Error fetching partner details:", error);
     }
   };
   const fetchUsers = async () => {
     try {
       const response = await UserService.getUserByPartnerId(partnerId);
       const usersWithTier = await Promise.all(
         response.data.map(async (user) => {
           const tierResponse = await TierService.getTierByTierId(
             user.tiers.tierId
           );
           return {
             id: user.uId,
             userID: user.userId,
             totalPoints: user.totalPoints,
             tierName: tierResponse.data.tierName,
           };
         })
       );
       setUsers(usersWithTier);
     } catch (error) {
       console.error("Error fetching users or tier names:", error);
     }
   };
   fetchPartner();
   fetchUsers();
 }, []);
 return (
<Container
     sx={{
       py: 4,
       bgcolor: "#f9f9f9",
       maxWidth: "1200px",
       borderRadius: 2,
       boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
     }}
>
     {/* Partner Profile Section */}
<Paper
       elevation={0}
       sx={{
         p: 4,
         display: "flex",
         flexDirection: { xs: "column", md: "row" },
         alignItems: "center",
         gap: 4,
         mb: 4,
       }}
>
<Avatar
         alt={partner.partnerName}
         src="https://via.placeholder.com/150"
         sx={{ width: 150, height: 150 }}
       />
<Box>
<Typography variant="h4" sx={{ fontWeight: "bold" }}>
           {partner.partnerName}
</Typography>
<Typography variant="subtitle1" color="textSecondary">
           {partner.email}
</Typography>
<Typography variant="body1" color="textSecondary">
           +{partner.countryCode} {partner.contact}
</Typography>
<Button
           variant="contained"
           color="error"
           startIcon={<LogoutIcon />}
           sx={{ mt: 3 }}
           onClick={handleLogout}
>
           Logout
</Button>
</Box>
</Paper>
     {/* Divider */}
<Divider sx={{ my: 4 }} />
     {/* Users Section */}
<Box>
<Box
         sx={{
           display: "flex",
           justifyContent: "space-between",
           alignItems: "center",
           mb: 3,
         }}
>
<Typography variant="h5" sx={{ fontWeight: "bold" }}>
           Users
</Typography>
<Button
           variant="contained"
           color="primary"
           startIcon={<AddCircleOutlineIcon />}
           onClick={() => navigate("../add-user")}
>
           Add User
</Button>
</Box>
<Paper
         elevation={3}
         sx={{
           p: 3,
           borderRadius: 2,
           boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
           bgcolor: "#ffffff",
         }}
>
<DataGrid
           rows={users}
           columns={columns}
           autoHeight
           disableSelectionOnClick
           sx={{
             "& .MuiDataGrid-root": {
               border: "none",
             },
             "& .MuiDataGrid-cell": {
               fontSize: "0.875rem",
             },
             "& .MuiDataGrid-columnHeaders": {
               bgcolor: "#f4f4f4",
               fontSize: "0.9rem",
               fontWeight: "bold",
             },
             "& .MuiDataGrid-footerContainer": {
               bgcolor: "#f4f4f4",
             },
           }}
           initialState={{
             pagination: {
               paginationModel: {
                 pageSize: 5,
               },
             },
           }}
           pageSizeOptions={[5]}
         />
</Paper>
</Box>
</Container>
 );
};
export default ProfilePage;