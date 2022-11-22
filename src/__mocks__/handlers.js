import { rest } from 'msw';

const response = {
    info: {
        count: 826
    }, 
    results: [
        { "id":1, "name":"Rick Sanchez", "location":{ "name":"Citadel of Ricks" } },
        { "id":2, "name":"Morty Smith", "location":{ "name":"Citadel of Ricks" } },
        { "id":3,"name":"Summer Smith","location":{ "name":"Earth (Replacement Dimension)"} },
        { "id":4,"name":"Beth Smith","location":{ "name":"Earth (Replacement Dimension)" } }
    ]
};

export const handlers = [
    /*rest.get('https://rickandmortyapi.com/api/character/:id', (req, res, ctx) => {
        console.log('en la de id');
        return res(
            ctx.json(characters)
        );
    }),*/
    rest.get('https://rickandmortyapi.com/api/character', (req, res, ctx) => {
        return res(
            ctx.json(response)
        );
    })
];