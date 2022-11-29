import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import './sass/style.scss';

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AppContext from "./contexts/AppContext";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import CreatePost from "./pages/Post/Create/CreatePost";
import CreateArticle from "./pages/Article/Create/CreateArticle";
import Unauthorized from "./pages/Authorization/Unauthorized/Unauthorized";
import ShowPlant from "./pages/Plant/ShowPlant";
import EditPost from "./pages/Post/Edit/EditPost";
import Users from "./pages/Users/Users";
import AddRecords from "./pages/AddRecords/AddRecords";
import jwtDecode from "jwt-decode";
import Records from "./pages/Records/Records";


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
    const [isInitiated, setIsInitiated] = useState(false);
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        init();
    }, []);

    const logout = () => {
        setAuth(null);
        localStorage.setItem('auth', null);
    }

    const init = async () => {
        if ("auth" in localStorage) {
            const accessToken = JSON.parse(localStorage.getItem("auth"))?.access_token;
            const refreshToken = JSON.parse(localStorage.getItem("auth"))?.refresh_token;
            const decoded = jwtDecode(accessToken);
            console.log(decoded);
            setAuth({
                username: decoded?.sub,
                roles: decoded?.roles,
                access_token: accessToken,
                refresh_token: refreshToken
            });
            console.log(`${decoded?.sub} log in`);
        }
        setIsInitiated(true);
    };
    console.log(auth);

    return (
        <>
            {isInitiated && (
                <AppContext.Provider value={{ auth, setAuth, logout }}>
                    <Router>
                        <Navbar />
                        {/* Podczas importu komponentu wyświetla podaną funkcję */}
                        <Suspense fallback={() => <h1>Loading ...</h1>}>
                            <Routes>
                                {/* Scieżki dostępne dla wszystkich */}
                                <Route path="*" element={<Navigate to="/" />} />
                                <Route exact path="/" element={<Home />} />
                                <Route exact path="/articles" element={<Articles />} />
                                <Route exact path="/article/:id" element={<ShowArticle />} />
                                <Route exact path="/posts" element={<Posts />} />
                                <Route exact path="/post/:id" element={<ShowPost />} />
                                <Route exact path="/plants" element={<Plants />} />
                                <Route exact path="/plant/:id" element={<ShowPlant />} />
                                <Route exact path="/register" element={<Register />} />
                                <Route exact path="/login" element={<Login />} />
                                <Route exact path="/unauthorized" element={<Unauthorized />} />

                                {/* Scieżki tylko dla zalogowanych użytkowników*/}
                                <Route element={<RequireAuth allowedRoles={["ROLE_USER", "ROLE_ADMIN"]} />}>
                                    <Route exact path="/post/create" element={<CreatePost />} />
                                    <Route exact path="/post/edit/:id" element={<EditPost />} />
                                    <Route exact path="/article/create" element={<CreateArticle />} />
                                </Route>
                                {/* Scieżki tylko dla adminów */}
                                <Route element={<RequireAuth allowedRoles={"ROLE_ADMIN"} />}>
                                    <Route exact path="/users" element={<Users />} />
                                    <Route exact path="/records" element={<Records />} />
                                    <Route exact path="/records/add" element={<AddRecords />} />
                                </Route>
                            </Routes>
                        </Suspense>
                        <Footer />
                    </Router>
                </AppContext.Provider>
            )
            }
        </>
    );
}

export default App;