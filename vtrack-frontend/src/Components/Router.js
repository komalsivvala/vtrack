// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from '../Pages/Home';
// import ViewProfile from '../Pages/ViewProfile';
// import SubmitForm from '../Pages/SubmitForm';
// import EditPage from '../Pages/EditPage';
// import DeletePage from '../Pages/DeletePage';
// import Table from '../Pages/Table';
// import Loginpage from '../Pages/Loginpage';
// import ProtectedRouting from './ProtectedRouting';
// import ExtraEmpDetailsForm from '../Pages/ExtraEmpDetailsForm';

// const Router = () => {
//   const role=sessionStorage.getItem("role");

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Loginpage />} />
//         <Route element={<ProtectedRouting />}>
//         {
//           role==="HR"?
//           <Route path='/home' element={<Home />}>
//             <Route index element={<Table />} />
//             <Route path='viewProfile' element={<ViewProfile />} />
//             <Route path='register' element={<SubmitForm />} />
//             <Route path='edit' element={<EditPage />} />
//             <Route path='delete' element={<DeletePage />} />
//           </Route>:

//           <Route path='/skillsetForm' element={<ExtraEmpDetailsForm />} />
//         }

//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default Router;


import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Pages/EmployeePortal/Home';
import ViewProfile from '../Pages/EmployeePortal/ViewProfile';
import SubmitForm from '../Pages/EmployeePortal/SubmitForm';
import EditPage from '../Pages/EmployeePortal/EditPage';
import DeletePage from '../Pages/EmployeePortal/DeletePage';
import Table from '../Pages/EmployeePortal/Table';
import Loginpage from '../Pages/Loginpage';
import ProtectedRouting from './ProtectedRouting';
import ExtraEmpDetailsForm from '../Pages/EmployeePortal/ExtraEmpDetailsForm';
import ForgotPwd from '../Pages/ForgotPwd';
import HomePage from '../Pages/LMS/HomePage';
import LMSPage from '../Pages/LMS/LMSPage';
import LMS_home from '../Pages/LMS/LMS_home';
import LMS_leaveReport from '../Pages/LMS/LMS_leaveReport';
import LeaveFromEmp from '../Pages/LMS/LeaveFromEmp';
import LMS_Admin from '../Pages/LMS/LMS_Admin';
import LMS_Leaves_Add_Types from '../Pages/LMS/LMS_Leaves_Add_Types';
import LMS_Manager from '../Pages/LMS/LMS_Manager';
import LMS_YearReport from '../Pages/LMS/LMS_YearReport';
import LMS_LeaveSummary from '../Pages/LMS/LMS_LeaveSummary';
import LMS_LeaveTransaction from '../Pages/LMS/LMS_LeaveTransaction';
import LMS_UploadDoc from '../Pages/LMS/LMS_UploadDoc';

const Router = () => {
  const role = sessionStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Loginpage />} />
        <Route path='/forgotPwd' element={<ForgotPwd />} />
        <Route element={<ProtectedRouting />}>
        <Route path='/home-page' element={<HomePage />} />
          <Route path='/home' element={<Home />}>
            <Route index element={<Table />} />
            <Route path='viewProfile' element={<ViewProfile />} />
            <Route path='register' element={<SubmitForm />} />
            <Route path='edit' element={<EditPage />} />
            <Route path='delete' element={<DeletePage />} />
          </Route>
          <Route path='/skillsetForm' element={<ExtraEmpDetailsForm />} />
          <Route path='/ViewProfile' element={<ViewProfile />} />
          <Route path="/LMS-page" element={<LMSPage />}>
            <Route path="LMS-home" element={<LMS_home />} />
            <Route path="LMS-leaveFromEmp" element={<LeaveFromEmp />} />
            <Route path="LMS-leaveReport" element={<LMS_leaveReport />} />
            <Route path="LMS-LeaveTransaction" element={<LMS_LeaveTransaction />} />
            <Route path="LMS-Admin" element={<LMS_Admin />} />
            <Route path="LMS-Manager" element={<LMS_Manager />} />
            <Route path="LMS-Leaves-Add" element={<LMS_Leaves_Add_Types />} />
            <Route path="LMS-Yearly-Report" element={<LMS_YearReport />} />
            <Route path="LMS-Summary" element={<LMS_LeaveSummary />} />
            <Route path="LMS-UploadDoc" element={<LMS_UploadDoc />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;


