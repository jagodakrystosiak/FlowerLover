import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import './sass/style.scss';
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from './pages/Home';

function App() {

    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} exact />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;