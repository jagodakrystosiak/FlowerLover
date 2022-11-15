import React from "react";
import Button from "../Button/Button";
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
            <a href={"/post/" + props.post.id}><h2 className="postbox__title">{props.post.title}</h2></a>
            <p className="postbox__content">{props.post.content.substring(0,150)} ... </p>
            <div className="postbox__bottom">
                <p className="postbox__author">autor: <a href="/">{props.post.author}</a> {date}</p>
                <div>
                    <Button className="btn--light btn--small">Tag</Button>
                    <Button className="btn--light btn--small">Tag</Button>
                    <Button className="btn--light btn--small">Tag</Button>
                </div>
            </div>
        </div>
        {/*<div className="postbox__statistic">
            <p><span>{props.post.votes}</span> głosów</p>
            <p>{props.post.answers} odpowiedzi</p>
            <p>{props.post.views} wyświetleń</p>
        </div>*/}
    </div>
)
}

export default PostBox;