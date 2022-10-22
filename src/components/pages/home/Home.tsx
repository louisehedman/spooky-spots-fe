import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthProvider";
import GhostTypes from "../ghosttypes/GhostTypes";
import SpookySpotSlider from "./Slider";

const Home: React.FC = () => {
  const auth = useContext(AuthContext);

  return (
    <div
      className="container rounded mb-4"
      style={{ backgroundColor: "#0e284a" }}
    >
      <h1 className="text-center text-white mt-4 pt-4">
        Welcome to SpookySpots
      </h1>
      <p className="text-center text-white h4 fw-light fst-italic">
        "The place where you find haunted places and talk about ghosts with
        others"
      </p>
      <SpookySpotSlider />
      {!auth?.auth() && (
        <div className="row">
          <div className="col text-center">
            <p className="btn btn-primary mb-4 w-50">
              <Link to="/register" style={{ color: "white" }}>
                Register/login to get access to community, dashboard and save
                SpookySpots in list! <i className="fa-solid fa-ghost" />
              </Link>
            </p>
          </div>
        </div>
      )}
      <div className="card text-center m-auto w-50">
        <p className="m-auto py-2">
          Would you like to suggest a place that should be here? Send us an
          email:{" "}
          <a href="mailto:spookyspots2022@gmail.com">
            spookyspots2022@gmail.com
          </a>
          . Our ghost hunters will check it out!
        </p>
      </div>
      <GhostTypes />
    </div>
  );
};

export default Home;
