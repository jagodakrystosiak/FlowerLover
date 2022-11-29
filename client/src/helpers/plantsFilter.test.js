import plantsFilter from "./plantsFilter";

describe('propertly filter plants', () => {

    const plants = [
        {
            name: "Monstera",
            customaryName: "Plants are cool",
            description: "love",
            groupOfPlantsId: 1,
            speciesId: 2
        },
        {
            name: "monstera",
            customaryName: "plants",
            description: "Cool",
            groupOfPlantsId: 1,
            speciesId: 1
        },
        {
            name: "MonSterA",
            customaryName: "cOOl",
            description: "Love plants",
            groupOfPlantsId: 2,
            speciesId: 1
        }
    ];

    it('propertly find word', () => {
        let filterOptions = { wordToFind: "love", filterBySpecie: null, filterByGroupOfPlants: null };
        expect(plantsFilter(plants, filterOptions)).toStrictEqual([
            {
                name: "Monstera",
                customaryName: "Plants are cool",
                description: "love",
                groupOfPlantsId: 1,
                speciesId: 2
            },
            {
                name: "MonSterA",
                customaryName: "cOOl",
                description: "Love plants",
                groupOfPlantsId: 2,
                speciesId: 1
            }
        ]);
    });

    it('propertly find word and filter by specie', () => {
        let filterOptions = { wordToFind: "monstera", filterBySpecie: {id: 1, name: "Gatunek"}, filterByGroupOfPlants: null };
        expect(plantsFilter(plants, filterOptions)).toStrictEqual([
            {
                name: "monstera",
                customaryName: "plants",
                description: "Cool",
                groupOfPlantsId: 1,
                speciesId: 1
            },
            {
                name: "MonSterA",
                customaryName: "cOOl",
                description: "Love plants",
                groupOfPlantsId: 2,
                speciesId: 1
            }
        ]);
    });

    it('propertly find word and filter by group', () => {
        let filterOptions = { wordToFind: "plants", filterBySpecie: null, filterByGroupOfPlants: {id: 1, name: "Grupa"} };
        expect(plantsFilter(plants, filterOptions)).toStrictEqual([
            {
                name: "Monstera",
                customaryName: "Plants are cool",
                description: "love",
                groupOfPlantsId: 1,
                speciesId: 2
            },
            {
                name: "monstera",
                customaryName: "plants",
                description: "Cool",
                groupOfPlantsId: 1,
                speciesId: 1
            }
        ]);
    });

    it('propertly filter by specie and group', () => {
        let filterOptions = { wordToFind: "", filterBySpecie: {id:1, name:"Gatunek"}, filterByGroupOfPlants: {id:1, name: "Grupa"} };
        expect(plantsFilter(plants, filterOptions)).toStrictEqual([
            {
                name: "monstera",
                customaryName: "plants",
                description: "Cool",
                groupOfPlantsId: 1,
                speciesId: 1
            }
        ]);
    });

});