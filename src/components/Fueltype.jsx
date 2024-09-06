import React, { useState, useEffect } from 'react'
import "./FuelType.css";

const Fueltype = ({ fueltype, fuelNumber, setSelectedFuels, selectedFuels}) => {
    

    function capitalizeFirstLetter(word) {
        if (!word) return '';
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const handleCheck = (e) => {
      const { checked } = e.target;
      setSelectedFuels(prevState => {
        if(checked) {
          return [...prevState, fuelNumber];
        } else {
          return prevState.filter(value => value != fuelNumber);
        }
      })
    }



  return (
    <div className="checkbox-container">
        <input type="checkbox" id={fueltype} name={fueltype} onChange={handleCheck} checked={selectedFuels.includes(fuelNumber)}/>
        <label for={fueltype}>{capitalizeFirstLetter(fueltype)}</label>
    </div>
  )
}

export default Fueltype;
