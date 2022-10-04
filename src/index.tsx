import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from './components/pages/home/Home';
import About from './components/pages/about/About';
import RegisterForm from './components/pages/login/RegisterForm';
import LoginForm from './components/pages/login/LoginForm';
import SpookyMap from './components/pages/map/SpookyMap';
import SpookySpot from './components/pages/spookyspot/SpookySpot';
import GhostType from './components/pages/ghosttypes/GhostType';
import GhostTypes from './components/pages/ghosttypes/GhostTypes';
import Dashboard from './components/pages/dashboard/Dashboard';
import HandleUsers from './components/pages/dashboard/HandleUsers';
import EditUser from './components/pages/dashboard/EditUser';
import SpookySpotList from './components/pages/dashboard/SpookySpotList';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/spookymap" element={<SpookyMap />} />
        <Route path="/spookyspots/:slug" element={<SpookySpot />} />
        <Route path="/ghosttypes" element={<GhostTypes />} />
        <Route path="/ghosttypes/:slug" element={<GhostType />} />
        <Route path="/dashboard/spookyspotlist" element={<SpookySpotList />} />
        <Route path="/dashboard/handleusers" element={<HandleUsers />} />
        <Route path="/dashboard/handleusers/edituser/:slug" element={<EditUser />} />
      </Route>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
