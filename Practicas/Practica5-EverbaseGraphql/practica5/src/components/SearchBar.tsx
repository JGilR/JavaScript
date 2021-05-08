import React, { FC, useEffect, useState } from "react";
import { gql,useQuery } from "@apollo/client"
import styled from '@emotion/styled'
import SearchCountries from "./SearchCountries";
import SearchCities from "./SearchCities";

const SearchBar:FC = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [auxValue, setAuxValue] = useState<string[]>(["",""])
    const [search, setSearch] = useState<boolean>(false);
    const [type, setType] = useState<boolean>(true);

    const typeOfSearch = () => {
        return(
            <div>
                {!type && <SearchCountries search={searchValue}/>}
                {type && <SearchCities search={searchValue}/>}
            </div>
        )
    }

    return (
        <div>
            <div>
                <Search type="text" placeholder="Country" value={auxValue[0]} onChange={(e) => [setSearchValue(e.target.value), setAuxValue([e.target.value, ""]), setType(false), setSearch(false)]}/>
                <Search type="text" placeholder="City" value={auxValue[1]} onChange={(e) => [setSearchValue(e.target.value), setAuxValue(["", e.target.value]), setType(true), setSearch(false)]}/>
                <SearchBtn onClick={(e) => setSearch(true)}>Search</SearchBtn>
            </div>
            {search && typeOfSearch()}
        </div>
    );
}

export default SearchBar;

const Search = styled.input`
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
`;

const SearchBtn = styled.button`
    border: 1px solid #077077;
    color: white;
    padding: 10px;
    background-color: #1aaab4;
    cursor: pointer;
    border-radius: 15px;
`;