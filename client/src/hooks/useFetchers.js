import { useContext } from "react";
import axios from "../api/axios";
import AppContext from "../contexts/AppContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const PATH = {
    /* GET ALL */
    categories: "/categories/all",
    articles: "/articles/all",
    posts: "/posts/all",
    species: "/species/all",
    groups_of_plants: "/groups-of-plants/all",
    plants: "/plants/all",
    comments: "/comments/all",
    /* GET BY ID */
    category: "/categories/?categoryId=",
    article: "/articles/?articleId=",
    post: "/posts/?postId=",
    plant: "/plants/?plantId=",
    comment: "/comments/?commentId=",
    /* GET BY USERNAME */
    user: "/api/user?username="
}

const useFetchers = () => {
    const { auth } = useContext(AppContext);
    const axiosPrivate = useAxiosPrivate();

    const getData = async (dataType) => {
        console.log(`Fetching ${dataType}...`);
        const response = auth ? await axiosPrivate.get(PATH[dataType]) : await axios.get(PATH[dataType]);
        if(!response) return [];
        console.log(`${dataType}: `, response.data);
        return response.data;
    }

    const getDataById = async (dataType, params) => {
        console.log(`Fetching ${dataType} with ${params}...`);
        const response = auth ? await axiosPrivate.get(PATH[dataType] + params) : await axios.get(PATH[dataType] + params);
        if(!response) return null;
        console.log(`${dataType}: `, response.data);
        return response.data;
    }

    const fetchCategories = () => getData("categories");
    const fetchArticles = () => getData("articles");
    const fetchPosts = () => getData("posts");
    const fetchSpecies = () => getData("species");
    const fetchGroupsOfPlants = () => getData("groups_of_plants");
    const fetchPlants = () => getData("plants");
    const fetchComments = () => getData("comments");

    const fetchCategoryById = (id) => getDataById("category", id);
    const fetchArticleById = (id) => getDataById("article", id);
    const fetchPostById = (id) => getDataById("post", id);
    const fetchPlantById = (id) => getDataById("plant", id);
    const fetchCommentById = (id) => getDataById("comment", id);

    const fetchUser = (username) => getDataById("user", username);

    return {fetchCategories, fetchArticles, fetchPosts, fetchSpecies, fetchGroupsOfPlants, fetchPlants, fetchComments,
        fetchCategoryById, fetchArticleById, fetchPostById, fetchPlantById, fetchCommentById, fetchUser };
}

export default useFetchers;