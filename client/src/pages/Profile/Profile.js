import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../contexts/AppContext";
import useFetchers from "../../hooks/useFetchers";
import "./Profile.scss";

const Profile = () => {
    const { auth } = useContext(AppContext);
    const { fetchUser } = useFetchers();
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const data = await fetchUser(auth.username);
        setUser(data);
    }

    return (
        <div className="container">
            <div className="profile">
                <h1 className="profile__heading">Profil</h1>
                {user ? <>
                    <div className="profile__data">
                        <p>Nazwa użytkownika: {user?.username}</p>
                        <p>O mnie: {user.aboutMe ? user.aboutMe : "brak informacji"}</p>
                        <p>Email: {user.email ? user.email : "brak informacji"}</p>
                        <p>jest z nami od {user?.joiningDate}</p>
                    </div>
                    <h2 className="profile__heading">Rośliny użytkownika</h2>
                    <ul className="profile__plants">
                        {user?.plantCollection.lenght ? user.plantCollection.map((plant) => <li>{plant.name}</li>) : "Brak roślin"}
                    </ul>
                    <div className="profile__posts-and-articles">
                        <div className="profile__posts">
                            <h2 className="profile__heading">Ostatnio dodane wpisy</h2>
                            <ul>
                                {user?.posts.lenght ? user.posts.map((post) => <li>{post.name}</li>) : "Brak wpisów"}
                            </ul>
                        </div>
                        <div className="profile__articles">
                            <h2 className="profile__heading">Ostatnio dodane artykuły</h2>
                            <ul>
                                {user?.articles.lenght ? user.articles.map((article) => <li>{article.name}</li>) : "Brak artykułów"}
                            </ul>
                        </div>
                    </div>
                </> : ""}
            </div>
        </div>
    )
}

export default Profile;