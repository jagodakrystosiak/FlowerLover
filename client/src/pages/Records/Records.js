import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchers from "../../hooks/useFetchers";
import "./Records.scss";

const Records = () => {
    const { fetchArticles, fetchCategories,
        fetchGroupsOfPlants, fetchPlants, fetchPosts, fetchSpecies } = useFetchers();
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [groupsOfPlants, setGroupsOfPlants] = useState([]);
    const [plants, setPlants] = useState([]);
    const [posts, setPosts] = useState([]);
    const [species, setSpecies] = useState([]);

    useEffect(() => {
        getAllData();
    }, []);

    const getAllData = async () => {
        const [articles, categories, groupsOfPlants, plants, posts, species] = [
            await fetchArticles(),
            await fetchCategories(),
            await fetchGroupsOfPlants(),
            await fetchPlants(),
            await fetchPosts(),
            await fetchSpecies(),
        ];
        setArticles(articles);
        setCategories(categories);
        //setComments(comments);
        setGroupsOfPlants(groupsOfPlants);
        setPlants(plants);
        setPosts(posts);
        setSpecies(species);
    }

    return (
        <div className="container">
            <div className="records">
                <h1>Artykuły</h1>
                <div className="records__table">
                    <table>
                        <thead>
                            <tr>
                                {articles[0] && Object.keys(articles[0]).map((key) => <th>{key}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {articles && articles.map((article) =>
                                <tr>
                                    {article && Object.values(article).map((value) => <td>{value + ""}</td>)}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <h1>Kategorie</h1>
                <div className="records__table">
                    <table>
                        <thead>
                            <tr>
                                {categories[0] && Object.keys(categories[0]).map((key) => <th>{key}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {categories && categories.map((category) =>
                                <tr>
                                    {category && Object.values(category).map((value) => <td>{value + ""}</td>)}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <h1>Grupy rośliny</h1>
                <div className="records__table">
                    <table>
                        <thead>
                            <tr>
                                {groupsOfPlants[0] && Object.keys(groupsOfPlants[0]).map((key) => <th>{key}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {groupsOfPlants && groupsOfPlants.map((group) =>
                                <tr>
                                    {group && Object.values(group).map((value) => <td>{value + ""}</td>)}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <h1>Rośliny</h1>
                <div className="records__table">
                    <table>
                        <thead>
                            <tr>
                                {plants[0] && Object.keys(plants[0]).map((key) => <th>{key}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {plants && plants.map((plant) =>
                                <tr>
                                    {plant && Object.values(plant).map((value) => <td>{value + ""}</td>)}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <h1>Posty</h1>
                <div className="records__table">
                    <table>
                        <thead>
                            <tr>
                                {posts[0] && Object.keys(posts[0]).map((key) => <th>{key}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {posts && posts.map((post) =>
                                <tr>
                                    {post && Object.values(post).map((value) => <td>{value + ""}</td>)}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <h1>Gatunki roślin</h1>
                <div className="records__table">
                    <table>
                        <thead>
                            <tr>
                                {species[0] && Object.keys(species[0]).map((key) => <th>{key}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {species && species.map((specie) =>
                                <tr>
                                    {specie && Object.values(specie).map((value) => <td>{value + ""}</td>)}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Records;