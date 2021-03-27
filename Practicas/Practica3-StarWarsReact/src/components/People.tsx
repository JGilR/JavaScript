import React, { useState, useEffect } from 'react'
import '../App.css'

function People() {
    let link = 'https://swapi.dev/api/people/?format=json';
    const [people, setPeople] = useState<any[]>([]);

    useEffect(() => {
        async function fetchPeople(){
            let res = await fetch(link);
            let data = await res.json();
            link = data.next;
            if(data.next != null){
                setPeople((e) => [...e, data.results]);
                fetchPeople();
            }
        }
        fetchPeople();
    }, []);

    return (
        <div className='cards-search'>
            <h2>PEOPLE</h2>
            <input type='text' name='search' placeholder='Search...' />
            <div className='cards-container'>
                {people.map((elem) => elem.map((p:{name:string,height:string,gender:string,eye_color:string}) => {
                    return <div className='cards-item'>
                            <p><span>Name:      </span>{p.name}</p>
                            <p><span>Height:    </span>{p.height}</p>
                            <p><span>Gender:    </span>{p.gender}</p>
                            <p><span>Eye Color: </span>{p.eye_color}</p>
                        </div>
                }))}
            </div>
        </div>
    )
}

export default People;
