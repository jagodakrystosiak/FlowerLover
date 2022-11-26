import React from "react";
import './FormErrors.scss';

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
                <span>{errors[0]}</span>
            )}
        </div>
    )
}

export default FormErrors;