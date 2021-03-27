import React, { useState, useEffect } from 'react'
import '../App.css'

function Films() {
    let link = 'https://swapi.dev/api/films/?format=json';
    const [films, setFilms] = useState<any[]>([]);

    useEffect(() => {
        async function fetchFilms(){
            let res = await fetch(link);
            let data = await res.json();
            setFilms(data.results);
        }
        fetchFilms();
    }, []);

    return (
        <div>
            <h2 className='film'>FILMS</h2>
            <div className='cards-container-films'>
                {films.map((p:{title:string,episode_id:string,director:string,release_date:string}) => {
                    return <div className='cards-item-films'>
                            <p><span>Title:     </span>{p.title}</p>
                            <p><span>Episode:   </span>{p.episode_id}</p>
                            <p><span>Director:  </span>{p.director}</p>
                            <p><span>Date:      </span>{p.release_date}</p>
                        </div>
                })}
            </div>
        </div>
    )
}

export default Films;
