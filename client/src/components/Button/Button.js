import React from "react";
import './Button.scss';

function Button (props) {
    return(
        <button onClick={props.onClick} type={props.type} className={"btn " + props.className}>{props.children}</button>
    )
}

export default Button;