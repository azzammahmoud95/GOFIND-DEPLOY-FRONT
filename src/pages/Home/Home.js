import React from "react";
import Footer from "../../components/Footer/Footer.js";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import logoWhiteGreen from "../../assests/Elements/LogoWhiteGreen.svg";
import styles from "./Header.module.css";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import { Pagination } from "@mui/material";
import FormAddItem from "../../components/FormAddItem/FormAddItem.js";
import Loader from "../../components/Loader/Loader.js";
export default function Home() {

  const [items, setItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 10;
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarProfile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_ENV}/api/location`)
      .then((response) => {
        let locations = response.data.message;
        setIsLoading(false);
        setLocations(locations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_ENV}/api/category`)
      .then((response) => {
        let categories = response.data.message;
        setIsLoading(false);
        setCategories(categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_ENV}/api/item`)
      .then((response) => {
        let posts = response.data.message;
        setIsLoading(false);
        setItems(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();
  const username = Cookies.get("username");
  const isAdminCookies = Cookies.get("isAdmin");
  const handleAvatarClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    // Handle logout logic here
    // ...
    Cookies.remove("username");
    Cookies.remove("email");
    Cookies.remove("phone");
    Cookies.remove("token");
    Cookies.remove("isAdmin");
    Cookies.remove("userId");
    navigate("/login");
  };
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  // Get the items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const filteredItems = items.filter((item) => !item.isFound);

  return (
    <>
      <header className={styles.Header}>
        <div className={styles.headerWrapper}>
          <img
            src={logoWhiteGreen}
            alt="logo white"
            // style={{ marginRight: "20px" }}
            className={styles.logo}
          />
        <nav className={styles.navBar}>
          <Link to="/about" className={styles.aboutLink}>About</Link>
          <FormAddItem />
          
          {username ? (
            <>
              <IconButton
                className={styles.AvatarButton}
                onClick={handleAvatarClick}
              >
                <Avatar className={styles.Avatar} sx={{ bgcolor: "#28A745" }}>
                  {username.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                id="account-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleAvatarClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleAvatarProfile}>
                  <AccountCircleIcon className={styles.MenuIcon} />
                  My Account
                </MenuItem>
                {isAdminCookies === "true" ? (
                    <MenuItem onClick={() => navigate('/dashboard/admins')}>
                      <DashboardIcon className={styles.MenuIcon} />
                      Dashboard
                    </MenuItem>
                  ): null}
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon className={styles.MenuIcon} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Avatar
              className={styles.Avatar}
              sx={{ bgcolor: "#28A745" }}
              onClick={handleAvatarClick}
            />
          )}
          </nav>
        </div>
        
      </header>
{/* SearchBAr Start*/}
    <section className={styles.searchBarWrapper}>
  
      <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
              justifyContent: "center"

            }}
          >
            <Autocomplete
              disablePortal
              options={filteredItems}
              freeSolo
              type="text"
              className={styles.searchBar}
              color="success"
              fullWidth
              size="small"
              onChange={(event, newValue) => setSelectedValue(newValue)}
              style={{
                outlineOffset: "0px",
                outline: "none",
                borderRadius: "7px",
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
                backgroundColor: "white",
                width: "60%",
                
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={"Welcome to gofind here you can find you losts"}
                  color="success"
                />
              )}
            />

            <div
              style={{
                height: "40px",
                padding: "6.5px",
                backgroundColor: "#28a745",
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            >
              <SearchIcon
                style={{
                  backgroundColor: "#28a745",
                  color: "whitesmoke",
                  width: "100%",
                }}
              />
            </div>
          </div>
      </section>
          {/* SearchBAr end*/}
      
      <section className={styles.cardWrapper}>
        <div>
          <h2
            style={{
              alignSelf: "center",
              fontWeight: "600",
              color: "#394452",
              marginTop: "20px",
              marginLeft: "30px",
            }}
          >
            Filter By <span style={{ color: "#28A745" }}>Category</span>
          </h2>
          <Button
            style={{
              backgroundColor:
                selectedCategory === null ? "#28A745" : "transparent",
              borderRadius: "10px",
              width: "80px",
              color: selectedCategory === null ? "white" : "#28A745",
              marginLeft: "10px",
              textTransform: "capitalize",
              fontSize: "12px",
              marginTop: "10px",
              border: selectedCategory === null ? "none" : "2px solid #28A745",
            }}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              style={{
                backgroundColor:
                  selectedCategory === category ? "#28A745" : "transparent",
                borderRadius: "10px",
                width: "80px",
                color: selectedCategory === category ? "white" : "#28A745",
                marginLeft: "10px",
                textTransform: "capitalize",
                fontSize: "12px",
                marginTop: "10px",
                border:
                  selectedCategory === category ? "none" : "2px solid #28A745",
              }}
              key={category._id}
              onClick={() => setSelectedCategory(category)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <div>
          
          <h2
            style={{
              alignSelf: "center",
              fontWeight: "600",
              color: "#394452",
              marginTop: "20px",
              marginLeft: "30px",
            }}
          >
            Filter By <span style={{ color: "#28A745" }}>Location</span>
          </h2>
          <Button
            style={{
              backgroundColor:
                selectedLocation === null ? "#28A745" : "transparent",
              borderRadius: "10px",
              width: "80px",
              color: selectedLocation === null ? "white" : "#28A745",
              marginLeft: "10px",
              textTransform: "capitalize",
              fontSize: "12px",
              marginTop: "10px",
              border: selectedLocation === null ? "none" : "2px solid #28A745",
            }}
            onClick={() => setSelectedLocation(null)}
          >
            All
          </Button>
          {locations.map((category) => (
            <Button
              style={{
                backgroundColor:
                  selectedLocation === category ? "#28A745" : "transparent",
                borderRadius: "10px",
                width: "80px",
                color: selectedLocation === category ? "white" : "#28A745",
                marginLeft: "10px",
                textTransform: "capitalize",
                fontSize: "12px",
                marginTop: "10px",
                border:
                selectedLocation === category ? "none" : "2px solid #28A745",
              }}
              key={category._id}
              onClick={() => setSelectedLocation(category)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          currentItems
            .filter((item) => item.isFound === false)
            .filter((item) =>
              selectedCategory
                ? item.categoryId.name === selectedCategory.name
                : true
            )
            .filter((item) =>
              selectedLocation
                ? item.locationId.name === selectedLocation.name
                : true
            )
            .filter((item) =>
              selectedValue ? item.title === selectedValue.title : true
            )
            .map((item) => (
              <section className={styles.card} key={item._id}>
                <div className={styles.imageHolder}>
                  {" "}
                  <img
                    src={`${process.env.REACT_APP_NODE_ENV}/${item.image}`}
                    alt="card pics"
                    // width={350}
                    // height={200}
                    className={styles.cardImg}
                  />
                </div>
                <div className={styles.infoWrapper}>
                  <h2>{item.title}</h2>
                  <h3>Founded by: {item.userId.username}</h3>
                  <h4>{item.location}</h4>
                  <h4>{item.category}</h4>
                  <p>{item.description}</p>
                  <small>
                    <strong>Date: </strong>
                    {item.dateFound}
                  </small>
                  <small>
                    <strong>Category: </strong>
                    {item.categoryId.name}
                  </small>
                  <small>
                    <strong>Location: </strong>
                    {item.locationId.name}
                  </small>
                  <div className={styles.buttonWrapper}>
                    <a
                      href={`tel:+961${item.userId.phone}`}
                      className={styles.phoneButton}
                    >
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <CallIcon style={{ color: "white" }} />
                        <span style={{ marginLeft: "0.5rem" }}>Call</span>
                      </span>
                    </a>
                    <a
                      style={{ justifyContent: "center" }}
                      href={`mailto:${item.userId.email}`}
                      className={styles.emailButton}
                    >
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <EmailIcon style={{ color: "#28A745" }} />
                        <span style={{ marginLeft: "0.5rem" }}>Mail</span>
                      </span>
                    </a>
                  </div>
                </div>
              </section>
            ))
        )}
        <Pagination
          style={{ alignSelf: "center" }}
          count={Math.ceil(items.length / itemsPerPage)}
          color="success"
          page={currentPage}
          onChange={handlePageChange}
        />
      </section>

      <Footer />
    </>
  );
}
