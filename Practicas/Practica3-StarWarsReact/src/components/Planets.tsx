import React, { useState, useEffect } from 'react'
import '../App.css'

function Planets() {
    let link = 'https://swapi.dev/api/planets/?format=json';
    const [planets, setPlanets] = useState<any[]>([]);

    useEffect(() => {
        async function fetchPlanets(){
            let res = await fetch(link);
            let data = await res.json();
            link = data.next;
            if(data.next != null){
                setPlanets((e) => [...e, data.results]);
                fetchPlanets();
            }
        }
        fetchPlanets();
    }, []);

    return (
        <div>
            <h2>PLANETS</h2>
            <input type='text' name='search' placeholder='Search...' />
            <div className='cards-container'>
                {planets.map((elem) => elem.map((p:{name:string,diameter:string,climate:string,terrain:string}) => {
                    return <div className='cards-item'>
                            <p><span>Name:      </span>{p.name}</p>
                            <p><span>Diameter:  </span>{p.diameter}</p>
                            <p><span>Climate:   </span>{p.climate}</p>
                            <p><span>Terrain:   </span>{p.terrain}</p>
                        </div>
                }))}
            </div>
        </div>
    )
}

export default Planets;