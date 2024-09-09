import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Card from '../components/Card';

describe('Card Component Snapshot', () => {
    const mockCarDetails = {
        carName: 'Toyota Prius',
        km: '12000',
        fuel: 'Petrol',
        areaName: 'Vashi',
        cityName: 'Mumbai',
        price: 25000,
        imageUrl: 'https://dummyimage.com/300x225/000/fff',
    };

    it('matches the snapshot', () => {
        const cardComponent = render(<Card carDetails={mockCarDetails} />);
        expect(cardComponent).toMatchSnapshot();
    });

    it('renders the card with car details', () => {
        render(<Card carDetails={mockCarDetails} />);

        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', mockCarDetails.imageUrl);

        const carName = screen.getByText('Toyota Prius');
        expect(carName).toBeInTheDocument();

        const kilometers = screen.getByText(/12000 km/);
        expect(kilometers).toBeInTheDocument();

        const fuelType = screen.getByText(/Petrol/);
        expect(fuelType).toBeInTheDocument();

        const location = screen.getByText(/Vashi, Mumbai/);
        expect(location).toBeInTheDocument();


        const price = screen.getByText(/25000/);
        expect(price).toBeInTheDocument();

        const button = screen.getByText('Get Seller Details');
        expect(button).toBeInTheDocument();
    });
});