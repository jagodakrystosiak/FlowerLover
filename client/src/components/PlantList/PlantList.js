import React, { useState } from "react";
import "./PlantList.scss";
import PlantBox from "../PlantBox/PlantBox";

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