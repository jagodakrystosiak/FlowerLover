import React from "react";
import './PlantBox.scss';
import Button from '../Button/Button';

const PlantBox = ({ plant }) => {
    return (
        <div className="plantbox">
            <div className="plantbox__img" style={{backgroundImage: "url(" + plant.imageUrl + ')'}}>
            <div className="plantbox__desc">
                <h1>{plant.name}</h1>
                <p>"{plant.customaryName}"</p>
                <Button>Dowiedź się więcej</Button>
            </div>
            </div>
        </div>
    )
}

export default PlantBox;