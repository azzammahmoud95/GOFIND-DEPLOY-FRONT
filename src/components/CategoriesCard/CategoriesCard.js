import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import axios from "axios";

const AdminsList = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAreYouSure, setOpenAreYouSure] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null); // Added deleteCategoryId state
  const [formValues, setFormValues] = useState({
    id: "",
    name: "",
    email: "",
  });
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_ENV}/api/category`)
      .then((response) => {
        setCategories(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [categories]);

  const handleClickOpen = (id) => {
    const selectedAdmin = categories.find((category) => category._id === id);
    setFormValues({
      id: selectedAdmin._id,
      name: selectedAdmin.name,
      email: selectedAdmin.email,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setFormValues({
      id: "",
      name: "",
      email: "",
    });
    setOpen(false);
  };

  const handleCloseAreYouSure = () => {
    setOpenAreYouSure(false);
  };

  const handleDelete = (id) => {
    setDeleteCategoryId(id); // Set the deleteCategoryId state with the categoryId
    setOpenAreYouSure(true);
  };

  const handleDeleteConfirm = () => {
    axios
      .delete(`${process.env.REACT_APP_NODE_ENV}/api/category/${deleteCategoryId}`)
      .then((response) => {
        setCategories(categories.filter((category) => category._id !== deleteCategoryId));
        setOpenAreYouSure(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    const id = formValues.id;
    const data = {
      name: formValues.name,
    };
    axios
      .patch(`${process.env.REACT_APP_NODE_ENV}/api/category/${id}`, data)
      .then((response) => {
        const updatedCategories = categories.map((location) =>
          location._id === id ? response.data : location
        );
        setCategories(updatedCategories);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      sx={{
        padding: "50px",
        width: "60%",
        border: "1px solid rgba(109, 125, 147, 0.15)",
        boxShadow: "4px 4px 20px -10px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        bgcolor: "white",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Categories
      </Typography>
      <Stack spacing="10px">
        {categories.map((category) => (
          <Box
            key={category._id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              py: 2,
              borderBottom: "1px solid rgba(109, 125, 147, 0.15)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  padding: "16px",
                  borderRadius: "12px",
                  maxWidth: "56px",
                  maxHeight: "56px",
                  bgcolor: "#26a3511a",
                }}
              >
                <CategoryIcon color="success" />
              </Box>
              <Stack sx={{ marginLeft: "30px" }}>
                <Typography sx={{ fontWeight: "bold" }}>{category.name}</Typography>
                <Typography
                  sx={{
                    color: "gray",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  {category.email}
                </Typography>
              </Stack>
            </Box>
            <Box sx={{ display: "flex", alignItems: "space-between" }}>
              <Button
                color="success"
                variant="outlined"
                size="small"
                sx={{
                  border: "2px solid #28A745",
                  color: "#28A745",
                  borderRadius: "7px",
                  width: "66px",
                  height: "37px",
                  fontWeight: "600",
                  fontSize: "14px",
                  textTransform: "none",
                  marginRight: "50px",
                }}
                onClick={() => handleClickOpen(category._id)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="success"
                sx={{
                  borderRadius: "6px",
                  width: "66px",
                  height: "37px",
                  fontWeight: "600",
                  fontSize: "14px",
                  textTransform: "none",
                  backgroundColor: "#28A745",
                }}
                onClick={() => handleDelete(category._id)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        ))}
      </Stack>
      <Dialog open={openAreYouSure} onClose={handleCloseAreYouSure}>
        <DialogTitle style={{ textAlign: "center", fontWeight: "600", color: "#394452" }}>
          Are You Sure you Want to Delete this<Box display="inline" style={{ color: "#28A745" }}> Category?</Box>
        </DialogTitle>
        <DialogActions
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: "20px",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleCloseAreYouSure}
            style={{
              backgroundColor: "#FFF",
              width: "120px",
              borderRadius: "10px",
              color: "#28A745",
              fontWeight: "600",
              border: "2px solid #28A745",
            }}
            color="success"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            style={{
              backgroundColor: "#28A745",
              width: "120px",
              borderRadius: "10px",
              color: "#FFF",
              fontWeight: "600",
            }}
            variant="outlined"
            onClick={handleDeleteConfirm}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleEdit}>
          <DialogTitle style={{ textAlign: "center", fontWeight: "600", color: "#394452" }}>
            Edit <Box display="inline" style={{ color: "#28A745" }}>Category</Box>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={4} style={{ display: "flex", alignItems: "center", flexDirection: "column", width: "400px" }}>
              <TextField
                color="success"
                required
                sx={{ marginTop: "5px" }}
                fullWidth
                label="Name"
                variant="outlined"
                value={formValues.name}
                onChange={(event) =>
                  setFormValues({ ...formValues, name: event.target.value })
                }
              />
            </Stack>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: "20px",
            }}
          >
            <Button
              variant="outlined"
              onClick={handleClose}
              style={{
                backgroundColor: "#FFF",
                width: "120px",
                borderRadius: "10px",
                color: "#28A745",
                fontWeight: "600",
                border: "2px solid #28A745",
              }}
              color="success"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              style={{
                backgroundColor: "#28A745",
                width: "120px",
                borderRadius: "10px",
                color: "#FFF",
                fontWeight: "600",
              }}
              variant="outlined"
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default AdminsList;
