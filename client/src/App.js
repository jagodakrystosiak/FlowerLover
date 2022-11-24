import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import './sass/style.scss';

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AppContext from "./contexts/AppContext";
import HttpClient from "./services/HttpClient";

//Funkcja lazy importuje komponenty dopiero kiedy wybierzemy odpowiedni routing
const Home = lazy(() => import("./pages/Home/Home"));
const Posts = lazy(() => import("./pages/Posts/Posts"));
const Articles = lazy(() => import("./pages/Articles/Articles"));
const Plants = lazy(() => import("./pages/Plants/Plants"));
const ShowPost = lazy(() => import("./pages/Post/Show/ShowPost"));
const ShowArticle = lazy(() => import("./pages/Article/Show/ShowArticle"));
const Register = lazy(() => import("./pages/Authorization/Register/Register"));
const Login = lazy(() => import("./pages/Authorization/Login/Login"));

const App = () => {
    useEffect(() => {
        init();
    }, []);

    const [isInitiated, setIsInitiated] = useState(false);
    const [user, setUser] = useState(null);

    const logout = () => {
        setUser(null);
        localStorage.setItem('token', null);
    }

    const init = async () => {
        const { data } = await HttpClient().get('/api/user/init');
        setUser(data.user);
        setIsInitiated(true);
    };

    return (
        <>
            {//isInitiated && (
                //<AppContext.Provider value={{ user, setUser, logout }}>
                    <Router>
                        <Navbar />
                        {/* Podczas importu komponentu wyświetla podaną funkcję */}
                        <Suspense fallback={() => <h1>Loading ...</h1>}>
                            <Routes>
                                <Route path="*" element={<Navigate to="/" />} />
                                <Route exact path="/" element={<Home />} />
                                <Route exact path="/articles" element={<Articles />} />
                                <Route exact path="/article/:id" element={<ShowArticle />} />
                                <Route exact path="/posts" element={<Posts />} />
                                <Route exact path="/post/:id" element={<ShowPost />} />
                                <Route exact path="/plants" element={<Plants />} />
                                <Route exact path="/register" element={<Register />} />
                                <Route exact path="/login" element={<Login />} />
                            </Routes>
                        </Suspense>
                        <Footer />
                    </Router>
                //</></AppContext.Provider>)
            }
        </>
    );
}

export default App;