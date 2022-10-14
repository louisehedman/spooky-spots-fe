import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthProvider';
import GhostTypes from '../ghosttypes/GhostTypes';
import SpookySpotSlider from './Slider';

const Home: React.FC = () => {
    const auth = useContext(AuthContext);

    return (
        <div className="container rounded mb-4" style={{backgroundColor: "#0e284a"}}>
        <h1 className="text-center text-white my-4 py-4">Welcome to Spooky Spots</h1>
        <SpookySpotSlider />
        {!auth?.auth() &&
        <div className="row">
        <div className="col text-center">
        <p className="btn btn-primary mb-4 w-50">
          <Link to="/register" style={{ color: "white" }}>
            Register/login to get access to community, dashboard and save SpookySpots in list! <i className="fa-solid fa-ghost" /> 
          </Link>
        </p>
        </div>
        </div>
       }
        <GhostTypes />
        </div>
    )
}

export default Home;