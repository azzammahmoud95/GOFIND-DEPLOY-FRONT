import React, { useState } from "react";
import styles from "../Home/Header.module.css";
import FormAddItem from "../../components/FormAddItem/FormAddItem";
import { Avatar, MenuItem, Menu, Button } from "@mui/material";
import logoWhiteGreen from "../../assests/Elements/LogoWhiteGreen.svg";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Footer from "../../components/Footer/Footer.js";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function About() {
  const [anchorEl, setAnchorEl] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
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
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarProfile = () => {
    navigate("/profile");
  };
  return (
    <>
      <header className={styles.Header}>
        <div className={styles.headerWrapper}>
          <img
            src={logoWhiteGreen}
            alt="logo white"
            // style={{ marginRight: "20px" }}
            className={styles.logo}
            onClick={() => navigate("/")}
          />
          <nav className={styles.navBar}>
            <Link to="/" className={styles.aboutLink}>
              Home
            </Link>
            {username ? (
              <FormAddItem />
            ) : (
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
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
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
                    <MenuItem onClick={() => navigate("/dashboard/admins")}>
                      <DashboardIcon className={styles.MenuIcon} />
                      Dashboard
                    </MenuItem>
                  ) : null}
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon className={styles.MenuIcon} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <IconButton
                  className={styles.AvatarButton}
                  onClick={handleAvatarClick}
                >
                  <Avatar
                    className={styles.Avatar}
                    sx={{ bgcolor: "#28A745" }}
                  ></Avatar>
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
                  <MenuItem onClick={handleAvatarProfile} disabled>
                    <AccountCircleIcon className={styles.MenuIcon} />
                    My Account
                  </MenuItem>
                  {isAdminCookies === "true" ? (
                    <MenuItem onClick={() => navigate("/dashboard/admins")}>
                      <DashboardIcon className={styles.MenuIcon} />
                      Dashboard
                    </MenuItem>
                  ) : null}
                </Menu>
              </>
            )}
          </nav>
        </div>
      </header>
      <section className={styles.searchBarWrapper}>
        <h1 className={styles.aboutTitle}>About</h1>
      </section>
      <section className={styles.AboutContent}>
        <div className={styles.aboutImgHolder}>
          <img
            src="https://i.ibb.co/XC0KzyZ/about-Section-Image.jpg"
            alt="aboutimg"
            className={styles.aboutImg}
          />
          
        </div>
        <div className={styles.aboutTextWrapper}>
          <h1 className={styles.aboutContentTitle}>About <span style={{color:'#28a745'}}>gofind</span></h1>
          <p className={styles.AboutContentParagraph}>GoFind is a platform dedicated to helping people find their lost belongings and creating a supportive community. We connect founders who have found items with their rightful owners, streamlining the process of reuniting lost possessions. For those who have lost something valuable, our reporting system increases the chances of successful recovery by creating a comprehensive database. We prioritize privacy and security, ensuring all user information is handled with confidentiality. Join us in our mission to bring peace of mind and create a safer, more supportive environment for everyone.
          </p>
          <p className={styles.AboutContentParagraph}>
          We believe in the power of community and the positive impact it can have in recovering lost items. By fostering a supportive community of individuals who are committed to helping one another, we can create a network that greatly enhances the chances of finding and returning lost belongings.
          </p>

          <p className={styles.AboutContentParagraph}>
          Join us in our mission to reduce the number of lost items and create a safer, more connected community. Together, we can make a positive change and help people feel more secure in their daily lives.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
