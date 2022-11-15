import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Pill from '../../components/Pill';

const item = {
    "id":10,
    "name":"Alan Rails",
    "status":"Dead",
    "species":"Human",
    "type":"Superhuman (Ghost trains summoner)",
    "gender":"Male",
    "origin":{
        "name":"unknown",
        "url":""
    },
    "location":{
        "name":"Worldender's lair",
        "url":"https://rickandmortyapi.com/api/location/4"
    },
    "image":"https://rickandmortyapi.com/api/character/avatar/10.jpeg",
    "episode":["https://rickandmortyapi.com/api/episode/25"],
    "url":"https://rickandmortyapi.com/api/character/10",
    "created":"2017-11-04T20:19:09.017Z"
};

const url = '/characters/10';

afterEach(cleanup);

test("renders Pill correctly", () => {
    const { asFragment } = render(
        <MemoryRouter>
            <Pill item={item} url={url} />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});