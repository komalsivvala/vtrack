import React, { useState, useEffect } from 'react';
import "../../CSS/EditPage.css";
import { inputFieldsData } from './EmpInputDetails';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const initialData = {
    emp_first_name: '',
    emp_last_name: '',
    gender: "",
    doj: "",
    email: "",
    manager_id: '',
    current_designation: "",
    contact_number: '',
    role: "",
    location: "",
    project_name: "",
    emp_photo: '',
    blood_group: '',
    title: "",
    department_id: "",
    nationality: "",
    primary_skill: "",
    anniversary_date: '',
    personal_email: "",
    family_contact: '',
    dob: "",
    father_name: '',
    mother_name: "",
    relieving_date: "",
    present_address: "",
    status: "",
    perminent_address: "",
};

const EditPage = () => {
    const [inputData, setInputData] = useState(initialData);
    const [isBtnValid, setIsBtnValid] = useState(false);
    const getData = useSelector(state => state.profileDetails);
    const nav = useNavigate();

    useEffect(() => {
        const storedData = localStorage.getItem('editData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setInputData(parsedData);
        }
        setIsBtnValid(true);
    }, []);

    const normalizeGender = (gender) => {
        if (gender.toLowerCase() === "m" || gender.toLowerCase() === "male") {
            return "male";
        } else if (gender.toLowerCase() === "f" || gender.toLowerCase() === "female") {
            return "female";
        }
        return gender;
    };

    useEffect(() => {
        const departmentDataNum = {
            10: "Recruitments", 100: "Operations UAE", 110: "Operations UK", 20: "Sales USA",
            30: "Development", 40: "Sales UAE", 50: "QA", 60: "Network", 70: "Finance", 80: "Operations INDIA", 90: "Operations USA"
        };

        if (getData && Object.keys(getData).length > 0) {
            const newValueData = departmentDataNum[getData.department_id];
            if (newValueData) {
                localStorage.setItem('editData', JSON.stringify(getData));

                const updatedData = {
                    ...getData,
                    doj: getData.doj?.split('T')[0],
                    relieving_date: getData.relieving_date?.split('T')[0],
                    dob: getData.dob?.split('T')[0],
                    anniversary_date: getData.anniversary_date?.split('T')[0],
                    department_id: newValueData,
                    gender: normalizeGender(getData.gender)
                };

                setInputData(updatedData);
                setIsBtnValid(true);
            }
        }
    }, [getData]);

    const onChangeHandler = (e) => {
        const { name, value, checked, type, files } = e.target;
        let newValue = value;

        if (type === "checkbox") {
            if (!inputData[name]) {
                newValue = [value];
            } else {
                newValue = inputData[name].includes(value) ? inputData[name].filter(item => item !== value) : [...inputData[name], value];
            }
        } else if (type === "file") {
            if (files && files.length > 0) {
                newValue = files[0];
            }
        }

        setInputData(prevData => ({ ...prevData, [name]: newValue }));

        if (name === "status" && value !== "relieved") {
            setInputData(prevData => ({ ...prevData, relieving_date: '' }));
        }
    };

    const editHandler = () => {
        axios.get(`http://192.168.2.120:3003/employeeDetails/getAll_emp_details?e_id=${inputData.emp_id}`)
            .then(res => {
                const fetchedData = res.data.data[0];
                const formattedData = {
                    ...fetchedData,
                    doj: fetchedData.doj?.split('T')[0],
                    relieving_date: fetchedData.relieving_date?.split('T')[0],
                    dob: fetchedData.dob?.split('T')[0],
                    anniversary_date: fetchedData.anniversary_date?.split('T')[0]
                };

                if (Object.keys(formattedData).length > 0) {
                    setInputData(formattedData);
                    setIsBtnValid(true);
                } else {
                    alert('Id not found');
                    setIsBtnValid(false);
                }
            })
            .catch(error => {
                console.log("Error fetching employee details:", error);
            });
    };

    const updateHandler = () => {
        const departmentData = {
            "Recruitments": 10, "Operations UAE": 100, "Operations UK": 110, "Sales USA": 20,
            "Development": 30, "Sales UAE": 40, "QA": 50, "Network": 60, "Finance": 70, "Operations INDIA": 80, "Operations USA": 90
        };

        const depData = departmentData[inputData.department_id];
        const currDate = new Date();
        const updated_date = `${currDate.getFullYear()}-${String(currDate.getMonth() + 1).padStart(2, '0')}-${String(currDate.getDate()).padStart(2, '0')}`;
        const formData = new FormData();
        formData.append("emp_id", getData.emp_id);
        formData.append("emp_first_name", inputData.emp_first_name);
        formData.append("emp_last_name", inputData.emp_last_name);
        formData.append("gender", inputData.gender);
        formData.append("doj", inputData.doj);
        formData.append("email", inputData.email);
        formData.append("manager_id", inputData.manager_id);
        formData.append("current_designation", inputData.current_designation);
        formData.append("department_id", depData);
        formData.append("contact_number", inputData.contact_number);
        formData.append("role", inputData.role);
        formData.append("status", inputData.status);
        formData.append("location", inputData.location);
        formData.append("project_name", inputData.project_name);
        formData.append("emp_photo", inputData.emp_photo);

        formData.append("title", inputData.title);
        formData.append("primary_skill", inputData.primary_skill);
        formData.append("nationality", inputData.nationality);
        formData.append("dob", inputData.dob);
        formData.append("father_name", inputData.father_name);
        formData.append("mother_name", inputData.mother_name);
        formData.append("personal_email", inputData.personal_email);
        formData.append("present_address", inputData.present_address);
        formData.append("perminent_address", inputData.perminent_address);

        formData.append("updated_date", updated_date);
        formData.append("blood_group", inputData.blood_group);
        formData.append("anniversary_date", inputData.anniversary_date);
        formData.append("family_contact", inputData.family_contact);
        formData.append("relieving_date", inputData.status === "Relieved" ? inputData.relieving_date : null);

        axios.put('http://192.168.2.120:3003/employeeDetails/update_emp_details', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "authorization": sessionStorage.getItem("token")
            }
        })
            .then(res => {
                setIsBtnValid(false);
                setInputData(initialData);
                localStorage.removeItem('editData');
                alert("Data updated Successfully..");
                nav('/home');
            })
            .catch(error => {
                console.error("Error updating data:", error);
                alert("An error occurred while updating data");
            });
    };

    const half = Math.ceil(inputFieldsData.length / 2);
    const firstHalf = inputFieldsData.slice(0, half);
    const secondHalf = inputFieldsData.slice(half);

    return (
        <div className='edit-page-container'>
            <div className='edit-form-wrapper'>
                <div className='form-sections-container'>
                    <div className='form-section'>
                        <table className='form-table'>
                            <tbody>
                                {firstHalf.map((ele, i) => (
                                    <tr key={i}>
                                        <td className='form-label'>
                                            {ele.label !== "Updated" && inputData.status === "Relieved" ? ele.label : ele.label !== "Relieving date" && (
                                                <>
                                                    {ele.label} {ele.label === "Family Inforamation" ? <span> :</span> : null}
                                                </>
                                            )}
                                        </td>
                                        <td className='form-input-cell'>
                                            {ele.type === "file" ? null : ele.type === "radio" ? (
                                                <div className="radio-group">
                                                    {ele.Options.map((option, index) => (
                                                        <div key={index} className="radio-option">
                                                            <input
                                                                name={ele.name}
                                                                onChange={onChangeHandler}
                                                                type={ele.type}
                                                                value={option}
                                                                checked={inputData[ele.name] && inputData[ele.name].includes(option)}
                                                                id={`${ele.name}-${index}-left`}
                                                            />
                                                            <label htmlFor={`${ele.name}-${index}-left`}>{option}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : ele.type === "select" ? null : (
                                                ele.label !== "Family Inforamation" && ele.name !== "id" && ele.name !== "updated_date" && inputData.status === "Relieved" ?
                                                <input
                                                    name={ele.name}
                                                    onChange={onChangeHandler}
                                                    value={inputData[ele.name]}
                                                    type={ele.type}
                                                    className='form-input'
                                                />
                                                : ele.name !== "relieving_date" && (
                                                    <input
                                                        name={ele.name}
                                                        onChange={onChangeHandler}
                                                        value={inputData[ele.name]}
                                                        type={ele.type}
                                                        className='form-input'
                                                    />
                                                )
                                            )}
                                            {ele.type === "select" && (
                                                <select
                                                    className='form-input'
                                                    onChange={onChangeHandler}
                                                    name={ele.name}
                                                    value={inputData[ele.name] || ""}
                                                >
                                                    <option value="">Select</option>
                                                    {ele.Options.map((option, index) => (
                                                        <option value={option} key={index}>{option}</option>
                                                    ))}
                                                </select>
                                            )}
                                            {ele.type === "file" && (
                                                <input
                                                    type={ele.type}
                                                    name={ele.name}
                                                    accept="image/*"
                                                    onChange={onChangeHandler}
                                                    className="file-input"
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className='form-section'>
                        <table className='form-table'>
                            <tbody>
                                {secondHalf.map((ele, i) => (
                                    <tr key={i}>
                                        <td className='form-label'>
                                            {ele.label !== "Updated" && (
                                                <>
                                                    {ele.label} {ele.label === "Family Inforamation" ? <span> :</span> : null}
                                                </>
                                            )}
                                        </td>
                                        <td className='form-input-cell'>
                                            {ele.type === "file" ? null :
                                                ele.type === "radio" ? (
                                                    <div className="radio-group">
                                                        {ele.Options.map((option, index) => (
                                                            <div key={index} className="radio-option">
                                                                <input
                                                                    name={ele.name}
                                                                    onChange={onChangeHandler}
                                                                    type={ele.type}
                                                                    value={option}
                                                                    checked={inputData[ele.name] && inputData[ele.name].includes(option)}
                                                                    id={`${ele.name}-${index}-right`}
                                                                />
                                                                <label htmlFor={`${ele.name}-${index}-right`}>{option}</label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : ele.type === "select" ? (
                                                    <select
                                                        className='form-input'
                                                        onChange={onChangeHandler}
                                                        name={ele.name}
                                                        value={inputData[ele.name] || ""}
                                                    >
                                                        <option value="">Select</option>
                                                        {ele.Options.map((option, index) => (
                                                            <option value={option} key={index}>{option}</option>
                                                        ))}
                                                    </select>
                                                ) : ele.type === "textArea" ? (
                                                    <textarea
                                                        name={ele.name}
                                                        onChange={onChangeHandler}
                                                        value={inputData[ele.name]}
                                                        className='form-input'
                                                    />
                                                ) : (
                                                    ele.label !== "Family Inforamation" && ele.name !== "id" && ele.name !== "updated_date" && (
                                                        <input
                                                            name={ele.name}
                                                            onChange={onChangeHandler}
                                                            value={inputData[ele.name]}
                                                            type={ele.type}
                                                            className='form-input'
                                                        />
                                                    )
                                                )
                                            }
                                            {ele.type === "file" && (
                                                <input
                                                    type={ele.type}
                                                    name={ele.name}
                                                    accept="image/*"
                                                    onChange={onChangeHandler}
                                                    className="file-input"
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='form-actions'>
                    {isBtnValid ? (
                        <button onClick={updateHandler} className='update-button'>Update</button>
                    ) : (
                        <button onClick={editHandler} className='edit-button'>Edit</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditPage;