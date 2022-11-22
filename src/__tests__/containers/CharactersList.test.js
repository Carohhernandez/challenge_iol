import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
// eslint-disable-next-line jest/no-mocks-import
import { server } from '../../__mocks__/server';
import CharactersList from '../../containers/CharactersLitst';

test('display character cells from server', async () => {
    render(
        <MemoryRouter>
            <CharactersList />
        </MemoryRouter>
    );

    const characterTitles = await screen.findAllByRole('link');
    expect(characterTitles).toHaveLength(4);
});

test('display error from server', async () => {
    server.resetHandlers(
        rest.get('https://rickandmortyapi.com/api/character', (req, res, ctx) => {
            return res(
                ctx.status(500)
            );
        })
    );

    render(
        <MemoryRouter>
            <CharactersList />
        </MemoryRouter>
    );

    const errorMessage = await screen.findByRole('heading');
    expect(errorMessage).toBeInTheDocument();
});