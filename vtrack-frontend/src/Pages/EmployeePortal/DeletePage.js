// import React, { useState } from 'react';
// import axios from 'axios';

// const DeletePage = () => {
//     const [text, setText] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");

//     const deleteHandler = () => {
//         if (text.trim() === "") {
//             setErrorMessage("* Employee ID is required.");
//             return;
//         }

//         axios.delete(`http://192.168.2.126:3002/empDetails/delete-empDetails?e_id=${text}`)
//             .then(res => {
//                 if (res.data.response.rowCount === 0) {
//                     alert("No data found to delete");
//                     setText("");
//                 } else {
//                     alert("Data deleted successfully");
//                     setText(""); 
//                 }
//             })
//             .catch(err => console.log(err));
//     }

//     const handleInputChange = (e) => {
//         setText(e.target.value);
//         if (e.target.value.trim() === "") {
//             setErrorMessage("* Employee ID is required.");
//         } else {
//             setErrorMessage("");
//         }
//     }

//     return (
//         <div style={{ position: "relative", top: "100px", right: "110px" }}>
//             <table align='center'>
//                 <tbody>
//                     <tr>
//                         <td>Employee id <span style={{ color: "red" }}>*</span></td>
//                         <td>
//                             <input type='text' value={text} onChange={handleInputChange} />
//                             <span style={{ color: "red" }}>{errorMessage}</span>
//                         </td>
//                     </tr>
//                     <tr>
//                         <td colSpan="2" align='center'>
//                             <button onClick={deleteHandler}>Delete</button>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default DeletePage;
