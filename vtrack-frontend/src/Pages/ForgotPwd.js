import React, { useEffect, useState } from "react";
import "../CSS/ForgotPwd.css";
import emailjs from '@emailjs/browser';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  Divider,
  InputAdornment,
  IconButton,
  useMediaQuery
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

const ForgotempPassword = () => {
    const [randomData, setRandomData] = useState("");
    const [empId, setEmpId] = useState("");
    const [confirmInput, setConfirmInput] = useState({
        emp_password: "",
        confirmemp_password: ""
    });
    const [isValid, setIsValid] = useState(true);
    const [userData, setUserData] = useState({});
    const nav = useNavigate();
    const [input, setInput] = useState("");
    const [isOtpValid, setIsOtpValid] = useState(false);
    const [showPassword,setShowPassword]=useState(false);
    const isSmallScreen = useMediaQuery("(max-width:600px)");


    useEffect(() => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';

        for (let i = 0; i < 3; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        for (let i = 0; i < 2; i++) {
            result += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }

        setRandomData(result);
    }, []);

    const changeHandler = (e) => {
        setConfirmInput({ ...confirmInput, [e.target.name]: e.target.value });
    };

    const confirmSubmitHandler = (e) => {
        e.preventDefault();
        
        const { emp_password, confirmemp_password } = confirmInput;
        const emp_id = userData.emp_id;
        const data = { emp_id, emp_password };
    
        if (emp_password === confirmemp_password) {
            axios.post("http://192.168.2.120:3003/employeeDetails/confirmemp_password_emp_details", data)
                .then((res) => {
                    alert("Password changed successfully");
                    nav("/");
                    setConfirmInput({
                        emp_password: "",
                        confirmemp_password: ""
                    });
                })
                .catch(err => console.log(err));
        } else {
            alert("Passwords do not match");
        }
    };

    const otpHandler = (e) => {
        e.preventDefault();
        if (input === randomData) {
            setIsOtpValid(true);
        } else {
            alert("Incorrect OTP");
        }
    };

    const submitHandler = () => {
        const serviceId = 'service_6l2ddvt';
        const templateId = 'template_uvb14vn';
        const userId = 'ODfkcgDBY15pDlkE0';
       
        axios.get(`http://192.168.2.120:3003/employeeDetails/forgot_emp_detials?emp_id=${empId}`)
            .then((res) => {
                setUserData(res.data.data[0]);
                const templateParams = {
                    to_Subject: 'Employee Credentials',
                    to_email: res.data.data[0].email,
                    message: randomData
                };
                setIsValid(false);
                alert("Please check the OTP in your email");
                setEmpId("");
                return emailjs.send(serviceId, templateId, templateParams, userId);
            })
            .then(() => {
                console.log('Email sent successfully!');
            })
            .catch((err) => {
                alert("Something went wrong");
                console.error('Error:', err);
            });
    };

    const passwordToggle=()=>{
        setShowPassword(prev=>!prev);
    }

    return (
  <Box
    sx={{
      minHeight: "100vh",
      backgroundImage: `url("/assets/vensai-bg.jpg")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingLeft: "150px",
    }}
  >
    <Paper
      elevation={10}
      sx={{
        width: isSmallScreen ? "90%" : "60%",
        maxWidth: "300px",
        height: "73vh",
        p: 4,
        textAlign: "center",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%)",
        boxShadow: "0 8px 32px rgba(31,38,135,0.37)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: 10,
      }}
    >
      {/* Logo */}
      <img
        src="/assets/vtrack-logo.png"
        alt="vtrack logo"
        height="150px"
        width="150px"
      />

      <Divider sx={{ my: 2 }} />

      {/* STEP 1 — ENTER EMPLOYEE ID */}
      {isValid && !isOtpValid && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 1, fontFamily: "Times New Roman" }}>
              Enter Employee ID
            </Typography>
            <TextField
              fullWidth
              label="Employee ID"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={submitHandler}
              sx={{
                background:
                  "linear-gradient(to right, #0d3a56, #134f6f, #2286b9)",
                color: "#fff",
                "&:hover": {
                  background:
                    "linear-gradient(to right, #134f6f, #2286b9, #0d3a56)",
                },
              }}
            >
              Send OTP
            </Button>
          </Grid>
        </Grid>
      )}

      {/* STEP 2 — ENTER OTP */}
      {!isValid && !isOtpValid && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 1, fontFamily: "Times New Roman" }}>
              Enter OTP
            </Typography>

            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              label="OTP"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={passwordToggle}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={otpHandler}
              sx={{
                background:
                  "linear-gradient(to right, #0d3a56, #134f6f, #2286b9)",
                color: "#fff",
                "&:hover": {
                  background:
                    "linear-gradient(to right, #134f6f, #2286b9, #0d3a56)",
                },
              }}
            >
              Verify OTP
            </Button>
          </Grid>
        </Grid>
      )}

      {/* STEP 3 — RESET PASSWORD */}
      {isOtpValid && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 1, fontFamily: "Times New Roman" }}>
              Create New Password
            </Typography>

            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              label="New Password"
              name="emp_password"
              value={confirmInput.emp_password}
              onChange={changeHandler}
            />

            <TextField
              fullWidth
              sx={{ mt: 2 }}
              type="password"
              label="Confirm Password"
              name="confirmemp_password"
              value={confirmInput.confirmemp_password}
              onChange={changeHandler}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={confirmSubmitHandler}
              sx={{
                background:
                  "linear-gradient(to right, #0d3a56, #134f6f, #2286b9)",
                color: "#fff",
                "&:hover": {
                  background:
                    "linear-gradient(to right, #134f6f, #2286b9, #0d3a56)",
                },
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      )}
    </Paper>

    {/* SIDE BRAND LOGO */}
    <img
      src="/assets/vensai-logo.png"
      alt="vensai logo"
      height="150px"
      width="300px"
      style={{ marginLeft: "250px" }}
      className="animate-logo"
    />
  </Box>
);

};

export default ForgotempPassword;
