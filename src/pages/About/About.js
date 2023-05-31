import React, {useState} from 'react'
import styles from '../Home/Header.module.css'
import FormAddItem from '../../components/FormAddItem/FormAddItem'
import { Avatar,MenuItem,Menu } from '@mui/material'
import logoWhiteGreen from '../../assests/Elements/LogoWhiteGreen.svg'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Footer from '../../components/Footer/Footer.js'
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
    <><header className={styles.Header}>
    <div className={styles.headerWrapper}>
      <img
        src={logoWhiteGreen}
        alt="logo white"
        // style={{ marginRight: "20px" }}
        className={styles.logo}
      />
    <nav className={styles.navBar}>
      <Link to="/" className={styles.aboutLink}>Home</Link>
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
  <section className={styles.searchBarWrapper}>
    <h1 className={styles.aboutTitle}>About</h1>

</section>
<section className={styles.AboutContent}>
      <h1 className={styles.aboutContentTitle}>About gofind</h1>
      <p>this is the about page</p>
</section>
  <Footer />
  </>
  )
}
