import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

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
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3001/login",
        { ...inputValue },
        { withCredentials: true }
      );

      const { success, message } = data;

      if (success) {
        handleSuccess(message);

        setTimeout(() => {
          window.location.href =
            "http://localhost:3000/dashboard";
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError("Server Error");
    }

    setInputValue({
      email: "",
      password: "",
    });
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">

      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>

        <h3 className="text-center mb-4 text-primary fw-bold">
          Login Account
        </h3>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={inputValue.email}
              onChange={handleOnChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={inputValue.password}
              onChange={handleOnChange}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>

        </form>

        {/* Signup link */}
        <p className="text-center mt-3 mb-0">
          Don't have an account?{" "}
          <Link to="/signup" className="text-decoration-none">
            Signup
          </Link>
        </p>

      </div>

      <ToastContainer />

    </div>
  );
};

export default Login;