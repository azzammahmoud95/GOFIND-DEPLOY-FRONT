import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import styles from './SidebarDashboard.module.css'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
  Typography,
} from "@mui/material";
import {
  Person as PersonIcon,
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box } from "@mui/system";
import Logo from "../../assests/Elements/LogonameBlackGreen.svg";
import Cookies from "js-cookie";
function SidebarDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate()
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
  const handleDrawerToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const drawerItems = [
    {
      text: "Admins",
      icon: <PersonIcon />,
      path: "/dashboard/admins",
    },
    {
      text: "Locations",
      icon: <LocationOnIcon />,
      path: "/dashboard/locations",
    },
    

    {
      text: "Categories",
      icon: <CategoryIcon />,
      path: "/dashboard/categories",
    }
  ];

  const drawer = (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "315px",
        height: "100vh",
      }}
    >
      <Box sx={{ marginX: "14px" }}>
        <img
          src={Logo}
          alt="logo"
          style={{ height: "50px", marginBottom: "36px",marginLeft:'50px' }}
          onClick={() => navigate('/')}
        />
        <Typography mt={2} color="GrayText" paddingX="16px" paddingY="8px">
          User Panel
        </Typography>
        {drawerItems.map((item, index) => (
          <ListItem
            button
            component={Link}
            to={item.path}
            key={item.path}
            onClick={handleDrawerToggle}
            style={{
              backgroundColor:
                window.location.pathname === item.path
                  ? "rgba(38, 163, 81, 0.1)"
                  : "",
              color: window.location.pathname === item.path ? "rgba(0, 128, 0, 1)" : "",
            }}
          >
            <ListItemIcon
              style={{
                color: window.location.pathname === item.path ? "rgba(0, 128, 0, 1)" : "",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </Box>
      <Box sx={{ marginX: "14px" }}>
      <ListItem
          button
          selected={window.location.pathname === "/"}
          onClick={() => navigate("/")}
          style={{marginBottom:'-10px'}}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText onClick={() => navigate("/")}>Home</ListItemText>
        </ListItem>
        <ListItem
          button
          selected={window.location.pathname === "/logout"}
          onClick={handleDrawerToggle}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText onClick={handleLogout}>Logout</ListItemText>
        </ListItem>
      </Box>
    </List>
  );

  return (
    <>
      {isMobile ? (
        <div >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant="temporary"
            anchor="left"
            open={isMenuOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </div>
      ) : (
        <Box
          variant="permanent"
          anchor="left"
          maxWidth="315px"
          sx={{
            background: "white",
            // border: "1px solid rgba(109, 125, 147, 0.15)",
            boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)"
            // position: "fixed",
            // zIndex: "1",
            // top: "0", 
            // left: "0",
            // overflowX: "hidden", 
            
          }}
        >
          {drawer}
        </Box>
      )}
    </>
  );
}
export default SidebarDashboard;
