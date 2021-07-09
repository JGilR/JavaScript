import React, { FC, useEffect, useState } from "react";
import { gql,useQuery } from "@apollo/client"
import styled from '@emotion/styled'

interface ICountries {
    countries: Array<{
        name: string,
        alpha2Code: string,
        continent?: {
            name: string,
        }
        capital?: {
            name: string,
        }
        languages: Array<{
            name: string,
        }>
        currencies: Array<{
            name: string,
        }>
        population: number
    }>
}

interface IProps {
    search: string,
}

const SearchCountries:FC<IProps> = (props) => {

    const COUNTRIES = gql`
    query MyQuery {
        countries (where: {name: {eq: "${props.search}"}}){
            name
            alpha2Code
            continent {
                name
            }
            capital {
                name
            }
            languages {
                name
            }
            currencies {
                name
            }
            population
        }
    }
    `;

    const [showDetails, setShowDetails] = useState<boolean>(false);
    const {data, loading, error} = useQuery<ICountries>(COUNTRIES);

    const onClick = () => setShowDetails(!showDetails);

    if(loading) return <div>Charging...</div>
    if(error){
        console.error(error);
        return <div>There has been an error.</div>
    }


    return (
        <Container>
            {data?.countries.map((country) => {
                return (
                    <Country onClick={onClick}>
                        {country.name}<br/>
                        {showDetails ? 
                        <CountryDetails>
                            <Remark>Continent: </Remark> {country.continent?.name}<br/>
                            <Remark>Capital: </Remark> <MiniDetails type="submit" value={country.capital?.name} /><br/>
                            <Remark>Population: </Remark> {country.population}<br/>
                            <img src={`https://www.countryflags.io/${country.alpha2Code}/shiny/64.png`}/><br/>
                            <Remark>Languages: </Remark> {country.languages.map((l) => {
                                return(
                                    <Mini>
                                        {l.name}
                                    </Mini>
                                )
                            })}
                            <Remark>Official Coin: </Remark> {country.currencies.map((c) => {
                                return(
                                    <Mini>
                                        {c.name}
                                    </Mini>
                                )
                            })}
                        </CountryDetails>:null}
                    </Country>
            )})}
        </Container>
    );
}

export default SearchCountries;

const Container = styled.div`
    
`;

const Country = styled.div`
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
`;

const CountryDetails = styled.div`
    margin: 10px;
    border: 1px solid #d3c5c5;
    border-radius: 10px;
    padding: 18px;
    line-height: 30px;
`;

const Mini = styled.div`
    margin-left: 10px;
    color: #1aaab4;
`;

const MiniDetails = styled.input`
    margin-left: 10px;
    background-color: #1aaab4;
    color: white;
    border: none;
    padding: 5px;
    cursor: pointer;
    text-decoration: none;
`;

const Remark = styled.span`
    font-weight: bold;
`;