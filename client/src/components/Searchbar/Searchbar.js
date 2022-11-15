import React from "react";
import './Searchbar.scss';

function Searchbar ({ className, onChange }) {
    return(
        <form className={"searchbar " + className}>
                <input className="searchbar__search" type="text" placeholder="Szukaj..." onChange={onChange}></input>
                <button type="submit" className="searchbar__button"><i class="fa-solid fa-magnifying-glass"></i></button>
        </form>
    )
}

export default Searchbar;