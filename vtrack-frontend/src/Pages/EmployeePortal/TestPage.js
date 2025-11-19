// import React, { useEffect, useState } from 'react';
// import CryptoJS from 'crypto-js';

// const EncryptDecrypt = () => {
//   const [rawText, setRawText] = useState('');
//   const [encText, setEncText] = useState('');
//   const [decryptedText, setDecryptedText] = useState('');
//   const [predefinedDecryptedText, setPredefinedDecryptedText] = useState('');

//   const key = 'vensaiVtrack';
//   const sharedVector = [1, 2, 3, 5, 7, 11, 13, 17];

//   const encrypt = (text) => {
//     const keyHash = CryptoJS.MD5(key);
//     let keyBytes = CryptoJS.enc.Hex.parse(keyHash.toString());
//     keyBytes = CryptoJS.lib.WordArray.create(keyBytes.words.concat(keyBytes.words.slice(0, 2))); // Make it 24 bytes
//     const iv = CryptoJS.enc.Utf8.parse(String.fromCharCode(...sharedVector));

//     const encrypted = CryptoJS.TripleDES.encrypt(text, keyBytes, {
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     });

//     return encrypted.toString();
//   };

//   const decrypt = (cipherText) => {
//     const keyHash = CryptoJS.MD5(key);
//     let keyBytes = CryptoJS.enc.Hex.parse(keyHash.toString());
//     keyBytes = CryptoJS.lib.WordArray.create(keyBytes.words.concat(keyBytes.words.slice(0, 2))); // Make it 24 bytes
//     const iv = CryptoJS.enc.Utf8.parse(String.fromCharCode(...sharedVector));

//     const decrypted = CryptoJS.TripleDES.decrypt(cipherText, keyBytes, {
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     });

//     return decrypted.toString(CryptoJS.enc.Utf8);
//   };

//   const handleEncrypt = () => {
//     const encryptedText = encrypt(rawText);
//     setEncText(encryptedText);
//   };

//   const handleDecrypt = () => {
//     const decryptedText = decrypt(encText);
//     setDecryptedText(decryptedText);
//   };

//   const handlePredefinedDecrypt = () => {
//     console.log("Clicked::")
//     const predefinedCipherText = 'w6ZU7jKc0K4=';
//     const decryptedText = decrypt(predefinedCipherText);
//     console.log("Decrypted predefined text:", decryptedText); // Debug logging
//     setPredefinedDecryptedText(decryptedText);
//   };

//   useEffect(() => {
//     console.log("Predefined Decrypted Text:::", predefinedDecryptedText);
//   }, [predefinedDecryptedText]);

//   return (
//     <div>
//       <h2>Encrypt/Decrypt</h2>
//       <div>
//         <label>
//           Raw Text:
//           <input
//             type="text"
//             value={rawText}
//             onChange={(e) => setRawText(e.target.value)}
//           />
//         </label>
//       </div>
//       <button onClick={handleEncrypt}>Encrypt</button>
//       <div>
//         <label>
//           Encrypted Text:
//           <input
//             type="text"
//             value={encText}
//             readOnly
//           />
//         </label>
//       </div>
//       <button onClick={handleDecrypt}>Decrypt</button>
//       <div>
//         <label>
//           Decrypted Text:
//           <input
//             type="text"
//             value={decryptedText}
//             readOnly
//           />
//         </label>
//       </div>
//       <hr />
//       <button onClick={handlePredefinedDecrypt}>Decrypt Predefined Text</button>
//       <div>
//         <label>
//           Decrypted Predefined Text:
//           <input
//             type="text"
//             value={predefinedDecryptedText}
//             readOnly
//           />
//         </label>
//       </div>
//     </div>
//   );
// };

// export default EncryptDecrypt;


// import React, { useEffect, useState } from 'react';
// import CryptoJS from 'crypto-js';

// const EncryptDecrypt = () => {
//   const [rawText, setRawText] = useState('');
//   const [encText, setEncText] = useState('');
//   const [decryptedText, setDecryptedText] = useState('');
//   const [predefinedDecryptedText, setPredefinedDecryptedText] = useState('');

//   const key = 'vensaiVtrack';
//   const sharedVector = [1, 2, 3, 5, 7, 11, 13, 17];

//   const encrypt = (text) => {
//     const keyHash = CryptoJS.MD5(key);
//     let keyBytes = CryptoJS.enc.Hex.parse(keyHash.toString() + keyHash.toString().substring(0, 16)); // Make it 24 bytes
//     const iv = CryptoJS.enc.Utf8.parse(String.fromCharCode(...sharedVector));

//     const encrypted = CryptoJS.TripleDES.encrypt(text, keyBytes, {
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     });

//     return encrypted.toString();
//   };

//   const decrypt = (cipherText) => {
//     const keyHash = CryptoJS.MD5(key);
//     let keyBytes = CryptoJS.enc.Hex.parse(keyHash.toString() + keyHash.toString().substring(0, 16)); // Make it 24 bytes
//     const iv = CryptoJS.enc.Utf8.parse(String.fromCharCode(...sharedVector));

//     const decrypted = CryptoJS.TripleDES.decrypt(cipherText, keyBytes, {
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     });

//     return decrypted.toString(CryptoJS.enc.Utf8);
//   };

//   const handleEncrypt = () => {
//     const encryptedText = encrypt(rawText);
//     setEncText(encryptedText);
//   };

//   const handleDecrypt = () => {
//     const decryptedText = decrypt(encText);
//     setDecryptedText(decryptedText);
//   };

//   const handlePredefinedDecrypt = () => {
//     console.log("Clicked::");
//     const predefinedCipherText = 'w6ZU7jKc0K4=';
//     const decryptedText = decrypt(predefinedCipherText);
//     console.log("Decrypted predefined text:", decryptedText); // Debug logging
//     setPredefinedDecryptedText(decryptedText);
//   };

//   useEffect(() => {
//     console.log("Predefined Decrypted Text:::", predefinedDecryptedText);
//   }, [predefinedDecryptedText]);

//   return (
//     <div>
//       <h2>Encrypt/Decrypt</h2>
//       <div>
//         <label>
//           Raw Text:
//           <input
//             type="text"
//             value={rawText}
//             onChange={(e) => setRawText(e.target.value)}
//           />
//         </label>
//       </div>
//       <button onClick={handleEncrypt}>Encrypt</button>
//       <div>
//         <label>
//           Encrypted Text:
//           <input
//             type="text"
//             value={encText}
//             readOnly
//           />
//         </label>
//       </div>
//       <button onClick={handleDecrypt}>Decrypt</button>
//       <div>
//         <label>
//           Decrypted Text:
//           <input
//             type="text"
//             value={decryptedText}
//             readOnly
//           />
//         </label>
//       </div>
//       <hr />
//       <button onClick={handlePredefinedDecrypt}>Decrypt Predefined Text</button>
//       <div>
//         <label>
//           Decrypted Predefined Text:
//           <input
//             type="text"
//             value={predefinedDecryptedText}
//             readOnly
//           />
//         </label>
//       </div>
//     </div>
//   );
// };

// export default EncryptDecrypt;

//Encryption==========================================================================

// import React, { useState } from 'react';
// import CryptoJS from 'crypto-js';

// const App = () => {

//     // Define the initialization vector as a hex string and parse it
//     const sharedvector = CryptoJS.enc.Hex.parse('01020305070B0D0D'); // Hex representation of byte array

//     // Define the key as a string
//     const key = 'vensaiVtrack';

//     // Generate a 24-byte key from the original key using MD5
//     const getKey = () => {
//         // Convert the key to a UTF-8 byte array
//         const keyBytes = CryptoJS.enc.Utf8.parse(key);

//         // Compute MD5 hash of the key
//         const keyHash = CryptoJS.algo.MD5.create().update(keyBytes).finalize();

//         // Convert the MD5 hash to a hex string and pad it to 24 bytes (48 hex characters)
//         const keyArray = keyHash.toString(CryptoJS.enc.Hex).padEnd(48, '0');

//         // Parse the hex string into a CryptoJS word array
//         return CryptoJS.enc.Hex.parse(keyArray);
//     };

//     // Encrypt function
//     const encrypt = (rawText) => {
//         const keyBytes = getKey();
//         const encrypted = CryptoJS.TripleDES.encrypt(rawText, keyBytes, {
//             mode: CryptoJS.mode.CBC,
//             padding: CryptoJS.pad.Pkcs7,
//             iv: sharedvector,
//         });
//         return encrypted.toString();
//     };

//     // Decrypt function
//     const decrypt = (encText) => {
//         const keyBytes = getKey();
//         const decrypted = CryptoJS.TripleDES.decrypt(encText, keyBytes, {
//             mode: CryptoJS.mode.CBC,
//             padding: CryptoJS.pad.Pkcs7,
//             iv: sharedvector,
//         });
//         return decrypted.toString(CryptoJS.enc.Utf8);
//     };

//     const [rawText, setRawText] = useState('0T4154P2');
//     const [encryptedText, setEncryptedText] = useState('');
//     const [decryptedText, setDecryptedText] = useState('');

//     const handleEncrypt = () => {
//         const encText = encrypt(rawText);
//         setEncryptedText(encText);
//     };

//     const handleDecrypt = () => {
//         const decText = decrypt(encryptedText);
//         setDecryptedText(decText);
//     };

//     return (
//         <div>
//             <h1>Encrypt/Decrypt Example</h1>
//             <input
//                 type="text"
//                 value={rawText}
//                 onChange={(e) => setRawText(e.target.value)}
//                 placeholder="Enter text to encrypt"
//             />
//             <button onClick={handleEncrypt}>Encrypt</button>
//             <button onClick={handleDecrypt}>Decrypt</button>
//             <div>
//                 <p>Encrypted Text: {encryptedText}</p>
//                 <p>Decrypted Text: {decryptedText}</p>
//             </div>
//         </div>
//     );
// };

// export default App;


// import React from 'react';

// const data = {
//   "0": {
//     "primary_skill": "PM",
//     "nationality": "India",
//     "dob": "1979-09-15",
//     "father_name": "Ratan",
//     "mother_name": "Snehlata",
//     "personal_email": "skalpitin@gmail.com",
//     "present_address": "Serenity Inn, Madhapur",
//     "perminent_address": "B-132, Patel Nagar II, Ghaziabad (UP)"
//   },
//   "1": {
//     "primary_skill": "Java,J2EE",
//     "nationality": "Indian",
//     "dob": "1989-06-13",
//     "father_name": "EswaraRao",
//     "mother_name": "IndiraKumari",
//     "personal_email": "balujavac@gmail.com",
//     "present_address": "Door No: 10-9-10, Opp Jagannad Residency, Sivaji palem, Maddila palem",
//     "perminent_address": "Barma colony, Srungavarapukota, Vizianagaram"
//   },
//   "2": {
//     "primary_skill": "PHP",
//     "nationality": "Indian",
//     "dob": "1989-01-05",
//     "father_name": "RadhaKrishna",
//     "mother_name": "Poornima",
//     "personal_email": "vamshi.530@gmail.com",
//     "present_address": "11-1-2852, LIG-372, New APHB Colony, Behind Krishna Mandir, Nizamabad, Telangana - 503001",
//     "perminent_address": "11-1-2852, LIG-372, New APHB Colony, Behind Krishna Mandir, Nizamabad, Telangana - 503001"
//   },
//   "3": {
//     "primary_skill": "ProjectManagement",
//     "nationality": "Indian",
//     "dob": "1980-09-06",
//     "father_name": "Govindarajulu",
//     "mother_name": "Mohana",
//     "personal_email": "prakashraghu@yahoo.com",
//     "present_address": "G1, Sri Datta Nilaya Apartments, 6th Cross, NR Colony, Murugeshpalya, Vimanapura, Bangalore 560017",
//     "perminent_address": "G1, Sri Datta Nilaya Apartments, 6th Cross, NR Colony, Murugeshpalya, Vimanapura, Bangalore 560017"
//   },
//    "4": {
//     "emp_id": "VEN0396",
//     "emp_first_name": "JAY HARENDRA",
//     "emp_last_name": "SHAH",
//     "emp_password": "6hqGTt7UIvE=",
//     "gender": "M",
//     "doj": "2023-12-11T18:30:00.000Z",
//     "email": "vamsithulluri1725@gmail.com",
//     "manager_id": "VEN0015",
//     "current_designation": "Senior Devops Engineer",
//     "contact_number": "",
//     "role": "user",
//     "department_id": "30",
//     "status": "Active",
//     "location": "INDIA",
//     "project_name": "CEVA",
//     "emp_photo": null
//   },
//   "5": {
//     "emp_id": "VEN0393",
//     "emp_first_name": "BHANU PRAKASH AYYAPPA KUMAR",
//     "emp_last_name": "GOTTIPALLI",
//     "emp_password": "7sADQcfu2Cm9QKvp35kuBA==",
//     "gender": "M",
//     "doj": "2023-08-01T18:30:00.000Z",
//     "email": "vamsithulluri1725@gmail.com",
//     "manager_id": "VEN0348",
//     "current_designation": "Accounts Administrator",
//     "contact_number": "",
//     "role": "user",
//     "department_id": "70",
//     "status": "Disable",
//     "location": "INDIA",
//     "project_name": "",
//     "emp_photo": null
//   }
// };

// const TestPage = () => {
//   return (
//     <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
//       <thead>
//         <tr>
//           <th>Primary Skill</th>
//           <th>Nationality</th>
//           <th>Date of Birth</th>
//           <th>Father's Name</th>
//           <th>Mother's Name</th>
//           <th>Personal Email</th>
//           <th>Present Address</th>
//           <th>Permanent Address</th>
//         </tr>
//       </thead>
//       <tbody>
//         {Object.keys(data).map(key => (
//           <tr key={key}>
//             <td>{data[key].emp_id}</td>
//             <td>{data[key].emp_first_name}</td>
//             <td>{data[key].email}</td>
//             <td>{data[key].current_designation}</td>
//             <td>{data[key].manager_id}</td>
//             <td>{data[key].contact_number}</td>
//             <td>{data[key].doj}</td>
//             <td>{data[key].status}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default TestPage;


// import { Button } from "@mui/material";
// import React, { useState } from "react";

// function TestPage(){



//   return(
//     <div>
//       <Button style={{width:"100px", padding:"20px", borderRadius:"360px", height:"100px", backgroundColor:"lightgreen", color:"black", fontFamily:"cursive", position:"relative",top:"250px"}} variant="contained">Vamsi</Button>
//     </div>
//   )
// }
// export default TestPage;


import React from "react";
import * as XLSX from "xlsx-js-style";

const TestPage = () => {
  // Data to be exported
  const data = [
    {
      12: [27],
      leavetypeid: 140
    },
    undefined,
    {
      11: [25],
      leavetypeid: 140
    },
  ];

  // Function to handle Excel export
  const exportToExcel = () => {
    // Prepare the worksheet headers dynamically
    const headers = ["Leave Type ID", "Month", "Leave Days"];
    const wsData = [headers]; // First row for headers

    // Iterate over the data and push to wsData
    data.forEach((row) => {
      if (row && row[12]) {
        // Push relevant data for each row
        wsData.push([row.leavetypeid, 12, row[12].join(", ")]);
      }
      if (row && row[11]) {
        // Push another month data if present
        wsData.push([row.leavetypeid, 11, row[11].join(", ")]);
      }
    });

    // Create the worksheet
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Iterate over the data to apply conditional formatting based on leave data
    wsData.slice(1).forEach((row, rowIndex) => {
      const cellRef = XLSX.utils.encode_cell({ r: rowIndex + 1, c: 2 }); // Leave Days column (index 2)
      const leaveDays = row[2]; // Get the leave days value

      if (leaveDays) {
        // Apply green background for non-empty leave days
        ws[cellRef].s = {
          fill: {
            fgColor: { rgb: "00FF00" }, // Green
          },
        };
      } else {
        // Apply red background if no leave days are specified
        ws[cellRef].s = {
          fill: {
            fgColor: { rgb: "FF0000" }, // Red
          },
        };
      }
    });

    // Create a workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Export the workbook
    XLSX.writeFile(wb, "example.xlsx");
  };

  return (
    <div>
      <button onClick={exportToExcel}>Export to Excel</button>
    </div>
  );
};

export default TestPage;



