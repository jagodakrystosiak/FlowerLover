import React, { useState } from "react";
import Button from "../../../components/Button/Button";
import FormErrors from "../../../components/FormErrors/FormErrors";
import useSenders from "../../../hooks/useSenders";

const AddCategory = () => {
    const { sendCategory } = useSenders();
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState("");
    const [category, setCategory] = useState({
        name: null
    })

    const onSubmit = async (event) => {
        event.preventDefault();
        setErrors([]);
        setSuccess("");

        if (category.name === null) setErrors(['Nazwa jest wymagana'])
        else {
            try {
                await sendCategory(category);
                setSuccess("Udało się utworzyć kategorię");
            } catch (error) {
                setErrors(["Nie udało sie utworzyć kategorii", "" + error])
            }
        }


    }

    return (
        <div className="addrecords__card">
            <h2>Dodawanie kategorii</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name">Nazwa kategorii: </label>
                    <input id="name" type="text" placeholder="Wprowadź nazwę..." onChange={(event) => setCategory({ name: event.target.value })} />
                </div>
                <div className="addrecords__buttons">
                    <Button className="btn--light" type="submit">Dodaj kategorię</Button>
                    <Button className="btn--darker" type="reset">Anuluj</Button>
                </div>
            </form>
            <FormErrors errors={errors} />
            <p id="success">{success}</p>
        </div>
    )
}

export default AddCategory;