import React from "react";
import PostBox from "../PostBox/PostBox";

const Posts = ({ posts, loading }) => {
    if(loading){
        return <h2>Loading...</h2>;
    }

    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>
                    <PostBox post={post}></PostBox>
                </li>
            ))}
        </ul>
    )
}

export default Posts;