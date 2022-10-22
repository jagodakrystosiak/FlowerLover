import React from "react";
import './PostBox.scss';

function PostBox(props) {
    let date = "";
    if (props.post.date.valueOf() > 0) {
        let diffrence = Date.now().valueOf() - props.post.date.valueOf();
        if(diffrence < 0) {
            date = "";
        }
        else if (diffrence > 86400000) {
            let month = props.post.date.getMonth()+1;
            date = props.post.date.getDate() + "-" + month + "-" + props.post.date.getFullYear();

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
            <h2 className="postbox__title">{props.post.title}</h2>
            <p className="postbox__content">{props.post.content}</p>
            <p className="postbox__author">autor: <span>{props.post.author}</span> {date}</p>
        </div>
        <div className="postbox__statistic">
            <p>{props.post.votes} głosów</p>
            <p>{props.post.answers} odpowiedzi</p>
            <p>{props.post.views} wyświetleń</p>
        </div>
    </div>
)
}

export default PostBox;