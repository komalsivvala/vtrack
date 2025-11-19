// import axios from "axios";
// import PreviewIcon from '@mui/icons-material/Preview';
// import BorderColorIcon from '@mui/icons-material/BorderColor';
// import React, { useEffect, useState } from "react";

// function LMS_Manager() {
//     const [pendingLeavesData, setPendingLeavesData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [selectedReason, setSelectedReason] = useState("");
//     const [editManagerRes, setEditManagerRes] = useState({ index: null, value: "" });
//     const rowsPerPage = 10;

//     useEffect(() => {
//         axios.get("http://192.168.2.120:3003/LMS-page/get_pending_leaves")
//             .then((res) => {
//                 const data = res.data.data.map(leave => {
//                     const empDetail = res.data.empDetails?.find(emp => emp.emp_id === leave.emp_id);
//                     console.log("::empDetails:::",empDetail);
                    
//                     const leaveTypeDetail = res.data.leaveTypeDetails.find(type => type.leavetypeid === leave.leavetypeid);
//                     return {
//                         ...leave,
//                         first_name: empDetail ? empDetail.emp_first_name : 'Unknown',
//                         leavetype: leaveTypeDetail ? leaveTypeDetail.leavetype : 'Unknown',
//                     };
//                 });
//                 setPendingLeavesData(data);
//             })
//             .catch(err => {
//                 console.error("Error fetching pending leaves:", err);
//             });
//     }, []);

//     // Calculate the current page's data
//     const indexOfLastRow = currentPage * rowsPerPage;
//     const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//     const currentRows = pendingLeavesData.slice(indexOfFirstRow, indexOfLastRow);

//     // Handle page change
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     const totalPages = Math.ceil(pendingLeavesData.length / rowsPerPage);

//     // Handle opening the reason dialog
//     const openDialog = (reason) => {
//         setSelectedReason(reason);
//         setIsDialogOpen(true);
//     };

//     // Handle closing the reason dialog
//     const closeDialog = () => {
//         setIsDialogOpen(false);
//         setSelectedReason("");
//     };

//     // Handle manager response edit toggle
//     const handleManagerResponseClick = (index, currentValue) => {
//         setEditManagerRes({ index, value: currentValue || "No response found" });
//     };

//     // Handle manager response update
//     const handleUpdateResponse = (id) => {
//         const data = {
//             leave_id: id,
//             status: editManagerRes.value
//         };

//         axios.put(`http://192.168.2.120:3003/LMS-Page/update_pending_leaves`, data)
//             .then((res) => {
//                 alert("Updated successfully");

//                 // Remove the updated row from pendingLeavesData
//                 const updatedData = pendingLeavesData.filter((leave, index) => index !== editManagerRes.index);
//                 setPendingLeavesData(updatedData);

//                 // Clear the edit state
//                 setEditManagerRes({ index: null, value: "" });
//             })
//             .catch(err => console.log(err));
//     };

//     // Handle manager response cancel
//     const handleCancelResponse = () => {
//         setEditManagerRes({ index: null, value: "" });
//     };

//     // Function to format date to display only the date part
//     const formatDate = (dateString) => {
//         const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//         return new Date(dateString).toLocaleDateString(undefined, options);
//     };

//     return (
//         <div style={{ padding: "20px" }}>
//             <h2>Pending Leaves</h2>
//             <div>
//                 <div style={{textAlign:"center", position: "relative",padding:"5px", top: "81px", fontWeight:"bolder",fontSize:"25px", color:"white", backgroundColor:"skyblue"}}>
//                     Approve Pending Leaves
//                 </div>
//                 <table border="1" style={{ width: "95%", borderCollapse: "collapse",position:"absolute", top:"210px", left:"40px" }}>
//                     <thead>
//                         <tr>
//                             <th>Employee Id</th>
//                             <th>First Name</th>
//                             <th>From Date</th>
//                             <th>To Date</th>
//                             <th>Duration</th>
//                             <th>Reason</th>
//                             <th>Leave Type</th>
//                             <th>Status</th>
//                             <th>Manager Response</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {currentRows.length > 0 ? (
//                             currentRows.map((leave, index) => (
//                                 <tr style={{ textAlign: "center" }} key={index}>
//                                     <td>{leave.emp_id}</td>
//                                     <td>{leave.first_name}</td>
//                                     <td>{formatDate(leave.fromdate)}</td> {/* Format from date */}
//                                     <td>{formatDate(leave.todate)}</td>   {/* Format to date */}
//                                     <td>{leave.duration}</td>
//                                     <td>
//                                         <PreviewIcon onClick={() => openDialog(leave.reason)} />
//                                     </td>
//                                     <td>{leave.leavetype}</td>
//                                     <td>{leave.status}</td>
//                                     <td>
//                                         {editManagerRes.index === index ? (
//                                             <div>
//                                                 <input
//                                                     type="text"
//                                                     value={editManagerRes.value}
//                                                     onChange={(e) => setEditManagerRes({ ...editManagerRes, value: e.target.value })}
//                                                     style={{ marginRight: "10px" }}
//                                                 />
//                                                 <button onClick={() => handleUpdateResponse(leave.leave_id)}>Update</button>
//                                                 <button onClick={handleCancelResponse} style={{ marginLeft: "5px" }}>Cancel</button>
//                                             </div>
//                                         ) : (
//                                             <BorderColorIcon onClick={() => handleManagerResponseClick(index, leave.manager_response)} />
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="9" style={{ textAlign: "center" }}>No pending leaves found</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//                 {/* Pagination Controls */}
//                 {totalPages > 1 && (
//                     <div style={{ position: "relative", top: "430px", display: "flex", justifyContent: "center" }}>
//                         {Array.from({ length: totalPages }, (_, index) => (
//                             <button
//                                 key={index + 1}
//                                 onClick={() => paginate(index + 1)}
//                                 style={{
//                                     margin: "0 5px",
//                                     padding: "5px 10px",
//                                     backgroundColor: currentPage === index + 1 ? "#007bff" : "#f0f0f0",
//                                     color: currentPage === index + 1 ? "#fff" : "#000",
//                                     border: "none",
//                                     cursor: "pointer"
//                                 }}>
//                                 {index + 1}
//                             </button>
//                         ))}
//                     </div>
//                 )}

//                 {/* Dialog Box */}
//                 {isDialogOpen && (
//                     <div
//                         style={{
//                             position: "fixed",
//                             top: "50%",
//                             left: "50%",
//                             transform: "translate(-50%, -50%)",
//                             backgroundColor: "#fff",
//                             padding: "20px",
//                             border: "1px solid #ccc",
//                             zIndex: 1000,
//                             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
//                         }}
//                     >
//                         <h3>Leave Reason</h3>
//                         <p>{selectedReason}</p>
//                         <button onClick={closeDialog} style={{ marginTop: "20px" }}>Close</button>
//                     </div>
//                 )}

//                 {/* Overlay */}
//                 {isDialogOpen && (
//                     <div
//                         style={{
//                             position: "fixed",
//                             top: 0,
//                             left: 0,
//                             width: "100%",
//                             height: "100%",
//                             backgroundColor: "rgba(0, 0, 0, 0.5)",
//                             zIndex: 999
//                         }}
//                         onClick={closeDialog}
//                     ></div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default LMS_Manager;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Pagination } from "@mui/material";
// import PreviewIcon from "@mui/icons-material/Preview";
// import BorderColorIcon from "@mui/icons-material/BorderColor";

// function LMS_Manager() {
//     const [pendingLeavesData, setPendingLeavesData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [selectedReason, setSelectedReason] = useState("");
//     const [editManagerRes, setEditManagerRes] = useState({ index: null, value: "" });
//     const rowsPerPage = 5;

//     useEffect(() => {
//         axios.get("http://192.168.2.120:3003/LMS-page/get_pending_leaves")
//             .then((res) => {
//                 const data = res.data.data.map(leave => {
//                     const empDetail = res.data.empDetails?.find(emp => emp.emp_id === leave.emp_id);
//                     const leaveTypeDetail = res.data.leaveTypeDetails.find(type => type.leavetypeid === leave.leavetypeid);
//                     return {
//                         ...leave,
//                         first_name: empDetail ? empDetail.emp_first_name : 'Unknown',
//                         leavetype: leaveTypeDetail ? leaveTypeDetail.leavetype : 'Unknown',
//                     };
//                 });
//                 setPendingLeavesData(data);
//             })
//             .catch(err => console.error("Error fetching pending leaves:", err));
//     }, []);

//     // Pagination logic
//     const indexOfLastRow = currentPage * rowsPerPage;
//     const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//     const currentRows = pendingLeavesData.slice(indexOfFirstRow, indexOfLastRow);
//     const totalPages = Math.ceil(pendingLeavesData.length / rowsPerPage);

//     // Handlers
//     const openDialog = (reason) => {
//         setSelectedReason(reason);
//         setIsDialogOpen(true);
//     };

//     const closeDialog = () => {
//         setIsDialogOpen(false);
//         setSelectedReason("");
//     };

//     const handleManagerResponseClick = (index, currentValue) => {
//         setEditManagerRes({ index, value: currentValue || "No response found" });
//     };

//     const handleUpdateResponse = (id) => {
//         const data = { leave_id: id, status: editManagerRes.value };
//         axios.put("http://192.168.2.120:3003/LMS-Page/update_pending_leaves", data)
//             .then(() => {
//                 alert("Updated successfully");
//                 setPendingLeavesData(pendingLeavesData.filter((_, i) => i !== editManagerRes.index));
//                 setEditManagerRes({ index: null, value: "" });
//             })
//             .catch(err => console.log(err));
//     };

//     const handleCancelResponse = () => {
//         setEditManagerRes({ index: null, value: "" });
//     };

//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
//     };

//     return (
//         <div style={{ padding: "20px" }}>
//             <h2>Pending Leaves</h2>
//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Employee Id</TableCell>
//                             <TableCell>First Name</TableCell>
//                             <TableCell>From Date</TableCell>
//                             <TableCell>To Date</TableCell>
//                             <TableCell>Duration</TableCell>
//                             <TableCell>Reason</TableCell>
//                             <TableCell>Leave Type</TableCell>
//                             <TableCell>Status</TableCell>
//                             <TableCell>Manager Response</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {currentRows.length > 0 ? currentRows.map((leave, index) => (
//                             <TableRow key={index}>
//                                 <TableCell>{leave.emp_id}</TableCell>
//                                 <TableCell>{leave.first_name}</TableCell>
//                                 <TableCell>{formatDate(leave.fromdate)}</TableCell>
//                                 <TableCell>{formatDate(leave.todate)}</TableCell>
//                                 <TableCell>{leave.duration}</TableCell>
//                                 <TableCell>
//                                     <IconButton onClick={() => openDialog(leave.reason)}>
//                                         <PreviewIcon />
//                                     </IconButton>
//                                 </TableCell>
//                                 <TableCell>{leave.leavetype}</TableCell>
//                                 <TableCell>{leave.status}</TableCell>
//                                 <TableCell>
//                                     {editManagerRes.index === index ? (
//                                         <div>
//                                             <TextField
//                                                 value={editManagerRes.value}
//                                                 onChange={(e) => setEditManagerRes({ ...editManagerRes, value: e.target.value })}
//                                                 size="small"
//                                             />
//                                             <Button onClick={() => handleUpdateResponse(leave.leave_id)}>Update</Button>
//                                             <Button onClick={handleCancelResponse}>Cancel</Button>
//                                         </div>
//                                     ) : (
//                                         <IconButton onClick={() => handleManagerResponseClick(index, leave.manager_response)}>
//                                             <BorderColorIcon />
//                                         </IconButton>
//                                     )}
//                                 </TableCell>
//                             </TableRow>
//                         )) : (
//                             <TableRow>
//                                 <TableCell colSpan={9} align="center">No pending leaves found</TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             {/* Pagination */}
//             {totalPages > 1 && (
//                 <Pagination
//                     count={totalPages}
//                     page={currentPage}
//                     onChange={(event, page) => setCurrentPage(page)}
//                     sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
//                 />
//             )}
//             {/* Dialog */}
//             <Dialog open={isDialogOpen} onClose={closeDialog}>
//                 <DialogTitle>Leave Reason</DialogTitle>
//                 <DialogContent>
//                     <p>{selectedReason}</p>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={closeDialog}>Close</Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// }

// export default LMS_Manager;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, IconButton, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, Pagination, Checkbox, FormControlLabel, Box 
} from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
import BorderColorIcon from "@mui/icons-material/BorderColor";

function LMS_Manager() {
    const [pendingLeavesData, setPendingLeavesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedReason, setSelectedReason] = useState("");
    const [editManagerRes, setEditManagerRes] = useState({ 
        index: null, 
        value: "", 
        isApproved: false,
        isRejected: false,
        comments: ""
    });
    const rowsPerPage = 5;

    useEffect(() => {
        fetchPendingLeaves();
    }, []);

    const fetchPendingLeaves = () => {
        axios.get("http://192.168.2.120:3003/LMS-page/get_pending_leaves")
            .then((res) => {
                const data = res.data.data.map(leave => {
                    const empDetail = res.data.empDetails?.find(emp => emp.emp_id === leave.emp_id);
                    const leaveTypeDetail = res.data.leaveTypeDetails.find(type => type.leavetypeid === leave.leavetypeid);
                    return {
                        ...leave,
                        first_name: empDetail ? empDetail.emp_first_name : 'Unknown',
                        leavetype: leaveTypeDetail ? leaveTypeDetail.leavetype : 'Unknown',
                    };
                });
                setPendingLeavesData(data);
            })
            .catch(err => console.error("Error fetching pending leaves:", err));
    };

    // Pagination logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = pendingLeavesData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(pendingLeavesData.length / rowsPerPage);

    // Handlers
    const openDialog = (reason) => {
        setSelectedReason(reason);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedReason("");
    };

    const handleManagerResponseClick = (index, currentResponse) => {
        const isApproved = currentResponse === "Approved";
        const isRejected = currentResponse === "Rejected";
        setEditManagerRes({ 
            index, 
            value: currentResponse || "",
            isApproved,
            isRejected,
            comments: ""
        });
    };

    const handleCheckboxChange = (type) => {
        if (type === "Approved") {
            setEditManagerRes(prev => ({
                ...prev,
                isApproved: true,
                isRejected: false,
                value: "Approved"
            }));
        } else {
            setEditManagerRes(prev => ({
                ...prev,
                isApproved: false,
                isRejected: true,
                value: "Rejected"
            }));
        }
    };

    const handleCommentsChange = (e) => {
        setEditManagerRes(prev => ({
            ...prev,
            comments: e.target.value
        }));
    };

    const handleUpdateResponse = (id) => {
        if (!editManagerRes.value) {
            alert("Please select Approve or Reject");
            return;
        }

        const data = { 
            leave_id: id, 
            status: editManagerRes.value,
            comments: editManagerRes.comments
        };
        
        axios.put("http://192.168.2.120:3003/LMS-Page/update_pending_leaves", data)
            .then(() => {
                alert("Updated successfully");
                fetchPendingLeaves(); // Refresh the data
                setEditManagerRes({ index: null, value: "", isApproved: false, isRejected: false, comments: "" });
            })
            .catch(err => {
                console.error(err);
                alert("Error updating leave status");
            });
    };

    const handleCancelResponse = () => {
        setEditManagerRes({ index: null, value: "", isApproved: false, isRejected: false, comments: "" });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Pending Leaves</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee Id</TableCell>
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
                        {currentRows.length > 0 ? currentRows.map((leave, index) => (
                            <TableRow key={index}>
                                <TableCell>{leave.emp_id}</TableCell>
                                <TableCell>{leave.first_name}</TableCell>
                                <TableCell>{formatDate(leave.fromdate)}</TableCell>
                                <TableCell>{formatDate(leave.todate)}</TableCell>
                                <TableCell>{leave.duration}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => openDialog(leave.reason)}>
                                        <PreviewIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>{leave.leavetype}</TableCell>
                                <TableCell>{leave.status}</TableCell>
                                <TableCell>
                                    {editManagerRes.index === index ? (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            <Box>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={editManagerRes.isApproved}
                                                            onChange={() => handleCheckboxChange("Approved")}
                                                        />
                                                    }
                                                    label="Approve"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={editManagerRes.isRejected}
                                                            onChange={() => handleCheckboxChange("Rejected")}
                                                        />
                                                    }
                                                    label="Reject"
                                                />
                                            </Box>
                                            <TextField
                                                label="Comments"
                                                multiline
                                                rows={2}
                                                value={editManagerRes.comments}
                                                onChange={handleCommentsChange}
                                                fullWidth
                                                size="small"
                                            />
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Button 
                                                    variant="contained" 
                                                    color="primary" 
                                                    size="small"
                                                    onClick={() => handleUpdateResponse(leave.leave_id)}
                                                >
                                                    Update
                                                </Button>
                                                <Button 
                                                    variant="outlined" 
                                                    color="error" 
                                                    size="small"
                                                    onClick={handleCancelResponse}
                                                >
                                                    Cancel
                                                </Button>
                                            </Box>
                                        </Box>
                                    ) : (
                                        <IconButton 
                                            onClick={() => handleManagerResponseClick(index, leave.manager_response)}
                                            color={leave.manager_response ? "primary" : "default"}
                                        >
                                            <BorderColorIcon />
                                            {leave.manager_response && (
                                                <span style={{ marginLeft: '5px', fontSize: '0.75rem' }}>
                                                    {leave.manager_response}
                                                </span>
                                            )}
                                        </IconButton>
                                    )}
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={9} align="center">No pending leaves found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            
            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(event, page) => setCurrentPage(page)}
                    sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
                />
            )}
            
            {/* Reason Dialog */}
            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle>Leave Reason</DialogTitle>
                <DialogContent>
                    <p>{selectedReason}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default LMS_Manager;
