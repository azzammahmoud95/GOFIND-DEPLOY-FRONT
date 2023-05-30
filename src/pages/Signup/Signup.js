import React, { useState } from "react";
import LogonameBlackGreen from "../.././assests/Elements/LogonameBlackGreen.svg";
import styles from "./Signup.module.css";
import { TextField, Button, Typography, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";

export default function Signup() {
  console.log(process.env.REACT_APP_NODE_ENV)
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform validation logic here
    let hasErrors = false;

    if (formValues.username === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Please enter a username.",
      }));
      hasErrors = true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
    }

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

    if (formValues.phone === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Please enter a phone number.",
      }));
      hasErrors = true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
    }

    if (hasErrors) {
      return;
    }

    // Submit form if validation passes
    const formData = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      phone: formValues.phone,
    };

    axios.post(`${process.env.REACT_APP_NODE_ENV}/api/user/register`, formData)
  .then(response => {
    navigate('/login');
  })
  .catch(err => {
    if (err.response && err.response.data && err.response.data.errors) {
      const { email, phone } = err.response.data.errors;
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: email ? "Email already exists." : "",
        phone: phone ? "Phone number already exists." : "",
        general: "" // Reset general error message if present
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: "An error occurred. Please try try to change email or phone" // Set a general error message
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
              Sign<span style={{ color: "#28A745" }}>up</span>{" "}
            </h3>
            {errors.general && <Alert severity="error">{errors.general}</Alert>}
            <TextField
              label="Username"
              color="success"
              type="text"
              style={{ width: "calc(100% - 2px)" }}
              value={formValues.username}
              onChange={(event) =>
                setFormValues({ ...formValues, username: event.target.value })
              }
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
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
            <TextField
              type="tel"
              label="Phone"
              color="success"
              placeholder="03-123456"
              pattern="^(\+|00)?(961)?(0)?[1-9]{1}[0-9]{7}$"
              value={formValues.phone}
              onChange={(event) =>
                setFormValues({ ...formValues, phone: event.target.value })
              }
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <Typography
              variant="body2"
              color="gray"
              style={{ marginLeft: "10px" }}
            >
              Already have an account{" "}
              <Link
                to="/login"
                style={{
                  color: "#28A745",
                  fontWeight: 700,
                  textDecoration: "underline",
                }}
                className="linkTo"
              >
                Login
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
              Signup
            </Button>
          </form>
        </div>
      </div>
    );
  }
  