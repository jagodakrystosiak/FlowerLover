import React, { useState } from "react";
import Button from "../../components/Button/Button";
import AddCategory from "./records/AddCategory";
import AddGroupOfPlants from "./records/AddGroupOfPlants";
import AddPlant from "./records/AddPlant";
import AddSpecie from "./records/AddSpecie";
import "./AddRecords.scss";

const AddRecords = () => {
    const [tab, setTab] = useState("plant");

    return (
        <div className="container addrecords">
            <h1>Dodaj rekordy</h1>
            <div>
                <Button
                    className={tab === "plant" ? "addrecords__button addrecords__button-active" : "addrecords__button"}
                    onClick={() => setTab("plant")}>Roślina</Button>
                <Button
                    className={tab === "category" ? "addrecords__button addrecords__button-active" : "addrecords__button"}
                    onClick={() => setTab("category")}>Kategoria</Button>
                <Button
                    className={tab === "group-of-plants" ? "addrecords__button addrecords__button-active" : "addrecords__button"}
                    onClick={() => setTab("group-of-plants")}>Grupa roślin</Button>
                <Button
                    className={tab === "specie" ? "addrecords__button addrecords__button-active" : "addrecords__button"}
                    onClick={() => setTab("specie")}>Gatunek</Button>
            </div>
            {tab === "category" ? <AddCategory /> : ""}
            {tab === "group-of-plants" ? <AddGroupOfPlants /> : ""}
            {tab === "specie" ? <AddSpecie /> : ""}
            {tab === "plant" ? <AddPlant /> : ""}
        </div>
    )
}

export default AddRecords;

