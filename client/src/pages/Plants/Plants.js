import React, { useEffect, useState } from "react";
import PlantList from "../../components/PlantList/PlantList";
import Searchbar from "../../components/Searchbar/Searchbar";
import useFetchers from "../../hooks/useFetchers";
import './../Posts/Posts.scss';
import plantsFilter from "../../helpers/plantsFilter";

const Plants = () => {
    const { fetchGroupsOfPlants, fetchSpecies, fetchPlants } = useFetchers();
    const [plants, setPlants] = useState([]);
    const [species, setSpecies] = useState([]);
    const [groupOfPlants, setGroupOfPlants] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        wordToFind: "",
        filterBySpecie: null,
        filterByGroupOfPlants: null
    })
 
    useEffect(() => {
        getSpecies();
        getGroupOfPlants();
    },[])

    useEffect(()=>{
        getPlants();
    },[filterOptions])

    const getPlants = async () => {
        const data = await fetchPlants();
        let plants = data;
        setPlants(plantsFilter(plants, filterOptions));
    }

    const getSpecies = async () => {
        const data = await fetchSpecies();
        setSpecies(data);
    }

    const getGroupOfPlants = async () => {
        const data = await fetchGroupsOfPlants();
        setGroupOfPlants(data);
    }

    return (
        <div className="container content">
            <div className="content__categories">
                <h1>Wyszukaj według</h1>
                <h2>Gatunki</h2>
                <ul>
                    {species.length ? species.map((spec, index) => <li key={index}>
                        <a onClick={(spec) => setFilterOptions({...filterOptions, filterBySpecie: species.find((element) => element === spec)})}>{spec.name}</a>
                    </li>) : <h2>Brak gatunków do wyświetlenia</h2>}
                </ul>
                <h2>Grupy</h2>
                <ul>
                    {groupOfPlants.length ? groupOfPlants.map((group, index) => <li key={index}>{group.name}</li>) : <h2>Brak grup do wyświetlenia</h2>}
                </ul>
            </div>
            <div className="content__list">
                <h1>Rośliny</h1>
                <div className="content__filter">
                    <Searchbar onChange={(event) => setFilterOptions({...filterOptions, wordToFind: event.target.value})}/>
                    <p>Pokaż
                        <select className="content__select" >
                            <option value="12">12</option>
                            <option value="24">24</option>
                            <option value="48">48</option>
                        </select>
                    </p>
                </div>
                {plants.length ? <PlantList plants={plants} /> : <h2 className="content__none">Brak roślin do wyświetlenia</h2>}
            </div>
        </div>
    )
}

export default Plants;