// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import "../../CSS/LMS_LeaveSummary.css";
// import * as XLSX from "xlsx-js-style";

// const LMS_LeaveSummary = () => {
//   const [userLeavesData, setUserLeavesData] = useState([]);
//   const [yearGroupedData, setYearGroupedData] = useState({});
//   const [leaveDataByYear, setLeaveDataByYear] = useState({});
//   const [empDOJ, setEmpDOJ] = useState(null);
//   const [tooltip, setTooltip] = useState({ visible: false, content: "", x: 0, y: 0 });
//   const leavesData = useSelector((state) => state.empDetailsData);
//   const location = useLocation();
//   const [userLData, setUserLData] = useState([]);

//   useEffect(() => {
//     setUserLeavesData(leavesData);

//     axios
//       .get(`http://192.168.2.120:3003/LMS-Page/get_All_user_leaves?emp_id=${leavesData[1]?.emp_id}&manager_id=${leavesData[1]?.manager_id}`)
//       .then((res) => {
//         processLeaveData(res.data.leaveTypes, res.data.user_leaves);
//         setUserLData(res.data.user_leaves);

//         const employeeDOJ = new Date(res.data.emp_Details[0]?.doj || Date.now());
//         setEmpDOJ(employeeDOJ);

//         const groupedByYear = res.data.leaveTypes.reduce((acc, leave) => {
//           if (leave.leaves_year >= employeeDOJ.getFullYear()) {
//             acc[leave.leaves_year] = acc[leave.leaves_year] || [];
//             acc[leave.leaves_year].push(leave);
//           }
//           return acc;
//         }, {});
//         setLeaveDataByYear(groupedByYear);
//       })
//       .catch(console.error);
//   }, [leavesData, location.key]);

//   const processLeaveData = (leaveTypes, userLeavesData) => {
//     const processedLeaves = leaveTypes.flatMap((leaveType) => {
//       return userLeavesData
//         .filter((leave) => leave.leavetypeid === leaveType.leavetypeid)
//         .map((leave) => ({
//           duration: leave.duration,
//           leaveAppliedDate: leave.fromdate,
//           leavetype: leaveType.leavetype,
//         }));
//     });

//     const groupedData = groupByYearAndLeaveType(processedLeaves);

//     const filteredGroupedData = Object.keys(groupedData).reduce((acc, year) => {
//       const hasLeaveData = groupedData[year].months.some((monthData) =>
//         Object.values(monthData).some((value) => value > 0)
//       );
//       if (hasLeaveData) acc[year] = groupedData[year];
//       return acc;
//     }, {});

//     setYearGroupedData(filteredGroupedData);
//   };

//   const groupByYearAndLeaveType = (data) => {
//     return data.reduce((acc, leave) => {
//       const leaveDate = new Date(leave.leaveAppliedDate);
//       const year = leaveDate.getFullYear();
//       const month = leaveDate.getMonth();
//       if (!isNaN(year)) {
//         acc[year] = acc[year] || { months: Array.from({ length: 12 }, () => ({})), applied: {} };
//         acc[year].months[month][leave.leavetype] = (acc[year].months[month][leave.leavetype] || 0) + leave.duration;
//         acc[year].applied[leave.leavetype] = (acc[year].applied[leave.leavetype] || 0) + leave.duration;
//       }
//       return acc;
//     }, {});
//   };

//   const handleMouseEnter = (allotted, totalAvailed, event) => {
//     const difference = allotted - totalAvailed;
//     if (difference < 0) {
//       setTooltip({
//         visible: true,
//         content: `Total Loss of Pays: ${Math.abs(difference)}`,
//         x: event.pageX,
//         y: event.pageY,
//       });
//     }
//   };

//   const handleMouseLeave = () => setTooltip({ visible: false, content: "", x: 0, y: 0 });



//   //   const exportHandler = (year, exportData, yearlyGroupedData) => {
//   //     if (!yearGroupedData[year] || !Array.isArray(yearGroupedData[year].months)) {
//   //       console.error(`Invalid year data for year: ${year}`);
//   //       return;
//   //     }

//   //   // Dynamic color palette for leave types
//   // const colorPalette = [
//   //   "FFC7CE", // Light Red
//   //   "C6EFCE", // Light Green
//   //   "FFEB9C", // Light Yellow
//   //   "D9E2F3", // Light Blue
//   //   "E2EFDA", // Light Greenish
//   //   "F4CCCC", // Light Pink
//   // ];

//   // // Assign colors dynamically to leave types based on leavetypeid
//   // // console.log("exportData::", exportData);

//   // const leaveTypeColors = exportData.reduce((acc, leaveType, index) => {
//   //   acc[leaveType.leavetypeid] = colorPalette[index % colorPalette.length];
//   //   return acc;
//   // }, {});

//   // // Create the worksheet
//   // const worksheet = XLSX.utils.json_to_sheet([]);
//   // const empId = userLeavesData[1]?.emp_id || "Unknown";
//   // const headerText = `Employee ID: ${empId} - ${year}`;
//   // worksheet["A1"] = { t: "s", v: headerText };

//   // // Generate leave type headers
//   // const leaveTypeHeaders = exportData.map((leaveType) => leaveType.leavetype);
//   // const totalColumns = leaveTypeHeaders.length * 3; // Each leave type has 3 columns

//   // // Merge the first-row cells for the header text
//   // worksheet["!merges"] = [
//   //   { s: { r: 0, c: 0 }, e: { r: 0, c: totalColumns - 1 } },
//   //   ...leaveTypeHeaders.map((_, index) => ({
//   //     s: { r: 1, c: index * 3 },
//   //     e: { r: 1, c: index * 3 + 2 },
//   //   })),
//   // ];

//   // // Style the main header
//   // worksheet["A1"].s = {
//   //   font: { bold: true, sz: 20, color: { rgb: "FFFFFF" } },
//   //   fill: { fgColor: { rgb: "4F81BD" } },
//   //   alignment: { horizontal: "center", vertical: "center" },
//   //   border: { top: { style: "thin", color: { rgb: "000000" } }, bottom: { style: "thin", color: { rgb: "000000" } } },
//   // };

//   // // Add leave type headers in the second row
//   // leaveTypeHeaders.forEach((leaveType, index) => {
//   //   const cellAddress = XLSX.utils.encode_cell({ r: 1, c: index * 3 });
//   //   worksheet[cellAddress] = { t: "s", v: leaveType };
//   //   console.log("cellAddress for the leave type headers::  ", cellAddress);

//   //   // Get the corresponding color for this leave type using leavetypeid
//   //   const leaveTypeId = exportData[index].leavetypeid;
//   //   const color = leaveTypeColors[leaveTypeId];

//   //   worksheet[cellAddress].s = {
//   //     font: { bold: true, sz: 14, color: { rgb: "000000" } },
//   //     fill: { fgColor: { rgb: color } }, // Apply color dynamically based on leavetypeid
//   //     alignment: { horizontal: "center", vertical: "center" },
//   //     border: {
//   //       top: { style: "thin", color: { rgb: "000000" } },
//   //       left: { style: "thin", color: { rgb: "000000" } },
//   //       bottom: { style: "thin", color: { rgb: "000000" } },
//   //       right: { style: "thin", color: { rgb: "000000" } },
//   //     },
//   //   };
//   // });


//   //     // Weekday headers (to display days of the week)
//   //     const weekdayHeaders = ["Month"];
//   // for (let day = 1; day <= 31; day++) {
//   //   const weekday = new Date(year, 0, day).toLocaleDateString("en-US", { weekday: "short" });
//   //   weekdayHeaders.push(weekday);
//   // }

//   // // Add the headers to the worksheet
//   // XLSX.utils.sheet_add_aoa(worksheet, [weekdayHeaders], { origin: "A3" });

//   // // Style only Sundays in the header row
//   // weekdayHeaders.forEach((header, index) => {
//   //   const cellAddress = XLSX.utils.encode_cell({ r: 2, c: index }); // Row 2 (A3 is the third row, 0-based index is 2)

//   //   worksheet[cellAddress] = worksheet[cellAddress] || { t: "s", v: header }; // Ensure the cell exists

//   //   // Apply styles only to Sundays
//   //   worksheet[cellAddress].s = {
//   //     font: { bold: true, sz: 14, color: { rgb: "000000" } },
//   //     fill: 
//   //        { patternType: "solid", fgColor: { rgb: "F4F78B" } }, // Default white background for other days
//   //     alignment: { horizontal: "center", vertical: "center" },
//   //     border: {
//   //       top: { style: "thin", color: { rgb: "000000" } },
//   //       left: { style: "thin", color: { rgb: "000000" } },
//   //       bottom: { style: "thin", color: { rgb: "000000" } },
//   //       right: { style: "thin", color: { rgb: "000000" } },
//   //     },
//   //   };
//   // });


//   //     let rowIndex = 4; // Start after headers



//   //     yearGroupedData[year].months.forEach((monthData, monthIndex) => {
//   //       const daysInMonth = new Date(year, monthIndex + 1, 0).getDate(); // Get days in the month
//   //       const monthRow = new Array(32).fill(""); // 1 column for "Month" + 31 days

//   //       // Set the month name
//   //       const monthName = new Date(year, monthIndex).toLocaleDateString("en-US", { month: "long" });
//   //       monthRow[0] = `${monthName}`;

//   //          const filteredLeaveData = yearlyGroupedData.map((leave) => {
//   //         const fromDate = new Date(leave.fromdate);
//   //         const toDate = new Date(leave.todate);

//   //         const days = [];
//   //         for (let date = new Date(fromDate); date <= toDate; date.setDate(date.getDate() + 1)) {
//   //           days.push(date.getDate());
//   //         }

//   //         return {
//   //           leaveType: leave.leavetypeid,
//   //           leaveYear: fromDate.getFullYear(),
//   //           leaveMonth: fromDate.getMonth() + 1,
//   //           days,
//   //         };
//   //       });

//   //       const checkLeaveData = filteredLeaveData
//   //         .filter(({ leaveYear }) => Number(leaveYear) === Number(year))
//   //         .map(({ leaveMonth, days, leaveType }) => {
//   //           return { [leaveMonth]: days, leavetypeid: leaveType };
//   //         });

//   //       for (let day = 1; day <= daysInMonth; day++) {
//   //         // Add day to the row for display
//   //         monthRow[day] = day;
//   //       }



//   //       // Add the month row to the worksheet
//   //       XLSX.utils.sheet_add_aoa(worksheet, [monthRow], { origin: `A${rowIndex}` });

//   //       // Apply styles specifically after adding data
//   //       for (let day = 1; day <= daysInMonth; day++) {
//   //         const cellAddress = XLSX.utils.encode_cell({ r: rowIndex - 1, c: day });

//   //               const matchedLeaveData = checkLeaveData.find((leaveData) => {
//   //             const leaveMonth = Object.keys(leaveData)[0]; // Extract the month
//   //             const leaveDays = leaveData[leaveMonth]; // Extract the days
//   //             return (
//   //               Number(leaveMonth) === Number(monthIndex + 1) &&
//   //               Array.isArray(leaveDays) &&
//   //               leaveDays.includes(day)
//   //             );
//   //           });


//   //                  if (matchedLeaveData && matchedLeaveData[monthIndex + 1]?.includes(day)) {

//   //             // console.log("Matched dar :",day +"    "+"rowindex :",rowIndex);
//   //             console.log("leaveTypeColors::",matchedLeaveData.leavetypeid);


//   //             // const colorForMatch = "C6EFCE"; // Light green for matched days
//   //             worksheet[cellAddress] = worksheet[cellAddress] || { t: "n", v: day }; // Ensure the cell exists
//   //             worksheet[cellAddress].s = {
//   //               font: { bold: true, sz: 12, color: { rgb: "040403" } },
//   //               fill: { patternType: "solid", fgColor: { rgb: leaveTypeColors[matchedLeaveData.leavetypeid] } },
//   //               alignment: { horizontal: "center", vertical: "center" },
//   //               border: {
//   //                 top: { style: "thin", color: { rgb: "000000" } },
//   //                 left: { style: "thin", color: { rgb: "000000" } },
//   //                 bottom: { style: "thin", color: { rgb: "000000" } },
//   //                 right: { style: "thin", color: { rgb: "000000" } },
//   //               },
//   //             };
//   //           }

//   //       }

//   //       rowIndex++;
//   //     });


//   //     const workbook = XLSX.utils.book_new();
//   //     XLSX.utils.book_append_sheet(workbook, worksheet, `Leave Report ${year}`);
//   //     XLSX.writeFile(workbook, `Leave_Summary_Report_${year}.xlsx`);
//   //   };



//   const exportHandler = (year, exportData, yearlyGroupedData) => {
//     if (!yearGroupedData[year] || !Array.isArray(yearGroupedData[year].months)) {
//       console.error(`Invalid year data for year: ${year}`);
//       return;
//     }

//     // Dynamic color palette for leave types
//     const colorPalette = [
//       "FFC7CE", // Light Red
//       "C6EFCE", // Light Green
//       "FFEB9C", // Light Yellow
//       "D9E2F3", // Light Blue
//       "E2EFDA", // Light Greenish
//       "F4CCCC", // Light Pink
//     ];

//     // Assign colors dynamically to leave types based on leavetypeid
//     const leaveTypeColors = exportData.reduce((acc, leaveType, index) => {
//       acc[leaveType.leavetypeid] = colorPalette[index % colorPalette.length];
//       return acc;
//     }, {});

//     // Create the worksheet
//     const worksheet = XLSX.utils.json_to_sheet([]);
//     const empId = userLeavesData[1]?.emp_id || "Unknown";
//     const headerText = `Employee ID: ${empId} - ${year}`;
//     worksheet["A1"] = { t: "s", v: headerText };

//     // Generate leave type headers
//     const leaveTypeHeaders = exportData.map((leaveType) => leaveType.leavetype);
//     const totalColumns = leaveTypeHeaders.length * 3; // Each leave type has 3 columns

//     // Merge the first-row cells for the header text
//     worksheet["!merges"] = [
//       { s: { r: 0, c: 0 }, e: { r: 0, c: totalColumns - 1 } },
//       ...leaveTypeHeaders.map((_, index) => ({
//         s: { r: 1, c: index * 3 },
//         e: { r: 1, c: index * 3 + 2 },
//       })),
//     ];

//     // Style the main header
//     worksheet["A1"].s = {
//       font: { bold: true, sz: 20, color: { rgb: "FFFFFF" } },
//       fill: { fgColor: { rgb: "4F81BD" } },
//       alignment: { horizontal: "center", vertical: "center" },
//       border: { top: { style: "thin", color: { rgb: "000000" } }, bottom: { style: "thin", color: { rgb: "000000" } } },
//     };

//     // Add leave type headers in the second row
//     leaveTypeHeaders.forEach((leaveType, index) => {
//       const cellAddress = XLSX.utils.encode_cell({ r: 1, c: index * 3 });
//       worksheet[cellAddress] = { t: "s", v: leaveType };

//       // Get the corresponding color for this leave type using leavetypeid
//       console.log("exportDataL:::", exportData);

//       const leaveTypeId = exportData[index].leavetypeid;
//       const color = leaveTypeColors[leaveTypeId];

//       worksheet[cellAddress].s = {
//         font: { bold: true, sz: 14, color: { rgb: "000000" } },
//         fill: { fgColor: { rgb: color } }, // Apply color dynamically based on leavetypeid
//         alignment: { horizontal: "center", vertical: "center" },
//         border: {
//           top: { style: "thin", color: { rgb: "000000" } },
//           left: { style: "thin", color: { rgb: "000000" } },
//           bottom: { style: "thin", color: { rgb: "000000" } },
//           right: { style: "thin", color: { rgb: "000000" } },
//         },
//       };
//     });

//     const weekdayHeaders = ["Month"];
//     const staticWeekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//     // Loop through all months (0 for January to 11 for December)
//     for (let month = 0; month < 12; month++) {
//       const totalDaysInMonth = new Date(year, month + 1, 0).getDate(); // Get total days for the current month

//       for (let day = 1; day <= totalDaysInMonth; day++) {
//         const weekday = staticWeekdays[(day - 1) % 7]; // Cycle through Sun-Sat
//         weekdayHeaders.push(weekday);
//       }
//     }

//     // Add the headers to the worksheet
//     XLSX.utils.sheet_add_aoa(worksheet, [weekdayHeaders], { origin: "A3" });

//     // Style the weekday headers
//     weekdayHeaders.forEach((header, index) => {
//       const cellAddress = XLSX.utils.encode_cell({ r: 2, c: index }); // Row 2 (0-based index is 2)
//       worksheet[cellAddress] = worksheet[cellAddress] || { t: "s", v: header }; // Ensure the cell exists

//       worksheet[cellAddress].s = {
//         font: { bold: true, sz: 14, color: { rgb: "000000" } },
//         fill: { patternType: "solid", fgColor: { rgb: "F4F78B" } },
//         alignment: { horizontal: "center", vertical: "center" },
//         border: {
//           top: { style: "thin", color: { rgb: "000000" } },
//           left: { style: "thin", color: { rgb: "000000" } },
//           bottom: { style: "thin", color: { rgb: "000000" } },
//           right: { style: "thin", color: { rgb: "000000" } },
//         },
//       };
//     });



//     let rowIndex = 4; // Start after headers

//     yearGroupedData[year].months.forEach((monthData, monthIndex) => {
//       const daysInMonth = new Date(year, monthIndex + 1, 0).getDate(); // Total days in the current month
//       const firstDayOfWeek = new Date(year, monthIndex, 1).getDay(); // Weekday of the first day of the month
//       const monthName = new Date(year, monthIndex).toLocaleDateString("en-US", { month: "long" });

//       // Initialize the row with the month name
//       const monthRow = new Array(32).fill("");
//       monthRow[0] = monthName;
//       // console.log("yearlyGroupedData::: ",yearlyGroupedData)
//       const filteredLeaveData = yearlyGroupedData.map((leave) => {
//         const fromDate = new Date(leave.fromdate);
//         const toDate = new Date(leave.todate);

//         const days = [];
//         for (let date = new Date(fromDate); date <= toDate; date.setDate(date.getDate() + 1)) {
//           days.push(date.getDate());
//         }

//         return {
//           leaveType: leave.leavetypeid,
//           leaveYear: fromDate.getFullYear(),
//           leaveMonth: fromDate.getMonth() + 1,
//           days,
//         };
//       });
//       // console.log("filteredLeaveData::",filteredLeaveData);

//       const checkLeaveData = filteredLeaveData
//         .filter(({ leaveYear }) => Number(leaveYear) === Number(year))
//         .map(({ leaveMonth, days, leaveType }) => {
//           return { leaveMonth, days, leaveType };
//         });

//       // Populate dates in the correct columns
//       for (let day = 1; day <= daysInMonth; day++) {
//         const columnIndex = firstDayOfWeek + day; // Start offset for the first day
//         monthRow[columnIndex] = day;
//       }

//       // Add the month row to the worksheet
//       XLSX.utils.sheet_add_aoa(worksheet, [monthRow], { origin: `A${rowIndex}` });

//       // Apply colors based on matching leave days
//       for (let day = 1; day <= daysInMonth; day++) {
//         const matchedLeaveData = checkLeaveData.find(({ leaveMonth, days }) => {
//           return leaveMonth === monthIndex + 1 && days.includes(day);
//         });

//         if (matchedLeaveData) {
//           // Find the correct leaveType name using the matched leaveType ID
//           const leaveType = exportData.find(data => data.leavetypeid === matchedLeaveData.leaveType);
          
//           // Check if the leaveType is found, then proceed
//           console.log("leaveType::", leaveType);
//           if (matchedLeaveData) {
//             // Find the correct leaveType name using the matched leaveType ID
//             const leaveType = exportData.find(data => data.leavetypeid === matchedLeaveData.leaveType);
            
//             // Check if the leaveType is found, then proceed
//             console.log("leaveType::", leaveType);
//             if (leaveType) {
                
//                 const leaveTypeShort = leaveType.leavetype.substring(0, 3);  // Get the first three letters of the leaveType
//                 console.log("leaveTypeShort::", leaveTypeShort);
                
//                 const cellAddress = XLSX.utils.encode_cell({ r: rowIndex - 1, c: firstDayOfWeek + day });
                
//                 // Debug: Log cell address and current value
//                 console.log("Cell Address:", cellAddress);
//                 console.log("Current Cell Value:", worksheet[cellAddress]);
        
//                 // Ensure the cell is initialized and value is being set
//                 if (!worksheet[cellAddress]) {
//                     worksheet[cellAddress] = { t: "s", v: `${day} ${leaveTypeShort}` };  // Initialize the cell with value as string
//                 } else {
//                     worksheet[cellAddress].v = `${day}  ${leaveTypeShort}`;  // Update the value if cell already exists
//                     worksheet[cellAddress].t = "s";  // Set type to string
//                 }
        
//                 // Apply styling to the cell
//                 worksheet[cellAddress].s = {
//                     font: { bold: true, sz: 12, color: { rgb: "040403" } },
//                     fill: {
//                         patternType: "solid",
//                         fgColor: { rgb: leaveTypeColors[matchedLeaveData.leaveType] || "C6EFCE" }, // Default color if not found
//                     },
//                     alignment: { horizontal: "center", vertical: "center" },
//                     border: {
//                         top: { style: "thin", color: { rgb: "000000" } },
//                         left: { style: "thin", color: { rgb: "000000" } },
//                         bottom: { style: "thin", color: { rgb: "000000" } },
//                         right: { style: "thin", color: { rgb: "000000" } },
//                     },
//                 };
        
//                 // Debug log to ensure it's being added correctly
//                 console.log("Cell Updated: ", worksheet[cellAddress]);
//             }
//         }
        
//       }
      
      
      
//       }

//       rowIndex++;
//     });




//     // Create the workbook and write the file
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, worksheet, `Leave Report - ${year}`);
//     XLSX.writeFile(wb, `Leave_Report_${year}.xlsx`);
//   };


//   return (
//     <div>
//       <div className="LeaveSummary_container">
//         <div>
//           <h2 style={{ textAlign: "center" }}>Leave Summary Reports</h2>
//         </div>
//         <table align="center" className="emp_details_tbl">
//           <tbody>
//             <tr>
//               <td>Employee Name :</td>
//               <td>{userLeavesData[1]?.emp_first_name}</td>
//               <td>Manager Name :</td>
//               <td>{userLeavesData[0]?.managerDetails?.emp_first_name}</td>
//               <td>Role :</td>
//               <td>{userLeavesData[1]?.role}</td>
//             </tr>
//           </tbody>
//         </table>
//         <div className="tbls_scroll">
//           {Object.keys(leaveDataByYear)?.length > 0 ? (
//             Object.keys(leaveDataByYear)
//               .filter((year) => yearGroupedData[year])
//               .map((year) => (
//                 <div key={year}>
//                   <div className="export_div">
//                     <button onClick={() => exportHandler(year, leaveDataByYear[year], userLData)} className="btn_export">Export To Excel Sheet</button>
//                     <span>Year: {year} | Employee ID: {userLeavesData[1]?.emp_id}</span>
//                   </div>
//                   <div className="scrollable_table_container">
//                     <table className="emp_details_tbl2">
//                       <thead>
//                         <tr>
//                           <th>Leave Type</th>
//                           <th>Jan</th>
//                           <th>Feb</th>
//                           <th>Mar</th>
//                           <th>Apr</th>
//                           <th>May</th>
//                           <th>Jun</th>
//                           <th>Jul</th>
//                           <th>Aug</th>
//                           <th>Sep</th>
//                           <th>Oct</th>
//                           <th>Nov</th>
//                           <th>Dec</th>
//                           <th>Allotted</th>
//                           <th>Availed</th>
//                           <th>Left Over</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {leaveDataByYear[year]?.map((leaveType) => {
//                           const totalAvailed = yearGroupedData[year]?.applied[leaveType.leavetype] || 0.0;
//                           const allotted = leaveType.leaves_per_year;
//                           const availed = totalAvailed > allotted ? 0.0 : totalAvailed;
//                           const leftOver = allotted - totalAvailed > 0 ? allotted - totalAvailed : 0.0;

//                           return (
//                             <tr key={`${leaveType.leavetypeid}-${leaveType.leavetype}`}>
//                               <td>{leaveType.leavetype}</td>
//                               {yearGroupedData[year]?.months.map((leaves, monthIndex) => (
//                                 <td
//                                   style={{
//                                     backgroundColor: leaves[leaveType.leavetype] ? "yellow" : "white",
//                                   }}
//                                   key={monthIndex}
//                                 >
//                                   {leaves[leaveType.leavetype]
//                                     ? leaves[leaveType.leavetype].toFixed(1)
//                                     : "0.0"}
//                                 </td>
//                               ))}
//                               <td>{allotted}</td>
//                               <td
//                                 style={{
//                                   backgroundColor: totalAvailed > allotted ? "red" : "transparent",
//                                   color: totalAvailed > allotted ? "white" : "inherit",
//                                 }}
//                                 onMouseEnter={(e) => handleMouseEnter(allotted, totalAvailed, e)}
//                                 onMouseLeave={handleMouseLeave}
//                               >
//                                 {availed}
//                               </td>
//                               <td>{leftOver.toFixed(1)}</td>
//                             </tr>
//                           );
//                         })}
//                       </tbody>
//                     </table>
//                     {tooltip.visible && (
//                       <div
//                         style={{
//                           position: "absolute",
//                           left: tooltip.x + 10,
//                           top: tooltip.y - 10,
//                           backgroundColor: "black",
//                           color: "white",
//                           padding: "5px",
//                           borderRadius: "3px",
//                         }}
//                       >
//                         {tooltip.content}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))
//           ) : (
//             <h3>No data found for the selected year.</h3>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LMS_LeaveSummary;


import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx-js-style";
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  useMediaQuery,
  useTheme,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";

const LMS_LeaveSummary = () => {
  const [userLeavesData, setUserLeavesData] = useState([]);
  const [yearGroupedData, setYearGroupedData] = useState({});
  const [leaveDataByYear, setLeaveDataByYear] = useState({});
  const [empDOJ, setEmpDOJ] = useState(null);
  const leavesData = useSelector((state) => state.empDetailsData);
  const location = useLocation();
  const [userLData, setUserLData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [availableYears, setAvailableYears] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchData = async () => {
      if (!leavesData[1]?.emp_id) return;
      
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://192.168.2.120:3003/LMS-Page/get_All_user_leaves?emp_id=${leavesData[1]?.emp_id}&manager_id=${leavesData[1]?.manager_id}`
        );

        setUserLeavesData(leavesData);
        setUserLData(response.data.user_leaves);

        const employeeDOJ = new Date(response.data.emp_Details[0]?.doj || Date.now());
        setEmpDOJ(employeeDOJ);

        const groupedByYear = response.data.leaveTypes.reduce((acc, leave) => {
          if (leave.leaves_year >= employeeDOJ.getFullYear()) {
            acc[leave.leaves_year] = acc[leave.leaves_year] || [];
            acc[leave.leaves_year].push(leave);
          }
          return acc;
        }, {});

        // Process leave data
        const processedLeaves = response.data.leaveTypes.flatMap((leaveType) => {
          return response.data.user_leaves
            .filter((leave) => leave.leavetypeid === leaveType.leavetypeid)
            .map((leave) => ({
              duration: leave.duration,
              leaveAppliedDate: leave.fromdate,
              leavetype: leaveType.leavetype,
            }));
        });

        const groupedData = processedLeaves.reduce((acc, leave) => {
          const leaveDate = new Date(leave.leaveAppliedDate);
          const year = leaveDate.getFullYear();
          const month = leaveDate.getMonth();
          if (!isNaN(year)) {
            acc[year] = acc[year] || { months: Array.from({ length: 12 }, () => ({})), applied: {} };
            acc[year].months[month][leave.leavetype] = (acc[year].months[month][leave.leavetype] || 0) + leave.duration;
            acc[year].applied[leave.leavetype] = (acc[year].applied[leave.leavetype] || 0) + leave.duration;
          }
          return acc;
        }, {});

        const filteredGroupedData = Object.keys(groupedData).reduce((acc, year) => {
          const hasLeaveData = groupedData[year].months.some((monthData) =>
            Object.values(monthData).some((value) => value > 0)
          );
          if (hasLeaveData) acc[year] = groupedData[year];
          return acc;
        }, {});

        setYearGroupedData(filteredGroupedData);

        const years = Object.keys(groupedByYear)
          .filter(year => filteredGroupedData[year])
          .sort((a, b) => b - a);

        setAvailableYears(years);
        setLeaveDataByYear(groupedByYear);

        if (years.length > 0 && !selectedYear) {
          setSelectedYear(years[0]);
        }
      } catch (error) {
        console.error("Error fetching leave data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [leavesData, location.key]); // Removed yearGroupedData from dependencies

  const exportHandler = (year, exportData, yearlyGroupedData) => {
    if (!yearGroupedData[year] || !Array.isArray(yearGroupedData[year].months)) {
      console.error(`Invalid year data for year: ${year}`);
      return;
    }
  
    // Define our custom header columns
    const customHeaders = [
      "Month", 
      "Sick Leave", 
      "Privilege Leave", 
      "Workers' Compensation", 
      "Paternity Leave", 
      "Work from Home"
    ];
  
    // Create a mapping between leave types and our custom headers
    const leaveTypeMapping = {
      "Sick Leave": "Sick Leave",
      "Privilege Leave": "Privilege Leave",
      "Workers' Compensation": "Workers' Compensation",
      "Paternity Leave": "Paternity Leave",
      "Work from Home": "Work from Home"
    };
  
    const colorPalette = [
      "FFC7CE", // Light Red - Sick Leave
      "C6EFCE", // Light Green - Privilege Leave
      "FFEB9C", // Light Yellow - Workers' Compensation
      "D9E2F3", // Light Blue - Paternity Leave
      "E2EFDA", // Light Greenish - Work from Home
    ];
  
    const worksheet = XLSX.utils.json_to_sheet([]);
    const empId = userLeavesData[1]?.emp_id || "Unknown";
    
    // First row - Employee ID and Year
    worksheet["A1"] = { t: "s", v: `Employee ID: ${empId} - ${year}` };
    worksheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: customHeaders.length - 1 } }];
    
    // Style first row
    worksheet["A1"].s = {
      font: { bold: true, sz: 20, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "4F81BD" } },
      alignment: { horizontal: "center", vertical: "center" },
      border: { 
        top: { style: "thin", color: { rgb: "000000" } }, 
        bottom: { style: "thin", color: { rgb: "000000" } } 
      },
    };
  
    // Second row - Custom headers
    customHeaders.forEach((header, index) => {
      const cellAddress = XLSX.utils.encode_cell({ r: 1, c: index });
      worksheet[cellAddress] = { t: "s", v: header };
      
      worksheet[cellAddress].s = {
        font: { bold: true, sz: 14, color: { rgb: "000000" } },
        fill: { fgColor: { rgb: colorPalette[index % colorPalette.length] } },
        alignment: { horizontal: "center", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      };
    });
  
    // Start data from row 3 (0-based index 2)
    let rowIndex = 2;
  
    // Process each month's data
    yearGroupedData[year].months.forEach((monthData, monthIndex) => {
      const monthName = new Date(year, monthIndex).toLocaleDateString("en-US", { month: "long" });
      
      // Create a row with month name and leave data
      const rowData = [monthName];
      
      // Fill data for each leave type in our custom headers
      customHeaders.slice(1).forEach(header => {
        const leaveType = Object.keys(leaveTypeMapping).find(
          key => leaveTypeMapping[key] === header
        );
        
        // Get the duration for this leave type in this month
        const duration = monthData[leaveType] || 0;
        rowData.push(duration.toFixed(1));
      });
  
      // Add the row to the worksheet
      XLSX.utils.sheet_add_aoa(worksheet, [rowData], { origin: `A${rowIndex + 1}` });
  
      // Style the row
      rowData.forEach((_, colIndex) => {
        const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
        worksheet[cellAddress] = worksheet[cellAddress] || { t: colIndex === 0 ? "s" : "n", v: rowData[colIndex] };
        
        worksheet[cellAddress].s = {
          font: { sz: 12, color: { rgb: "000000" } },
          alignment: { horizontal: "center", vertical: "center" },
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
          },
        };
      });
  
      rowIndex++;
    });
  
    // Add totals row
    const totalsRow = ["Total"];
    customHeaders.slice(1).forEach(header => {
      const leaveType = Object.keys(leaveTypeMapping).find(
        key => leaveTypeMapping[key] === header
      );
      
      // Calculate total for this leave type across all months
      const total = yearGroupedData[year].months.reduce((sum, monthData) => {
        return sum + (monthData[leaveType] || 0);
      }, 0);
      
      totalsRow.push(total.toFixed(1));
    });
  
    XLSX.utils.sheet_add_aoa(worksheet, [totalsRow], { origin: `A${rowIndex + 1}` });
  
    // Style totals row
    totalsRow.forEach((_, colIndex) => {
      const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
      worksheet[cellAddress] = worksheet[cellAddress] || { t: colIndex === 0 ? "s" : "n", v: totalsRow[colIndex] };
      
      worksheet[cellAddress].s = {
        font: { bold: true, sz: 12, color: { rgb: "000000" } },
        fill: { fgColor: { rgb: "D9D9D9" } },
        alignment: { horizontal: "center", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      };
    });
  
    // Auto-size columns
    worksheet["!cols"] = customHeaders.map(() => ({ wch: 15 }));
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Leave Report ${year}`);
    XLSX.writeFile(workbook, `Leave_Summary_Report_${year}.xlsx`);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <Box sx={{ 
      p: isMobile ? 1 : 3,
      mt: isMobile ? 8 : 4,
      maxWidth: '100vw',
      overflowX: 'auto',
      
    }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Leave Summary Reports
      </Typography>

      <Box sx={{ 
        mb: 3,
        p: 2,
        backgroundColor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1
      }}>
        <Typography variant="body1">
          <strong>Employee:</strong> {userLeavesData[1]?.emp_first_name} | 
          <strong> Manager:</strong> {userLeavesData[0]?.managerDetails?.emp_first_name} | 
          <strong> Role:</strong> {userLeavesData[1]?.role}
        </Typography>
      </Box>

      {isLoading ? (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          Loading leave data...
        </Typography>
      ) : availableYears.length > 0 ? (
        <Box sx={{ mb: 4 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            p: 1,
            backgroundColor: 'primary.main',
            color: 'white',
            borderRadius: 1
          }}>
            <FormControl variant="outlined" size="small">
              
              <Select
                value={selectedYear || ''}
                onChange={handleYearChange}
                
              >
                {availableYears.map((year) => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button 
              variant="contained" 
              color="secondary"
              onClick={() => exportHandler(selectedYear, leaveDataByYear[selectedYear], userLData)}
              size={isMobile ? "small" : "medium"}
              disabled={!selectedYear}
            >
              Export
            </Button>
          </Box>

          {selectedYear && (
            <TableContainer component={Paper} sx={{ maxHeight: 400, mb: 2 }}>
              <Table stickyHeader size={isMobile ? "small" : "medium"}>
                <TableHead>
                  <TableRow>
                    <TableCell>Leave Type</TableCell>
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                      <TableCell key={month} align="center">{month}</TableCell>
                    ))}
                    <TableCell align="center">Allotted</TableCell>
                    <TableCell align="center">Availed</TableCell>
                    <TableCell align="center">Left Over</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaveDataByYear[selectedYear]?.map((leaveType) => {
                    const totalAvailed = yearGroupedData[selectedYear]?.applied[leaveType.leavetype] || 0.0;
                    const allotted = leaveType.leaves_per_year;
                    const availed = totalAvailed > allotted ? 0.0 : totalAvailed;
                    const leftOver = allotted - totalAvailed > 0 ? allotted - totalAvailed : 0.0;
                    const lossOfPay = totalAvailed > allotted ? Math.abs(allotted - totalAvailed) : 0;

                    return (
                      <TableRow key={`${leaveType.leavetypeid}-${leaveType.leavetype}`}>
                        <TableCell>{leaveType.leavetype}</TableCell>
                        {yearGroupedData[selectedYear]?.months.map((leaves, monthIndex) => (
                          <TableCell 
                            key={monthIndex}
                            align="center"
                            sx={{ 
                              backgroundColor: leaves[leaveType.leavetype] ? 'rgba(255, 255, 0, 0.3)' : 'inherit',
                              fontWeight: leaves[leaveType.leavetype] ? 'bold' : 'normal'
                            }}
                          >
                            {leaves[leaveType.leavetype]?.toFixed(1) || '0.0'}
                          </TableCell>
                        ))}
                        <TableCell align="center">{allotted}</TableCell>
                        <TableCell 
                          align="center"
                          sx={{ 
                            backgroundColor: totalAvailed > allotted ? 'error.main' : 'inherit',
                            color: totalAvailed > allotted ? 'common.white' : 'inherit'
                          }}
                        >
                          <Tooltip 
                            title={lossOfPay > 0 ? `Loss of Pay: ${lossOfPay}` : ''} 
                            arrow
                          >
                            <span>{availed}</span>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center">{leftOver.toFixed(1)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      ) : (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No leave data found
        </Typography>
      )}
    </Box>
  );
};

export default LMS_LeaveSummary;