import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
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
import EditListItem from './components/pages/dashboard/EditListItem';
import ManageSettings from './components/pages/dashboard/ManageSettings';
import SpookySpots from './components/pages/spookyspots/SpookySpots';
import Community from './components/pages/community/Community';
import CommunitySubject from './components/pages/community/CommunitySubject';
import CommunityThread from './components/pages/community/CommunityThread';
import ForgotPassword from './components/pages/login/ForgotPassword';
import ResetPassword from './components/pages/login/ResetPassword';

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
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/passwordreset/:slug" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/spookyspots" element={<SpookySpots />} />
        <Route path="/spookymap" element={<SpookyMap />} />
        <Route path="/spookyspots/:slug" element={<SpookySpot />} />
        <Route path="/ghosttypes" element={<GhostTypes />} />
        <Route path="/ghosttypes/:slug" element={<GhostType />} />
        <Route path="/dashboard/handleusers" element={<HandleUsers />} />
        <Route path="/dashboard/handleusers/edituser/:slug" element={<EditUser />} />
        <Route path="/dashboard/spookyspotlist" element={<SpookySpotList/>} />
        <Route path="/dashboard/spookyspotlist/editlistitem/:userId/:listItemId" element={<EditListItem />} />
        <Route path="/dashboard/managesettings" element={<ManageSettings />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/subjects/:slug" element={<CommunitySubject />} />
        <Route path="/community/subjects/:slug/threads/:threadId" element={<CommunityThread />} />
      </Route>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorkerRegistration.register();
