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
    height: 400px;
    display: flex;

    border-radius: 20px;
   
    box-shadow: 0px 20px 10px 5px #656565;
    background-color: #abb2bf;
`;

const CardLabel = styled.label`
    font-size: 25px;
    font-family: "Roboto", sans-serif;
    margin-right: ${props => props.margin ? props.margin : '0px'};
`;

const CardLeft = styled.div`
    width: 33%;
    background-image: url(${props => props.image && props.image});
    background-color: #cccccc; 
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    border-radius: 20px;
`;

const CardRight = styled.div`
    width: 77%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    padding: 35px;
`;

const Box = styled.div`
    width: 33%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TitleContainer = styled.div`
    text-align: center;
    
    h1 {
        margin: 10px 0px;
    }
`;

const InformationContainer = styled.div`
    display: flex;
`;

const BoxIcon = styled.i`
    font-size: 30px;
    color: ${({ color }) => color ? color : "fff"};
    margin-bottom: 15px;
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

    const handleStatusColor = status => {
        switch (status) {
          case "Dead":
            return "red";
          case "Alive":
            return "green";
          default:
            return "grey";
        }
    };

    const renderDetails = () => {
        return (
            <CardContainer>
                <CardLeft image={character.image} />
                <CardRight>
                    <TitleContainer>
                        <h1>{character.name}</h1>
                    </TitleContainer>
                    <InformationContainer>
                        <Box>
                            <BoxIcon className="fa fa-heart" aria-hidden="true" color={handleStatusColor(character.status)}></BoxIcon>
                            <CardLabel>Status</CardLabel>
                            <p>{character.status}</p>
                        </Box>
                        <Box>
                            <BoxIcon className="fa fa-map-marker" aria-hidden="true" color="red"></BoxIcon>
                            <CardLabel margin="10px">Location</CardLabel>
                            <p>{character.location.name}</p>
                        </Box>
                        <Box>
                            <BoxIcon className="fa fa-globe" aria-hidden="true" color="blue"></BoxIcon>
                            <CardLabel>Origin</CardLabel>
                            <p>{character.origin.name}</p>
                        </Box>
                        <Box>
                            <BoxIcon className="fa fa-user" aria-hidden="true" color="grey"></BoxIcon>
                            <CardLabel>Species</CardLabel>
                            <p>{character.species}</p>
                        </Box>
                    </InformationContainer>
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

