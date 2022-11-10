import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";

// Components
import Spinner from "../components/Spinner";
import ErrorNote from "../components/ErrorNote";
import Filter from "../components/Filter";

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
    const [characters, setCharacters] = useState([]);
    const [hasErrors, setHasErrors] = useState(false);
    const [displayedCharacters, setDisplayedCharacter] = useState('');
    
    useEffect(() => {
      fetch('https://rickandmortyapi.com/api/character')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            setHasErrors(true);
        })
        .then(data => {
            setDisplayedCharacter(data.results);
            setCharacters(data.results);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            hasErrors(true);
        });
    }, [hasErrors]); 
 
    const renderCharacters = () => {
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
                    })};
                </>
            );      
        } else {
            return (
                <ErrorNote message="We couldn't find any characters" />
            );
        }
    };

    const renderList = () => {
        return (
        <>
            <ListHeader>
                <Filter characters={characters} setDisplayedCharacter={setDisplayedCharacter} />
           </ListHeader>
            <ListBody>
                {renderCharacters()}
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

