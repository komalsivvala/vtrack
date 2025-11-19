// import React, { useState } from "react";
// import "../../CSS/LMSPage.css";
// import Footer from "../../Components/Footer";
// import Header from "../../Components/Header";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';

// const LMSPage = () => {
//     const role = sessionStorage.getItem("role");
//     const [isValid,setIsValid]=useState(false);

//     const [selectedOption, setSelectedOption] = useState("");
//     const navigate = useNavigate();

//     let homePath = "LMS-home";

//     if (role === "admin") {
//         homePath = "LMS-Admin";
//     } else if (role === "manager") {
//         homePath = "LMS-Manager";
//     }

//     const handleChange = (event) => {
//         setSelectedOption(event.target.value);
//         navigate(event.target.value);
//     };

//     function mouseOVerHandler(){
//         setIsValid(true)
//     }


//     return (
//         <>
//             <Header />
//             <div  style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
//                 <section className="Menu_bar_p">
//                     <div>
//                         <ul className="menu_bar">
//                             <li style={{ padding: "7px" }}>
//                                 <Link style={{ fontSize: "15px" }} to={homePath}>
//                                     Home
//                                 </Link>
//                             </li>

//                             {role === "hr" && (
//                                 <>
//                                 <li>
//                                     <Link style={{ fontSize: "15px" }} to="LMS-leaveFromEmp">
//                                         Leave for Employee
//                                     </Link>
//                                 </li>
//                                 <li style={{ padding: "7px" }}>
//                                 <Link style={{ fontSize: "15px" }} to="LMS-UploadDoc">
//                                     Upload Document
//                                 </Link>
//                             </li>
//                                 </>
//                             )}

//                             {role === "manager" && (
//                                 <li>
//                                     <FormControl sx={{ m: 0 }} size="small">
//                                         <Select
//                                             value={selectedOption}
//                                             onChange={handleChange}
//                                             displayEmpty
//                                             sx={{
//                                                 fontSize: "13px",

//                                                 '& .MuiOutlinedInput-notchedOutline': {
//                                                     border: 0,
//                                                 },
//                                                 '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                                                     border: 0,
//                                                 },
//                                             }}
//                                             inputProps={{ 'aria-label': 'Without label' }}
//                                         >
//                                             <MenuItem value="">
//                                                 Select
//                                             </MenuItem>
//                                             <MenuItem value="LMS-leaveFromEmp">Leave for team</MenuItem>
//                                             <MenuItem value="LMS-home">Apply Leave</MenuItem>
//                                         </Select>
//                                     </FormControl>
//                                 </li>
//                             )}

//                             {role === "admin" ? (
//                                 <>
//                                 <li  onClick={()=>setIsValid(false)} style={{ padding: "7px", position: "relative" }}>
//                                 <Link  onMouseOver={mouseOVerHandler} style={{fontSize:"15px"}} className={isValid ?"leave_report_Data_hover":"leave_report_Data"} to="LMS-Leaves-Add">
//                                   Leave
//                                 </Link>
//                                 <ul className="dropdown-content">
//                                   <li><Link onClick={()=>setIsValid(false)} to="LMS-Yearly-Report" className="leave_report">Employees Leave Report</Link></li>
//                                   <li><Link onClick={()=>setIsValid(false)} className="leave_report" to="LMS-leaveReport">Employees Monthly Report</Link></li>
//                                 </ul>
//                               </li>
//                               <li style={{ padding: "7px", position: "relative" }}>
//                                 <Link style={{fontSize:"15px"}} to="LMS-LeaveTransaction">Leave Transaction</Link>
//                               </li>
//                               <li style={{ padding: "7px" }}>
//                                 <Link style={{ fontSize: "15px" }} to="LMS-UploadDoc">
//                                     Upload Document
//                                 </Link>
//                             </li>
//                                 </>


//                             ) : (
//                                 <>
//                                 <li style={{ padding: "7px" }}>
//                                     <Link style={{ fontSize: "15px" }} to="LMS-leaveReport">
//                                         Leave report
//                                     </Link>
//                                 </li>
//                                 <li style={{ padding: "7px" }}>
//                                 <Link style={{ fontSize: "15px" }} to="LMS-LeaveTransaction">
//                                     Leave Transaction
//                                 </Link>
//                             </li>

//                                 </>
//                             )}
//                         </ul>
//                     </div>
//                 </section>
//                 <Outlet />
//                 <Footer />
//             </div>
//         </>
//     );
// };

// export default LMSPage;



import React, { useState } from "react";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FormControl,
  Select,
  MenuItem,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const LMSPage = () => {
  const role = sessionStorage.getItem("role");
  const [isValid, setIsValid] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  let homePath = "LMS-home";

  if (role === "admin") {
    homePath = "LMS-Admin";
  } else if (role === "manager") {
    homePath = "LMS-Manager";
  }

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    navigate(event.target.value);
  };

  const mouseOverHandler = () => {
    setIsValid(true);
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          backgroundColor: "white",
          width: "100%",
          minHeight: "100vh",
          position: "relative",
          top: "90px",
        }}
      >
        <Box component="nav" sx={{ backgroundColor: "rgb(236, 236, 236)" }}>
          <List sx={{ display: "flex", flexWrap: "wrap", padding: 0 }}>
            <ListItem sx={{ width: "auto" }}>
              <Link to={homePath} style={{ textDecoration: "none" }}>
                <ListItemText
                  primary="Home"
                  primaryTypographyProps={{ style: { fontSize: "12px" } }}
                />
              </Link>
            </ListItem>

            {role === "hr" && (
              <>
                <ListItem sx={{ width: "auto" }}>
                  <Link to="LMS-leaveFromEmp" style={{ textDecoration: "none" }}>
                    <ListItemText
                      primary="Leave for Employee"
                      primaryTypographyProps={{ style: { fontSize: "12px" } }}
                    />
                  </Link>
                </ListItem>
                <ListItem sx={{ width: "auto" }}>
                  <Link to="LMS-UploadDoc" style={{ textDecoration: "none" }}>
                    <ListItemText
                      primary="Upload Document"
                      primaryTypographyProps={{ style: { fontSize: "12px" } }}
                    />
                  </Link>
                </ListItem>
              </>
            )}

            {role === "manager" && (
              <ListItem sx={{ width: "auto" }}>
                <FormControl size="small">
                  <Select
                    value={selectedOption}
                    onChange={handleChange}
                    displayEmpty
                    sx={{ fontSize: "12px" }}
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="LMS-leaveFromEmp">Leave for team</MenuItem>
                    <MenuItem value="LMS-home">Apply Leave</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
            )}

            {role === "admin" && (
              <>
                <ListItem
                  sx={{ width: "auto", position: "relative" }}
                  onMouseOver={mouseOverHandler}
                  onMouseLeave={() => setIsValid(false)}
                >
                  <Link style={{ textDecoration: "none" }}>
                    <ListItemText
                      primary="Leave"
                      primaryTypographyProps={{ style: { fontSize: "12px" } }}
                    />
                  </Link>
                  {isValid && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        backgroundColor: "rgb(236, 236, 236)",
                        boxShadow: 3,
                        zIndex: 10,
                        width: 230,
                      }}
                    >
                      <List>
                        <ListItem>
                          <Link
                            to="LMS-Leaves-Add"
                            style={{ textDecoration: "none" }}
                          >
                            <ListItemText
                              primary="Add Leaves"
                              primaryTypographyProps={{
                                style: { fontSize: "12px" },
                              }}
                            />
                          </Link>
                        </ListItem>
                        <ListItem>
                          <Link
                            to="LMS-Yearly-Report"
                            style={{ textDecoration: "none" }}
                          >
                            <ListItemText
                              primary="Employees Leave Report"
                              primaryTypographyProps={{
                                style: { fontSize: "12px" },
                              }}
                            />
                          </Link>
                        </ListItem>
                        <ListItem>
                          <Link
                            to="LMS-leaveReport"
                            style={{ textDecoration: "none" }}
                          >
                            <ListItemText
                              primary="Employees Monthly Report"
                              primaryTypographyProps={{
                                style: { fontSize: "12px" },
                              }}
                            />
                          </Link>
                        </ListItem>
                      </List>
                    </Box>
                  )}
                </ListItem>
                <ListItem sx={{ width: "auto" }}>
                  <Link
                    to="LMS-LeaveTransaction"
                    style={{ textDecoration: "none" }}
                  >
                    <ListItemText
                      primary="Leave Transaction"
                      primaryTypographyProps={{
                        style: { fontSize: "12px" },
                      }}
                    />
                  </Link>
                </ListItem>
                <ListItem sx={{ width: "auto" }}>
                  <Link to="LMS-UploadDoc" style={{ textDecoration: "none" }}>
                    <ListItemText
                      primary="Upload Document"
                      primaryTypographyProps={{
                        style: { fontSize: "12px" },
                      }}
                    />
                  </Link>
                </ListItem>
              </>
            )}

            {role !== "admin" && (
              <>
                <ListItem sx={{ width: "auto" }}>
                  <Link to="LMS-leaveReport" style={{ textDecoration: "none" }}>
                    <ListItemText
                      primary="Leave Report"
                      primaryTypographyProps={{
                        style: { fontSize: "12px" },
                      }}
                    />
                  </Link>
                </ListItem>
                <ListItem sx={{ width: "auto" }}>
                  <Link
                    to="LMS-LeaveTransaction"
                    style={{ textDecoration: "none" }}
                  >
                    <ListItemText
                      primary="Leave Transaction"
                      primaryTypographyProps={{
                        style: { fontSize: "12px" },
                      }}
                    />
                  </Link>
                </ListItem>
              </>
            )}
          </List>
        </Box>

        <Outlet />
        <Footer />
      </Box>
    </>
  );
};

export default LMSPage;

