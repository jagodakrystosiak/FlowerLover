import React from "react";
import './PlantBox.scss';
import Button from '../Button/Button';
import { useNavigate } from "react-router-dom";

//karta rośliny

const PlantBox = ({ plant }) => {
    const navigate = useNavigate();
    
    return (
        <div className="plantbox">
            <div className="plantbox__img" style={{backgroundImage: "url(" + plant.imageUrl + ')'}}>
            <div className="plantbox__desc">
                <h1>{plant.name}</h1>
                <p>"{plant.customaryName}"</p>
                <Button onClick={() => navigate("/plant/" + plant.id)}>Dowiedź się więcej</Button>
            </div>
            </div>
        </div>
    )
}

export default PlantBox;