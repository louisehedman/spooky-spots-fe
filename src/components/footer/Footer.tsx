import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <>
        <footer className="bg-dark text-white pt-5 pb-4 bg-opacity-75">
        <div className="container text-center text-md-left">
          <div className="row text-center text-md-left">
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
                Spooky Spots
              </h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum in aliquet mauris. Nullam auctor dignissim gravida.
                Mauris vel enim nec lacus elementum iaculis.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-lx-2 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
                About
              </h5>
              <p>
                <Link
                  to="/about"
                  className="text-uppercase text-white"
                  style={{ textDecoration: "none" }}
                >
                  About us
                </Link>
              </p>
              <p>
                <Link
                  to="/about"
                  className="text-uppercase text-white"
                  style={{ textDecoration: "none" }}
                >
                  Contact
                </Link>
              </p>
              <p>
                <Link
                  to="/about"
                  className="text-uppercase text-white"
                  style={{ textDecoration: "none" }}
                >
                  Work with us
                </Link>
              </p>
              <p>
                <Link
                  to="about"
                  className="text-uppercase text-white"
                  style={{ textDecoration: "none" }}
                >
                  Privacy Policy
                </Link>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
                Contact
              </h5>
              <address>
                <p>
                  <i className="fas fa-home mr-3"></i> Spooky Spots, 123 45, SE
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i>{" "}
                  <a
                    className="text-white text-decoration-none"
                    href="mailto:spookyspots2022@gmail.com"
                  >
                    spookyspots2022@gmail.com
                  </a>
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i>{" "}
                  <a
                    className="text-white text-decoration-none"
                    href="tel:+4670707070"
                  >
                    +46 70 70 70 70
                  </a>
                </p>
              </address>
            </div>
          </div>

          <hr className="mb-4" />

          <div className="row align-items-center">
            <div className="col-md-7 col-lg-8">
              <p>
                Copyright ©2022 All rights reserved by:
                <a href="/" style={{ textDecoration: "none" }}>
                  <strong className="text-warning"> Spooky Spots</strong>
                </a>
              </p>
            </div>

            <div className="col-md-5 col-lg-4">
              <div className="text-center text-md-right">
                <ul className="list-unstyled list-inline">
                  <li className="list-inline-item
                    
                      btn-floating btn-sm text-white"
                      style={{ fontSize: "23px" }}
                    >
                      <i className="fab fa-facebook"></i>
                    
                  </li>
                  <li className="list-inline-item
                    
                      
                      btn-floating btn-sm text-white"
                      style={{ fontSize: "23px" }}
                    >
                      <i className="fab fa-twitter"></i>
                    
                  </li>
                  <li className="list-inline-item
                    
                      
                      btn-floating btn-sm text-white"
                      style={{ fontSize: "23px" }}
                    >
                      <i className="fab fa-instagram"></i>
                    
                  </li>
                  <li className="list-inline-item
                    
                      btn-floating btn-sm text-white"
                      style={{ fontSize: "23px" }}
                    >
                      <i className="fab fa-linkedin-in"></i>
                  </li>
                  <li className="list-inline-item
                    
                      btn-floating btn-sm text-white"
                      style={{ fontSize: "23px" }}
                    >
                      <i className="fab fa-youtube"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
        </>
    )
}

export default Footer;