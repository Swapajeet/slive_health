import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="container-fluid bg-light min-vh-100">

        <div className="container py-5">
          <div className="row align-items-center">

            {/* Left Content */}
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-3">
                Smart Disease
                Prediction System
              </h1>

              <p className="lead text-secondary mb-4">
                Predict diseases
                using sensor values
                like conductivity,
                oxygen, methane,
                and ammonia with
                Machine Learning.
              </p>

              <div className="d-flex gap-3">
                <Link
                  to="/login"
                  className="btn btn-primary btn-lg"
                >
                  Get Started
                </Link>

                <Link
                  to="/signup"
                  className="btn btn-outline-dark btn-lg"
                >
                  Signup
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="col-lg-6 text-center mt-5 mt-lg-0">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2785/2785482.png"
                alt="Medical"
                className="img-fluid"
                style={{
                  maxWidth: "400px",
                }}
              />
            </div>

          </div>

          {/* Features */}
          <div className="row mt-5 text-center">

            <h2 className="mb-4">
              Features
            </h2>

            <div className="col-md-4 mb-4">
              <div className="card shadow-sm border-0 p-4 h-100">
                <i className="fa-solid fa-heart-pulse fa-3x text-primary mb-3"></i>

                <h4>
                  Disease Detection
                </h4>

                <p className="text-muted">
                  Predict diseases
                  accurately using
                  machine learning
                  models.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card shadow-sm border-0 p-4 h-100">
                <i className="fa-solid fa-chart-line fa-3x text-success mb-3"></i>

                <h4>
                  Graph Analysis
                </h4>

                <p className="text-muted">
                  Visualize disease
                  probability with
                  beautiful graphs.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card shadow-sm border-0 p-4 h-100">
                <i className="fa-solid fa-user-shield fa-3x text-danger mb-3"></i>

                <h4>
                  Secure Data
                </h4>

                <p className="text-muted">
                  User reports are
                  securely stored
                  using authentication.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Home;