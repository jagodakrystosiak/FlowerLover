import React, { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import FormErrors from "../../../components/FormErrors/FormErrors";
import useFetchers from "../../../hooks/useFetchers";
import useSenders from "../../../hooks/useSenders";

const AddPlant = () => {
    const { fetchSpecies, fetchGroupsOfPlants } = useFetchers();
    const { sendPlant } = useSenders();
    const [species, setSpecies] = useState([]);
    const [groupsOfPlants, setGroupsOfPlants] = useState([]);
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState("");
    const [plant, setPlant] = useState({
        name: null,
        customaryName: null,
        description: null,
        demands: null,
        placement: null,
        height: null,
        humidity: null,
        imageUrl: null,
        specieId: null,
        groupOfPlantsId: null
    });

    useEffect(() => {
        getSpeciesAndGroupsOfPlnts();
    }, []);

    const getSpeciesAndGroupsOfPlnts = async () => {
        const species = await fetchSpecies();
        const groups = await fetchGroupsOfPlants();
        setSpecies(species);
        setGroupsOfPlants(groups);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setErrors([]);
        setSuccess("");

        if (plant.name === null) setErrors(["Nazwa jest wymagana"]);
        else {
            try {
                await sendPlant(plant);
                setSuccess("Udało się utworzyć roślinę");
            } catch (error) {
                setErrors(["Nie udało sie utworzyć rośliny", "" + error])
            }
        }
    }

    return (
        <div className="addrecords__card">
            <h2>Dodawanie rośliny</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name">Nazwa rośliny: </label>
                    <input id="name" placeholder="Wprowadź nazwę..." type="text" onChange={(event) => setPlant({ ...plant, name: event.target.value })} />
                </div>
                <div>
                    <label htmlFor="cname">Nazwa potoczna rośliny: </label>
                    <input id="cname" placeholder="Wprowadź nazwę potoczną..." type="text" onChange={(event) => setPlant({ ...plant, customaryName: event.target.value })} />
                </div>
                <div>
                    <label htmlFor="desc">Opis: </label>
                    <textarea id="desc" placeholder="Wprowadź opis rośliny..." cols="100" rows="5" onChange={(event) => setPlant({ ...plant, description: event.target.value })}></textarea>
                </div>
                <div>
                    <label htmlFor="demands">Wymagania: </label>
                    <textarea id="demands" placeholder="Wprowadź wymagania..." cols="100" rows="5" onChange={(event) => setPlant({ ...plant, demands: event.target.value })}></textarea>
                </div>
                <div>
                    <label htmlFor="placement">Stanowisko: </label>
                    <textarea id="placement" placeholder="Wprowadź opis stanowiska..." cols="100" rows="5" onChange={(event) => setPlant({ ...plant, placement: event.target.value })}></textarea>
                </div>
                <div>
                    <label htmlFor="height">Wysokość w centymetrach: </label>
                    <input id="height" placeholder="Podaj średnią wysokość rośliny..." type="number" min="0" max="1000" step="10" onChange={(event) => setPlant({ ...plant, height: +event.target.value })} />
                </div>
                <div>
                    <label htmlFor="humidity">Wilgotność od 1 do 10: </label>
                    <input id="humidity" placeholder="Podaj średnią wilgotność rośliny..." type="number" min="0" max="10" onChange={(event) => setPlant({ ...plant, humidity: +event.target.value })} />
                </div>
                <div>
                    <label htmlFor="url">Link do zdjęcia: </label>
                    <input id="url" placeholder="Możesz tu umieścić link do zdjęcia z zewnętrznego serwera" type="url" onChange={(event) => setPlant({ ...plant, imageUrl: event.target.value })} />
                </div>
                <fieldset>
                    <legend>Gatunek</legend>
                    <div className="addrecords__cartegories">
                        {species ? species.map((specie) =>
                            <div>
                                <input type="radio" name="specie" id={specie.name} value={specie.id} onChange={(event) => setPlant({ ...plant, specieId: +event.target.value })} />
                                <label htmlFor={specie.name}>{specie.name}</label>
                            </div>
                        ) : <div>Brak gatunków do wyświetlenia, utwórz nowy gatunek w zakładce "Gatunek"</div>}
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Grupa roślin</legend>
                    <div className="addrecords__cartegories">
                        {groupsOfPlants ? groupsOfPlants.map((group) =>
                            <div>
                                <input type="radio" name="group" id={group.name} value={group.id} onChange={(event) => setPlant({ ...plant, groupOfPlantsId: +event.target.value })} />
                                <label htmlFor={group.name}>{group.name}</label>
                            </div>
                        ) : <div>Brak grup do wyświetlenia, utwórz nową grupę w zakładce "Grupa roślin"</div>}
                    </div>
                </fieldset>
                <div className="addrecords__buttons">
                    <Button className="btn--light" type="submit">Dodaj roślinę</Button>
                    <Button className="btn--darker" type="reset">Anuluj</Button>
                </div>
            </form>
            <FormErrors errors={errors} />
            <p id="success">{success}</p>
        </div>
    )
}

export default AddPlant;

