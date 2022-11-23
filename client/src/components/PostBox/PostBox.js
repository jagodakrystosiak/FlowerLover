import React from "react";
import Button from "../Button/Button";
import './PostBox.scss';

function PostBox({ post }) {
    let date = "";
    if (post.createDate.valueOf() > 0) {
        let diffrence = Date.now().valueOf() - post.createDate.valueOf();
        if(diffrence < 0) {
            date = "";
        }
        else if (diffrence > 86400000) {
            let month = post.createDate.getMonth()+1;
            date = post.createDate.getDate() + "-" + month + "-" + post.createDate.getFullYear();

        }
        else if (diffrence > 3600000) {
            date = Math.floor(diffrence / 3600000) + " godzin temu";
        }
        else {
            date = Math.floor(diffrence / 60000) + " min temu";
        }
    }
    

return (
    <div className="postbox">
        <div className="postbox__post">
            <a href={"/post/" + post.id}><h2 className="postbox__title">{post.title}</h2></a>
            <p className="postbox__content">{post.content.substring(0,150)} ... </p>
            <div className="postbox__bottom">
                <p className="postbox__author">autor: <a href="/">{post.username}</a> {date}</p>
                <div>
                    {post.categories?.map((category) => <Button className="btn--light btn--small">{category.name}</Button>)}
                </div>
            </div>
        </div>
    </div>
)
}

export default PostBox;