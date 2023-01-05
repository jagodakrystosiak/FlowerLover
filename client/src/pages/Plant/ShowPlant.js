import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchers from "../../hooks/useFetchers";
import Button from "../../components/Button/Button";
import "./ShowPlant.scss";
import AppContext from "../../contexts/AppContext";

const ShowPlant = () => {
    const { id } = useParams();
    const { auth } = useContext(AppContext);
    const [plant, setPlant] = useState();
    const { fetchPlantById } = useFetchers();

    useEffect(() => {
        getPlant();
    }, []);

    const getPlant = async () => {
        const data = await fetchPlantById(id);
        setPlant(data);
    }

    return (
        <div className="container">
            <div className="plant">
                <div className="plant__img">
                    <img src={plant?.imageUrl} alt="Zdjęcie rośliny" />
                </div>
                <div className="plant__content">
                    <h1 className="plant__name">{plant?.name}</h1>
                    <p className="plant__cname">"{plant?.customaryName}"</p>
                    <p className="plant__desc">{plant?.description}</p>
                    <p className="plant__group">Grupa roślin: {plant?.groupOfPlant}</p>
                    <p className="plant__group">Gatunek roślin: {plant?.specie}</p>
                    <div className="plant__row">
                        <h2>Wymagania</h2>
                        <p>{plant?.demands}</p>
                    </div>
                    <div className="plant__row">
                        <h2>Stanowisko</h2>
                        <p>{plant?.placement}</p>
                    </div>
                    <div className="plant__row">
                        <h2>Średnia wysokość</h2>
                        <p>{plant?.height} cm</p>
                    </div>
                    {auth ? <Button className="btn--light">Dodaj do moich roślin</Button> : ""}
                </div>
            </div>
        </div>
    )
}

export default ShowPlant;