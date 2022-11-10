import React, { useState } from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
    display: flex;
    align-items: center;
`;

const FilterInput = styled.input`
    margin: 0px 10px;
`;

const FilterIcon = styled.i`
    margin-right: 10px;
`;

const Filter = ({ characters, setDisplayedCharacter }) => {

    const [searchParam, setSearchParam] = useState('');

    const handleSearch = () => {
        if (searchParam === '') return setDisplayedCharacter(characters);

        const filterCharacters =  characters.filter(character => {
            const location = (character.location.name).toLowerCase();
            return (location).includes(searchParam.toLowerCase())
        });

        setDisplayedCharacter(filterCharacters);
    };

    return (
        <FilterContainer>
                <FilterIcon className="fa fa-filter"></FilterIcon>
                <label>Search by Location:</label>
                <FilterInput 
                    type="text"
                    name="searchInput"
                    value={searchParam}
                    onChange={(e) => setSearchParam(e.target.value)}
                />
                <button onClick={handleSearch}><i className="fa fa-search"></i></button>
        </FilterContainer>
    );
};

export default Filter;