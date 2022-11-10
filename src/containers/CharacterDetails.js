import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// Components
import Spinner from "../components/Spinner";
import ErrorNote from "../components/ErrorNote";

const DetailsContainer = styled.div`
    display: flex;
    justify-content: center;

    margin: 30px;
`;

const CardContainer = styled.div`
    width: 100%;
    display: flex;

    border-radius: 20px;
    background-color: #abb2bf;
    padding: 30px;
`;

const CardLeft = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
`;

const CardImage = styled.div`
    display: flex;
    justify-content: flex-start;

    img {
        border-radius: 20px;
    }
`;

const CardRight = styled.div`
    width: 50%;
`;

const CardInformation = styled.div`
    
`;

const CardTitle = styled.div`
   
`;

const CardLocation = styled.div`
    width: 50%;
`;

const CharacterDetails = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [character, setCharacter] = useState(null);
    const [hasErrors, setHasErrors] = useState(false);

    const {id} = useParams();

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            setHasErrors(true);
        })
        .then(data => {
            setCharacter(data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            hasErrors(true);
        });
    }, [id, hasErrors])

    const renderDetails = () => {
        return (
            <CardContainer>
                <CardLeft>
                    <CardImage><img src={`${character.image}`} alt={`${character.name}`}></img></CardImage>
                    <CardTitle><h1>{`- ${character.name}`}</h1></CardTitle>
                </CardLeft>
                <CardRight>
                <CardInformation>
                    <h1>{character.status}</h1>
                    <h1>{character.species}</h1>
                    <h1>{character.origin.name}</h1>
                    <CardLocation><h1>{character.location.name}</h1></CardLocation>
                </CardInformation>
                </CardRight>
            </CardContainer>
        );
    };

    if (isLoading) {
        return <Spinner />
    }
    
    return (
        <DetailsContainer>
            {hasErrors ? <ErrorNote withBack/> : renderDetails()}
        </DetailsContainer>
    )
};

export default CharacterDetails;

