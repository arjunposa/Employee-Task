import React, { useEffect, useState } from "react";
import ShortUniqueId from "short-unique-id"; // Import a library for generating short unique IDs
import Cards from "../Cards/cards";
import { useNavigate } from "react-router-dom"; // / A function to navigate to different routes
import moment from "moment";
import Header from "../Header/header";
import axios from "axios"; // Import Axios for making HTTP requests
import "./addEmployee.css"; // Import  CSS file

let initialState = {
  name: "",
  email: "",
  number: "",
  gender: "",
  course: "",
  img: "",
  designation: "",
  id: "",
  date: "",
};

function AddEmployee() {
  const [addEmployeeData, setAddEmployeeData] = useState(initialState); // State for form data
  const [error, setError] = useState({}); // State for validation errors
  const [startDate, setStartDate] = useState(new Date()); // State for date input
  const [image, setImage] = useState(""); // State for image preview
  const [employeeData, setEmployeeData] = useState(); // State for employee data
  const [imagePreview, setImagePreview] = useState("");

  // Regular expressions for email and phone number validation
  const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  const regexExp = /^[6-9]\d{9}$/;

  let navigate = useNavigate(); // Hook for programmatic navigation

  // Initialize date and generate a short unique ID when the component mounts
  useEffect(() => {
    let momentDate = moment(startDate).valueOf(); // Use a library like 'moment.js' to format dates
    const uid = new ShortUniqueId({
      dictionary: "number",
      length: 2,
    });
    setAddEmployeeData({ ...addEmployeeData, id: uid(), date: momentDate });
  }, []);

  // Load employee data from local storage when the component mounts
  useEffect(() => {
    let a = JSON.parse(localStorage.getItem("addEmployee"));
    setEmployeeData(a);
  }, []);

  // Function to handle input field changes
  const onchangehandler = (e) => {
    let { name, value } = e.target;
    setAddEmployeeData({ ...addEmployeeData, [name]: value });
  };

  // Function to handle 'designation' select input
  const selectDesi = (e) => {
    setAddEmployeeData({ ...addEmployeeData, designation: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(validate(addEmployeeData)); // Validate the form input

    try {
      if (
        addEmployeeData.name !== "" &&
        addEmployeeData.name.length >= 5 &&
        addEmployeeData.email !== "" &&
        emailRegex.test(addEmployeeData.email) &&
        addEmployeeData.number !== "" &&
        regexExp.test(addEmployeeData.number) &&
        addEmployeeData.designation !== "" &&
        addEmployeeData.gender !== "" &&
        addEmployeeData.course !== "" &&
        addEmployeeData.img !== ""
      ) {
        // If there are no errors and data is valid, send it to the server and MongoDB
        const response = await axios.post(
          "http://127.0.0.1:2000/employe",
          addEmployeeData
        );
        if (response.data.message === "email is present") {
          alert("Email already registered");
        } else {
          navigate("/dashboard"); // Redirect to the dashboard on success
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle the error here
    }
  };

  // Function to handle 'course' select input
  const coursecheck = (e) => {
    setAddEmployeeData({ ...addEmployeeData, course: e.target.value });
  };

  // Function to handle image upload
  const imageChange = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result); // Set the image preview
      setAddEmployeeData({ ...addEmployeeData, img: reader.result }); // Set the image data
      setImagePreview(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  };
 
  // Validation function to check form input
  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.length < 5) {
      errors.name = "Length needs to be greater than 5";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This email is not valid";
    }

    if (!values.number) {
      errors.number = "Number is required";
    } else if (isNaN(values.number)) {
      errors.number = "Enter only numbers";
    } else if (values.number.length !== 10) {
      errors.number = "Enter 10 digits";
    } else if (!regexExp.test(values.number)) {
      errors.number = "This number is not valid";
    }

    if (!values.designation || values.designation === "select") {
      errors.designation = "Select the Designation";
    }

    if (!values.gender) {
      errors.gender = "Select the Gender";
    }

    if (!values.course) {
      errors.course = "Select the Course";
    }
    if (!values.img) {
      errors.img = "Please upload an image";
    }
    return errors;
  };

  return (
    <div>
      <Header name="AddEmployee" />
      <form onSubmit={handleSubmit}>
        <Cards
          name="addEmployee"
          addEmployeeData={addEmployeeData}
          setAddEmployeeData={setAddEmployeeData}
          onchangehandler={onchangehandler}
          error={error}
          selectDesi={selectDesi}
          coursecheck={coursecheck}
          imagePreview={imagePreview}
          imageChange={imageChange}
        />
      </form>
    </div>
  );
}

export default AddEmployee;
