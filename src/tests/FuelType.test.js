import React from 'react';
import { render, screen ,fireEvent  } from '@testing-library/react';
import Fueltype from '../components/Fueltype';

describe('Fueltype Component Snapshot', () => {
    const mockSetSelectedFuels = jest.fn();

    const mockProps = {
        fueltype: 'diesel',
        fuelNumber: 1,
        setSelectedFuels: mockSetSelectedFuels,
        selectedFuels: [1],
    };

    it('matches the snapshot when checkbox is checked', () => {
        const { asFragment } = render(
            <Fueltype 
                fueltype={mockProps.fueltype} 
                fuelNumber={mockProps.fuelNumber} 
                setSelectedFuels={mockProps.setSelectedFuels} 
                selectedFuels={mockProps.selectedFuels} 
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches the snapshot when checkbox is unchecked', () => {
        const { asFragment } = render(
            <Fueltype 
                fueltype={mockProps.fueltype} 
                fuelNumber={mockProps.fuelNumber} 
                setSelectedFuels={mockProps.setSelectedFuels} 
                selectedFuels={[]} 
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('should render checkbox with label', () => {
        render(
            <Fueltype
                fueltype="petrol"
                fuelNumber="1"
                setSelectedFuels={mockProps.setSelectedFuels}
                selectedFuels={[]}
            />
        );

        const checkbox = screen.getByLabelText('Petrol');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toHaveAttribute('type', 'checkbox');
    });

    test('Check if setSelectedFuels is called', () => {
        render(
            <Fueltype
                fueltype={mockProps.fueltype} 
                fuelNumber={mockProps.fuelNumber} 
                setSelectedFuels={mockProps.setSelectedFuels}
                selectedFuels={[]}
            />
        );

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox); 
        fireEvent.click(checkbox); 

        expect(mockProps.setSelectedFuels).toHaveBeenCalledTimes(2);
    });
});
