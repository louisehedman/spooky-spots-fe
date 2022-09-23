import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import AuthProvider from "./components/auth/AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <Outlet />
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
