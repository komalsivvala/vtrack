import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Typography, Grid, Paper, Container } from "@mui/material";

const LMS_YearReport = () => {
    const [empData, setEmpData] = useState([]);
    const nav = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const res = await axios.get("http://192.168.2.120:3003/employeeDetails/getAll_emp_details_data");
                setEmpData(res.data.data);
            } catch (error) {
                console.error("Error fetching employee details:", error);
            }
        };

        if (window.location.pathname === "/LMS-page/LMS-Yearly-Report") {
            fetchEmployeeData();
        }
    }, []);

    const viewHandler = async (data) => {
        console.log("::data:::", data);
        try {
            const responseData = await axios.get(
                `http://192.168.2.120:3003/LMS-Page/get_All_user_leaves?emp_id=${data.emp_id}&manager_id=${data.manager_id}`
            );
            dispatch({ type: "EMP_DETAILS_DATA", payload: [responseData.data, data] });
            nav("/LMS-page/LMS-Summary");
        } catch (error) {
            console.error("Error fetching user leaves data:", error);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ textAlign: "center", mb: 3 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ color: "primary.main" }}>
                    Yearly Employee Leave Report
                </Typography>
            </Box>

            <Paper elevation={3} sx={{ p: 2, borderRadius: 2, height:"650vh" }}>
                <Grid container spacing={2}>
                    {empData
                        .filter((ele) => ele.status === "Active")
                        .map((ele, i) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                key={i}
                                onClick={() => viewHandler(ele)}
                                sx={{
                                    cursor: "pointer",
                                    ":hover": {
                                        backgroundColor: "rgba(230, 225, 225, 0.5)",
                                        boxShadow: 3,
                                    },
                                }}
                            >
                                <Paper
                                    elevation={2}
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        backgroundColor: "lightgrey",
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography variant="body1" fontWeight="bold">
                                        {ele.emp_id}, {ele.current_designation}
                                    </Typography>
                                    <Typography variant="body2">
                                        {ele.emp_first_name} {ele.emp_last_name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                        {ele.email}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                </Grid>
            </Paper>
        </Container>
    );
};

export default LMS_YearReport;
