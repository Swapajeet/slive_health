import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleOnChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
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
        "http://localhost:3001/signup",
        { ...inputValue },
        { withCredentials: true }
      );

      const { success, message } = data;

      if (success) {
        handleSuccess(message);

        setTimeout(() => {
          navigate("/dashboard");
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
      username: "",
    });
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="row w-100 justify-content-center">

        {/* Left Image Section */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
            alt="signup"
            style={{ width: "70%" }}
          />
        </div>

        {/* Right Form Section */}
        <div className="col-md-4">

          <div
            className="card p-4 shadow-lg"
            style={{ borderRadius: "20px", background: "#fff" }}
          >
            <h3 className="text-center text-primary fw-bold mb-4">
              Create Account
            </h3>

            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
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

              {/* Username */}
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Enter username"
                  value={inputValue.username}
                  onChange={handleOnChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>
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
                className="btn btn-success w-100"
              >
                Signup
              </button>
            </form>

            <p className="text-center mt-3 mb-0">
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none">
                Login
              </Link>
            </p>
          </div>

        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Signup;