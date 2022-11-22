import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filter from "../../components/Filter";

const characters = [
    { "id":1, "name":"Rick Sanchez", "location":{ "name":"Citadel of Ricks" } },
    { "id":2, "name":"Morty Smith", "location":{ "name":"Citadel of Ricks" } },
    { "id":3,"name":"Summer Smith","location":{ "name":"Earth (Replacement Dimension)"} },
    { "id":4,"name":"Beth Smith","location":{ "name":"Earth (Replacement Dimension)" } }
];

const filterResponse = [
    { "id":1, "name":"Rick Sanchez", "location":{ "name":"Citadel of Ricks" } },
    { "id":2, "name":"Morty Smith", "location":{ "name":"Citadel of Ricks" } },
];

const user = userEvent.setup();
const setFilteredCharacters = jest.fn();
const setHasFilter = jest.fn();

describe('Filter function response by search parameter', () => {
    test('with search parameter', async () => {
        render(<Filter characters={characters} setFilteredCharacters={setFilteredCharacters} setHasFilter={setHasFilter} />);
        const input = screen.getByRole('textbox', { name: "" });
        await userEvent.type(input, 'citadel');
        const searchButton = screen.getByRole('button');
        await user.click(searchButton);
        expect(setFilteredCharacters).toHaveBeenCalledWith(filterResponse);
    });

    test('without search parameter', async () => {
        render(<Filter characters={characters} setFilteredCharacters={setFilteredCharacters} setHasFilter={setHasFilter} />);
        const searchButton = screen.getByRole('button');
        await user.click(searchButton);
        expect(setHasFilter).toHaveBeenCalledWith(false);
    });

    test('with not found search parameter', async () => {
        render(<Filter characters={characters} setFilteredCharacters={setFilteredCharacters} setHasFilter={setHasFilter} />);
        const input = screen.getByRole('textbox', { name: "" });
        await userEvent.type(input, 'invalid');
        const searchButton = screen.getByRole('button');
        await user.click(searchButton);
        expect(setFilteredCharacters).toHaveBeenCalledWith([]);
    });
});
