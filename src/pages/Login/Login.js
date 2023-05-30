/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import LogonameBlackGreen from "../.././assests/Elements/LogonameBlackGreen.svg";
import styles from "./Login.module.css";
import { TextField, Button, Typography, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import Cookies from "js-cookie"
import { UserContext } from "../../userContext";


export default function Login() {
  const { setToken, setIsLoggedIn,setIsCheckAdmin } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform validation logic here
    let hasErrors = false;

    

    if (formValues.email === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter an email.",
      }));
      hasErrors = true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }

    if (formValues.password === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Please enter a password.",
      }));
      hasErrors = true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
    if (hasErrors) {
      return;
    }

    // Submit form if validation passes
    const formData = {
      email: formValues.email,
      password: formValues.password,
      isAdmin: formValues.isAdmin,
    };

    axios.post(`${process.env.REACT_APP_NODE_ENV}/api/user/login`, formData)
  .then(response => {
    const authToken = response.data.token;
    // setToken(authToken);
    // setIsLoggedIn(true)
    if (response.status === 200) {
      const expires = new Date();
          expires.setDate(expires.getDate() + 30); // Set expiry date to one week from now
          Cookies.set("token", authToken, { expires });
          Cookies.set("isAdmin", response.data.isAdmin, { expires });
          Cookies.set("email", response.data.email, { expires });
          Cookies.set("username", response.data.username, { expires });
          Cookies.set("phone", response.data.phone, { expires });
          Cookies.set("userId", response.data._id, { expires });
    }

    if(response.data.isAdmin === true){
    navigate('/dashboard/admins ');
  }else{
    navigate('/')
  }
  })
  .catch(err => {
    if (err.response && err.response.data && err.response.data.errors) {
      const { email } = err.response.data.errors;
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: email ? "Email already exists." : "",
        general: "" // Reset general error message if present
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: "An error occurred. Please try try to change email" // Set a general error message
      }));
      console.log(err);
    }
  })};

  return (
    <div className={styles.loginPage}>
      <div className={styles.topSide}>
        <img
          src={LogonameBlackGreen}
          alt="logo"
          width={"210"}
          className={styles.logoStyle}
        />
      </div>
      <div className={styles.CenterSide}>
        <form
          method="post"
          className={styles.formStyle}
          onSubmit={handleSubmit}
          >
            <h3 className={styles.formTitle}>
              Log<span style={{ color: "#28A745" }}>in</span>{" "}
            </h3>
            {errors.general && <Alert severity="error">{errors.general}</Alert>}
            
            <TextField
            style={{ marginTop:'30px'}}
              label="Email"
              color="success"
              type="email"
              value={formValues.email}
              onChange={(event) =>
                setFormValues({ ...formValues, email: event.target.value })
              }
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              color="success"
              value={formValues.password}
              onChange={(event) =>
                setFormValues({ ...formValues, password: event.target.value })
              }
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!errors.password}
              helperText={errors.password}
            />
            
            <Typography
              variant="body2"
              color="gray"
              style={{ marginLeft: "10px" }}
            >
              Do not have an account{" "}
              <Link
                to="/signup"
                style={{
                  color: "#28A745",
                  fontWeight: 700,
                  textDecoration: "underline",
                }}
                className="linkTo"
              >
                Signup
              </Link>
            </Typography>
            <Button
              variant="contained"
              type="submit"
              style={{
                backgroundColor: "#28A745",
                textTransform: "capitalize",
                fontSize: "17px",
                width: "35%",
                alignSelf: "center",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }
  