import React, { useState } from "react";
import "./PlantList.scss";
import PlantBox from "../PlantBox/PlantBox";

const PlantList = ({ plants }) => {

    return (
        <div className="plantlist">
            {plants.map((plant, index) =>  
            <PlantBox plant={plant} />
            )}
        </div>
    )
}

export default PlantList;