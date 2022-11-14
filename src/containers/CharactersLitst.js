import React, { useCallback, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import axios from "axios";

// Components
import Spinner from "../components/Spinner";
import ErrorNote from "../components/ErrorNote";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 30px;
`;

const ListHeader = styled.div`
    width: 100%;

    display: flex;
    justify-content: flex-end;
`;

const ListBody = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    margin: 20px auto;
`;

const Pill = styled.div`
    width: 30%;
    height: 90px;
    display: flex;
    align-items: center;

    border-radius: 50px;
    background-color: #abb2bf;

    margin: 10px 10px;
    padding: 0px 10px;
`;

const PillThumb = styled.img`
    width: 70px;
    height: 70px;

    border-radius: 50%;
`;

const PillInformation = styled.div`
    display: flex;
    flex-direction: column;

    padding-left: 10px;
`;

const PillTitle = styled(Link)`
    text-decoration: none;
    color: #fff;
`;

const PillDescription = styled.p`
    display: flex;

    margin: 5px;
    font-size: 14px;
    font-style: italic;

    i {
        margin-right: 5px;
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

    const getUrls = useCallback(() => {
        if (currentPage%4 === 2) {
            return [`https://rickandmortyapi.com/api/character/?page=${searchPage - 1}`,
                    `https://rickandmortyapi.com/api/character/?page=${searchPage}`];
        } else if (currentPage%4 === 3) {
            return [`https://rickandmortyapi.com/api/character/?page=${searchPage - 1}`,
                    `https://rickandmortyapi.com/api/character/?page=${searchPage}`];
        } else {
            return [`https://rickandmortyapi.com/api/character/?page=${searchPage}`];
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

    const renderCharacters = (displayedCharacters) => {
        if (displayedCharacters.length > 0) {
            return ( 
                <>
                    {displayedCharacters.map(character => {
                        return (
                        <Pill key={character.id}>
                            <PillThumb src={character.image} alt={character.name} />
                            <PillInformation>
                                <PillTitle to={`/characters/${character.id}`}>
                                    {character.name}
                                </PillTitle>
                                <PillDescription>
                                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                                    {character.location.name}
                                </PillDescription>
                            </PillInformation>
                        </Pill>
                        )
                    })}
                    <Pagination 
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
        let arr = [];

        if (characters.length > 0) {
            if (filterCharacters.length > 15) {
                arr = limitCharacters(filterCharacters)
            } else if (((filterCharacters.length > 0) && (filterCharacters.length <= 15))) {
                arr = filterCharacters;
            } else {
                arr = limitCharacters(characters);
            }
        };

        

        return (
            <>
                <ListHeader>
                    <Filter characters={characters} setFilteredCharacters={setFilteredCharacters} />
                </ListHeader>
                <ListBody>
                    {renderCharacters(arr)}
                </ListBody>
            </>
        );
    };

    if (isLoading) {
        return <Spinner />
    }

    return (
        <ListContainer>
            {hasErrors ? <ErrorNote message="Sorry... but something went wrong" /> : renderList()}
        </ListContainer>
    )
};

export default CharactersList;