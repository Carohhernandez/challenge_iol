import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

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

    const [isLoading, setIsLoading] = useState(true);
    const [hasErrors, setHasErrors] = useState(false);
    
    const [totalRecords, setTotalRecords] = useState(0);
    const [searchPage, setSearchPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [characters, setCharacters] = useState([]); 
    const [filterCharacters, setFilteredCharacters] = useState([]); 
    const [hasFilter, setHasFilter] = useState(false);

    const baseURL = 'https://rickandmortyapi.com/api/character/?page=';

    const getUrls = useCallback(() => {
        if ((currentPage%4 === 2) || (currentPage%4 === 3)) {
            return [`${baseURL}${searchPage - 1}`,
                    `${baseURL}${searchPage}`];
        } else {
            return [`${baseURL}${searchPage}`];
        }
    }, [currentPage, searchPage]);

    useEffect(() => {
        const urls = getUrls();

        const promises = urls.map(url => axios.get(url));
        Promise.all(promises)
        .then(values => {
            let data = [];

            setTotalRecords(values[0].data.info.count);

            values.map(value => {
                return data = data.concat(value.data.results);
            });
            setCharacters(data);
            setIsLoading(false);
        }).catch(err => {
            setHasErrors(true);
            console.log(err);
        });

    }, [searchPage, getUrls]); 
 
    const limitCharacters = charactersArray => {
        let char = [];
        switch (currentPage%4) {
            case 0:
                char = charactersArray.slice(5);
                break;
            case 1:
                char = charactersArray.slice(0, 15);
                break;
            case 2:
                char = charactersArray.slice(15, 30);
                break;
            default:
                char = charactersArray.slice(10, 25);
                break;
        };
        return char;
    };
        
    const onSearchPageChange = page => {
        const searchDifference = Math.floor(page/4);
        const search = page - searchDifference;
        setSearchPage(search);
    };

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
                        onPageChange={page => onSearchPageChange(page)}
                        setCurrentPage={page => setCurrentPage(page)}
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
                items = limitCharacters(characters);
            }
        };

        return (
            <>
                <ListHeader>
                    <Filter characters={limitCharacters(characters)} setFilteredCharacters={setFilteredCharacters} setHasFilter={setHasFilter} />
                </ListHeader>
                <ListBody>
                    {renderItems(items)}
                </ListBody>
            </>
        );
    };

    if (isLoading) { return <Spinner /> }

    return (
        <ListContainer>
            {hasErrors ? <ErrorNote message="Sorry... but something went wrong" /> : renderList()}
        </ListContainer>
    );
};

export default CharactersList;