import React from "react";
import PostBox from "../PostBox/PostBox";
import './PostsList.scss';

const Posts = ({ posts, loading, postsLenght }) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <ul>
            {posts.map((post, index) => {
                if (index == postsLenght-1) {
                    return <li key={post.id}>
                        <PostBox post={post}></PostBox>
                    </li>
                } else {
                    return <li key={post.id}>
                        <PostBox post={post}></PostBox>
                        <div className="post-divide"></div>
                    </li>
                }
            })}
        </ul>
    )
}

export default Posts;