
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "../../CSS/Table.css";
// import { FaSearch, FaUserEdit } from "react-icons/fa";
// import { IoIosPersonAdd } from "react-icons/io";
// import { useDispatch } from 'react-redux';
// import { LuFileSearch } from 'react-icons/lu';
// import { MdOutlineDelete } from 'react-icons/md';

// const Table = () => {
//     const dispatch = useDispatch();
//     const [getEmpData, setGetEmpData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [rowsPerPage] = useState(10);
//     const [searchResults, setSearchResults] = useState([]);
//     const [dataset, setDataset] = useState([]);
//     const [isSearching, setIsSearching] = useState(false);
//     const [sortConfig, setSortConfig] = useState({ key: 'emp_id', direction: 'ascending' });
//     const navigate = useNavigate();

//     const handleView = async (data) => {
//         try {
//             const selectedData = dataset?.find((ele) => ele.emp_id === data.emp_id);

//             // Fetch employee details
//             const response = await axios.get(`http://192.168.2.120:3003/employeeDetails/get_emp_details?emp_id=${data.emp_id}`);
//             const resData = response?.data;

//             let skillSetData = {};
//             try {
//                 // Fetch skill set data
//                 const response2 = await axios.get(`http://192.168.2.120:3003/employeeDetails/get_skill_set_data?emp_id=${data.emp_id}`);
//                 console.log("response2::::==>", response2.data.data[0]);
//                 skillSetData = response2.data.data[0] || {};
//             } catch (error) {
//                 console.error("Error fetching skill set data:", error);
//             }

//             // Combine data
//             const getSelectedData = { ...selectedData, ...resData, ...skillSetData };

//             // Dispatch combined data to store
//             if (getSelectedData) {
//                 dispatch({ type: "DETAILS", payload: getSelectedData });
//             }

//             // Navigate to ViewProfile
//             navigate('/Home/ViewProfile');
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };



//     const handleDelete = async (data) => {
//         const status = "Disable";
//         if (window.confirm("Are you sure, you want to delete?")) {
//             await axios.put(`http://192.168.2.120:3003/employeeDetails/delete_emp_details`, {
//                 emp_id: data.emp_id, status: status
//             }).then((res) => {
//                 alert("Employee inactivated successfully");
//                 // Disable the table row by updating the status in getEmpData
//                 setGetEmpData(prevState => prevState.map(emp => emp.emp_id === data.emp_id ? { ...emp, status: "Disable" } : emp));
//             }).catch(err => console.log(err));
//         }
//     };

//     const handleEdit = async(data) => {
//         const response = await axios.get(`http://192.168.2.120:3003/employeeDetails/get_emp_details?emp_id=${data.emp_id}`)
//         const resData = response?.data;
//         const getSelectedData = {...resData }
//         console.log("photoData::",getSelectedData)
//         if (getSelectedData) {
//             dispatch({ type: "EditDetails", payload: getSelectedData });
//         }
//         navigate('/Home/edit');
//     };

//     useEffect(() => {
//         axios.get("http://192.168.2.120:3003/employeeDetails/getAll_emp_details_data", {
//             headers: {
//                 "authorization": sessionStorage.getItem("token")
//             }
//         })
//             .then(res => {
//                 const data = res.data.data;
//                 const transformedData = Object.values(data); // Transform the data object into an array
//                 const filteredData = transformedData.map(ele => {
//                     delete ele.emp_last_name;
//                     delete ele.emp_password;
//                     delete ele.gender;
//                     delete ele.role;
//                     delete ele.department_id;
//                     delete ele.location;
//                     delete ele.emp_photo;
//                     delete ele.updated_date;
//                     delete ele.blood_group;
//                     delete ele.anniversary_date;
//                     delete ele.family_contact;
//                     delete ele.updated_date;
//                     delete ele.relieving_date;
//                     delete ele.primary_skill;
//                     delete ele.nationality;
//                     delete ele.dob;
//                     delete ele.father_name;
//                     delete ele.mother_name;
//                     delete ele.personal_email;
//                     delete ele.present_address;
//                     delete ele.perminent_address;
//                     ele.doj = ele.doj?.split('T')[0];
//                     return ele;
//                 });

//                 setGetEmpData(filteredData);
//             }).catch(err => console.error(err));
//     }, []);

//     useEffect(() => {
//         axios.get("http://192.168.2.120:3003/employeeDetails/getAll_emp_details")
//             .then((res) => {
//                 setDataset(res.data.data);
//             })
//     }, []);

//     const indexOfLastRow = currentPage * rowsPerPage;
//     const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//     const currentRows = (isSearching ? searchResults : getEmpData)?.slice(indexOfFirstRow, indexOfLastRow);

//     const paginate = pageNumber => setCurrentPage(pageNumber);

//     const search = (e) => {
//         const input = e.target.value.toLowerCase();
//         if (input === "") {
//             setIsSearching(false);
//             setSearchResults([]);
//         } else {
//             const results = getEmpData.filter(item => {
//                 return Object.values(item).some(value => {
//                     if (value === null || value === undefined) {
//                         return false;
//                     }
//                     return value.toString().toLowerCase().includes(input);
//                 });
//             });
//             setSearchResults(results);
//             setIsSearching(true);
//             setCurrentPage(1);
//         }
//     };

//     const handleSort = (key) => {
//         let direction = 'ascending';
//         if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//             direction = 'descending';
//         }
//         setSortConfig({ key, direction });
//     };

//     const sortedData = React.useMemo(() => {
//         let sortableItems = [...getEmpData];
//         if (sortConfig !== null) {
//             sortableItems.sort((a, b) => {
//                 if (a[sortConfig.key] < b[sortConfig.key]) {
//                     return sortConfig.direction === 'ascending' ? -1 : 1;
//                 }
//                 if (a[sortConfig.key] > b[sortConfig.key]) {
//                     return sortConfig.direction === 'ascending' ? 1 : -1;
//                 }
//                 return 0;
//             });
//         }
//         return sortableItems;
//     }, [getEmpData, sortConfig]);

//     const currentSortedRows = (isSearching ? searchResults : sortedData)?.slice(indexOfFirstRow, indexOfLastRow);

//     // Pagination logic
//     const totalPages = Math.ceil((isSearching ? searchResults : getEmpData).length / rowsPerPage);
//     const maxPageNumbersToShow = 5;
//     const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

//     const startPage = Math.max(currentPage - halfMaxPageNumbersToShow, 1);
//     const endPage = Math.min(currentPage + halfMaxPageNumbersToShow, totalPages);

//     const pageNumbers = [];
//     for (let i = startPage; i <= endPage; i++) {
//         pageNumbers.push(i);
//     }

//     return (
//         <div>
//             <div className="selectBox">
//                 <div className="selectBox-ele">
//                     <input
//                         type="text"
//                         className="search-input"
//                         placeholder="Search...."
//                         onKeyUp={search}
//                     />
//                     <button style={{ position: "absolute", top: "10px" }} className="search-button"><FaSearch /></button>
//                 </div>
//             </div>
//             <div className='reg-btn'>
//                 <button className="Register-btn" onClick={() => navigate('/Home/register')}>
//                     <IoIosPersonAdd className="icon" />New Register
//                 </button>
//             </div>
//             <div className='ViewPage-table'>
//                 <table className='tableData' border="1" style={{ borderRadius: "20px", borderCollapse: "collapse" }}>
//                     <thead>
//                         <tr>
//                             <th style={{ padding: "5px" }} onClick={() => handleSort('emp_id')}>Employee id</th>
//                             <th style={{ padding: "5px" }} onClick={() => handleSort('emp_first_name')}>Name</th>
//                             <th style={{ padding: "5px" }} onClick={() => handleSort('email')}>Email</th>
//                             <th style={{ padding: "5px" }} onClick={() => handleSort('current_designation')}>Designation</th>
//                             <th style={{ padding: "5px" }} onClick={() => handleSort('manager_id')}>Manager id</th>
//                             <th style={{ padding: "5px" }} onClick={() => handleSort('contact_number')}>Contact</th>
//                             <th style={{ padding: "5px" }} onClick={() => handleSort('project_name')}>Project name</th>
//                             <th style={{ padding: "5px" }} onClick={() => handleSort('doj')}>Date of joining</th>
//                             <th style={{ padding: "5px", cursor:"pointer" }} onClick={() => handleSort('status')}>Status</th>
//                             <th style={{ padding: "5px" }}>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {currentSortedRows.map((ele, i) => (
//                             <tr key={i} className={ele.status === "Disable" ? 'disabled-row' : ''}>
//                                 <td className='table-td'>{ele.emp_id}</td>
//                                 <td className='table-td'>{ele.emp_first_name}</td>
//                                 <td className='table-td'>{ele.email}</td>
//                                 <td className='table-td'>{ele.current_designation}</td>
//                                 <td className='table-td'>{ele.manager_id}</td>
//                                 <td className='table-td'>{ele.contact_number}</td>
//                                 <td className='table-td'>{ele.project_name}</td>
//                                 <td className='table-td'>{new Date(ele.doj).toLocaleDateString()}</td>
//                                 <td className='table-td'>{ele.status}</td>
//                                 <td>
//                                     <button title='View profile' onClick={() => handleView(ele)} style={{ backgroundColor: "orange", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}><LuFileSearch /></button>
//                                     &nbsp;&nbsp;
//                                     <button title='Edit' onClick={() => handleEdit(ele)} style={{ backgroundColor: "blue", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}><FaUserEdit /></button>
//                                     &nbsp;&nbsp;
//                                     <button title='Delete' onClick={() => handleDelete(ele)} style={{ backgroundColor: "red", color: "white", padding: "5px", borderStyle: "none", borderRadius: "4px" }}><MdOutlineDelete /></button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <div>
//                 <ul className="viewPageTable-pagination">
//                     <li className='pagination-item'>
//                         <a className='pagination-link' href="#" onClick={() => paginate(1)}>First</a>
//                     </li>
//                     {pageNumbers.map(number => (
//                         <li className='pagination-item' key={number}>
//                             <a className='pagination-link' href="#" onClick={() => paginate(number)}>{number}</a>
//                         </li>
//                     ))}
//                     <li className='pagination-item'>
//                         <a className='pagination-link' href="#" onClick={() => paginate(totalPages)}>Last</a>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default Table;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    IconButton,
    TextField,
    Button,
    Paper,
    Box,
    Grid,
} from "@mui/material";
import {
    Search as SearchIcon,
    PersonAdd as PersonAddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";

const TableComponent = () => {
    const navigate = useNavigate();
    const [getEmpData, setGetEmpData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get("http://192.168.2.120:3003/employeeDetails/getAll_emp_details_data")
            .then((response) =>{
                const allData = response.data.data;

                const activeEmployees = allData.filter(emp => emp.status === "Active");
    
                const inactiveEmployees = allData.filter(emp => emp.status !== "Active");
    
                const combinedData = [...activeEmployees, ...inactiveEmployees];
    
                console.log("Combined Data:", combinedData);
                setGetEmpData(combinedData);
            } )
            .catch((err) => console.error(err));
    }, []);
    

    const handleView = async (data) => {

        try {
            const selectedData = getEmpData?.find((ele) => ele.emp_id === data.emp_id);

            // Fetch employee details
            const response = await axios.get(`http://192.168.2.120:3003/employeeDetails/get_emp_details?emp_id=${data.emp_id}`);
            const resData = response?.data;

            let skillSetData = {};
            try {
                // Fetch skill set data
                const response2 = await axios.get(`http://192.168.2.120:3003/employeeDetails/get_skill_set_data?emp_id=${data.emp_id}`);
                console.log("response2::::==>", response2.data.data[0]);
                skillSetData = response2.data.data[0] || {};
            } catch (error) {
                console.error("Error fetching skill set data:", error);
            }

            // Combine data
            const getSelectedData = { ...selectedData, ...resData, ...skillSetData };

            // Dispatch combined data to store
            if (getSelectedData) {
                dispatch({ type: "DETAILS", payload: getSelectedData });
            }

            // Navigate to ViewProfile
            navigate('/Home/ViewProfile');
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        // navigate("/Home/ViewProfile", { state: data });
    };

    const handleEdit = async (data) => {
        const response = await axios.get(`http://192.168.2.120:3003/employeeDetails/get_emp_details?emp_id=${data.emp_id}`)
        const resData = response?.data;
        const getSelectedData = { ...resData }
        console.log("photoData::", getSelectedData)
        if (getSelectedData) {
            dispatch({ type: "EditDetails", payload: getSelectedData });
        }
        navigate('/Home/edit');
        // navigate("/Home/edit", { state: data });
    };

    const handleDelete = (data) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            axios
                .put(`http://192.168.2.120:3003/employeeDetails/delete_emp_details`, {
                    emp_id: data.emp_id,
                    status: "Disable",
                })
                .then(() => {
                    setGetEmpData((prev) =>
                        prev.map((item) =>
                            item.emp_id === data.emp_id ? { ...item, status: "Disable" } : item
                        )
                    );
                })
                .catch((err) => console.error(err));
        }
    };

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        setIsSearching(value.length > 0);
    };

    const filteredData = getEmpData.filter((item) =>
        Object.values(item).some(
            (val) =>
                val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const paginatedData = (isSearching ? filteredData : getEmpData).slice(
        currentPage * rowsPerPage,
        currentPage * rowsPerPage + rowsPerPage
    );

    const handleChangePage = (event, newPage) => setCurrentPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    return (
        <Box sx={{ padding: 2, position: "relative", top: "100px" }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search..."
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: <SearchIcon />,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} textAlign="right">
                    <Button
                        variant="contained"
                        startIcon={<PersonAddIcon />}
                        onClick={() => navigate("/Home/register")}
                    >
                        New Register
                    </Button>
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Designation</TableCell>
                            <TableCell>Manager ID</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell>Project Name</TableCell>
                            <TableCell>Date of Joining</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    backgroundColor:
                                        row.status === "Disable" ? "rgba(66, 54, 54, 0.1)" : "white",
                                }}
                            >
                                <TableCell>{row.emp_id}</TableCell>
                                <TableCell>{row.emp_first_name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.current_designation}</TableCell>
                                <TableCell>{row.manager_id}</TableCell>
                                <TableCell>{row.contact_number}</TableCell>
                                <TableCell>{row.project_name}</TableCell>
                                <TableCell>
                                    {new Date(row.doj).toLocaleDateString()}
                                </TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>
                                    <IconButton color="success" onClick={() => handleView(row)}>
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton color="primary" onClick={() => handleEdit(row)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(row)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={isSearching ? filteredData.length : getEmpData.length}
                page={currentPage}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 20]}
            />
        </Box>
    );
};

export default TableComponent;
