import React, { useEffect, useState } from "react";
import Cards from "../Cards/cards";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header/header";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  number: "",
  gender: "",
  course: "",
  img: "",
  designation: "select",
  id: "",
  date: "",
};

function EditEmployee() {
  const [addEmployeeData, setAddEmployeeData] = useState(initialState);
  const [error, setError] = useState({});
  const { id } = useParams(); // Get the 'id' parameter from the route
  const navigate = useNavigate(); // A function to navigate to different routes

  const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  const regexExp = /^[6-9]\d{9}/;

  // Use useEffect to fetch employee data when the component is mounted
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://127.0.0.1:2000/employe/${id}`);
        const employee = response.data.data;
        setAddEmployeeData(employee);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    // Call the fetchData function when the component is mounted
    fetchData();
  }, [id]); // The effect runs when 'id' changes

  // Function to validate form input
  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.length < 5) {
      errors.name = "Name should be at least 5 characters long";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.number) {
      errors.number = "Number is required";
    } else if (
      isNaN(values.number) ||
      values.number.length !== 10 ||
      !regexExp.test(values.number)
    ) {
      errors.number = "Invalid phone number format";
    }

    if (values.designation === "select") {
      errors.designation = "Select a valid Designation";
    }

    if (!values.gender) {
      errors.gender = "Select a Gender";
    }

    if (!values.course) {
      errors.course = "Select a Course";
    }

    return errors;
  };

  // Function to handle 'designation' select input
  const selectDesi = (e) => {
    setAddEmployeeData({ ...addEmployeeData, designation: e.target.value });
  };

  // Function to handle 'course' select input
  const coursecheck = (e) => {
    setAddEmployeeData({ ...addEmployeeData, course: e.target.value });
  };

  // Function to handle image upload
  const imageChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setAddEmployeeData({ ...addEmployeeData, img: reader.result });
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(validate(addEmployeeData));

    if (Object.keys(error).length === 0) {
      try {
        const response = await axios.patch(
          `http://127.0.0.1:2000/employe/update/${id}`,
          addEmployeeData
        );
        navigate("/dashboard"); // Redirect to the dashboard after successful update
      } catch (error) {
        console.error("Server Error:", error);
        // Handle other errors
      }
    }
  };

  return (
    <div>
      <Header name="editEmployee" />
      <form onSubmit={handleSubmit}>
        <Cards
          name="editEmployee"
          addEmployeeData={addEmployeeData}
          setAddEmployeeData={setAddEmployeeData}
          onchangehandler={(e) =>
            setAddEmployeeData({ ...addEmployeeData, [e.target.name]: e.target.value })
          }
          error={error}
          selectDesi={selectDesi}
          coursecheck={coursecheck}
          imageChange={imageChange}
        />
      </form>
    </div>
  );
}

export default EditEmployee;
