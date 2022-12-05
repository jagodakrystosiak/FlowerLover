import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import './sass/style.scss';

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AppContext from "./contexts/AppContext";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import jwtDecode from "jwt-decode";
import useRefreshToken from "./hooks/useRefreshToken";
import Profile from "./pages/Profile/Profile";

//Funkcja lazy importująca komponenty dopiero kiedy wybierze się odpowiedni routing
const Home = lazy(() => import("./pages/Home/Home"));
const Posts = lazy(() => import("./pages/Posts/Posts"));
const Articles = lazy(() => import("./pages/Articles/Articles"));
const Plants = lazy(() => import("./pages/Plants/Plants"));
const ShowPost = lazy(() => import("./pages/Post/Show/ShowPost"));
const ShowArticle = lazy(() => import("./pages/Article/Show/ShowArticle"));
const Register = lazy(() => import("./pages/Authorization/Register/Register"));
const Login = lazy(() => import("./pages/Authorization/Login/Login"));
const CreatePost = lazy(() => import("./pages/Post/Create/CreatePost"));
const CreateArticle = lazy(() => import("./pages/Article/Create/CreateArticle"));
const Unauthorized = lazy(() => import("./pages/Authorization/Unauthorized/Unauthorized"));
const ShowPlant = lazy(() => import("./pages/Plant/ShowPlant"));
const EditPost = lazy(() => import("./pages/Post/Edit/EditPost"));
const Users = lazy(() => import("./pages/Users/Users"));
const AddRecords = lazy(() => import("./pages/AddRecords/AddRecords"));
const Records = lazy(() => import("./pages/Records/Records"));

const App = () => {
    const [isInitiated, setIsInitiated] = useState(false);
    const [auth, setAuth] = useState(null);
    const refresh = useRefreshToken();

    useEffect(() => {
        init();
    }, []);

    const logout = () => {
        setAuth(null);
        localStorage.removeItem('auth');
    }

    const init = async () => {

        if ("auth" in localStorage) {

            const accessToken = JSON.parse(localStorage.getItem("auth"))?.access_token;
            const refreshToken = JSON.parse(localStorage.getItem("auth"))?.refresh_token;

            const decoded = jwtDecode(accessToken);

            setAuth({
                username: decoded?.sub,
                roles: decoded?.roles,
                access_token: accessToken,
                refresh_token: refreshToken
            });

            console.log(`${decoded?.sub} log in`);
        }
        setIsInitiated(true);

        setTimeout(()=>{
            refresh();
        }, (10*60000)-500);

    };

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

                                {/* Scieżki TYLKO dla zalogowanych użytkowników oraz administratorów */}
                                <Route element={<RequireAuth allowedRoles={["ROLE_USER", "ROLE_ADMIN"]} />}>
                                    <Route exact path="/post/create" element={<CreatePost />} />
                                    <Route exact path="/post/edit/:id" element={<EditPost />} />
                                    <Route exact path="/article/create" element={<CreateArticle />} />
                                    <Route exact path="/profile" element={<Profile />} />
                                </Route>
                                {/* Scieżki TYLKO dla administratorów */}
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