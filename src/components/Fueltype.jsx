import React from 'react'
import "./FuelType.css";

const Fueltype = ({ fueltype, fuelNumber}) => {

    function capitalizeFirstLetter(word) {
        if (!word) return '';
        return word.charAt(0).toUpperCase() + word.slice(1);
    }


  return (
    <div className="checkbox-container">
        <input type="checkbox" id={fueltype} name={fueltype} />
        <label for={fueltype}>{capitalizeFirstLetter(fueltype)}</label>
    </div>
  )
}

export default Fueltype;
