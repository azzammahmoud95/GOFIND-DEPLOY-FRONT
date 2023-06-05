import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import axios from "axios";

const AdminsList = () => {
  const [admins, setAdmins] = useState([]);

   const [openAreYouSure, setOpenAreYouSure] = useState(false);
const [selectedUserId, setSelectedUserId] = useState("")
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_ENV}/api/user`)
      .then((response) => {
        setAdmins(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [admins]);
  const handleDelete = (id) => {
    setSelectedUserId(id);
    setOpenAreYouSure(true);
  };

  const handleCloseAreYouSure = () =>{
    setOpenAreYouSure(false)
  }

  const handleDeleteConfirm = () => {
    axios
      .delete(`${process.env.REACT_APP_NODE_ENV}/api/user/delete/${selectedUserId}`)
      .then((response) => {
        setOpenAreYouSure(false);
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
        Admins & Users
      </Typography>
      <Stack spacing="10px">
      {admins.map((admin) => (
      <Box
        key={admin._id}
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
             <PersonRoundedIcon color="success" />
                </Box>
                <Stack sx={{marginLeft:"30px"}}>
                    <Typography sx={{ fontWeight: "bold"}}>
                      {admin.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: "gray",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      {admin.email}
                    </Typography>
                  </Stack>
        </Box>
        <Box sx={{ display: "flex",alignItems:"space-between" }}>
          {/* <Button
          color="success"
            variant="outlined"
            size="small"
            sx={{
              border: "2px solid #28A745",
              color:'#28A745',
              borderRadius: "7px",
              width: "66px",
              height: "37px",
              fontWeight: "600",
              fontSize: "14px",
              textTransform: "none",
              marginRight:"50px"
            }}
            
            onClick={() => handleClickOpen(admin.id)}
          >
            Edit
          </Button> */}
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
              backgroundColor: "#28A745"
            }}
            onClick={() => handleDelete(admin._id)}
          >
            Delete
          </Button>
        </Box>
      </Box>
    ))}
  </Stack>
  <Dialog open={openAreYouSure} onClose={handleCloseAreYouSure}>
      <DialogTitle style={{ textAlign: "center", fontWeight: "600", color: "#394452" }}>
          Are You Sure you Want to Delete this<Box display="inline" style={{ color: "#28A745" }}> Admin/User?</Box>
        </DialogTitle>
        <DialogActions style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginBottom: "20px" }}>
          <Button
            variant="outlined"
            onClick={handleCloseAreYouSure}
            style={{
              backgroundColor: "#FFF",
              width: "120px",
              borderRadius: '10px',
              color: "#28A745",
              fontWeight: "600",
              border: '2px solid #28A745',
            }}
            color="success"
          >
            Cancel
          </Button>
          <Button
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
</Box>
);
};

export default AdminsList;