import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Utils
import { devices } from '../utils/devices';

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
    height: 80vh;
    display: flex;
    flex-direction: column;

    border-radius: 20px;
   
    box-shadow: 0px 20px 10px 5px #656565;
    background-color: #abb2bf;

    @media${devices.tablet} {
        height: 60vh;
        flex-direction: row;
    };

    @media${devices.desktop} {
        height: 60vh;
    }
`;

const CardLabel = styled.label`
    font-size: 18px;
    font-family: "Roboto", sans-serif;
    margin: 0px 20px;

    @media${devices.tablet} {
        font-size: 25px;
        margin: 0px ${props => props.margin ? props.margin : '0px'} 0px 0px;
    };
`;

const CardLeft = styled.div`
    width: 100%;
    height: 40%;    
    background-image: url(${props => props.image && props.image});
    background-color: #cccccc; 
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    border-radius: 20px 20px 0px 0px;

    @media${devices.tablet} {
        width: 33%;
        height: 100%;
        border-radius: 20px;
    };
`;

const CardRight = styled.div`
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    @media${devices.tablet} {
        width: 77%;
        height: 100%;
    }
`;

const Box = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    @media${devices.tablet} {
        width: 33%;
        flex-direction: column;
    }
`;

const TitleContainer = styled.div`
    text-align: center;
    
    h1 {
        margin: 10px 0px;
    }
`;

const InformationContainer = styled.div`
    display: flex;
    flex-direction: column;

    padding: 5px 15px;

    @media${devices.tablet} {
        flex-direction: row;
        padding: 0px;
    };
`;

const BoxIcon = styled.i`
    font-size: 20px;
    color: ${({ color }) => color ? color : "fff"};
    margin-bottom: 15px;

    @media${devices.tablet} {
        font-size: 30px;
    }
`;

const CharacterDetails = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [character, setCharacter] = useState(null);
    const [hasErrors, setHasErrors] = useState(false);

    const {id} = useParams();

    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://rickandmortyapi.com/api/character/${id}`)
        .then((response) => {
            setCharacter(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
            setHasErrors(true);
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
            {hasErrors ? <ErrorNote message="The character doesn't exist" withBack/> : renderDetails()}
        </DetailsContainer>
    )
};

export default CharacterDetails;

