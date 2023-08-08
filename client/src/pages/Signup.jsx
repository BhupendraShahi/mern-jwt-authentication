import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

// const options = [
//   {
//     value: "Highest Education Level",
//     label: "-----Highest Education Level-----",
//   },
//   { value: "6th - 9th Class", label: "6th - 9th Class" },
//   { value: "10th Class", label: "10th Class" },
//   { value: "11th Class", label: "11th Class" },
//   { value: "12th Class", label: "12th Class" },
//   { value: "Graduate Degree / Diploma", label: "Graduate Degree / Diploma" },
//   { value: "Postgraduate Degree", label: "Postgraduate Degree" },
//   { value: "Working Professional", label: "Working Professional" },
// ];

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
    mobile: "",
  });

  const { email, password, username, mobile } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
      mobile,
    });
  };

  return (
    <div className="form_container">
      <h2>Create An Account</h2>
      <div className="google-btn">
        <img src="logo.png"  alt="google" />
        <button>Google</button>
      </div>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="email">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="mobile"
            name="mobile"
            value={mobile}
            placeholder="Enter your number"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
