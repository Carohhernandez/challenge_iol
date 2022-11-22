import React from 'react';
import styled from 'styled-components';

// Utils
import { devices } from '../utils/devices';

// Hooks
import { usePagination, DOTS } from '../hooks/usePagination';

const PaginationContainer = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 0px;
    list-style: none;

    @media${devices.tablet} {
        flex-direction: row;
    };
`;

const PaginationRangeContainer = styled.div`
    display: flex;
    align-items: center;
`;

const PaginationButton = styled.button`
    width: ${props => props.isAction ? '90px' : '30px'};
    height: 30px;

    margin: 10px;

    border: 1px solid #fff;
    border-radius: 3px;
    background-color: ${props => props.active ? "#abb2bf" : "inherit"};
    color: ${props => props.active ? "#000" : "#fff"};

    @media${devices.tablet} {
        width: 30px;
    };
`;

const Pagination = ({ currentPage, totalCount, pageLimit, onPageChange, siblingCount, hasFilter}) => {

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageLimit
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <PaginationContainer>
            <li>
                <PaginationButton 
                    isAction
                    disabled={(currentPage === 1) || hasFilter} 
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <span aria-hidden="true">&laquo;</span>
                </PaginationButton>
            </li>
            <PaginationRangeContainer>
                {paginationRange.map((pageNumber, i) => {
                    if (pageNumber === DOTS) {
                        return <li key={i}>&#8230;</li>;
                    };

                    return (
                        <li key={i}>
                            <PaginationButton
                                disabled={hasFilter} 
                                onClick={() => onPageChange(pageNumber)}
                                active={currentPage === pageNumber}
                            >
                                {pageNumber}
                            </PaginationButton>
                        </li>
                    );
                })}
            </PaginationRangeContainer>
            <li>
                <PaginationButton 
                    isAction
                    disabled={(currentPage === lastPage) || hasFilter} 
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    <span aria-hidden="true">&raquo;</span>
                </PaginationButton>
            </li>
        </PaginationContainer>
    );
};

export default Pagination;