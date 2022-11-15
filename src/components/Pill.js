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

const PillThumbContainer = styled.div`
    width: 20%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const PillThumb = styled.img`
    width: 100%;
    height: 70px;

    border-radius: 50%;
`;

const PillInformation = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;

    padding-left: 10px;
`;

const PillTitle = styled(Link)`
    text-decoration: none;
    color: #fff;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const PillDescription = styled.p`
    display: inline-block;

    margin: 5px 0px;
    font-size: 14px;
    font-style: italic;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    i {
        margin-right: 5px;
    }
`;

const Pill = ({item, url}) => {
    return (
        <PillContainer key={item?.id}>
            <PillThumbContainer>
                <PillThumb src={item?.image} alt={item?.name} />
            </PillThumbContainer>
            <PillInformation>
                <PillTitle to={url}>
                    {item?.name}
                </PillTitle>
                <PillDescription>
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                    {item?.location?.name}
                </PillDescription>
            </PillInformation>
        </PillContainer>
    );
};

export default Pill;