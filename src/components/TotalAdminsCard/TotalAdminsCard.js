import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import Loader from "../Loader/Loader.js";
import axios from "axios";

export default function TotalAdminsCard() {
  const [totalAdmins, setTotalAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_NODE_ENV}/api/user`)
      .then(response => {
        setTotalAdmins(response.data.message);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const filteredAdmins = totalAdmins.filter(admin => admin.isAdmin === true);
  const filteredUsers = totalAdmins.filter(admin => admin.isAdmin === false);

  return (
    <Stack spacing={3} paddingY={3} paddingX={4} 
      sx={{
        width: "100%",
        border: "1px solid rgba(109, 125, 147, 0.15)",
        boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
        borderRadius: "12px",
        bgcolor: "white",
        maxHeight: "265px"
      }}
    >
      <Typography variant="body2" sx={{ color: "#6D7D93" }}>
        Total All Users
      </Typography>
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="h6"
          sx={{ fontSize: "28px", fontWeight: "bold" }}
          marginBottom={3}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <React.Fragment>
              <span style={{ color: '#28a745' }}>{filteredAdmins.length}</span> Admins
              <br />
              <span style={{ color: '#28a745' }}>{filteredUsers.length}</span> Users
            </React.Fragment>
          )}
        </Typography>
        <PermIdentityRoundedIcon fontSize="large" sx={{ color: '#28a745' }} />
      </Stack>
    </Stack>
  );
}
