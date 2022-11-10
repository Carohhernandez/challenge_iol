import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

// SVG
import { ReactComponent as MortyLogo } from '../svg/morty.svg';

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ErrorTitle = styled.div`
    display: flex;
`;

const ErrorLink = styled(Link)`
    display: block;

    border: 1px solid #fff;
    border-radius: 5px;
    padding: 10px;

    text-decoration: none;
    color: #fff;
`;

const ErrorNote = ({withBack = false, message}) => (
    <ErrorContainer> 
        <ErrorTitle>
            <h1>{message}</h1>
            <MortyLogo />
        </ErrorTitle>
        {withBack && <ErrorLink to="/"> Go back to list </ErrorLink>}
    </ErrorContainer>
);

export default ErrorNote;