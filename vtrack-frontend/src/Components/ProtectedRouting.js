// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRouting = () => {
//   const role = sessionStorage.getItem("role");
//   console.log("user::::", role);
  
//   if (role === "HR") {
//     return <Outlet />;
//   } else if (role) {
//     return <Navigate to="/skillsetForm" />;
//   } else {
//     return <Navigate to="/" />;
//   }
// };

// export default ProtectedRouting;


// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRouting = () => {
//   const role = sessionStorage.getItem('role');
//   console.log('user::::', role);

//   if (!role) {
//     return <Navigate to='/' />;
//   }

//   // Allow nested routes to be rendered if the user has a role
//   return <Outlet />;
// };

// export default ProtectedRouting;



// import React from 'react';
// import { Navigate, Routes, Route } from 'react-router-dom';
// import Home from '../Pages/Home';
// import ViewProfile from '../Pages/ViewProfile';
// import SubmitForm from '../Pages/SubmitForm';
// import EditPage from '../Pages/EditPage';
// import DeletePage from '../Pages/DeletePage';
// import Table from '../Pages/Table';
// import ExtraEmpDetailsForm from '../Pages/ExtraEmpDetailsForm';

// const ProtectedRouting = () => {
//   const role = sessionStorage.getItem('role');
//   console.log('user::::', role);

//   if (!role) {
//     return <Navigate to='/' />;
//   }

//   if (role === 'HR') {
//     return (
//       <Routes>
//         <Route path='home' element={<Home />}>
//           <Route index element={<Table />} />
//           <Route path='viewProfile' element={<ViewProfile />} />
//           <Route path='register' element={<SubmitForm />} />
//           <Route path='edit' element={<EditPage />} />
//           <Route path='delete' element={<DeletePage />} />
//         </Route>
//         <Route path='*' element={<Navigate to='/home' />} />
//       </Routes>
//     );
//   } else {
//     return (
//       <Routes>
//         <Route path='skillsetForm' element={<ExtraEmpDetailsForm />} />
//         <Route path='*' element={<Navigate to='/skillsetForm' />} />
//       </Routes>
//     );
//   }
// };

// export default ProtectedRouting;


// import React from 'react';
// import { Navigate, Routes, Route, Outlet } from 'react-router-dom';
// import Home from '../Pages/Home';
// import ViewProfile from '../Pages/ViewProfile';
// import SubmitForm from '../Pages/SubmitForm';
// import EditPage from '../Pages/EditPage';
// import DeletePage from '../Pages/DeletePage';
// import Table from '../Pages/Table';
// import ExtraEmpDetailsForm from '../Pages/ExtraEmpDetailsForm';

// const ProtectedRouting = ({ role }) => {
//   const userRole = sessionStorage.getItem('role');
//   console.log('user::::', userRole);

//   if (!userRole) {
//     return <Navigate to='/' />;
//   }

//   if (role === "HR" && userRole === "HR") {
//     return (
//       <Routes>
//         <Route path='/*' element={<Home />}>
//           <Route index element={<Table />} />
//           <Route path='viewProfile' element={<ViewProfile />} />
//           <Route path='register' element={<SubmitForm />} />
//           <Route path='edit' element={<EditPage />} />
//           <Route path='delete' element={<DeletePage />} />
//         </Route>
//       </Routes>
//     );
//   } else if (role === "other" && userRole !== "HR") {
//     return (
//       <Routes>
//         <Route path='/' element={<ExtraEmpDetailsForm />} />
//       </Routes>
//     );
//   }

//   return <Navigate to='/' />;
// };

// export default ProtectedRouting;


// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRouting = () => {
//   const role = sessionStorage.getItem('role');
//   console.log('user::::', role);

//   if (role === "HR") {
//     return <Navigate to="/home" />;
//   } else if (role) {
//     return <Navigate to="/skillsetForm" />;
//   } else {
//     return <Navigate to="/" />;
//   }
// };

// export default ProtectedRouting;



import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRouting = () => {
const role = sessionStorage.getItem('role');
console.log('user::::', role);

if (!role) { 
return <Navigate to='/' />;
}

// Allow nested routes to be rendered if the user has a role
return <Outlet />;
};
export default ProtectedRouting;