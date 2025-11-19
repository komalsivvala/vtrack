 import React from "react";
import "./CSS/App.css";
import Router from "./Components/Router";
import LMS_LeaveSummary from "./Pages/LMS/LMS_LeaveSummary";
import TestPage from "./Pages/EmployeePortal/TestPage";
// import ContentPage from "./Pages/ContentPage";
// import ExtraEmpDetailsForm from "./Pages/ExtraEmpDetailsForm";
// import ChipInput from "./Pages/ExtraEmpDetailsForm";
// import ForgotPwd from "./Pages/ForgotPwd";
// import SubmitForm from "./Pages/SubmitForm";
// import EncryptDecrypt from "./Pages/TestPage";
// import EditPage from "./Pages/EditPage";
// import TestPage from "./Pages/TestPage";
// import HomePage from "./Pages/HomePage";
// import LMSPage from "./Pages/LMSPage";
// import LMS_Routing from "./Components/LMS_Routing";
// import LMS_home from "./Pages/LMS_home";
// import Loginpage from "./Pages/Loginpage";

function App() {

  return (
    <div className="app-p" style={{fontFamily:"'Times New Roman', Times, serif"}}>
      {/* <Header/> */}
      {/* <ContentPage/> */}
      {/* <Loginpage/> */}
      <Router/>
      {/* <LMS_Routing/> */}
      {/* <HomePage/> */}
      {/* <TestPage/> */}
      {/* <ExtraEmpDetailsForm/> */}
      {/* <ChipInput/> */}
      {/* <ForgotPwd/> */}
      {/* <SubmitForm/> */}
      {/* <EditPage/> */}
      {/* <EncryptDecrypt/> */}
      {/* <LMSPage/> */}
      {/* <LMS_home/> */}
      {/* <TestPage/> */}
      {/* <LMS_LeaveSummary/> */}
    </div>
  );
}

export default App;
