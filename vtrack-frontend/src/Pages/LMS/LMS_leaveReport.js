import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Button,
    Card,
    CardContent,
} from "@mui/material";
import "../../CSS/Leave_report.css";

function LMS_leaveReport() {
    const [employee, setEmployee] = useState('');
    const [recordsPerPage, setRecordsPerPage] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [leaveData, setLeaveData] = useState([]);
    const [generateClicked, setGenerateClicked] = useState(false);
    const [localStorageData, setLocalStorageData] = useState({});
    const [empData, setEmpData] = useState([]);


    const years = [2022, 2023, 2024, 2025];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleGenerateClick = async () => {
        if (!employee || !year || !month) return;
        const selectedData = {
            employee,
            recordsPerPage,
            year: Number(year),
            month: Number(month),
        };
        try {
            const res = await axios.post(
                "http://192.168.2.120:3003/LMS-page/leave_monthly_generator",
                selectedData
            );
            // Assume processLeaveData processes data
            processLeaveData(
                res.data.user_leaves,
                res.data.leave_types,
                res.data.userLeavesData
            );
            //   setGenerateClicked(true);
        } catch (error) {
            console.error("Error generating the report", error);
        }
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("LoginDetails"));
        setLocalStorageData(data || {});

        axios
            .get("http://192.168.2.120:3003/employeeDetails/get_status_details")
            .then((res) => setEmpData(res.data.data))
            .catch((err) => console.log(err));
    }, []);

    // const processLeaveData = (userLeaves, leaveTypes, userLeavesData) => {
    //     let newLeaveData = [];

    //     // Function to update or add leave data
    //     const updateLeaveData = (leaveType, allotted, availed, eligible, lossOfPay, leftOver) => {
    //         const existingLeave = newLeaveData.find(leave => leave.type === leaveType);
    //         if (existingLeave) {
    //             existingLeave.alloted = allotted;
    //             existingLeave.availed = availed;
    //             existingLeave.eligible = eligible;
    //             existingLeave.lossOfPay = lossOfPay;
    //             existingLeave.leftOver = leftOver;
    //         } else {
    //             newLeaveData.push({
    //                 type: leaveType,
    //                 alloted: allotted,
    //                 availed: availed,
    //                 eligible: eligible,
    //                 lossOfPay: lossOfPay,
    //                 leftOver: leftOver,
    //             });
    //         }
    //     };

    //     const privilegeLeaveType = leaveTypes.find(type => type.leavetype === 'Privilege Leave');
    //     if (privilegeLeaveType) {
    //         const privilegeLeaveTypeId = privilegeLeaveType.leavetypeid;
    //         const pUserLeavesData = userLeavesData
    //             .filter(leave => leave.leavetypeid === privilegeLeaveTypeId)
    //             .map(leave => ({
    //                 duration: leave.duration,
    //                 leaveAppliedDate: leave.fromdate
    //             })) || [];

    //         const privilegeCountByMonthData = Array(12).fill(0);
    //         pUserLeavesData.forEach(leave => {
    //             const monthIndex = new Date(leave.leaveAppliedDate).getMonth();
    //             privilegeCountByMonthData[monthIndex] += 1;
    //         });

    //         let carryForwardLeaves = 0;
    //         let eligibleLeaves = 0;
    //         let availedLeaves = 0;
    //         let lossOfPay = 0;

    //         for (let i = 0; i < Number(month); i++) {
    //             const leavesTaken = privilegeCountByMonthData[i];

    //             if (leavesTaken > 0) {
    //                 availedLeaves += leavesTaken;
    //                 if (carryForwardLeaves > 0) {
    //                     const usedCarryForward = Math.min(leavesTaken, carryForwardLeaves);
    //                     carryForwardLeaves -= usedCarryForward;
    //                     eligibleLeaves -= usedCarryForward;
    //                 }
    //                 eligibleLeaves -= leavesTaken;
    //             } else {
    //                 carryForwardLeaves += 1;
    //             }

    //             eligibleLeaves = month - availedLeaves;
    //         }

    //         if (eligibleLeaves < 0) {
    //             lossOfPay = Math.abs(eligibleLeaves);
    //             eligibleLeaves = 0;
    //         }

    //         let totalAllottedLeaves = privilegeLeaveType.leaves_per_year;
    //         let leftOverLeaves = totalAllottedLeaves - availedLeaves;
    //         if (availedLeaves > month) {
    //             availedLeaves = availedLeaves - lossOfPay;
    //             leftOverLeaves = totalAllottedLeaves - availedLeaves;
    //         }

    //         updateLeaveData(
    //             privilegeLeaveType.leavetype,
    //             totalAllottedLeaves,
    //             availedLeaves,
    //             eligibleLeaves,
    //             lossOfPay,
    //             leftOverLeaves > 0 ? leftOverLeaves : 0
    //         );
    //     }

    //     const sickLeaveType = leaveTypes.find(type => type.leavetype === 'Sick Leave');
    //     if (sickLeaveType) {
    //         const sickLeaveTypeId = sickLeaveType.leavetypeid;
    //         const sickLeaves = userLeavesData.filter(leave => leave.leavetypeid === sickLeaveTypeId);
    //         let availedLeaves = sickLeaves.reduce((acc, leave) => acc + leave.duration, 0);

    //         const allotted = 4;
    //         const firstHalfAllotment = 2;
    //         const secondHalfAllotment = 2;
    //         let eligibleLeaves = 0;
    //         let lossOfPay = 0;
    //         let carryForward = 0;
    //         let cf = 0;

    //         const firstHalfAvailed = sickLeaves.filter(leave => new Date(leave.fromdate).getMonth() < 6)
    //             .reduce((acc, leave) => acc + leave.duration, 0);

    //         const monthlySickLeave = sickLeaves
    //             .filter(leave => {
    //                 const leaveMonth = new Date(leave.fromdate).getMonth();
    //                 return leaveMonth <= month - 1;
    //             })
    //             .reduce((acc, leave) => acc + leave.duration, 0);

    //         if (month <= 6) {



    //             console.log("::Cumulative sick leaves from January to selected month::", monthlySickLeave);




    //             // if(getAvailedLeavesForMonth(month) >0){
    //             //     cf +=  getAvailedLeavesForMonth(month);
    //             // }
    //             // console.log("getAvailedLeavesForMonth::", cf);

    //             eligibleLeaves = firstHalfAllotment - monthlySickLeave;
    //             eligibleLeaves = eligibleLeaves > 2 || eligibleLeaves < 0 ? 0 : eligibleLeaves
    //             availedLeaves = eligibleLeaves - monthlySickLeave;
    //             availedLeaves = availedLeaves > 2 ? 2 : monthlySickLeave;
    //             if (monthlySickLeave > firstHalfAllotment) {
    //                 lossOfPay += monthlySickLeave - firstHalfAllotment;
    //             }
    //         } else if (month >= 6) {
    //             carryForward = Math.max(0, firstHalfAllotment - firstHalfAvailed);
    //             eligibleLeaves = secondHalfAllotment + carryForward;
    //             availedLeaves = availedLeaves > 4 ? 4 : availedLeaves;
    //             const secondHalfAvailed = sickLeaves.filter(leave => new Date(leave.fromdate).getMonth() >= 6)
    //                 .reduce((acc, leave) => acc + leave.duration, 0);
    //             eligibleLeaves = eligibleLeaves - secondHalfAvailed;
    //             eligibleLeaves = eligibleLeaves > 4 ? 4 : 0;
    //             availedLeaves = eligibleLeaves - availedLeaves;
    //             availedLeaves = availedLeaves > 4 || availedLeaves < 0 ? 4 : availedLeaves;

    //             if (secondHalfAvailed > secondHalfAllotment + carryForward) {
    //                 lossOfPay += secondHalfAvailed - (secondHalfAllotment + carryForward);
    //             }
    //         }

    //         updateLeaveData(
    //             sickLeaveType.leavetype,
    //             allotted,
    //             availedLeaves,
    //             eligibleLeaves,
    //             lossOfPay,
    //             availedLeaves <= allotted ? allotted - availedLeaves : 0
    //         );
    //     }

    //     const paternityLeaveType = leaveTypes.find(type => type.leavetype === 'Paternity Leave');
    //     if (paternityLeaveType) {
    //         const paternityLeaveTypeId = paternityLeaveType.leavetypeid;
    //         const paternityLeaves = userLeavesData.filter(leave => leave.leavetypeid === paternityLeaveTypeId);
    //         const availedLeaves = paternityLeaves.reduce((acc, leave) => acc + leave.duration, 0);

    //         const allotted = paternityLeaveType.leaves_per_year;
    //         updateLeaveData(
    //             paternityLeaveType.leavetype,
    //             allotted,
    //             availedLeaves,
    //             availedLeaves <= allotted ? allotted - availedLeaves : 0,
    //             availedLeaves > allotted ? availedLeaves - allotted : 0,
    //             availedLeaves <= allotted ? allotted - availedLeaves : 0
    //         );
    //     }

    //     const compensationLeaveType = leaveTypes.find(type => type.leavetype === "Workers' Compensation");
    //     if (compensationLeaveType) {
    //         const compensationLeaveTypeId = compensationLeaveType.leavetypeid;
    //         const compensationLeaves = userLeavesData.filter(leave => leave.leavetypeid === compensationLeaveTypeId);
    //         const availedLeaves = compensationLeaves.reduce((acc, leave) => acc + leave.duration, 0);

    //         const allotted = compensationLeaveType.leaves_per_year;

    //         updateLeaveData(
    //             compensationLeaveType.leavetype,
    //             allotted,
    //             availedLeaves,
    //             availedLeaves <= allotted ? allotted - availedLeaves : 0,
    //             0,
    //             availedLeaves <= allotted ? allotted - availedLeaves : 0
    //         );
    //     }

    //     const workFromHomeType = leaveTypes.find(type => type.leavetype === 'Work from Home');
    //     if (workFromHomeType) {
    //         const workFromHomeTypeId = workFromHomeType.leavetypeid;
    //         const workFromHomeLeaves = userLeavesData.filter(leave => leave.leavetypeid === workFromHomeTypeId);
    //         const availedLeaves = workFromHomeLeaves.reduce((acc, leave) => acc + leave.duration, 0);

    //         updateLeaveData(
    //             workFromHomeType.leavetype,
    //             "N/A",
    //             availedLeaves,
    //             "N/A",
    //             0,
    //             "N/A"
    //         );
    //     }

    //     setLeaveData(newLeaveData);
    // };

    const processLeaveData = (userLeaves, leaveTypes, userLeavesData) => {
        let newLeaveData = [];

        // Function to update or add leave data
        const updateLeaveData = (leaveType, allotted, availed, eligible, lossOfPay, leftOver) => {
            const existingLeave = newLeaveData.find(leave => leave.type === leaveType);
            if (existingLeave) {
                existingLeave.alloted = allotted;
                existingLeave.availed = availed;
                existingLeave.eligible = eligible;
                existingLeave.lossOfPay = lossOfPay;
                existingLeave.leftOver = leftOver;
            } else {
                newLeaveData.push({
                    type: leaveType,
                    alloted: allotted,
                    availed: availed,
                    eligible: eligible,
                    lossOfPay: lossOfPay,
                    leftOver: leftOver,
                });
            }
        };

        // Privilege Leave Calculation
        const privilegeLeaveType = leaveTypes.find(type => type.leavetype === 'Privilege Leave');
        if (privilegeLeaveType) {
            const privilegeLeaveTypeId = privilegeLeaveType.leavetypeid;
            const privilegeLeaves = userLeavesData
                .filter(leave => leave.leavetypeid === privilegeLeaveTypeId)
                .filter(leave => {
                    const leaveMonth = new Date(leave.fromdate).getMonth() + 1; // +1 because months are 0-indexed
                    return leaveMonth <= Number(month); // Leaves taken up to selected month
                });

            const availedLeaves = privilegeLeaves.reduce((acc, leave) => acc + leave.duration, 0);
            const eligibleLeaves = Number(month); // 1 leave per month
            console.log("eligibleLeaves:::",eligibleLeaves)
            const lossOfPay = Math.max(0, availedLeaves - eligibleLeaves);
            const leftOver = Math.max(0, eligibleLeaves - availedLeaves);

            updateLeaveData(
                privilegeLeaveType.leavetype,
                12, // Total yearly leaves
                availedLeaves >eligibleLeaves ?eligibleLeaves:availedLeaves,
                lossOfPay > 0 ? 0 : leftOver, // If loss of pay, eligible is 0
                lossOfPay,
                leftOver
            );
        }

        // Sick Leave Calculation
        const sickLeaveType = leaveTypes.find(type => type.leavetype === 'Sick Leave');
        if (sickLeaveType) {
            const sickLeaveTypeId = sickLeaveType.leavetypeid;
            const sickLeaves = userLeavesData
                .filter(leave => leave.leavetypeid === sickLeaveTypeId)
                .filter(leave => {
                    const leaveMonth = new Date(leave.fromdate).getMonth();
                    return leaveMonth < Number(month); // Leaves taken before selected month
                });

            const availedLeaves = sickLeaves.reduce((acc, leave) => acc + leave.duration, 0);
            const allotted = sickLeaveType.leaves_per_year;

            // First half of year (Jan-Jun) gets 2 leaves, second half (Jul-Dec) gets another 2
            const firstHalfAllotted = 2;
            const secondHalfAllotted = 2;

            let eligibleLeaves = 0;
            let lossOfPay = 0;

            if (month <= 6) {
                // First half of year
                eligibleLeaves = Math.max(0, firstHalfAllotted - availedLeaves);
                lossOfPay = Math.max(0, availedLeaves - firstHalfAllotted);
            } else {
                // Second half of year - can use remaining from first half plus second half allotment
                const firstHalfLeaves = sickLeaves
                    .filter(leave => new Date(leave.fromdate).getMonth() < 6)
                    .reduce((acc, leave) => acc + leave.duration, 0);

                const secondHalfLeaves = sickLeaves
                    .filter(leave => new Date(leave.fromdate).getMonth() >= 6)
                    .reduce((acc, leave) => acc + leave.duration, 0);

                const firstHalfRemaining = Math.max(0, firstHalfAllotted - firstHalfLeaves);
                const totalAvailable = firstHalfRemaining + secondHalfAllotted;

                eligibleLeaves = Math.max(0, totalAvailable - secondHalfLeaves);
                lossOfPay = Math.max(0, secondHalfLeaves - totalAvailable);
            }

            updateLeaveData(
                sickLeaveType.leavetype,
                allotted,
                availedLeaves,
                eligibleLeaves,
                lossOfPay,
                Math.max(0, allotted - availedLeaves)
            );
        }

        // Paternity Leave Calculation
        const paternityLeaveType = leaveTypes.find(type => type.leavetype === 'Paternity Leave');
        if (paternityLeaveType) {
            const paternityLeaveTypeId = paternityLeaveType.leavetypeid;
            const paternityLeaves = userLeavesData.filter(leave => leave.leavetypeid === paternityLeaveTypeId);
            const availedLeaves = paternityLeaves.reduce((acc, leave) => acc + leave.duration, 0);

            const allotted = paternityLeaveType.leaves_per_year;
            updateLeaveData(
                paternityLeaveType.leavetype,
                allotted,
                availedLeaves,
                Math.max(0, allotted - availedLeaves),
                Math.max(0, availedLeaves - allotted),
                Math.max(0, allotted - availedLeaves)
            );
        }

        // Compensation Leave Calculation
        const compensationLeaveType = leaveTypes.find(type => type.leavetype === "Workers' Compensation");
        if (compensationLeaveType) {
            const compensationLeaveTypeId = compensationLeaveType.leavetypeid;
            const compensationLeaves = userLeavesData.filter(leave => leave.leavetypeid === compensationLeaveTypeId);
            const availedLeaves = compensationLeaves.reduce((acc, leave) => acc + leave.duration, 0);

            const allotted = compensationLeaveType.leaves_per_year;

            updateLeaveData(
                compensationLeaveType.leavetype,
                allotted,
                availedLeaves,
                Math.max(0, allotted - availedLeaves),
                0,
                Math.max(0, allotted - availedLeaves)
            );
        }

        // Work From Home Calculation
        const workFromHomeType = leaveTypes.find(type => type.leavetype === 'Work from Home');
        if (workFromHomeType) {
            const workFromHomeTypeId = workFromHomeType.leavetypeid;
            const workFromHomeLeaves = userLeavesData.filter(leave => leave.leavetypeid === workFromHomeTypeId);
            const availedLeaves = workFromHomeLeaves.reduce((acc, leave) => acc + leave.duration, 0);

            updateLeaveData(
                workFromHomeType.leavetype,
                "N/A",
                availedLeaves,
                "N/A",
                0,
                "N/A"
            );
        }

        setLeaveData(newLeaveData);
    };

    // const handleInputChange = () => {
    //     setGenerateClicked(false); 
    // };
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("LoginDetails"));
        setLocalStorageData(data || {});

        axios.get("http://192.168.2.120:3003/employeeDetails/get_status_details").then((res) => {
            // console.log("hello::",res.data.data[0].emp_first_name);
            setEmpData(res.data.data);

        }).catch(err => console.log(err)
        );

    }, []);

    // console.log(localStorageData);

    return (
        <React.Fragment>
            <Box sx={{ p: 2, height: "120vh" }}>
                <Typography
                    // sx={{
                    //     fontFamily: "sans-serif",
                    //     background:
                    //         "linear-gradient(to right, rgba(255, 215, 255, 0) 0%, rgba(225, 255, 255, 0.5) 20%, rgba(255, 255, 255, 0) 61%), linear-gradient(rgb(97, 183, 217) 52%, rgb(78, 99, 132) 61%)",
                    //     backgroundClip: "text",
                    //     WebkitBackgroundClip: "text",
                    //     WebkitTextFillColor: "transparent",
                    // }}
                    variant="h4" fontWeight="bold" sx={{ color: "primary.main", textAlign: "center" }}
                >
                    Employee Monthly Calculation Report
                </Typography>


                <Grid container sx={{ mt: "2px" }} spacing={2}>
                    {/* Filters */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={2}>
                                    {/* Employee Selection */}

                                    <Grid item xs={12}>
                                        {
                                            localStorageData.emp_id === 'VEN0342' || localStorageData.emp_id === 'VEN0100' ?
                                                <FormControl fullWidth size="small">

                                                    <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={employee}
                                                        label="Employee"
                                                        // displayEmpty
                                                        onChange={(e) => setEmployee(e.target.value)}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {empData.map((ele, i) => (
                                                            <MenuItem key={i} value={ele.emp_id}>
                                                                {`${ele.emp_id} - ${ele.emp_first_name}`}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl> :
                                                <FormControl fullWidth size="small">

                                                    <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={employee}
                                                        label="Employee"
                                                        // displayEmpty
                                                        onChange={(e) => setEmployee(e.target.value)}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {/* {empData.map((ele, i) => ( */}
                                                        <MenuItem value={localStorageData.emp_id}>
                                                            {`${localStorageData.emp_id} - ${localStorageData.emp_first_name}`}
                                                        </MenuItem>
                                                        {/* ))} */}
                                                    </Select>
                                                </FormControl>
                                        }

                                    </Grid>

                                    {/* Year Selection */}
                                    <Grid item xs={12}>

                                        <FormControl fullWidth size="small">

                                            <InputLabel id="demo-simple-select-label">Year</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={year}
                                                label="Year"
                                                onChange={(e) => setYear(e.target.value)}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {years.map((yr, i) => (
                                                    <MenuItem key={i} value={yr}>
                                                        {yr}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    {/* Month Selection */}
                                    <Grid item xs={12}>
                                        <FormControl fullWidth size="small">


                                            <InputLabel id="demo-simple-select-label">Month</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={month}
                                                label="Month"
                                                onChange={(e) => setMonth(e.target.value)}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {months.map((mnth, i) => (
                                                    <MenuItem key={i} value={i + 1}>
                                                        {mnth}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    {/* Generate Button */}
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleGenerateClick}
                                            fullWidth
                                        >
                                            Generate Report
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>


                    {/* Leave Report */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                {leaveData.length > 0 ? (
                                    <Box sx={{ overflowX: "auto" }}>
                                        <table className='leaveReportTbl'
                                            style={{
                                                width: "100%",
                                                borderCollapse: "collapse",
                                                textAlign: "center",

                                            }}
                                            border={1}
                                        >
                                            <thead>
                                                <tr>
                                                    <th>Type</th>
                                                    <th>Allotted</th>
                                                    <th>Availed</th>
                                                    <th>Eligible</th>
                                                    <th>Loss of Pay</th>
                                                    <th>Left Over</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {leaveData.map((data, i) => (
                                                    <tr key={i}>
                                                        <td>{data.type}</td>
                                                        <td>{data.alloted}</td>
                                                        <td>{data.availed}</td>
                                                        <td>{data.eligible}</td>
                                                        <td>{data.lossOfPay}</td>
                                                        <td>{data.leftOver}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </Box>
                                ) : (
                                    <Typography>No data available</Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
}

export default LMS_leaveReport;
