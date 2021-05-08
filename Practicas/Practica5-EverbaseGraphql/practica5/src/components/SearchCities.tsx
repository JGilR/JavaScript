import React, { FC, useEffect, useState } from "react";
import { gql,useQuery } from "@apollo/client"
import styled from '@emotion/styled'
import SearchCountries from "./SearchCountries";

interface ICities {
    cities: Array<{
        name: string,
        country?: {
            name: string,
        }
        population: string,
        timeZone: {
            name: string,
        }
    }>
}

interface IProps {
    search: string,
}

const SearchCities:FC<IProps> = (props) => {

    const CITIES = gql`
    query MyQuery {
        cities (where: {name: {eq: "${props.search}"}}){
            name
            country {
                name
            }
            population
            timeZone {
                name
            }
        }
    }
    `;

    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [showDetailsCountry, setShowDetailsCountry] = useState<boolean>(false);
    const {data, loading, error} = useQuery<ICities>(CITIES);

    const clickDetails = () => setShowDetails(!showDetails);

    const clickCountry = () => setShowDetailsCountry(!showDetailsCountry);

    if(loading) return <div>Charging...</div>
    if(error){
        console.error(error);
        return <div>There has been an error.</div>
    }

    return (
        <Container>
            {data?.cities.map((city) => {
                return (
                    <City onClick={clickDetails}>
                        {city.name}<br/>
                        {showDetails ? 
                        <CityDetails>
                            <div>
                                <Remark>Country: </Remark>
                                <MiniDetails type="submit" value={city.country?.name} /><br/>
                            </div>
                            
                            <Remark>Population: </Remark>{city.population}<br/>
                            <Remark>Time Zone: </Remark>{city.timeZone?.name}
                        </CityDetails>:null}
                    </City>
            )})}
        </Container>
    );
}

export default SearchCities;

const Container = styled.div`
    
`;

const Country = styled.div`
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    cursor: pointer;
`;

const City = styled.div`
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
`;

const CityDetails = styled.div`
    margin: 10px;
    border: 1px solid #d3c5c5;
    border-radius: 10px;
    padding: 18px;
    line-height: 30px;
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
