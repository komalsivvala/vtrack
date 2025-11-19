import axios from "axios";
import React from "react";


// function BaseApiUrl(){
  export  const axiosInstance=axios.create({
        baseURL: "http://localhost:3003/employeePortal/"
    })
//     axiosInstance.interceptors.response.use((res)=>{
//         if(res.data.token){
//           return  res
//         }else{
//             alert("You are not authroized for this!!!");
//         }
//     },
//     (err)=> Promise.reject(err)
// )

// export default BaseApiUrl;