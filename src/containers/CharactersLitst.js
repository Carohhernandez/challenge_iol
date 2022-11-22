import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from '@apollo/client';

// Queries
import { FETCH_CHARACTERS_BY_ID } from "../queries/fetchCharacters";

// Utils
import {devices } from '../utils/devices';

// Components
import Pill from "../components/Pill";
import Spinner from "../components/Spinner";
import ErrorNote from "../components/ErrorNote";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 5px;

    @media${devices.tablet} {
        padding: 30px;
    }
`;

const ListHeader = styled.div`
    width: 100%;
    display: flex;

    justify-content: center;
    margin: 10px;

    @media${devices.tablet} {
        justify-content: flex-end;
    }
`;

const ListBody = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    margin: 20px auto;
`;

const Cell = styled.div`
    width: 90%;
    height: 90px;

    margin: 10px;

    @media${devices.tablet} {
        width: 40%;
    }

    @media ${devices.laptop} {
        width: 30%;
    }
`;

const CharactersList = () => {
    
    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [characters, setCharacters] = useState([]); 
    const [filterCharacters, setFilteredCharacters] = useState([]); 
    const [hasFilter, setHasFilter] = useState(false);

    // Assume the ids are consecutive
    const range = () => {
        const length = 15;
        const end = length * currentPage;
        const start = end - (length - 1);
        return Array.from({ length }, (_, idx) => idx + start);
    };

    const ids = range();
    const { loading, error, data } = useQuery(FETCH_CHARACTERS_BY_ID, { variables: { ids } });

    useEffect(() => {
        if (!loading) {
            setTotalRecords(data.characters.info.count);
            setCharacters(data.charactersByIds);
        }
    }, [data, loading]);

    const renderItems = (items) => {
        if (items.length > 0) {
            return ( 
                <>
                    {items.map(item => {
                        return (
                            <Cell key={item.id}>
                                <Pill item={item} url={`/characters/${item.id}`} />
                            </Cell>
                        );
                    })}
                    <Pagination
                        hasFilter={hasFilter} 
                        currentPage={currentPage}
                        totalCount={totalRecords}
                        pageLimit={15}
                        onPageChange={page => setCurrentPage(page)}
                        siblingCount={2}
                    />
                </>
            );      
        } else {
            return (
                <ErrorNote message="We couldn't find any characters" />
            );
        }
    };

    const renderList = () => {
        let items = [];

        if (characters.length > 0) {
            if (hasFilter) {
                if (filterCharacters.length > 0) {
                    items = filterCharacters;
                }
            } else {
                items = characters;
            }
        };

        return (
            <>
                <ListHeader>
                    <Filter characters={characters} setFilteredCharacters={setFilteredCharacters} setHasFilter={setHasFilter} />
                </ListHeader>
                <ListBody>
                    {renderItems(items)}
                </ListBody>
            </>
        );
    };

    if (loading) { return <Spinner /> }

    if (error ) { return <ErrorNote message="Sorry... but something went wrong" /> }

    return (
        <ListContainer>
            {renderList()}
        </ListContainer>
    );
};

export default CharactersList;