// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import React, { useEffect, useState } from "react";
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import axios, { Axios } from 'axios';
// import { Alert, TextField } from '@mui/material';
// import "../../CSS/LMS_Leaves_Add_Types.css";

// function LMS_Leaves_Add_Types() {
// const [leavesTypeData, setLeavesTypeData] = useState([]);
// const [selectedYear, setSelectedYear] = useState(2024);
// const [leaveTypeForm, setLeaveTypeForm] = useState({
//     leavetypeid: null,
//     leavetype: "",
//     description: "",
//     leaves_per_year: "",
//     leaves_year: ""
// });

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

// useEffect(() => {
//     axios.get("http://192.168.2.120:3003/LMS-Page/get_leave_types_data")
//         .then((res) => {
//             setLeavesTypeData(res.data.data);
//             console.log("Data fetched:", res.data.data);
//         });
// }, []);

// const years = [2013, 2014, 2015, 2016, 2023, 2024, 2025, 2026, 2027, 2028];

// const handleChange = (e) => {
//     const { name, value } = e.target;

//     setLeaveTypeForm(prev => ({
//         ...prev,
//         [name]: value
//     }));
// };

// const insertHandler = () => {
//     const leavetypeid = 157; 

//     const updatedForm = { 
//         ...leaveTypeForm, 
//         leavetypeid, 
//         leaves_per_year: leaveTypeForm.leaves_per_year ? parseInt(leaveTypeForm.leaves_per_year) : 0 
//     };

//     console.log("Form Submitted:", updatedForm); 
// };

// return (
//     <div style={{ width: "100vw", position: "absolute", top: "150px" }}>
//         <Grid container spacing={2}>
//             <Grid item xs={4}>
//                 <Item>
//                     <Item style={{ color: "white", backgroundColor: "lightblue" }}>Add Leave Types</Item>
//                     <Item>
//                         <div>
//                             <table className='add_leave_tbl'>
//                                 <tbody>
//                                     <tr>
//                                         <td style={{ paddingRight: '10px' }}>Leave Type</td>
//                                         <td>
//                                             <FormControl fullWidth style={{ minWidth: 200 }}>
//                                                 <InputLabel id="select-leave-type-label">Select</InputLabel>
//                                                 <Select
//                                                     labelId="select-leave-type-label"
//                                                     id="leavetype"
//                                                     name="leavetype"
//                                                     value={leaveTypeForm.leavetype}
//                                                     onChange={handleChange}
//                                                 >
//                                                     <MenuItem value="">Select</MenuItem>
//                                                     <MenuItem value="Privilege leave">Privilege leave</MenuItem>
//                                                     <MenuItem value="Maternity leave">Maternity leave</MenuItem>
//                                                 </Select>
//                                             </FormControl>
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td>Description</td>
//                                         <td>
//                                             <TextField
//                                                 id="description"
//                                                 multiline
//                                                 name="description"
//                                                 type='text'
//                                                 value={leaveTypeForm.description}
//                                                 onChange={handleChange}
//                                                 rows={4}
//                                                 sx={{ width: "220px" }}
//                                                 variant="outlined"
//                                             />
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td>Leaves Per Year</td>
//                                         <td>
//                                             <TextField
//                                                 id="leaves_per_year"
//                                                 name="leaves_per_year"
//                                                 type="number"
//                                                 value={leaveTypeForm.leaves_per_year}
//                                                 onChange={handleChange}
//                                                 sx={{ width: "220px" }}
//                                                 variant="outlined"
//                                             />
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td>Calendar Year</td>
//                                         <td>
//                                             <FormControl fullWidth style={{ minWidth: 200 }}>
//                                                 <InputLabel id="calendar-year-select-label">Select</InputLabel>
//                                                 <Select
//                                                     labelId="calendar-year-select-label"
//                                                     id="leaves_year"
//                                                     name="leaves_year"
//                                                     value={leaveTypeForm.leaves_year}
//                                                     onChange={handleChange}
//                                                 >
//                                                     {
//                                                         years.map((year, i) => (
//                                                             <MenuItem key={i} value={year}>{year}</MenuItem>
//                                                         ))
//                                                     }
//                                                 </Select>
//                                             </FormControl>
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td colSpan="2" align='center'>
//                                             <button onClick={insertHandler}>Insert</button>
//                                         </td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                     </Item>
//                 </Item>
//             </Grid>
//             <Grid item xs={8}>
//                 <Item>
//                     <Item style={{ backgroundColor: "lightblue", color: "white" }}>Leave Type List</Item>
//                     <Item>
//                         <table className='leaveType_list' width="100%">
//                             <thead>
//                                 <tr>
//                                     <th>Leave Type</th>
//                                     <th>Description</th>
//                                     <th>Calendar Year</th>
//                                     <th>Leaves Per Year</th>
//                                     <th>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {leavesTypeData
//                                     .filter(leave => leave.leaves_year === selectedYear)
//                                     .map((leave) => (
//                                         <tr key={leave.leavetypeid}>
//                                             <td>{leave.leavetype}</td>
//                                             <td>{leave.description}</td>
//                                             <td>{leave.leaves_year}</td>
//                                             <td>{leave.leaves_per_year}</td>
//                                             <td><button>Edit</button></td>
//                                         </tr>
//                                     ))
//                                 }
//                             </tbody>
//                         </table>
//                     </Item>
//                 </Item>
//             </Grid>
//         </Grid>
//     </div>
// );

import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import "../../CSS/LMS_Leaves_Add_Types.css";

function LMS_Leaves_Add_Types() {
    const [leaveTypeForm, setLeaveTypeForm] = useState({
        leavetypeid: null,
        leavetype: "",
        description: "",
        leaves_per_year: null,
        leaves_year: 2025,
    });
    const [currentID, setCurrentID] = useState();
    const [isValid, setIsValid] = useState(false);
    const [leavesTypeData, setLeavesTypeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [leaveTypes, setLeaveTypes] = useState([]);

    // Fetch leave types data from API
    const fetchLeaveTypes = () => {
        setLoading(true);
        axios
            .get("http://192.168.2.120:3003/LMS-Page/get_leave_types_data")
            .then((res) => {
                const data = res.data.data || [];
                setLeavesTypeData(data);

                // Get the last `leavetypeid` and set the next ID
                const lastID = data.length > 0 ? Math.max(...data.map((item) => item.leavetypeid)) : 0;
                setCurrentID(lastID);

                const uniqueLeaveTypes = [...new Set(data.map((item) => item.leavetype))];
                setLeaveTypes(uniqueLeaveTypes);
            })
            .catch((err) => console.error("Error fetching data:", err))
            .finally(() => setLoading(false));
    };

    // Fetch data when component mounts
    useEffect(() => {
        fetchLeaveTypes();
    }, []);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setLeaveTypeForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const insertHandler = () => {
        if (!leaveTypeForm.leavetype || !leaveTypeForm.description || leaveTypeForm.leaves_per_year <= 0) {
            alert("Please fill all fields with valid data.");
            return;
        }

        const newID = currentID + 1;
        const newLeaveType = {
            ...leaveTypeForm,
            leavetypeid: newID,
            leaves_per_year: Number(leaveTypeForm.leaves_per_year),
            leaves_year: Number(leaveTypeForm.leaves_year),
        };

        axios
            .post("http://192.168.2.120:3003/LMS-Page/post_leave_types", newLeaveType)
            .then((res) => {
                // if (res.data.success) {
                    alert("Leave Type Added successfully.");
                    fetchLeaveTypes(); 
                    setLeaveTypeForm({
                        leavetypeid: newID + 1,
                        leavetype: "",
                        description: "",
                        leaves_per_year: "",
                        leaves_year: leaveTypeForm.leaves_year,
                    });
                // } else {
                //     console.error("Failed to insert leave type.");
                // }
            })
            .catch((err) => console.error("Error inserting leave type:", err));
    };

    const EditHandler = (data) => {
        setLeaveTypeForm(data);
        setIsValid(true);
    };

    const updateHandler = () => {
        if (!leaveTypeForm.leavetype || !leaveTypeForm.description || leaveTypeForm.leaves_per_year <= 0) {
            alert("Please fill all fields with valid data.");
            return;
        }

        axios
            .put("http://192.168.2.120:3003/LMS-page/update_leave_type", leaveTypeForm)
            .then(() => {
                alert("Data updated successfully.");
                fetchLeaveTypes(); // Fetch updated data after update
                setIsValid(false);
                setLeaveTypeForm({
                    leavetypeid: currentID,
                    leavetype: "",
                    description: "",
                    leaves_per_year: null,
                    leaves_year: leaveTypeForm.leaves_year,
                });
            })
            .catch((err) => console.error("Error updating leave type:", err));
    };

    const years = [2022, 2023, 2024, 2025, 2026];

    return (
        <React.Fragment>
            <Typography variant="h4" fontWeight="bold" sx={{ color: "primary.main", textAlign: "center", mt: "15px" }}>
                Add Leave Types
            </Typography>
            <div className="container_Leaves">
                <Grid container spacing={3}>
                    {/* Form Section */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <form>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth>
                                                <InputLabel>Leave Type</InputLabel>
                                                <Select name="leavetype" value={leaveTypeForm.leavetype} onChange={changeHandler} label="Leave Type">
                                                    <MenuItem value="">Select</MenuItem>
                                                    {leaveTypes.map((ele, i) => (
                                                        <MenuItem key={i} value={ele}>
                                                            {ele}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Description"
                                                multiline
                                                name="description"
                                                value={leaveTypeForm.description}
                                                onChange={changeHandler}
                                                rows={4}
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Leaves Per Year"
                                                name="leaves_per_year"
                                                type="number"
                                                value={leaveTypeForm.leaves_per_year}
                                                onChange={changeHandler}
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth>
                                                <InputLabel>Calendar Year</InputLabel>
                                                <Select id="leaves_year" name="leaves_year" value={leaveTypeForm.leaves_year} onChange={changeHandler} label="Calendar Year">
                                                    {years.map((year) => (
                                                        <MenuItem key={year} value={year}>
                                                            {year}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} align="center">
                                            <Button onClick={isValid ? updateHandler : insertHandler} variant="contained" className="form_button">
                                                {isValid ? "Update" : "Insert"}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Table Section */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                {loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <table className="leaveType_list">
                                        <thead>
                                            <tr>
                                                <th>Leave Type</th>
                                                <th>Description</th>
                                                <th>Calendar Year</th>
                                                <th>Leaves Per Year</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {leavesTypeData.filter((leave) => leave.leaves_year === leaveTypeForm.leaves_year).map((leave) => (
                                                <tr key={leave.leavetypeid}>
                                                    <td>{leave.leavetype}</td>
                                                    <td>{leave.description}</td>
                                                    <td>{leave.leaves_year}</td>
                                                    <td>{leave.leaves_per_year}</td>
                                                    <td>
                                                        <Button onClick={() => EditHandler(leave)} variant="outlined" className="action_button">
                                                            Edit
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
}

export default LMS_Leaves_Add_Types;



