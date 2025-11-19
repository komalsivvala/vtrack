import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LMSPage from "../Pages/LMSPage";
import LMS_home from "../Pages/LMS_home";

function LMS_Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/LMS-page" element={<LMSPage />}>
                    
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default LMS_Routing;
