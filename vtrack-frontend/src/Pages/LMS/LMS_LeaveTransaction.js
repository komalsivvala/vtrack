import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import axios from "axios";

const LMS_LeaveTransaction = () => {
  const [empData, setEmpData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [status, setStatus] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [empDetails, setEmpDetails] = useState([]);
  const [leaveTypeData, setLeaveTypeData] = useState([]);
  const [filteredLeaveTypeData, setFilteredLeaveTypeData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("");
  const [teamLeavesData, setTeamLeavesData] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("LoginDetails"));
    const roleData = sessionStorage.getItem("role");
    setRole(roleData);
    console.log(getData)
    const fetchData = async () => {
      try {
        const empId = getData?.emp_id;
        const url =
          empId === "VEN0100"
            ? "http://192.168.2.120:3003/LMS-page/get_userLeaves_data"
            : `http://192.168.2.120:3003/LMS-Page/get_userLeaves_data?emp_id=${empId}`;

        const response = await axios.get(url);
        const { data } = response.data;
        console.log("data:::", data)
        setEmpData(data);
        setFilteredData(data);
        setEmpDetails(response.data.empDetails);
        console.log("Leave type data::::", response.data.leavetype)
        setLeaveTypeData(response.data.leavetype);

        let filteredLeaveData = data?.filter((leave) => {
          const leaveYear = new Date(leave.fromdate).getFullYear();
          return leaveYear === 2024;
        });

        if (empId === "VEN0100" && filteredLeaveData?.length > 0) {
          filteredLeaveData = filteredLeaveData.map((leave) => {
            const matchingLeaveType = response.data.leavetype?.find((lt) => {
              return String(lt.leavetypeid) === String(leave.leavetypeid);
            });

            return {
              ...leave,
              leavetype: matchingLeaveType?.leavetype || null,
              leaves_per_year: matchingLeaveType?.leaves_per_year || null,
            };
          });
        }
        else{
          filteredLeaveData = filteredLeaveData.map((leave) => {
            const matchingLeaveType = response.data.leavetype?.find((lt) => {
              return String(lt.leavetypeid) === String(leave.leavetypeid);
            });

            return {
              ...leave,
              leavetype: matchingLeaveType?.leavetype || null,
              leaves_per_year: matchingLeaveType?.leaves_per_year || null,
            };
          });
        }
        setFilteredLeaveTypeData(filteredLeaveData);
        setFilteredData(filteredLeaveData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const calculateEmployeeLeaves = (empId) => {
    const employeeLeaves = empData.filter(leave => leave.emp_id === empId);

    // Calculate sick leaves (leavetypeid 151)
    const sickLeaves = employeeLeaves
      .filter(leave => leave.leavetypeid === 151)
      .reduce((total, leave) => total + (Number(leave.duration) || 0), 0);

    // Calculate privilege leaves (leavetypeid 152)
    const privilegeLeaves = employeeLeaves
      .filter(leave => leave.leavetypeid === 152)
      .reduce((total, leave) => total + (Number(leave.duration) || 0), 0);

    return {
      sickLeaves,
      privilegeLeaves,
      isSickExceeded: sickLeaves > 4,
      isPrivilegeExceeded: privilegeLeaves > 12
    };
  };

  const fetchTeamLeavesData = async () => {
    try {
      const response = await axios.get("http://192.168.2.120:3003/LMS-page/get_team_leaves_data");
      const teamData = response.data.data.map(employee => {
        const leaves = calculateEmployeeLeaves(employee.emp_id);
        return {
          ...employee,
          sickLeaves: leaves.sickLeaves,
          privilegeLeaves: leaves.privilegeLeaves,
          isSickExceeded: leaves.isSickExceeded,
          isPrivilegeExceeded: leaves.isPrivilegeExceeded
        };
      });
      setTeamLeavesData(teamData);
      setIsOpen(true);
    } catch (error) {
      console.error("Error fetching team leaves data:", error);
      // Fallback to calculate from local data if API fails
      const teamData = empDetails.map(employee => {
        const leaves = calculateEmployeeLeaves(employee.emp_id);
        return {
          ...employee,
          sickLeaves: leaves.sickLeaves,
          privilegeLeaves: leaves.privilegeLeaves,
          isSickExceeded: leaves.isSickExceeded,
          isPrivilegeExceeded: leaves.isPrivilegeExceeded
        };
      });
      setTeamLeavesData(teamData);
      setIsOpen(true);
    }
  };

  const handleSearch = () => {
    console.log("empData::::", empData)
    const filtered = filteredLeaveTypeData?.filter((leave) => {
      const leaveFromDate = new Date(leave.fromdate);
      const leaveToDate = new Date(leave.todate);
      const fromDateFilter = fromDate ? new Date(fromDate) : null;
      const toDateFilter = toDate ? new Date(toDate) : null;
      const emp = empDetails.find((emp) => emp.emp_id === leave.emp_id);

      return (
        (!fromDateFilter || leaveFromDate >= fromDateFilter) &&
        (!toDateFilter || leaveToDate <= toDateFilter) &&
        (!leaveType || leave.leavetype === leaveType) &&
        (!status || leave.status === status) &&
        (!employeeName ||
          (emp?.emp_first_name &&
            emp.emp_first_name
              .toLowerCase()
              .includes(employeeName.toLowerCase())))
      );
    });
    setFilteredData(filtered);
  };

  const handleReset = () => {
    setFromDate("");
    setToDate("");
    setLeaveType("");
    setStatus("");
    setEmployeeName("");
    setFilteredData(empData);
  };

  const handleCancel = (id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .put(
          `http://192.168.2.120:3003/LMS-page/leaveRequestUpdate?leave_id=${id}`
        )
        .then(() => {
          window.location.reload();
        })
        .catch((e) => console.error(e));
    }
  };

  return (
    <Box sx={{
      padding: isMobile ? 1 : 2,
      marginTop: isMobile ? 4 : 0
    }}>
      <Typography
        variant={isMobile ? "h5" : "h4"}
        fontWeight="bold"
        sx={{
          color: "primary.main",
          textAlign: "center",
          mb: 2
        }}
      >
        Leave Transaction Details
      </Typography>

      {(role === "admin" || role === "hr") && (
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Button
            variant="contained"
            onClick={fetchTeamLeavesData}
            size={isMobile ? "small" : "medium"}
          >
            Teams Leaves Dashboard
          </Button>
        </Box>
      )}

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="From Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            size={isMobile ? "small" : "medium"}
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="To Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            size={isMobile ? "small" : "medium"}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Employee Name"
            fullWidth
            size={isMobile ? "small" : "medium"}
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size={isMobile ? "small" : "medium"}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={8} md={9}>
          <FormControl fullWidth size={isMobile ? "small" : "medium"}>
            <InputLabel>Leave Type</InputLabel>
            <Select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              label="Leave Type"
            >
              <MenuItem value="Sick Leave">Sick Leave</MenuItem>
              <MenuItem value="Privilege Leave">Privilege Leave</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={handleSearch}
              fullWidth
              size={isMobile ? "small" : "medium"}
            >
              Search
            </Button>
            <Button
              variant="outlined"
              onClick={handleReset}
              fullWidth
              size={isMobile ? "small" : "medium"}
            >
              Reset
            </Button>
          </Box>
        </Grid>
      </Grid>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 'calc(100vh - 300px)',
          overflow: 'auto'
        }}
      >
        <Table stickyHeader size={isMobile ? "small" : "medium"}>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              {!isMobile && <TableCell>Applied Date</TableCell>}
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              {!isMobile && <TableCell>Mode</TableCell>}
              <TableCell>Days</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.map((leave, index) => {
              const emp = empDetails.find(
                (emp) => emp.emp_id === leave.emp_id
              );
              return (
                <TableRow key={index} hover>
                  <TableCell>
                    {isMobile ?
                      (emp?.emp_first_name?.split(' ').map(n => n[0]).join('') || 'N/A') :
                      (emp?.emp_first_name || 'N/A')}
                  </TableCell>
                  {!isMobile && (
                    <TableCell>
                      {new Date(leave.leave_applied_date).toLocaleDateString()}
                    </TableCell>
                  )}
                  <TableCell>
                    {new Date(leave.fromdate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </TableCell>
                  <TableCell>
                    {new Date(leave.todate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </TableCell>
                  {!isMobile && <TableCell>{leave.leavemode}</TableCell>}
                  <TableCell>{leave.duration}</TableCell>
                  <TableCell>
                    {isMobile ?
                      leave?.leavetype?.split(' ').map(w => w[0]).join('') :
                      leave?.leavetype}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        color: leave.status === 'Approved' ? 'success.main' :
                          leave.status === 'Rejected' ? 'error.main' :
                            leave.status === 'Pending' ? 'warning.main' :
                              'text.secondary',
                        fontWeight: 'bold'
                      }}
                    >
                      {isMobile ? leave.status[0] : leave.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {leave.status === "Pending" ? (
                      <Button
                        variant="text"
                        color="error"
                        size="small"
                        onClick={() => handleCancel(leave.leave_id)}
                      >
                        {isMobile ? 'X' : 'Cancel'}
                      </Button>
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Team Leaves Dialog */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Team Leaves Dashboard</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Sick Leaves Taken</TableCell>
                  <TableCell>Privilege Leaves Taken</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teamLeavesData.map((employee, index) => (
                  <TableRow key={index}>
                    <TableCell>{employee.emp_first_name}</TableCell>
                    <TableCell sx={{
                      color: employee.isSickExceeded ? 'error.main' : 'inherit',
                      fontWeight: employee.isSickExceeded ? 'bold' : 'normal'
                    }}>
                      {employee.sickLeaves || 0}
                      {employee.isSickExceeded && ' (Exceeded)'}
                    </TableCell>
                    <TableCell sx={{
                      color: employee.isPrivilegeExceeded ? 'error.main' : 'inherit',
                      fontWeight: employee.isPrivilegeExceeded ? 'bold' : 'normal'
                    }}>
                      {employee.privilegeLeaves || 0}
                      {employee.isPrivilegeExceeded && ' (Exceeded)'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LMS_LeaveTransaction;