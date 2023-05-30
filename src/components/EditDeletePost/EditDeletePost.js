/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {TextField, FormControl, MenuItem, Stack, Select,InputLabel} from '@mui/material';
import styles from './EditDeletePost.module.css'
import axios from 'axios';
import Cookies from 'js-cookie'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function EditDeletePost() {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [item,setItem] = useState([])
  const [ categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState('')
  const [ locations, setLocations] = useState([])
  const [ selectedLocation, setSelectedLocation] = useState('')
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEdit = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_ENV}/api/item`)
      .then((response) => {
        setItem(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]); //! Here i have handle submit dependencies
  // {handleSubmit, categories, selectedCategories,locations, selectedLocation, setSelectedCategories, setSelectedLocation}
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_ENV}/api/location`)
      .then((response) => {
        setLocations(response.data.message);
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleDelete = (itemId) => {
    axios
      .put(`${process.env.REACT_APP_NODE_ENV}/api/item/isfound/${itemId}`, { isFound: true })
      .then((response) => {
        // Update the item's isFound property to true in the local state
        setItem((prevItems) =>
          prevItems.map((item) =>
            item._id === itemId ? { ...item, isFound: true } : item
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box sx={{ width: '100%' }} >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
          textColor="inherit"
          TabIndicatorProps={{
            style: {
              backgroundColor: '#28A745',
            },
          }}
        >
          <Tab label="Items Posted" />
          <Tab label="Items Founded" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {item.filter(item => item.isFound === false  && item.userId._id === Cookies.get('userId')).map((item) => (
          <Box
            key={item._id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 2,
              borderBottom: '1px solid rgba(109, 125, 147, 0.15)',
              flexWrap:'wrap',
            }}
            className={styles.cardContainer}
          >
              <img
                  src={`${process.env.REACT_APP_NODE_ENV}/${item.image}`}
                  alt="Image"
                  width={200}
                  height={100}
                />
              <Typography variant="h6" >{item.title.substring(0,10)+`..`}</Typography>
              <Typography variant="body1"  className={styles.details}>{item.description.substring(0,10)+`..`}</Typography>
              <Typography variant="body1" className={styles.details}>{item.categoryId.name.substring(0,10)+`..`}</Typography>
              <Typography variant="body1"  className={styles.details}>{item.locationId.name.substring(0,10)+`..`}</Typography>
              <Typography variant="body1"  >{item.dateFound.substring(0,10)}</Typography>

            <div>
              <Button
                style={{border:'2px solid #28A745',color:'#28A745',borderRadius:'9px',
                textTransform: "capitalize",
                fontSize:'16px',marginRight:'7px'}}
                onClick={handleEdit}
                
                
              >
                Edit
              </Button>
              <Button
                variant="contained"
                onClick={() => handleDelete(item._id)}
                
                style={{marginLeft:"4px",borderRadius:'9px',backgroundColor:'#28A745',
                textTransform: "capitalize",
                fontSize:'16px'}}
              >
                Delete
              </Button>
            </div>
          </Box>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
      {item.filter(item => item.isFound === true && item.userId._id === Cookies.get('userId')).map((item) => (
          <Box
            key={item._id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 2,
              borderBottom: '1px solid rgba(109, 125, 147, 0.15)',
              flexWrap:'wrap',
            }}
            className={styles.cardContainer}
          >
              <img
                  src={`http://localhost:5000/${item.image}`}
                  alt="Image"
                  width={200}
                  height={100}
                />
              <Typography variant="h6" >{item.title.substring(0,10)+`..`}</Typography>
              <Typography variant="body1"  className={styles.details}>{item.description.substring(0,10)+`..`}</Typography>
              <Typography variant="body1" className={styles.details}>{item.categoryId.name.substring(0,10)+`..`}</Typography>
              <Typography variant="body1"  className={styles.details}>{item.locationId.name.substring(0,10)+`..`}</Typography>
              <Typography variant="body1"  >{item.dateFound.substring(0,10)}</Typography>

            <Box style={{padding:'12px', backgroundColor:'#f7bfbe', borderRadius:'9px',color:'red',fontWeight:'600'}}>Founded</Box>
          </Box>
        ))}
      </TabPanel>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle style={{alignSelf:'center',fontWeight:"600",color:"#394452"}}>Edit <span style={{color:'#28A745'}}>Post</span></DialogTitle>
        <DialogContent >
        <Stack
            display="flex"
            justifyContent="space-between"
            flexDirection="row"
            style={{ width: "100%" }}
          >
            <TextField
              type="text"
              label="Title"
              color="success"
              fullWidth
              required
              style={{ width: "49%" }}
              // value={title}
              // onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              type="date"
              label="Date Founded"
              color="success"
              fullWidth
              required
              style={{ width: "49%",colorScheme:'green' }}
              // value={dateFound}
              // onChange={(event) => setDatefound(event.target.value)}
              focused
            />
          </Stack>
          <Stack
            display="flex"
            justifyContent="space-between"
            flexDirection="row"
            style={{ width: "100%" }}
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
            margin="dense"
            id="Image"
            label="Image"
            type="file"
            fullWidth
            color="success"
            focused
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            color="success"
            multiline
            rows={4}
          />
          
        </DialogContent>
        
        <DialogActions style={{display:'flex',justifyContent:'space-around', }}>
          <Button onClick={handleClose}  style={{border:'2px solid #28A745',borderRadius:'9px',color:'#28A745',width:'20%'}}>Cancel</Button>
          <Button onClick={handleClose} variant="contained"  autoFocus style={{border:'2px solid #28A745',borderRadius:'9px',backgroundColor:'#28A745',width:'20%'}}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
