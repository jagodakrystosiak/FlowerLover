import React, { useEffect, useState } from "react";
import PlantBox from "../../components/PlantBox/PlantBox";
import PlantList from "../../components/PlantList/PlantList";
import Searchbar from "../../components/Searchbar/Searchbar";
import HttpClient from "../../services/HttpClient";
import './../Posts/Posts.scss';

const Plants = () => {
    const [plants, setPlants] = useState([]);
    const [species, setSpecies] = useState([]);
    const [groupOfPlants, setGroupOfPlants] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        plantsPerPage: 10,
        sortType: "",
        wordToFind: ""
    })

    useEffect(() => {
        getPlants();
        getSpecies();
        getGroupOfPlants();
    },[])

    const getPlants = async () => {
        const { data } = await HttpClient().get("/plants/all");
        console.log(data);
        let plants = data;
        setPlants(plants);
    }

    const getSpecies = async () => {
        const { data } = await HttpClient().get("/species/all");
        console.log(data);
        setSpecies(data);
    }

    const getGroupOfPlants = async () => {
        const { data } = await HttpClient().get("/groups-of-plants/all");
        setGroupOfPlants(data);
    }

    const handlePlantsPerPageChange = (event) => setFilterOptions(prev=>({...prev, plantsPerPage: event.target.value}));
    const handleSortPlants = (event) => setFilterOptions(prev=>({...prev, sortType: event.target.value}));
    const handleSearchPlants = (event) => setFilterOptions(prev=>({...prev, wordToFind: event.target.value}));

    return (
        <div className="container content">
            <div className="content__categories">
                <h1>Wyszukaj według</h1>
                <h2>Gatunki</h2>
                <ul>
                    {species.map((spec) => <li>{spec.name}</li>)}
                </ul>
                <h2>Grupy</h2>
                <ul>
                    {groupOfPlants.map((group) => <li>{group.name}</li>)}
                </ul>
            </div>
            <div className="content__list">
                <h1>Rośliny</h1>
                <div className="content__filter">
                    <Searchbar />
                    <p>Sortuj
                        <select className="content__select" >
                            <option value="newest">Najnowsze</option>
                            <option value="oldest">Najstarsze</option>
                            <option value="title">Tytuły</option>
                        </select>
                    </p>
                    <p>Pokaż
                        <select className="content__select" >
                            <option value="12">12</option>
                            <option value="24">24</option>
                            <option value="48">48</option>
                        </select>
                    </p>
                </div>
                <PlantList plants={plants} />
            </div>
        </div>
    )
}

export default Plants;