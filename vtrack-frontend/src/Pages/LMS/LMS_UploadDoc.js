import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import "../../CSS/UploadDoc.css";
import axios from 'axios';

const LMS_UploadDoc = () => {
    const [uploadDoc, setUploadDoc] = useState(null);
    const [holidayId, setHolidayId] = useState("");
    const [holidayData, setHolidaData] = useState([]);

    // Generate numeric holidayId on component mount
    useEffect(() => {
        const generateId = () => {
            const now = new Date();
            // Numeric holidayId using current timestamp and date components
            const id = Number(`${now.getDate()}${now.getMinutes()
                .toString()
                .padStart(2, "0")}${now
                    .getSeconds()}
                `);
            return id;
        };

        setHolidayId(generateId());
        axios.get("http://192.168.2.120:3003/LMS-page/getHolidayDoc").then((res) => {
            console.log("holiday data ::", res.data.data);
            setHolidaData(res.data.data);
        }).catch(e => console.log(e));
    }, []);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    }));

    const uploadHandler = async () => {
        if (!uploadDoc) {
            console.error("No file selected.");
            alert("Please select a file before uploading.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("holidayId", Number(holidayId));
            formData.append("holidayDoc", uploadDoc);

            const response = await axios.post(
                "http://192.168.2.120:3003/LMS-page/uploadHolidayDoc",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Upload successful:", response.data);
            alert("File uploaded successfully!");
            window.location.reload();
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload file.");
        }
    };

    const viewHandler = (pdf) => {
        window.open(`http://192.168.2.120:3003/files/${pdf}`);
    }

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this holiday?")) {
            axios
                .put(`http://192.168.2.120:3003/LMS-page/deleteHolidayDoc?holiday_id=${id}`)
                .then((res) => {
                    alert("Deleted successfully");
                    window.location.reload();
                })
                .catch((error) => {
                    console.error("Error deleting the holiday:", error);
                    alert("Failed to delete the holiday. Please try again.");
                });
        } else {
            console.log("Delete action cancelled.");
        }
    };

    return (
        <div className="upload-doc-container">
            <section className="upload-doc-section">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Item>
                            <Typography variant="h6" className="section-header">
                                Upload Documents
                            </Typography>
                            <div className="upload-form">
                                <div className="form-row">
                                    <label htmlFor="fileUpload">Upload File</label>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        size="small"
                                        fullWidth
                                    >
                                        Choose File
                                        <input
                                            type="file"
                                            hidden
                                            id="fileUpload"
                                            accept="application/pdf"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    setUploadDoc(file);
                                                    console.log("File selected:", file.name);
                                                }
                                            }}
                                        />
                                    </Button>
                                </div>
                                {uploadDoc && (
                                    <div className="selected-file">
                                        <Typography variant="body2">
                                            Selected File: {uploadDoc.name}
                                        </Typography>
                                    </div>
                                )}
                                <div className="upload-button">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={uploadHandler}
                                        fullWidth
                                        disabled={!uploadDoc}
                                    >
                                        Upload
                                    </Button>
                                </div>
                            </div>
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Item>
                            <Typography variant="h6" className="section-header">
                                Holiday Memo Documents
                            </Typography>
                            <TableContainer>
                                <Table className="holiday-table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>File Name</TableCell>
                                            <TableCell align="center">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {holidayData?.filter(lData => lData.status === "Active")
                                            .map((ele, i) => (
                                                <TableRow key={i}>
                                                    <TableCell>
                                                        {ele.holiday_name} - {ele.holiday_date}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="action-buttons">
                                                            <Button 
                                                                variant="outlined" 
                                                                size="small"
                                                                onClick={() => viewHandler(ele.holiday_location)}
                                                            >
                                                                View
                                                            </Button>
                                                            <Button 
                                                                variant="outlined" 
                                                                color="error" 
                                                                size="small"
                                                                onClick={() => deleteHandler(ele.holiday_id)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Item>
                    </Grid>
                </Grid>
            </section>
        </div>
    );
};

export default LMS_UploadDoc;