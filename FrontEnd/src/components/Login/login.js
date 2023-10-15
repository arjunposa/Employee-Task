import React, { useState } from "react";
import { Input } from "antd"; // Import input component from Ant Design
import { UserOutlined } from "@ant-design/icons"; // Import icon component from Ant Design
import { useNavigate } from "react-router-dom"; //  A function to navigate to different routes
import "./login.css"; // Import your CSS file

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [loginData, setLoginData] = useState(initialState); // State for login form data
  const [error, setError] = useState({}); // State for validation errors
  const [errorDisplay, setErrorDisplay] = useState(""); // State for displaying additional error messages

  let navigate = useNavigate(); //  A function to navigate to different routes
  const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/; // Regular expression for email validation

  // Function to handle input field changes
  const onchangehandler = (e) => {
    let { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
    setError(validate(loginData)); // Validate the form input

    if (
      loginData.email === "hukumgupta@gmail.com" &&
      loginData.password === "hukumgupta"
    ) {
      return navigate("./dashboard"); // Redirect to the dashboard on successful login
    } else if (loginData.email !== "" && loginData.password !== "") {
      setErrorDisplay("Email - hukumgupta@gmail.com Password - hukumgupta");
    }
  };

  // Function to validate form input
  const validate = (values) => {
    let errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This email is not valid";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  return (
    <div className="loginContainer">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <Input
          size="large"
          placeholder="Email"
          name="email"
          value={loginData.email}
          prefix={<UserOutlined />} // Add an icon to the input
          onChange={(e) => onchangehandler(e)}
        />
        <br />
        <span className="errorSpan">{error.email}</span>
        <span className="errorSpan">{errorDisplay}</span>
        <Input.Password
          placeholder="Password"
          name="password"
          value={loginData.password}
          onChange={(e) => onchangehandler(e)}
        />
        <span className="errorSpan">{error.password}</span>
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
