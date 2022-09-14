import React from 'react';
import { Link } from "react-router-dom";
import "./Header.css";


const Header: React.FC = () => {
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark relative-top m-0 bg-opacity-75">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img className="img-fluid" src="/logo192.png" alt="Logo placeholder" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                to="/"
                style={{ color: "white" }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" style={{ color: "white" }}>
                About
              </Link>
            </li>
            </ul>
        </div>
      </div>
    </nav>
        </>
    )
}

export default Header;