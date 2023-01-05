import React, { useContext } from "react";
import AppContext from "../../contexts/AppContext";
import Button from "../Button/Button";
import './PostBox.scss';
import dateConverter from "../../helpers/dateConverter";

function PostBox({ post }) {
    return (
        <div className="postbox">
            <div className="postbox__post">
                <a href={"/post/" + post.id}><h2 className="postbox__title">{post.title}</h2></a>
                <p className="postbox__content">{post.content.substring(0, 150)} ... </p>
                <div className="postbox__bottom">
                    <p className="postbox__author"><span>autor: <span>{post.username}</span></span> {dateConverter(post.createDate)}</p>
                    <div>
                        {post.categories?.map((category, index) => 
                        <Button key={index} className="btn--light btn--small">{category.name}</Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostBox;

