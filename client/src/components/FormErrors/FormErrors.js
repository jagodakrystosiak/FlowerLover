import React from "react";
import './FormErrors.scss';

//łapanie błędów formularza

const FormErrors = ({errors}) => {
    return(
        <div className="form-errors">
            {errors.length > 1 ? (
                <ul>
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            ): (
                <ul><li>{errors[0]}</li></ul>
            )}
        </div>
    )
}

export default FormErrors;