import React from 'react';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;

    padding-top: 25px;

    i {
        color: #fff;
        font-size: 70px;
    }
`;

const Spinner = ({ color }) => {
    return (
        <SpinnerContainer>
            <i className="fa fa-refresh fa-spin fa-fw" aria-hidden="true" />
        </SpinnerContainer>
    );   
};

export default Spinner;