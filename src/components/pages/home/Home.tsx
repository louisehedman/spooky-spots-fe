import React from 'react';
import GhostTypes from '../ghosttypes/GhostTypes';
import SpookySpotSlider from './Slider';

const Home: React.FC = () => {
    return (
        <div className="container rounded mb-4" style={{backgroundColor: "#0e284a"}}>
        <h1 className="text-center text-white my-4 py-4">Welcome to Spooky Spots</h1>
        <SpookySpotSlider />
        <GhostTypes />
        </div>
    )
}

export default Home;