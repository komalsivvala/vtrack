import React, { useEffect, useState } from "react";
import "../CSS/ForgotPwd.css";
import emailjs from '@emailjs/browser';
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        <div className="card-p">
            <div className="card1">
                <div>
                    <img height="250px" marginLeft="60px" style={{position: "absolute"}} src="/assets/vtrack-logo.png" alt="Vtrack logo" />
                </div>
                {isOtpValid ? (
                    <>
                        <strong style={{ fontFamily: "cursive", position: "absolute", top: "330px", marginLeft: "90px" }}>Create new Password</strong>
                        <div>
                            <table align="center" style={{ position: "absolute", top: "370px", marginLeft: "60px" }}>
                                <thead></thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input
                                                type={showPassword ?"text":"password"}
                                                value={confirmInput.emp_password}
                                                name="emp_password"
                                                style={{
                                                    height: "25px",
                                                    fontWeight: "bolder",
                                                    width: "220px",
                                                    fontFamily: "'Times New Roman', Times, serif"
                                                }}
                                                onChange={changeHandler}
                                                placeholder="New password"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input
                                                type="password"
                                                name="confirmemp_password"
                                                value={confirmInput.confirmemp_password}
                                                style={{
                                                    height: "25px",
                                                    fontWeight: "bolder",
                                                    width: "220px",
                                                    fontFamily: "'Times New Roman', Times, serif"
                                                }}
                                                onChange={changeHandler}
                                                placeholder="Confirm password"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="checkbox" checked={showPassword} onClick={passwordToggle}/>Show password
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button
                                                onClick={confirmSubmitHandler}
                                                style={{
                                                    width: "227px",
                                                    padding: "5px",
                                                    backgroundColor: "rgb(46, 133, 233)",
                                                    color: "white",
                                                    borderStyle: "none",
                                                    fontFamily: "'Times New Roman', Times, serif",
                                                    fontWeight: "bolder"
                                                }}
                                            >
                                                Submit
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    isValid ? (
                        <>
                            <strong style={{ fontFamily: "times new roman", position: "absolute", top: "350px", marginLeft: "70px" }}>Enter your registered email id</strong>
                            <table align="center" style={{ position: "absolute", top: "370px", marginLeft: "60px" }}>
                                <thead></thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input
                                                required
                                                onChange={(e) => setEmpId(e.target.value)}
                                                value={empId}
                                                style={{
                                                    height: "25px",
                                                    fontWeight: "bolder",
                                                    width: "220px",
                                                    fontFamily: "'Times New Roman', Times, serif"
                                                }}
                                                type="text"
                                                placeholder="Employee id"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button
                                                onClick={submitHandler}
                                                style={{
                                                    width: "227px",
                                                    padding: "5px",
                                                    backgroundColor: "rgb(46, 133, 233)",
                                                    color: "white",
                                                    borderStyle: "none",
                                                    fontFamily: "'Times New Roman', Times, serif",
                                                    fontWeight: "bolder"
                                                }}
                                            >
                                                Submit
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <>
                            <strong style={{ fontFamily: "cursive", position: "absolute", top: "330px", marginLeft: "120px" }}>Enter OTP</strong>
                            <table align="center" style={{ position: "absolute", top: "370px", marginLeft: "60px" }}>
                                <thead></thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input
                                                type={showPassword ?"text":"password"}
                                                name="otp"
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                style={{
                                                    height: "25px",
                                                    fontWeight: "bolder",
                                                    width: "220px",
                                                    fontFamily: "'Times New Roman', Times, serif"
                                                }}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{fontFamily:"fantasy"}}>
                                            <input type="checkbox" checked={showPassword} onClick={passwordToggle}/>Show OTP
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button
                                                onClick={otpHandler}
                                                style={{
                                                    width: "227px",
                                                    padding: "5px",
                                                    backgroundColor: "rgb(46, 133, 233)",
                                                    color: "white",
                                                    borderStyle: "none",
                                                    fontFamily: "'Times New Roman', Times, serif",
                                                    fontWeight: "bolder"
                                                }}
                                            >
                                                Submit
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    )
                )}
            </div>
        </div>
    );
};

export default ForgotempPassword;
