import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Loader from "../Loader/Loader.js";
import axios from "axios";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddLocation from "../AddLocation/AddLocation.js";

export default function TotalLocationsCard() {
  const [totalLocations, setTotalLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_NODE_ENV}/api/location`)
      .then(response => {
        setTotalLocations(response.data.message);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  

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
        Total All Locations
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
            <p><span style={{ color: '#28a745' }}>{totalLocations.length}</span> Locations </p>
          )}
        </Typography>
        <LocationOnIcon fontSize="large" sx={{ color: '#28a745' }} />
      </Stack>
      <AddLocation />
    </Stack>
  );
}
