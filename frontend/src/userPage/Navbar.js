import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div className="container">

        {/* Logo + Brand */}
        <a
          className="navbar-brand d-flex align-items-center"
          href="/"
        >
          <img
            src="image.png"
            alt="Logo"
            width="40"
            height="40"
            className="me-2"
          />

          <span className="fw-bold">
            Saliva_health
          </span>
        </a>

        {/* Buttons */}
        <div className="d-flex gap-2">

          <a
            href="/login"
            className="btn btn-outline-primary"
          >
            Login
          </a>

          <a
            href="/signup"
            className="btn btn-primary"
          >
            Signup
          </a>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;