// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Button from "@mui/material/Button";
// import { TextField } from "@mui/material";
// import DialogContent from '@mui/material/DialogContent';
// import Typography from '@mui/material/Typography';
// import emailjs from '@emailjs/browser';
// import "../../CSS/LeaveFromEmp.css";

// function LeaveFromEmp() {
//     const [leaveType, setLeaveType] = useState([]);
//     const [userLeaves, setUserLeaves] = useState([]);
//     const [isValid, setIsValid] = useState(false);
//     const [departDetails, setDepartmentDetails] = useState({});
//     const [managerDetails, setManagerDetails] = useState({});
//     const [dialogBox, setDialogBox] = useState(false);
//     const [empData, setEmpData] = useState([]);
//     const [leftoverLeaves, setLeftoverLeaves] = useState(0);
//     const [leaveForm, setLeaveForm] = useState({
//         leave_id: "",
//         leave_applied_date: "",
//         fromdate: "",
//         todate: "",
//         leavemode1: "",
//         leavemode2: "",
//         duration: "",
//         reason: "",
//         leavetypeid: "",
//         emp_id: "",
//         privilage_id: ""
//     });

//     const [localStorageData, setLocalStorageData] = useState(() => {
//         const storedData = localStorage.getItem("data");
//         return storedData ? JSON.parse(storedData) : {};
//     });

//     const [leaveCal, setLeaveCal] = useState({
//         sickCal: 0,
//         privilageCal: 0,
//     });

//     useEffect(() => {
//         const storedData = JSON.parse(localStorage.getItem("data"));

//         axios.get(`http://192.168.2.120:3003/LMS-page/get_leave_types?emp_id=${sessionStorage.getItem("emp_id")}&department_id=${storedData?.department_id.toString()}`)
//             .then((res) => {
//                 setLeaveType(res.data?.leaveTypes);
//                 setUserLeaves(res.data?.userLeaves);
//                 setDepartmentDetails(res.data?.departmentDetails[0]);
//                 setManagerDetails(res.data?.managerDetails[0]);

//                 calculateLeaveData(res.data.userLeaves);
//             })
//             .catch(err => console.log(err));

//         axios.get("http://192.168.2.120:3003/employeeDetails/get_status_details").then((res) => {
//             // console.log("hello::",res.data.data[0].emp_first_name);
//             setEmpData(res.data.data);

//         }).catch(err => console.log(err)
//         );

//         const currDate = new Date();
//         setLeaveForm((prev) => ({
//             ...prev,
//             leave_applied_date: `${currDate.getFullYear()}-${String(currDate.getMonth() + 1).padStart(2, '0')}-${String(currDate.getDate()).padStart(2, '0')}`,
//             leave_id: `leave_${Math.floor(Math.random() * 100000)}`
//         }));

//     }, []);
//     // console.log(":::leave_id:::::",leaveForm.leave_id);

//     let TotalSickleaves = 0;
//     let totalPLeaves = 0;
//     const calculateLeaveData = (leaves) => {
//         // Filtering privilege leaves
//         const privilegeLeaves = leaves
//             .filter(leave => leave.leavetypeid === 152)
//             .map(leave => ({
//                 duration: leave.duration,
//                 leaveAppliedDate: leave.leave_applied_date
//             }));
//         console.log("::privilegeLeaves::", privilegeLeaves);

//         // Calculating total leave duration
//         let countData = 0;
//         leaves.forEach(leave => {
//             countData += Number(leave.duration) || 0;
//         });
//         console.log("Total countData (All leaves):::", countData);

//         // Grouping privilege leaves by month
//         const privilegeCountByMonth = {};
//         privilegeLeaves.forEach(leave => {
//             const month = new Date(leave.leaveAppliedDate).getMonth();
//             if (!privilegeCountByMonth[month]) {
//                 privilegeCountByMonth[month] = 0;
//             }
//             privilegeCountByMonth[month]++;
//         });

//         // Calculating total privilege leave duration
//         let pLeaves = 0;
//         privilegeLeaves.forEach(leave => {
//             pLeaves += Number(leave.duration);
//         });
//         console.log("Total Privilege Leaves Duration::", pLeaves);
//         totalPLeaves = pLeaves;

//         // Calculating availed privilege leaves
//         let privilegeCal = 0;
//         let leftover = 0;
//         Object.values(privilegeCountByMonth).forEach(count => {
//             privilegeCal += Math.min(count, 1);
//             leftover += Math.max(count - 1, 0);
//         });
//         console.log("Availed Privilege Leaves::", privilegeCal);
//         console.log("Remaining Privilege Leaves::", pLeaves - privilegeCal);

//         // Calculating total sick leave duration
//         const sickLeavesPerYear = leaveType
//         console.log("sickLeavesPerYear::", sickLeavesPerYear);

//         const calSickDuration = leaves
//             .filter(ele => ele.leavetypeid === 151)
//             .map(ele => Number(ele.duration) || 0)
//             .reduce((acc, cur) => acc + cur, 0);
//         console.log("Total Sick Leaves Duration::", calSickDuration);
//         TotalSickleaves = calSickDuration;

//         // Setting calculated data
//         // const sickLeaveData=leaveType.filter(leave=>leave.leavetypeid === 151)
//         // .map(ele=>ele.leaves_per_year);
//         // console.log("sickLeaveData::",leaveType);

//         setLeaveCal({ sickCal: calSickDuration, privilageCal: privilegeCal });
//         setLeftoverLeaves(leftover);

//         // Log remaining sick leaves
//         console.log("Remaining Sick Leaves::", sickLeavesPerYear - calSickDuration);
//     };

//     const changeHandler = (e) => {
//         const { name, value } = e.target;

//         if (name === "todate" && leaveForm.fromdate) {
//             if (new Date(value) < new Date(leaveForm.fromdate)) {
//                 alert("End Date must be greater than or equal to Start Date.");
//                 return;
//             }
//         }
//         if (name === "fromdate" && leaveForm.todate) {
//             if (new Date(value) > new Date(leaveForm.todate)) {
//                 alert("Start Date must be less than or equal to End Date.");
//                 return;
//             }
//         }
//         if (value === "152") {
//             setIsValid(!isValid);
//         } else {
//             setIsValid(false);
//         }

//         if (value === "153") {
//             setDialogBox(!isValid);
//         }
//         else {
//             setDialogBox(false);
//         }
//         setLeaveForm((prev) => ({ ...prev, [name]: value }));
//     };

//     // const calculateDuration = (fromdate, todate, leavemode1, leavemode2) => {
//     //     const date1 = new Date(fromdate);
//     //     const date2 = new Date(todate);
//     //     const timeDifference = date2 - date1;
//     //     let daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;

//     //     if (leavemode1 === "H") {
//     //         daysDifference -= 0.5;
//     //     }
//     //     if (leavemode2 === "H") {
//     //         daysDifference -= 0.5;
//     //     }

//     //     return daysDifference;
//     // };

//     const calculateDuration = (fromdate, todate, leavemode1, leavemode2) => {
//         const date1 = new Date(fromdate);
//         const date2 = new Date(todate);
//         let daysDifference = 0;

//         // Iterate through each day between fromdate and todate
//         for (let d = new Date(date1); d <= date2; d.setDate(d.getDate() + 1)) {
//             const day = d.getDay(); // Get the day of the week (0 for Sunday, 6 for Saturday)
//             if (day !== 0 && day !== 6) { // Skip Saturdays and Sundays
//                 daysDifference++;
//             }
//         }

//         // Adjust the days difference if the start or end date is a half day
//         if (leavemode1 === "H" && date1.getDay() !== 0 && date1.getDay() !== 6) {
//             daysDifference -= 0.5;
//         }
//         if (leavemode2 === "H" && date2.getDay() !== 0 && date2.getDay() !== 6) {
//             daysDifference -= 0.5;
//         }
//         console.log("daysDifference:::",daysDifference);

//         return daysDifference;
//     };


//     const submitHandler = async () => {
//         try {
//             const leavemode = `${leaveForm.leavemode1}-${leaveForm.leavemode2}`;
//             const duration = calculateDuration(leaveForm.fromdate, leaveForm.todate, leaveForm.leavemode1, leaveForm.leavemode2);
//             const emp_id = leaveForm.emp_id;
//             const status = "Approved";
//             console.log("leave_id::::::::",leaveForm.leave_id);


//             // Check if the sick leave exceeds the yearly limit
//             const sickLeaveLimit = leaveType.find(leave => leave.leavetypeid === 151)?.leaves_per_year || 0;
//             const newSickCal = leaveCal.sickCal + duration;

//             if (leaveForm.leavetypeid === "151" && newSickCal > sickLeaveLimit) {
//                 alert("You have exceeded the allotted sick leaves for the year.");

//             }

//             const updatedLeaveForm = {
//                 ...leaveForm,
//                 leavemode,
//                 duration,
//                 emp_id,
//                 status
//             };

//             delete updatedLeaveForm.leavemode1;
//             delete updatedLeaveForm.leavemode2;

//             await axios.post("http://192.168.2.120:3003/LMS-page/post_leave_form", updatedLeaveForm);
//             alert("Data added successfully");

//             const email = managerDetails?.email;
//             const serviceId = 'service_x1nk02l';
//             const templateId = 'template_yhtpkoc';
//             const userId = 'GV5Di06yHsm2ByopJ';
//             const templateParams = {
//                 reply_to: email,
//                 to_name: managerDetails?.emp_first_name,
//                 from_name: localStorageData?.emp_first_name,
//                 message: leaveForm.reason,
//                 reply_cc: "thullurivamsi25@gmail.com;mr.vamsithulluri25@gmail.com"
//             };

//             await emailjs.send(serviceId, templateId, templateParams, userId);
//             console.log('Email sent successfully!');

//             setLeaveForm({
//                 leave_id: "",
//                 leave_applied_date: "",
//                 fromdate: "",
//                 todate: "",
//                 leavemode1: "",
//                 leavemode2: "",
//                 duration: "",
//                 reason: "",
//                 leavetypeid: "",
//                 emp_id: "",
//                 privilage_id: ""
//             });

//             const res = await axios.get(`http://192.168.2.120:3003/LMS-page/get_leave_types?emp_id=${emp_id}`);
//             setUserLeaves(res.data.userLeaves);
//             calculateLeaveData(res.data.userLeaves);

//         } catch (err) {
//             console.log(err);
//         }
//     };

//     let availedLeaves = 0;
//     const leaveSummaryData = leaveType
//         .filter(leave => !["Workers' Compensation", "Work From Home", "Paternity Leave"].includes(leave.leavetype))
//         .map((leave) => {
//             let availed = leave.leavetypeid === 151
//                 ? leaveCal.sickCal
//                 : leave.leavetypeid === 152
//                     ? leaveCal.privilageCal
//                     : 0;

//             if (availed > leave.leaves_per_year) {
//                 availed = leave.leaves_per_year;
//                 console.log(":::availed ===>", availed);

//             }
//             availedLeaves = availed;
//             const leftOver = Math.max(leave.leaves_per_year - availed, 0);

//             return {
//                 leaveType: leave.leavetype,
//                 allotted: leave.leaves_per_year,
//                 availed,
//                 leftOver,
//             };
//         });
//     console.log("availedLeaves", availedLeaves);


//     return (
//         <div className="leaveFromEmp_container">
//             <div className="headLine_text">
//                 <div>Choose Approver</div>
//                 <div>To Manager: {managerDetails.emp_first_name} - {managerDetails.email}</div>
//                 <div>Apply Leave Form</div>
//             </div>
//             <div className="form_and_approver_container">
//                 <div className="leave_form_container">
//                     <table className="leave_tbl">
//                         <tbody>
//                             <tr>
//                                 <td>User Name</td>
//                                 <td>
//                                     <select name="emp_id" onChange={changeHandler}>
//                                         <option>Select</option>
//                                         {empData.map((ele, i) => (
//                                             <option value={ele.emp_id} key={i}>
//                                                 {ele.emp_first_name}
//                                             </option>
//                                         ))}
//                                     </select>

//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td>Department</td>
//                                 <td>{departDetails?.department_name}</td>
//                             </tr>
//                             <tr>
//                                 <td>
//                                     Type<span className="required">*</span>
//                                 </td>
//                                 <td>
//                                     <select onChange={changeHandler} name="leavetypeid" value={leaveForm?.leavetypeid}>
//                                         <option value="">Select</option>
//                                         {leaveType?.map((ele, i) => (
//                                             <option value={ele?.leavetypeid} key={i}>
//                                                 {ele?.leavetype}
//                                             </option>
//                                         ))}
//                                     </select>
//                                     {dialogBox && (
//                                         <div className="dialog_box">
//                                             <DialogContent dividers>
//                                                 <Typography gutterBottom>
//                                                     "Paternity Leave" needs to be Approved by GOPI CHAND,<br />
//                                                     NOT by your reporting Manager.<br />
//                                                     Your Leave Request will be sent to GOPI CHAND.
//                                                 </Typography>
//                                                 <Button autoFocus onClick={() => setDialogBox(false)}>
//                                                     Ok
//                                                 </Button>
//                                             </DialogContent>
//                                         </div>
//                                     )}
//                                 </td>
//                                 {leaveForm.leavetypeid === "152" && (
//                                     <td className="privilage_select">
//                                         <select name="privilage_id" onChange={changeHandler} value={leaveForm.privilage_id}>
//                                             <option value="">Select</option>
//                                             <option value="1">Privilege</option>
//                                             <option value="2">Emergency</option>
//                                         </select>
//                                     </td>
//                                 )}
//                             </tr>
//                             <tr>
//                                 <td>
//                                     Start Date<span className="required">*</span>
//                                 </td>
//                                 <td>
//                                     <input name="fromdate" onChange={changeHandler} value={leaveForm.fromdate} type="date" />
//                                 </td>
//                                 <td className="leavemode_select">
//                                     <select name="leavemode1" onChange={changeHandler} value={leaveForm.leavemode1}>
//                                         <option value="">Select</option>
//                                         <option value="F">Full Day</option>
//                                         <option value="H">Half Day</option>
//                                     </select>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td>
//                                     End Date<span className="required">*</span>
//                                 </td>
//                                 <td>
//                                     <input name="todate" onChange={changeHandler} value={leaveForm.todate} type="date" />
//                                 </td>
//                                 <td className="leavemode_select">
//                                     <select name="leavemode2" onChange={changeHandler} value={leaveForm.leavemode2}>
//                                         <option value="">Select</option>
//                                         <option value="F">Full Day</option>
//                                         <option value="H">Half Day</option>
//                                     </select>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td>
//                                     Reason<span className="required">*</span>
//                                 </td>
//                                 <td>
//                                     <TextField
//                                         id="outlined-multiline-static"
//                                         multiline
//                                         rows={4}
//                                         className="reason_input"
//                                         required
//                                         name="reason"
//                                         onChange={changeHandler}
//                                         value={leaveForm.reason}
//                                     />
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td></td>
//                                 <td className="button_container">
//                                     <button onClick={submitHandler} className="leave_draft_btn">Grant Leave</button>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="approver_section">
//                     <div className="approval_content_text">
//                         <div className="approvers_heading">Approvers</div>
//                         <span>To: {managerDetails.emp_first_name} - {managerDetails.email}</span>
//                         <div>CC: VINOD KUMAR - hr@vensaiinc.com</div>
//                     </div>
//                     <table className="leave_summary_table" border="1">
//                         <thead>
//                             <tr>
//                                 <th colSpan="4">Leave Summary</th>
//                             </tr>
//                             <tr>
//                                 <th>Leave Type</th>
//                                 <th>Allotted</th>
//                                 <th>Availed</th>
//                                 <th>Left Over</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {leaveSummaryData.map((leave, index) => (
//                                 <tr key={index}>
//                                     <td>{leave.leaveType}</td>
//                                     <td>{leave.allotted}</td>
//                                     <td>{leave.availed}</td>
//                                     <td>{leave.leftOver}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                     <div className="privilege_leave_note">
//                         Note: Privilege Leaves are calculated on a monthly basis. You are eligible
//                         to take only one leave per month. If you exceed more leaves than eligible for
//                         a month, it will be calculated as Loss of Pay.
//                     </div>
//                 </div>
//             </div>
//         </div>

//     );

// }
// export default LeaveFromEmp;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Grid,
  Box,
  Container,
  Divider,
  Card,
  CardHeader,
  CardContent,
  useMediaQuery,
  useTheme,
  TableContainer
} from "@mui/material";
import emailjs from '@emailjs/browser';

function LeaveFromEmp() {
  const [leaveType, setLeaveType] = useState([]);
  const [userLeaves, setUserLeaves] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [departDetails, setDepartmentDetails] = useState({});
  const [managerDetails, setManagerDetails] = useState({});
  const [dialogBox, setDialogBox] = useState(false);
  const [hrInfo, setHrInfo] = useState({});
  const [empData, setEmpData] = useState([]);
  const [leftoverLeaves, setLeftoverLeaves] = useState(0);
  const [leaveForm, setLeaveForm] = useState({
    leave_id: "",
    leave_applied_date: "",
    fromdate: "",
    todate: "",
    leavemode1: "",
    leavemode2: "",
    duration: "",
    reason: "",
    leavetypeid: "",
    emp_id: "",
    privilage_id: ""
  });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [localStorageData, setLocalStorageData] = useState(() => {
    const storedData = localStorage.getItem("data");
    return storedData ? JSON.parse(storedData) : {};
  });

  const [leaveCal, setLeaveCal] = useState({
    sickCal: 0,
    privilageCal: 0,
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("LoginDetails"));
    setLocalStorageData(storedData);

    axios.get(`http://192.168.2.120:3003/LMS-page/get_leave_types?emp_id=${sessionStorage.getItem("emp_id")}&department_id=${storedData?.department_id.toString()}`)
      .then((res) => {
        setLeaveType(res.data?.leaveTypes);
        setUserLeaves(res.data?.userLeaves);
        setDepartmentDetails(res.data?.departmentDetails[0]);
        setManagerDetails(res.data?.managerDetails[0]);
        setHrInfo(res.data?.hrDetails[0]);
        calculateLeaveData(res.data.userLeaves);
      })
      .catch(err => console.log(err));

    axios.get("http://192.168.2.120:3003/employeeDetails/get_status_details").then((res) => {
      setEmpData(res.data.data);
      console.log("res.data.data::::::", res.data.data)
    }).catch(err => console.log(err));

    const currDate = new Date();
    setLeaveForm((prev) => ({
      ...prev,
      leave_applied_date: `${currDate.getFullYear()}-${String(currDate.getMonth() + 1).padStart(2, '0')}-${String(currDate.getDate()).padStart(2, '0')}`,
      leave_id: `leave_${Math.floor(Math.random() * 100000)}`
    }));
  }, []);

  const calculateLeaveData = (leaves) => {
    const privilegeLeaves = leaves
      .filter(leave => leave.leavetypeid === 152)
      .map(leave => ({
        duration: leave.duration,
        leaveAppliedDate: leave.leave_applied_date
      }));

    let countData = 0;
    leaves.forEach(leave => {
      countData += Number(leave.duration) || 0;
    });

    const privilegeCountByMonth = {};
    privilegeLeaves.forEach(leave => {
      const month = new Date(leave.leaveAppliedDate).getMonth();
      if (!privilegeCountByMonth[month]) {
        privilegeCountByMonth[month] = 0;
      }
      privilegeCountByMonth[month]++;
    });

    let pLeaves = 0;
    privilegeLeaves.forEach(leave => {
      pLeaves += Number(leave.duration);
    });

    let privilegeCal = 0;
    let leftover = 0;
    Object.values(privilegeCountByMonth).forEach(count => {
      privilegeCal += Math.min(count, 1);
      leftover += Math.max(count - 1, 0);
    });

    const calSickDuration = leaves
      .filter(ele => ele.leavetypeid === 151)
      .map(ele => Number(ele.duration) || 0)
      .reduce((acc, cur) => acc + cur, 0);

    setLeaveCal({ sickCal: calSickDuration, privilageCal: privilegeCal });
    setLeftoverLeaves(leftover);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "todate" && leaveForm.fromdate) {
      if (new Date(value) < new Date(leaveForm.fromdate)) {
        alert("End Date must be greater than or equal to Start Date.");
        return;
      }
    }
    if (name === "fromdate" && leaveForm.todate) {
      if (new Date(value) > new Date(leaveForm.todate)) {
        alert("Start Date must be less than or equal to End Date.");
        return;
      }
    }
    if (value === 152) {
      setIsValid(!isValid);
    } else {
      setIsValid(false);
    }

    if (value === 153) {
      setDialogBox(!isValid);
    }
    else {
      setDialogBox(false);
    }
    setLeaveForm((prev) => ({ ...prev, [name]: value }));
  };

  const calculateDuration = (fromdate, todate, leavemode1, leavemode2) => {
    const date1 = new Date(fromdate);
    const date2 = new Date(todate);
    let daysDifference = 0;

    for (let d = new Date(date1); d <= date2; d.setDate(d.getDate() + 1)) {
      const day = d.getDay();
      // if (day !== 0 && day !== 6) {
      daysDifference++;
      // }
    }

    // if (leavemode1 === "H" && date1.getDay() !== 0 && date1.getDay() !== 6) {
    //   daysDifference -= 0.5;
    // }
    // if (leavemode2 === "H" && date2.getDay() !== 0 && date2.getDay() !== 6) {
    //   daysDifference -= 0.5;
    // }
    if (leavemode1 === "H") {
      daysDifference -= 0.5;
    }
    if (leavemode2 === "H") {
      daysDifference -= 0.5;
    }

    return daysDifference;
  };

  const empEmail = empData.filter(ele => ele.emp_id === leaveForm.emp_id)
    .map(ele => ele.email);
  console.log("empEmail::::", empEmail)

  const submitHandler = async () => {
    try {
      const leavemode = `${leaveForm.leavemode1}-${leaveForm.leavemode2}`;
      const duration = calculateDuration(leaveForm.fromdate, leaveForm.todate, leaveForm.leavemode1, leaveForm.leavemode2);
      const emp_id = leaveForm.emp_id;
      const status = "Approved";


      const sickLeaveLimit = leaveType.find(leave => leave.leavetypeid === 151)?.leaves_per_year || 0;
      const newSickCal = leaveCal.sickCal + duration;

      if (leaveForm.leavetypeid === 151 && newSickCal > sickLeaveLimit) {
        alert("You have exceeded the allotted sick leaves for the year.");
      }


      const updatedLeaveForm = {
        ...leaveForm,
        leavemode,
        duration,
        emp_id,
        status
      };
      const empEmail = empData.filter(ele => ele.emp_id === leaveForm.emp_id)
        .map(ele => ele.email);
      console.log("empEmail::::", empEmail)

      delete updatedLeaveForm.leavemode1;
      delete updatedLeaveForm.leavemode2;

      await axios.post("http://192.168.2.120:3003/LMS-page/post_leave_form", updatedLeaveForm);
      alert("Data added successfully");

      // const email = managerDetails?.email;
      const email = "hr@vensaiinc.com";
      // const serviceId = 'service_x1nk02l';
      // const templateId = 'template_yhtpkoc';
      // const userId = 'GV5Di06yHsm2ByopJ';
      // const templateParams = {
      //   reply_to: email,
      //   to_name: managerDetails?.emp_first_name,
      //   from_name: localStorageData?.emp_first_name,
      //   message: `From date : ${updatedLeaveForm.fromdate}\nTo date : ${updatedLeaveForm.todate}\nDuration : ${updatedLeaveForm.duration}\n Reason :${updatedLeaveForm.reason}`,
      //   reply_cc: `${empEmail[0]};${hrInfo.email}`
      // };

      const emailInfo = {
        toEmail: email,
        toName: managerDetails?.emp_first_name,
        subject: "Leave Approval Request",
        fromName: localStorageData?.emp_first_name,
        message: `From date : ${updatedLeaveForm.fromdate}\nTo date : ${updatedLeaveForm.todate}\nDuration : ${updatedLeaveForm.duration}\n Reason :${updatedLeaveForm.reason}`,
        ccEmail: `${hrInfo?.email};${localStorageData?.email}`
      };
      await axios.post("http://localhost:3003/autoMail/lms-leaves/", emailInfo).then((res) => {
        console.info("Email sent successfully");
      }).catch(e => console.error(e));
      // await emailjs.send(serviceId, templateId, templateParams, userId);
      // console.log('Email sent successfully!');

      setLeaveForm({
        leave_id: "",
        leave_applied_date: "",
        fromdate: "",
        todate: "",
        leavemode1: "",
        leavemode2: "",
        duration: "",
        reason: "",
        leavetypeid: "",
        emp_id: "",
        privilage_id: ""
      });

      const res = await axios.get(`http://192.168.2.120:3003/LMS-page/get_leave_types?emp_id=${emp_id}`);
      setUserLeaves(res.data.userLeaves);
      calculateLeaveData(res.data.userLeaves);

    } catch (err) {
      console.log(err);
    }
  };

  const leaveSummaryData = leaveType
    .filter(leave => !["Workers' Compensation", "Work From Home", "Paternity Leave"].includes(leave.leavetype))
    .map((leave) => {
      let availed = leave.leavetypeid === 151
        ? leaveCal.sickCal
        : leave.leavetypeid === 152
          ? leaveCal.privilageCal
          : 0;

      if (availed > leave.leaves_per_year) {
        availed = leave.leaves_per_year;
      }
      const leftOver = Math.max(leave.leaves_per_year - availed, 0);

      return {
        leaveType: leave.leavetype,
        allotted: leave.leaves_per_year,
        availed,
        leftOver,
      };
    });



  return (
    <Container sx={{ mt: 1, mb: 4, maxWidth: { xs: '100%', lg: 1400 } }}>
      {/* Header Section */}
      <Card sx={{ mb: 3, boxShadow: 3 }}>
        <CardContent sx={{
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          py: 2
        }}>
          <Typography variant="h6" sx={{ fontFamily: "serif", fontWeight: 600 }}>Choose Approver</Typography>
          <Typography sx={{ fontFamily: "serif", textAlign: 'center' }} variant="h6">
            To Manager: {managerDetails.emp_first_name} - {managerDetails.email}
          </Typography>
          <Typography sx={{ fontFamily: "serif", fontWeight: 600 }} variant="h6">Apply Leave Form</Typography>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Leave Form Section */}
        <Grid item xs={12} md={7}>
          <Card sx={{ boxShadow: 3 }}>
            <CardHeader
              sx={{
                fontFamily: "serif",
                backgroundColor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}
              title="Leave Application Form"
              titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ fontFamily: "serif" }} id="employee-select-label">User Name *</InputLabel>
                    <Select
                      labelId="employee-select-label"
                      name="emp_id"
                      value={leaveForm.emp_id}
                      onChange={changeHandler}
                      label="User Name *"
                      required
                      sx={{ fontFamily: "serif" }}
                    >
                      <MenuItem sx={{ fontFamily: "serif" }} value="">Select</MenuItem>
                      {empData.map((ele, i) => (
                        <MenuItem sx={{ fontFamily: "serif" }} value={ele.emp_id} key={i}>
                          {ele.emp_first_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Department"
                    value={departDetails?.department_name || ''}
                    InputProps={{
                      readOnly: true,
                      sx: { fontFamily: "serif" }
                    }}
                    InputLabelProps={{ sx: { fontFamily: "serif" } }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ fontFamily: "serif" }} id="leave-type-label">Leave Type *</InputLabel>
                    <Select
                      labelId="leave-type-label"
                      name="leavetypeid"
                      value={leaveForm.leavetypeid}
                      onChange={changeHandler}
                      label="Leave Type *"
                      required
                      sx={{ fontFamily: "serif" }}
                    >
                      <MenuItem sx={{ fontFamily: "serif" }} value="">Select</MenuItem>
                      {leaveType?.map((ele, i) => (
                        <MenuItem sx={{ fontFamily: "serif" }} value={ele?.leavetypeid} key={i}>
                          {ele?.leavetype}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {leaveForm.leavetypeid === 152 && (
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ fontFamily: "serif" }} id="privilege-type-label">Privilege Type</InputLabel>
                      <Select
                        sx={{ fontFamily: "serif" }}
                        labelId="privilege-type-label"
                        name="privilage_id"
                        value={leaveForm.privilage_id}
                        onChange={changeHandler}
                        label="Privilege Type"
                      >
                        <MenuItem sx={{ fontFamily: "serif" }} value="">Select</MenuItem>
                        <MenuItem sx={{ fontFamily: "serif" }} value="1">Privilege</MenuItem>
                        <MenuItem sx={{ fontFamily: "serif" }} value="2">Emergency</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Start Date *"
                    type="date"
                    name="fromdate"
                    value={leaveForm.fromdate}
                    onChange={changeHandler}
                    InputLabelProps={{
                      shrink: true,
                      sx: { fontFamily: "serif" }
                    }}
                    inputProps={{ sx: { fontFamily: "serif" } }}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ fontFamily: "serif" }} id="start-mode-label">Start Mode</InputLabel>
                    <Select
                      sx={{ fontFamily: "serif" }}
                      labelId="start-mode-label"
                      name="leavemode1"
                      value={leaveForm.leavemode1}
                      onChange={changeHandler}
                      label="Start Mode"
                    >
                      <MenuItem sx={{ fontFamily: "serif" }} value="">Select</MenuItem>
                      <MenuItem sx={{ fontFamily: "serif" }} value="F">Full Day</MenuItem>
                      <MenuItem sx={{ fontFamily: "serif" }} value="H">Half Day</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="End Date *"
                    type="date"
                    name="todate"
                    value={leaveForm.todate}
                    onChange={changeHandler}
                    InputLabelProps={{
                      shrink: true,
                      sx: { fontFamily: "serif" }
                    }}
                    inputProps={{ sx: { fontFamily: "serif" } }}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ fontFamily: "serif" }} id="end-mode-label">End Mode</InputLabel>
                    <Select
                      sx={{ fontFamily: "serif" }}
                      labelId="end-mode-label"
                      name="leavemode2"
                      value={leaveForm.leavemode2}
                      onChange={changeHandler}
                      label="End Mode"
                    >
                      <MenuItem sx={{ fontFamily: "serif" }} value="">Select</MenuItem>
                      <MenuItem sx={{ fontFamily: "serif" }} value="F">Full Day</MenuItem>
                      <MenuItem sx={{ fontFamily: "serif" }} value="H">Half Day</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Reason *"
                    multiline
                    rows={4}
                    name="reason"
                    value={leaveForm.reason}
                    onChange={changeHandler}
                    required
                    InputLabelProps={{ sx: { fontFamily: "serif" } }}
                    inputProps={{ sx: { fontFamily: "serif" } }}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={submitHandler}
                    fullWidth={isSmallScreen}
                    size="large"
                    sx={{
                      fontFamily: "serif",
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600
                    }}
                  >
                    Grant Leave
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Approver Section */}
        <Grid item xs={12} md={5}>
          <Card sx={{ boxShadow: 3 }}>
            <CardHeader
              sx={{
                fontFamily: "serif",
                backgroundColor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}
              title="Approvers"
              titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
            />
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontFamily: "serif", mb: 1 }} variant="body1">
                  <strong>To:</strong> {managerDetails.emp_first_name} - {managerDetails.email}
                </Typography>
                <Typography sx={{ fontFamily: "serif" }} variant="body1">
                  <strong>CC:</strong> VINOD KUMAR - hr@vensaiinc.com
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography sx={{ fontFamily: "serif", fontWeight: 600, mb: 2 }} variant="h6">
                Leave Summary
              </Typography>

              <TableContainer component={Paper} sx={{ mb: 3, boxShadow: 1 }}>
                <Table>
                  <TableHead sx={{ backgroundColor: 'primary.main' }}>
                    <TableRow>
                      <TableCell sx={{ fontFamily: "serif", color: 'primary.contrastText' }}>Leave Type</TableCell>
                      <TableCell sx={{ fontFamily: "serif", color: 'primary.contrastText' }} align="right">Allotted</TableCell>
                      <TableCell sx={{ fontFamily: "serif", color: 'primary.contrastText' }} align="right">Availed</TableCell>
                      <TableCell sx={{ fontFamily: "serif", color: 'primary.contrastText' }} align="right">Left Over</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leaveSummaryData.map((leave, index) => (
                      <TableRow key={index} hover>
                        <TableCell sx={{ fontFamily: "serif" }}>{leave.leaveType}</TableCell>
                        <TableCell sx={{ fontFamily: "serif" }} align="right">{leave.allotted}</TableCell>
                        <TableCell sx={{ fontFamily: "serif" }} align="right">{leave.availed}</TableCell>
                        <TableCell sx={{ fontFamily: "serif" }} align="right">{leave.leftOver}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontStyle: 'italic',
                  fontFamily: "serif",
                  p: 2,
                  backgroundColor: 'background.default',
                  borderRadius: 1
                }}
              >
                Note: Privilege Leaves are calculated on a monthly basis. You are eligible
                to take only one leave per month. If you exceed more leaves than eligible for
                a month, it will be calculated as Loss of Pay.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Paternity Leave Dialog */}
      <Dialog open={dialogBox} onClose={() => setDialogBox(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontFamily: "serif", fontWeight: 600 }}>Paternity Leave Approval</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontFamily: "serif", mt: 1 }} paragraph>
            "Paternity Leave" needs to be Approved by GOPI CHAND,
            NOT by your reporting Manager.
            Your Leave Request will be sent to GOPI CHAND.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialogBox(false)}
            sx={{ fontFamily: "serif" }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default LeaveFromEmp;