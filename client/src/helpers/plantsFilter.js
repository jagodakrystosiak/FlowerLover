//jak wyszukujemy rośliny

const plantsFilter = (data, {wordToFind, filterBySpecie, filterByGroupOfPlants}) => {
    
    let plants = data;

    if (wordToFind !== "") { //jesli user podal slowo
        let filteredPlants = [];
        let i = 0;
        plants.forEach((plant) => { //szukanie slowa w nazwie i opisie
            if (plant?.customaryName.toUpperCase().includes(wordToFind.toUpperCase()) || 
            plant?.name.toUpperCase().includes(wordToFind.toUpperCase()) || 
            plant?.description.toUpperCase().includes(wordToFind.toUpperCase())) {
                filteredPlants[i] = plant;
                i++;
            }
        });
        plants = filteredPlants;
    }

    if (filterBySpecie !== null) { //jesli jest  gatunek
        let filteredPlants = [];
        let i = 0;
        plants.forEach((plant) => {
            if (plant?.speciesId === filterBySpecie?.id) {
                filteredPlants[i] = plant;
                i++;
            }
        });
        plants = filteredPlants;
    }

    if (filterByGroupOfPlants !== null) { //jesli jest podana grupa
        let filteredPlants = [];
        let i = 0;
        plants.forEach((plant) => {
            if (plant?.groupOfPlantsId === filterByGroupOfPlants?.id) {
                filteredPlants[i] = plant;
                i++;
            }
        });
        plants = filteredPlants;
    }

    return plants; //zwroc liste roslin spelniajaca wymogi
}

export default plantsFilter;