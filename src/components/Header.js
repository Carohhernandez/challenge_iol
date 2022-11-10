import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

// SVG
import {ReactComponent as RickLogo} from '../svg/rick.svg';

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;

    background-color: #fff;
    padding: 30px 20px; 
`;

const HeaderLogo = styled(RickLogo)`
    width: 80px;
    height: 80px;
`;

const HeaderTitle = styled.h1`
    color: #000;
    padding-left: 20px;
`;

const Header = () => (
    <HeaderContainer>
        <Link to="/"><HeaderLogo /></Link>
        <HeaderTitle>The Rick and Morty Web App</HeaderTitle>
    </HeaderContainer>
);

export default Header;