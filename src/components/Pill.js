import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PillContainer = styled.div`
    display: flex;
    align-items: center;

    border-radius: 50px;
    background-color: #abb2bf;

    padding: 10px;
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

const Pill = ({item, url}) => {
    return (
        <PillContainer key={item.id}>
            <PillThumb src={item.image} alt={item.name} />
            <PillInformation>
                <PillTitle to={url}>
                    {item.name}
                </PillTitle>
                <PillDescription>
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                    {item.location.name}
                </PillDescription>
            </PillInformation>
        </PillContainer>
    );
};

export default Pill;