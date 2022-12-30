import useAxiosPrivate from "./useAxiosPrivate";

const PATH = {
    category: "/categories/new-category/",
    article: "/articles/new-article/",
    post: "/posts/new-post/",
    plant: "/plants/new-plant/",
    group_of_plants: "/groups-of-plants/new-group-of-plants/",
    specie: "/species/new-species/",
    comment: "/comments/new-comment/"
}

const useSenders = () => {
    const axiosPrivate = useAxiosPrivate();

    const postData = async (dataType, data) => {
        console.log(`Sending ${dataType}...`);
        try { return await axiosPrivate.post(PATH[dataType], data); }
        catch (err) { throw err };
    }

    const sendCategory = (data) => postData("category", data);
    const sendArticle = (data) => postData("article", data);
    const sendPost = (data) => postData("post", data);
    const sendComment = (data) => postData("comment", data);
    const sendGroupOfPlant = (data) => postData("group_of_plants", data);
    const sendSpecie = (data) => postData("specie", data);
    const sendPlant = (data) => postData("plant", data);

    return { sendCategory, sendArticle, sendPost, sendGroupOfPlant, sendSpecie, sendPlant, sendComment };
}

export default useSenders;