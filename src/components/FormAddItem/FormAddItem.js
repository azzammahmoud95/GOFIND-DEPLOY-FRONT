import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../../pages/AddListItems/AddListItems.module.css";
import {
  Button,
  TextField,
  Alert,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Dialog,
} from "@mui/material";
import Cookies from "js-cookie";

export default function FormAddItem() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [dateFound, setDatefound] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [userId, setUserId] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_ENV}/api/location`)
      .then((response) => {
        setLocations(response.data.message);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_ENV}/api/category`)
      .then((response) => {
        setCategories(response.data.message);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const userIdFromCookie = Cookies.get("userId");
    if (userIdFromCookie) {
      setUserId(userIdFromCookie);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("userId", userId);
    formData.append("image", image);
    formData.append("categoryId", selectedCategories);
    formData.append("locationId", selectedLocation);
    formData.append("dateFound", dateFound);
    formData.append("description", description);
    console.log(formData);
    axios
      .post(`${process.env.REACT_APP_NODE_ENV}/api/item/additem`, formData)
      .then((response) => {
        console.log(response);
        setTitle("");
        setImage(null);
        setSelectedCategories("");
        setSelectedLocation("");
        setDatefound("");
        setDescription("");
        setSuccessAlert(true);
        
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#28A745",
          textTransform: "capitalize",
          fontSize: "17px",
          alignSelf: "center",
          borderRadius: "10px",
          padding: "7px 3px",
          width: "110px",
          color: "white",
          border: "1px solid whitesmoke",
          fontWeight: "500",
        }}
        className={styles.addItem}
        onClick={handleClickOpen}
      >
        Add Item
      </Button>
      <Dialog
      
       open={open}
       onClose={handleClose}
       aria-labelledby="alert-dialog-title"
       aria-describedby="alert-dialog-description">
      <form
        onSubmit={handleSubmit}
        // className={styles.FromAdd}
        style={{ boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)", padding:'20px' }}
      >
        <h2 style={{color:'#394452', textAlign:'center'}}>
          Post The <span style={{ color: "#28A745" }}>Founded Item</span>
        </h2>
        {successAlert && (
          <Alert
            color="success"
            severity="success"
            onClose={() => setSuccessAlert(false)}
          >
            Item sent successfully!
          </Alert>
        )}
        <Stack
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          flexDirection="row"
          style={{ width: "100%",margin:'10px 0' }}
        >
          <Avatar sizes="10" sx={{ bgcolor: "#28A745", width: 55, height: 55,marginRight:'3px' }}>
            {Cookies.get("username").charAt(0).toUpperCase()}
          </Avatar>
          <TextField
            type="text"
            label="User Name"
            color="success"
            fullWidth
            style={{ width: "95%" }}
            required
            disabled
            value={Cookies.get("username")}
          />
        </Stack>
        <Stack
          display="flex"
          justifyContent="space-between"
          flexDirection="row"
          style={{ width: "100%",marginBottom:'10px' }}
        >
          <TextField
            label="Email"
            color="success"
            fullWidth
            type="email"
            style={{ width: "49%" }}
            required
            disabled
            value={Cookies.get("email")}
          />
          <TextField
            label="Phone"
            color="success"
            fullWidth
            type="number"
            style={{ width: "49%" }}
            required
            disabled
            value={Cookies.get("phone")}
          />
        </Stack>
        <Stack
          display="flex"
          justifyContent="space-between"
          flexDirection="row"
          style={{ width: "100%",marginBottom:'10px' }}
        >
          <TextField
            type="text"
            label="Title"
            color="success"
            fullWidth
            required
            style={{ width: "49%" }}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            type="date"
            label="Date Founded"
            color="success"
            fullWidth
            required
            style={{ width: "49%", colorScheme: "green" }}
            value={dateFound}
            onChange={(event) => setDatefound(event.target.value)}
            focused
          />
        </Stack>
        <TextField
          type="file"
          style={{ width: "100%" }}
          color="success"
          label="Image"
          helperText="Accept only jpg/png files"
          onChange={(event) => setImage(event.target.files[0])}
          focused
          required
        />
        <Stack
          display="flex"
          justifyContent="space-between"
          flexDirection="row"
          style={{ width: "100%",marginBottom:'10px' }}
        >
          <FormControl
            style={{ width: "49%" }}
            label="Category"
            color="success"
            fullWidth
          >
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              required
              label="Category"
              value={selectedCategories}
              onChange={(event) => setSelectedCategories(event.target.value)}
            >
              {Array.isArray(categories) &&
                categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl
            style={{ width: "49%" }}
            label="Location"
            color="success"
            fullWidth
          >
            <InputLabel id="location-select-label">Location</InputLabel>
            <Select
              labelId="location-select-label"
              id="location-select"
              required
              label="Location"
              value={selectedLocation}
              onChange={(event) => setSelectedLocation(event.target.value)}
            >
              {Array.isArray(locations) &&
                locations.map((location) => (
                  <MenuItem key={location._id} value={location._id}>
                    {location.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Stack>
        <TextField
          label="Description"
          color="success"
          fullWidth
          rows={4}
          multiline
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          helperText="Accept at least 20 characters"
        />
        <Stack
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          flexDirection="row"
          style={{ width: "100%" }}
        >
          <Button
            style={{
              backgroundColor: "#FFF",
              width: "170px",
              borderRadius: "12px",
              color: "#28A745",
              fontWeight: "700",
              height: "40px",
              border: "1px solid green",
              fontSize: "17px",
              boxShadow: "0 0 2px rgba(0, 0, 0, 0.2)",
            }}
            variant="outlined"
            type="reset"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            style={{
              backgroundColor: "#28A745",
              width: "170px",
              borderRadius: "12px",
              color: "#FFF",
              fontWeight: "700",
              height: "40px",
              border: "1px solid whitesmoke",
              fontSize: "17px",
              boxShadow: "0 0 2px rgba(0, 0, 0, 0.2)",
            }}
            variant="outlined"
          >
            Post Item
          </Button>
        </Stack>
      </form>
      </Dialog>
    </>
  );
}
