import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import  { useState } from 'react';
import { Box, Stack } from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import axios from 'axios';

export default function AddLocation() {
  const [open, setOpen] = useState(false);

  const [formValues, setFormValues] = useState({
    name: '',

  });



  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: formValues.name,

    };
  
    axios.post(`${process.env.REACT_APP_NODE_ENV}/api/location`, data)
      .then(response => {
        // Handle success response

        // >> RESET THE INPUTS
        setFormValues({
          name: '',
        })
        handleClose();
      })
      .catch(error => {
        // Handle error response
        console.error(error);
        if (error.response && error.response.status === 409) {
          alert('Email already taken, please use a different email.');
        } else {
          alert('Something went wrong. Please try to change the email.');
        }
  
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen} 
        size="large"
        sx={{
          borderRadius: "6px",
          textTransform: "none",
          padding: "14px 18px",
          width:"100%",
          fontWeight:"600",
          backgroundColor:'#28a745'
        }}
        color="success"
        startIcon={<AddRoundedIcon />}>

        Add New Location
      </Button>
      <Dialog open={open} onClose={handleClose}>
    <form onSubmit={handleSubmit}>
    <DialogTitle style={{textAlign:"center", fontWeight:"600",color:"#394452"}}>Add <Box display="inline" style={{color:'#28A745'}}>Location</Box></DialogTitle>     
     <DialogContent >
        <Stack spacing={4} style={{display:"flex",alignItems:"center",flexDirection:"column",width:"400px"}}>
          <TextField
          color="success"
            required
            sx={{marginTop:"5px"}}
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
      <DialogActions style={{display:"flex",flexDirection:"row", justifyContent:"space-around",marginBottom:"20px"}}>
        <Button variant="outlined" onClick={handleClose} style={{ backgroundColor: "#FFF", width: "120px",borderRadius: '10px',color:"#28A745",fontWeight:"600",border:'2px solid #28A745' }} color="success">Cancel</Button>
        <Button type="submit"
         style={{ backgroundColor: "#28A745",
          width: "120px",
          borderRadius: '10px',
          color:"#FFF",fontWeight:"600" }} variant="outlined">
          Save
        </Button>
      </DialogActions>
    </form>
  </Dialog>
    </>
  );
}