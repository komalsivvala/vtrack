import React, { useEffect, useState } from 'react';
import "../CSS/Header.css";
import { useNavigate } from 'react-router-dom';
import { IoIosHome } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { FaSignOutAlt } from "react-icons/fa";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { TfiPowerOff } from "react-icons/tfi";
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import axios from 'axios';
// import LogoutIcon from '@mui/icons-material/Logout';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const Header = () => {
    const nav = useNavigate()
    const dispatch = useDispatch();
    const [role, setRole] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [emp_id, setEmp_id] = useState("");
    const [empName,setEmpName]=useState("");
    // const [homePath,setHomePath]=useState([]);

    const [currentTime, setCurrentTime] = useState(new Date());
    // const homepath=useSelector(state=>state.homepath);
    // useEffect(()=>{
    //     setHomePath(...homePath,homePath);
    //     console.log("homepath>>>>>>>>",homepath)
    // },[homepath])

    const updateTime = () => {
      setCurrentTime(new Date());
    };
  
    useEffect(() => {
      const interval = setInterval(updateTime, 1000); 
      return () => clearInterval(interval); 
    }, []);


    const Clicked = () => {
        const loc = window.location.pathname;
        console.log("path:::::;====>",loc)
        
        if (loc.includes("LMS-page")) {
            console.log("HEllo I`m inside ....")
            nav("/home-page");
        } else {
            window.history.back();
        }
    };
    const Signout = () => {
        localStorage.clear();
        if (window.confirm("Are you sure?")) {
            sessionStorage.clear();
            nav('/')
        }

    }
    // let roleData="";
    useEffect(() => {
        setRole(sessionStorage.getItem("role"));
        setEmp_id(sessionStorage.getItem("emp_id"));
        console.log("::::::::::::::::::",localStorage.getItem("LoginDetails"));
        const  empName= JSON.parse(localStorage.getItem("LoginDetails"));
        // console.log("empName.emp_first_name::",empName.emp_first_name);
        setEmpName(empName?.emp_first_name || "");
        console.log("Current location:::",window.location.pathname);
    }, [])
    const profileViewBtnHandler = () => {
        
        setIsValid(!isValid);
    }

    const handleView = async () => {
        try {
            const response = await axios.get(`http://localhost:3003/employeeDetails/get_emp_details?emp_id=${emp_id}`);
            //    console.log("response data",response.data);
            dispatch({ type: "DETAILS", payload: response.data })
            nav("/ViewProfile");
        }
        catch (e) {
            console.log(e);
        }
    }

    const skillSetHandler = () => {
        try{
            nav("/skillsetForm");
            dispatch({type:"SKILL_SET_DATA",payload:{}})
            // console.log("clicked")
            // window.history.back();
        }
        catch(e){
            console.log(e);
            
        }
        
    }
    const handleEdit=()=>{        
      axios.get(`http://localhost:3003/employeeDetails/get_skill_set_form?emp_id=${emp_id}`).then((res)=>{
          console.log("::",res?.data.data[0]);
          dispatch({type:"SKILL_SET_DATA",payload:res?.data.data[0]})
      }).catch(e=>console.log(e)
      )
    }
    // console.log("roleData:::",roleData)
    return (
        <div className='Header-p'>
            <div className='Header-logo'>
                <img height="70px" width="150px" src="/assets/vensai-logo.png" alt='logo-image' />
            </div>
            <div className='Header-btn'>
                <table>
                    <tbody>
                        <tr>
                            <td>{empName}</td>
                            <td><button className='btn-1' onClick={Clicked} ><IoIosHome /> </button></td>
                        </tr>
                        <tr>
                            <td>{currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}</td>
                            <td>
                            <button className='btn-2' onClick={role === "hr" ? Signout : window.location.pathname==="/skillsetForm"? profileViewBtnHandler:Signout }>{role === "hr" ? <PowerSettingsNewIcon sx={{fontSize:"14px"}} /> : window.location.pathname==="/skillsetForm" ?  <ManageAccountsIcon />:<PowerSettingsNewIcon  sx={{fontSize:"14px"}} />}</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                  <div style={{ position: "absolute", right: "30px", top: "93px" }}>
                    {
                        isValid && <div>
                            <Card sx={{ minWidth: 180 }}>
                                <CardActions>
                                    <Button size="small" onClick={handleView}><RemoveRedEyeIcon style={{ color: "black", paddingRight: "10px" }} />View profile</Button>
                                </CardActions>
                                <CardActions>
                                    <Button size="small" onClick={handleEdit}><AppRegistrationIcon style={{ color: "black", paddingRight: "10px" }} />Edit</Button>
                                </CardActions>
                                <CardActions>
                                    <Button size="small" onClick={Signout}><TfiPowerOff style={{ color: "black", paddingRight: "10px" }} />Signout</Button>
                                </CardActions>
                            </Card>
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default Header;
