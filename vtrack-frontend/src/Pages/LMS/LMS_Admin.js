import React, { useEffect, useState } from "react";
import axios from "axios";
import PreviewIcon from "@mui/icons-material/Preview";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Pagination,
} from "@mui/material";

function LMS_Admin() {
    const [pendingLeavesData, setPendingLeavesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedReason, setSelectedReason] = useState("");

    const rowsPerPage = 5;

    useEffect(() => {
        axios
            .get("http://192.168.2.120:3003/LMS-page/get_pending_leaves")
            .then((res) => {
                const data = res.data.data.map((leave) => {
                    const empDetail = res.data.empDetails?.find(
                        (emp) => emp.emp_id === leave.emp_id
                    );
                    const leaveTypeDetail = res.data?.leaveTypeDetails.find(
                        (type) => type?.leavetypeid === leave?.leavetypeid
                    );

                    return {
                        ...leave,
                        first_name: empDetail ? empDetail.emp_first_name : "Unknown",
                        leavetype: leaveTypeDetail ? leaveTypeDetail.leavetype : "Unknown",
                    };
                });
                setPendingLeavesData(data);
            })
            .catch((err) => {
                console.error("Error fetching pending leaves:", err);
            });
    }, []);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = pendingLeavesData.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(pendingLeavesData.length / rowsPerPage);

    const openDialog = (reason) => {
        setSelectedReason(reason);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedReason("");
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <Box
            sx={{
                padding: { xs: "10px", md: "20px" },
                overflowX: "auto", overflowY:"auto",height:"150vh"
            }}
        >
            <Typography variant="h4" fontWeight="bold" sx={{ color: "primary.main", textAlign:"center", pt:"5px", pb:"10px" }}>
                Pending Leaves
            </Typography>

            <TableContainer
                component={Paper}
                sx={{
                    maxWidth: "100%",
                    overflow: "auto",
                    boxShadow: 3,
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>From Date</TableCell>
                            <TableCell>To Date</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Reason</TableCell>
                            <TableCell>Leave Type</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Manager Response</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.length > 0 ? (
                            currentRows.map((leave, index) => (
                                <TableRow key={index}>
                                    <TableCell>{leave.emp_id}</TableCell>
                                    <TableCell>{leave.first_name}</TableCell>
                                    <TableCell>{formatDate(leave.fromdate)}</TableCell>
                                    <TableCell>{formatDate(leave.todate)}</TableCell>
                                    <TableCell>{leave.duration}</TableCell>
                                    <TableCell>
                                        <PreviewIcon
                                            sx={{ cursor: "pointer", color: "primary.main" }}
                                            onClick={() => openDialog(leave.reason)}
                                        />
                                    </TableCell>
                                    <TableCell>{leave.leavetype}</TableCell>
                                    <TableCell>{leave.status}</TableCell>
                                    <TableCell>
                                        {leave.manager_response ?? "No response found from manager"}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    No pending leaves found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(event, value) => setCurrentPage(value)}
                        color="primary"
                    />
                </Box>
            )}

            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle>Leave Reason</DialogTitle>
                <DialogContent>
                    <Typography>{selectedReason}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default LMS_Admin;
