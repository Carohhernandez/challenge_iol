import React from 'react';
import styled from 'styled-components';

// Hooks
import { usePagination, DOTS } from '../hooks/usePagination';

const PaginationContainer = styled.ul`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    list-style: none;
`;

const PaginationButton = styled.button`
    width: 30px;
    height: 30px;

    margin: 10px;

    border: 1px solid #fff;
    border-radius: 3px;
    background-color: ${props => props.active ? "#abb2bf" : "inherit"};
    color: ${props => props.active ? "#000" : "#fff"};
`;

const Pagination = ({ totalCount, currentPage, pageLimit, onPageChange, siblingCount}) => {

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
                    disabled={currentPage === 1} 
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <span aria-hidden="true">&laquo;</span>
                </PaginationButton>
            </li>
            {paginationRange.map(pageNumber => {
                if (pageNumber === DOTS) {
                    return <li key={pageNumber}>&#8230;</li>;
                };

                return (
                    <li key={pageNumber}>
                        <PaginationButton 
                            onClick={() => onPageChange(pageNumber)}
                            active={currentPage === pageNumber}
                        >
                            {pageNumber}
                        </PaginationButton>
                    </li>
                );
            })}
            <li>
                <PaginationButton 
                    disabled={currentPage === lastPage} 
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    <span aria-hidden="true">&raquo;</span>
                </PaginationButton>
            </li>
        </PaginationContainer>
    );
};

export default Pagination;