import React, { useState } from "react";
import "./PlantList.scss";
import PlantBox from "../PlantBox/PlantBox";

//Lista roślin

const PlantList = ({ plants }) => {

    return (
        <div className="plantlist">
            {plants.map((plant, index) =>  
            <PlantBox key={index} plant={plant} />
            )}
        </div>
    )
}

export default PlantList;