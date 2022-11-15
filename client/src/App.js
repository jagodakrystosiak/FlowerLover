import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import './sass/style.scss';

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from './pages/Home/Home';
import Posts from "./pages/Posts/Posts";
import Articles from "./pages/Articles/Articles";
import Plants from "./pages/Plants/Plants";
import ShowPost from "./pages/Post/Show/ShowPost";
import ShowArticle from "./pages/Article/Show/ShowArticle";

const App = () => {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} exact />
                    <Route path="/articles" element={<Articles />} exact />
                    <Route path="/article/:id" element={<ShowArticle />} exact />
                    <Route path="/posts" element={<Posts />} exact />
                    <Route path="/post/:id" element={<ShowPost />} exact />
                    <Route path="/plants" element={<Plants />} exact />
                </Routes>
                <Footer />
            </Router>
        </>
    );
}

export default App;