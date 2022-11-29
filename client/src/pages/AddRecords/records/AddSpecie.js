import React, { useState } from "react";
import Button from "../../../components/Button/Button";
import FormErrors from "../../../components/FormErrors/FormErrors";
import useSenders from "../../../hooks/useSenders";

const AddSpecie = () => {
    const { sendSpecie } = useSenders();
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState("");
    const [specie, setSpecie] = useState({
        name: null
    })

    const onSubmit = async (event) => {
        event.preventDefault();
        setErrors([]);
        setSuccess("");

        if (specie.name === null) setErrors(['Nazwa jest wymagana'])
        else {
            try {
                await sendSpecie(specie);
                setSuccess("Udało się utworzyć grupę");
            } catch (error) {
                setErrors(["Nie udało sie utworzyć grupy", "" + error])
            }
        }
    }

    return (
        <div className="addrecords__card">
            <h2>Dodawanie gatunku roślin</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name">Nazwa gatunku: </label>
                    <input id="name" type="text" placeholder="Wprowadź nazwę..." onChange={(event) => setSpecie({ name: event.target.value })} />
                </div>
                <div className="addrecords__buttons">
                    <Button className="btn--light" type="submit">Dodaj gatunek</Button>
                    <Button className="btn--darker" type="reset">Anuluj</Button>
                </div>
            </form>
            <FormErrors errors={errors} />
            <p id="success">{success}</p>
        </div>
    )
}

export default AddSpecie;