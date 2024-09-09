import { capitalizeFirstLetter, getCarLocation } from '../utils/utils'; // Adjust the import path if necessary

describe('capitalizeFirstLetter', () => {

    test('should capitalize the first letter of a given word', () => {
        expect(capitalizeFirstLetter('hello')).toBe('Hello');
    })

    test('should return an empty string if the input is empty', () => {
        expect(capitalizeFirstLetter('')).toBe('');
    });

    test('should return a formatted location string with area and city', () => {
        const carDetails = {
            areaName: 'Vashi',
            cityName: 'Mumbai',
        };
        expect(getCarLocation(carDetails)).toBe('Vashi, Mumbai');
    });
})