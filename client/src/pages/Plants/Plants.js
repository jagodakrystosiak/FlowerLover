import React, { useEffect, useState } from "react";
import PlantBox from "../../components/PlantBox/PlantBox";
import PlantList from "../../components/PlantList/PlantList";
import Searchbar from "../../components/Searchbar/Searchbar";

const Plants = () => {
    const [plants, setPlants] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        plantsPerPage: 10,
        sortType: "",
        wordToFind: ""
    })

    useEffect(() => {
        getPlants();
    },[])

    const getPlants = () => {
        let plants = [];
        for(let i=0; i<30; i++){
            plants[i] = {
                id: 1,
                customaryName: "Monstera biała",
                demands: "Optymalna temperatura do uprawy monstery to 20 stopni C, ale jest w stanie całkiem dobrze przystosować się do zakresu od 15 do 30 stopni. Wymagania monstery nie są duże. Wykazuje ona dużą tolerancję względem światła, znosi suche powietrze a nawet kurz-w zakładach produkcyjnych.",
                description: "Unikatowa, poszukiwana i bardzo cenna odmiana modnej monstery dziurawej, która zachwyca imponującym ubarwieniem. Jej duże liście z charakterystycznymi wycięciami cechują się pięknym pstrym ubarwieniem. Czasem bezchlorofilowa, kremowa struktura tkanek liścia pojawia się jako nieregularny akcent na fragmentach blaszek liściowych, a czasem obejmuje całe liście lub nawet fragmenty pędów. ",
                height: 100,
                humidity: 3,
                imageUrl: "https://images.unsplash.com/photo-1630565963157-28ed2c8d3edc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                name: "Monstera deliciosa 'Thai Constellation'",
                placement: "Roślina odnajdzie się również na stanowiskach lekko zacienionych, znacznie spowolni to jednak jej wzrost.",
                groupOfPlantsId: 1,
                speciesId: 1
            };
        }
        setPlants(plants);
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
                    <li>gatunek</li>
                    <li>gatunek</li>
                    <li>gatunek</li>
                    <li>gatunek</li>
                    <li>gatunek</li>
                </ul>
                <h2>Grupy</h2>
                <ul>
                    <li>gatunek</li>
                    <li>gatunek</li>
                    <li>gatunek</li>
                    <li>gatunek</li>
                    <li>gatunek</li>
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