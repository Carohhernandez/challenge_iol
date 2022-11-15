import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import ErrorNote from '../../components/ErrorNote';

describe('Go back link response to prop', () =>{
    test("renders ErrorNote with back button", () => {
        render(
            <MemoryRouter>
                <ErrorNote withBack/>
            </MemoryRouter>
        );
        const backButton = screen.queryByText(/Go back to list/i);
        expect(backButton).toBeInTheDocument();
    });
    
    test("renders ErrorNote without back button", () => {
        render(
            <MemoryRouter>
                <ErrorNote/>
            </MemoryRouter>
        );

        const backButton = screen.queryByText(/Go back to list/i);
        expect(backButton).not.toBeInTheDocument();
    }); 
});

test("renders ErrorNote correctly", () => {
    const { asFragment } = render(
        <MemoryRouter>
            <ErrorNote withBack/>
        </MemoryRouter>
    );
  expect(asFragment()).toMatchSnapshot();
});

