import React from "react";
import './Searchbar.scss';

function Searchbar () {
    return(
        <form className="searchbar">
                <input className="searchbar__search" type="text" placeholder="Szukaj..."></input>
                <button type="submit" className="searchbar__button"><i class="fa-solid fa-magnifying-glass"></i></button>
        </form>
    )
}

export default Searchbar;