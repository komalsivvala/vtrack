import {
    Button,
    Card,
    CardActions,
    CardContent,
    IconButton,
    TextField,
  } from "@mui/material";
  import React, { useState, useEffect, useRef } from "react";
  import "../../CSS/ExtraEmpDetailsForm.css";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  import Header from "../../Components/Header";
  import { useDispatch, useSelector } from "react-redux";
  import SyncIcon from "@mui/icons-material/Sync";
  
  const ExtraEmpDetailsForm = () => {
    const [inputData, setInputData] = useState({
      skill_set: "",
      previous_exp: "",
      resume: null,
      certifications: "",
    });
    const [emp_id, setEmp_id] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const fileInputRef = useRef(null);
    let getData = useSelector((state) => state.skillSetData);
  
    useEffect(() => {
      if (getData && Object.keys(getData).length > 0) {
        setInputData({
          skill_set: getData.skill_set || "",
          previous_exp: getData.previous_exp || "",
          resume: getData.resume || null,
          certifications: getData.certifications || "",
        });
        setIsUpdate(true);
      }
    }, [getData]);
  
    useEffect(() => {
      setEmp_id(sessionStorage.getItem("emp_id"));
    }, []);
  
    const changeHandler = (e) => {
      const { name, value, type, files } = e.target;
      if (type === "file") {
        if (files && files.length > 0) {
          const file = files[0];
          setInputData((prevInputData) => ({ ...prevInputData, [name]: file }));
        }
      } else {
        setInputData((prevInputData) => ({ ...prevInputData, [name]: value }));
      }
    };
  
    const submitHandler = (e) => {
      e.preventDefault();
      const formData = new FormData();
  
      formData.append("emp_id", emp_id);
      formData.append("skill_set", inputData.skill_set);
      formData.append("previous_exp", inputData.previous_exp);
      formData.append("resume", inputData.resume);
      formData.append("certifications", inputData.certifications);
  
      axios
        .post(
          "http://192.168.2.120:3003/employeeDetails/skill_Set_form",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          alert("Data submitted successfully");
          setInputData({
            skill_set: "",
            previous_exp: "",
            resume: null,
            certifications: "",
          });
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        })
        .catch((error) => {
          console.error("There was an error submitting the form:", error);
        });
    };
  
    const updateHandler = async () => {
      const formData = new FormData();
      formData.append("emp_id", emp_id);
      formData.append("skill_set", inputData.skill_set);
      formData.append("previous_exp", inputData.previous_exp);
      formData.append("resume", inputData.resume);
      formData.append("certifications", inputData.certifications);
  
      axios
        .put(
          "http://192.168.2.120:3003/employeeDetails/update_skill_set_form",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          alert("Data updated successfully");
          dispatch({ type: "SKILL_SET_DATA", payload: {} });
          setInputData({
            skill_set: "",
            previous_exp: "",
            resume: null,
            certifications: "",
          });
          setIsUpdate(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        })
        .catch((error) => {
          console.error("There was an error updating the form:", error);
        });
    };
  
    const refreshHandler = () => {
      window.location.reload();
    };
  
    return (
      <div className="container">
        <Header />
        <div className="emp-form-card">
          <Card sx={{ width: "100%", maxWidth: 550 }}>
            <CardContent>
              <form onSubmit={isUpdate ? updateHandler : submitHandler}>
                <div className="input-group">
                  <label>Skill set <span className="requiredIcon">*</span></label>
                  <TextField
                    multiline
                    rows={4}
                    fullWidth
                    name="skill_set"
                    onChange={changeHandler}
                    value={inputData.skill_set}
                    required
                  />
                </div>
  
                <div className="input-group">
                  <label>Previous experience <span className="requiredIcon">*</span></label>
                  <TextField
                    multiline
                    rows={4}
                    fullWidth
                    name="previous_exp"
                    onChange={changeHandler}
                    value={inputData.previous_exp}
                    required
                  />
                </div>
  
                <div className="input-group">
                  <label>Resume <span className="requiredIcon">*</span></label>
                  <input
                    type="file"
                    name="resume"
                    onChange={changeHandler}
                    accept="application/pdf"
                    ref={fileInputRef}
                    required
                  />
                </div>
  
                <div className="input-group">
                  <label>Certifications <span className="requiredIcon">*</span></label>
                  <TextField
                    multiline
                    rows={4}
                    fullWidth
                    name="certifications"
                    onChange={changeHandler}
                    value={inputData.certifications}
                    required
                  />
                </div>
  
                <CardActions className="button-group">
                  <Button
                    onClick={isUpdate ? updateHandler : submitHandler}
                    variant="contained"
                    className={isUpdate ? "update-button" : ""}
                  >
                    {isUpdate ? "Update" : "Submit"}
                  </Button>
  
                  <IconButton onClick={refreshHandler}>
                    <SyncIcon />
                  </IconButton>
                </CardActions>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };
  
  export default ExtraEmpDetailsForm;
  