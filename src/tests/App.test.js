import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import App from '../App';


describe('App Component 1', () => {
    test('matches snapshot', async() => {
        const { asFragment } = render(<App />);
        
        expect(asFragment()).toMatchSnapshot();
    }); 

    test('filters cars by budget', async () => {
        render(<App />);
      
        const minInput = screen.getByPlaceholderText('0');
        const maxInput = screen.getByPlaceholderText('21');

        fireEvent.change(minInput, { target: { value: '10000' } });
        fireEvent.change(maxInput, { target: { value: '20000' } });

        expect(minInput.value).toBe('10000');
        expect(maxInput.value).toBe('20000');
    });

    test('sort cars by budget', async () => {
        render(<App />);
      
        const minInput = screen.getByPlaceholderText('0');
        const maxInput = screen.getByPlaceholderText('21');

        fireEvent.change(minInput, { target: { value: '10000' } });
        fireEvent.change(maxInput, { target: { value: '20000' } });

        expect(minInput.value).toBe('10000');
        expect(maxInput.value).toBe('20000');
    });

    test('changes sort order to "Price - Low to High"', async () => {
        render(<App />);
        await waitFor(() => {
          const sortSelect = screen.getByRole('combobox');
          fireEvent.change(sortSelect, { target: { value: 'asc' } });
    
          expect(sortSelect).toHaveValue('asc');
        });
      });
    
      test('changes sort order to "Price - High to Low"', async () => {
        render(<App />);
        await waitFor(() => {
          const sortSelect = screen.getByRole('combobox');
          fireEvent.change(sortSelect, { target: { value: 'desc' } });
    
          expect(sortSelect).toHaveValue('desc');
        });
      });

      test('changes sort order to "Default"', async () => {
        render(<App />);
        await waitFor(() => {
          const sortSelect = screen.getByRole('combobox');
          fireEvent.change(sortSelect, { target: { value: 'default' } });
    
          expect(sortSelect).toHaveValue('default');
        });
      });
});


