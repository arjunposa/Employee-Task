import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import Header from "../Header/header";
import axios from 'axios'

function Dashboard() {
  let navigate = useNavigate();
  const [employee, setEmployee] = useState(); // State to hold employee data
  const [copyData, setCopyData] = useState(); // State to hold a copy of employee data for filtering
  const [count, setCount] = useState(0); // State to store the total count of employees

  const moment = require("moment");

  // Use useEffect to fetch employee data when the component is mounted
  useEffect(() => {
    async function fetchData(){
      // Fetch employee data from the server
      let response = await  axios.get("http://127.0.0.1:2000/employe")
      let Allemployes = response.data.employes  
      // Set the total count and employee data in the state
      setCount(Allemployes && Allemployes.length)
      setEmployee(Allemployes)
      setCopyData(Allemployes)
    }
    // Call the fetchData function when the component is mounted
    fetchData();
  }, []);

  // Function to handle employee deletion
  const Delete = async (id) => {
    try {
      // Send a request to delete the employee by ID
      await axios.delete(`http://127.0.0.1:2000/employe/delete/${id}`);
      // Update the state to remove the deleted employee
      setEmployee((prevEmployees) => prevEmployees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // Function to search for employees based on a search keyword
  const searchFunc = (e) => {
    const searchValue = e.target.value.toLowerCase();
    
    if (!searchValue || !copyData) {
      // If no search keyword or no copy data, display all employees
      setEmployee(copyData); 
    } else {
      // Filter the copyData array based on the search keyword
      const filterArray = copyData.filter((item) => {
        return (
          (item.name && item.name.toLowerCase().includes(searchValue)) ||
          (item.email && item.email.toLowerCase().includes(searchValue)) ||
          (item.gender && item.gender.toLowerCase().includes(searchValue)) ||
          (item.designation && item.designation.toLowerCase().includes(searchValue)) ||
          (item.number && item.number.includes(searchValue)) ||
          (item.id && item.id.includes(searchValue))
        );
      });
      // Update the employee state with the filtered data
      setEmployee(filterArray);
    }
  }
  
  return (
    <div>
      <Header name="dashboard" />
      <div className="dashboardContainer">
        <div className="totalContainer">
          <div className="dummyContainer"></div>
          <div className="count">
            <p>
              Total Count : <span>{count}</span>
            </p>
            <button
              onClick={() => {
                navigate("/addemployee");
              }}
            >
              Create Employee
            </button>
          </div>
        </div>
        <div>
          <div className="totalContainer">
            <div className="dummyContainer"></div>
            <div className="count">
              <p>Search Keyword</p>
              <input
                onChange={(e) => {
                  searchFunc(e);
                }}
              />
            </div>
          </div>
        </div>
        <div className="headingTable">
          <table className="table">
            <tr>
              <th>Unique id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create Date</th>
              <th>Action</th>
            </tr>
          </table>
        </div>
        <div className="dataTable">
          <table>
            {employee &&
              employee.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>
                      {" "}
                      <img src={item.img} alt="user-img"/>
                    </td>
                    <td>{item.name}</td>
                    <td id="email">{item.email}</td>
                    <td>{item.number}</td>
                    <td>{item.designation}</td>
                    <td>{item.gender}</td>
                    <td>{item.course}</td>
                    <td>{moment(item.date).format(" DD-MMMM-YYYY")}</td>
                    <td>
                      <button
                        onClick={() => {
                          navigate(`/editemployee/${item._id}`);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          Delete(item._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
