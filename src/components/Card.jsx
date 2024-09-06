import React from 'react';
import './Card.css';

const Card = ({carDetails}) => {


    const getCarLocation = (carDetails) => {
        return carDetails.areaName + "," + " " + carDetails.cityName;
    }

    return (
        <>
                <div className="card">
                    <img className="card-image" src={carDetails.imageUrl ? carDetails.imageUrl : "https://dummyimage.com/300x225/000/fff"} alt="blog"/>
                        <div className="card-content">
                            <h2 className="card-title">{carDetails.carName}</h2>
                            <p className="card-description">
                                {carDetails.km} km
                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                {carDetails.fuel}
                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                {getCarLocation(carDetails)}
                            </p>
                            <h2 className="card-price">{carDetails.price}</h2>
                            <div className="card-footer">
                                <a className="btn">Get Seller Details</a>
                            </div>
                        </div>
                </div>
        </>
    )
}

export default Card;
