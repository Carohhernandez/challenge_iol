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

const Pagination = ({ currentPage, totalCount, pageLimit, onPageChange, siblingCount, setCurrentPage, hasFilter}) => {

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
                    disabled={(currentPage === 1) || hasFilter} 
                    onClick={() => {
                            onPageChange(currentPage - 1);
                            setCurrentPage(currentPage - 1);
                        }
                    }
                >
                    <span aria-hidden="true">&laquo;</span>
                </PaginationButton>
            </li>
            {paginationRange.map((pageNumber, i) => {
                if (pageNumber === DOTS) {
                    return <li key={i}>&#8230;</li>;
                };

                return (
                    <li key={i}>
                        <PaginationButton
                            disabled={hasFilter} 
                            onClick={() => {
                                onPageChange(pageNumber);
                                setCurrentPage(pageNumber);
                                }
                            }
                            active={currentPage === pageNumber}
                        >
                            {pageNumber}
                        </PaginationButton>
                    </li>
                );
            })}
            <li>
                <PaginationButton 
                    disabled={(currentPage === lastPage) || hasFilter} 
                    onClick={() => {
                            onPageChange(currentPage + 1);
                            setCurrentPage(currentPage + 1);
                        }
                    }
                >
                    <span aria-hidden="true">&raquo;</span>
                </PaginationButton>
            </li>
        </PaginationContainer>
    );
};

export default Pagination;