
const plantsFilter = (data, {wordToFind, filterBySpecie, filterByGroupOfPlants}) => {
    
    let plants = data;

    if (wordToFind !== "") {
        let filteredPlants = [];
        let i = 0;
        plants.forEach((plant) => {
            if (plant?.customaryName.includes(wordToFind) || plant?.name.includes(wordToFind) || plant?.description.includes(wordToFind)) {
                filteredPlants[i] = plant;
                i++;
            }
        });
        plants = filteredPlants;
    }

    if (filterBySpecie !== null) {
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

    if (filterByGroupOfPlants !== null) {
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

    return plants;
}

export default plantsFilter;