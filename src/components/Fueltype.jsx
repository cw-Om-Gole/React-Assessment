import React, { useState, useEffect } from 'react'
import "./FuelType.css";
import {capitalizeFirstLetter} from '../utils/utils'

const Fueltype = ({ fueltype, fuelNumber, setSelectedFuels, selectedFuels}) => {

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
        <label htmlFor={fueltype}>{capitalizeFirstLetter(fueltype)}</label>
    </div>
  )
}

export default Fueltype;
