import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import "../../CSS/HomePage.css";
import Footer from "../../Components/Footer";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const HomePage = () => {
    const [role, setRole] = useState("");
const dispatch=useDispatch();
    useEffect(() => {
        setRole(sessionStorage.getItem("role"));
    }, []);

    let homePath = "/LMS-home";
    if (role === "admin") {
        homePath = "/LMS-page/LMS-Admin";
    } else if (role === "manager") {
        console.log("Manager Role Detected");
        homePath = "/LMS-page/LMS-Manager";
        console.log("homePath:", homePath);
    }
    else if(role==="hr"){
        homePath="/LMS-page/LMS-home";
    }
    else{
        homePath="/LMS-page/LMS-home";
    }
    const clickHandler = () => {
        dispatch({ type: "HOMEPATH", payload: homePath });
        console.log("path=====>", homePath);
    }
    return (
        <div>
            <Header />
            <div className="content_p">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <Tooltip title="Employee management service" arrow>
                                    <Link to={role === "hr" || role === "admin" ? "/home" : "/skillsetForm"}>
                                        <img
                                            height="140px"
                                            width="170px"
                                            src="/assets/employee-management.png"
                                            alt="Employee management service image"
                                        />
                                    </Link>
                                </Tooltip>
                            </td>
                            <td>
                                <Tooltip title="Leave Management service" arrow>
                                    <Link onClick={clickHandler} to={homePath}>
                                        <img
                                            height="130px"
                                            width="130px"
                                            src="/assets/calendar_img.png"
                                            alt="v-pat image"
                                        />
                                    </Link>
                                </Tooltip>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
