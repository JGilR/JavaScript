import React from 'react'
import './Home.css';
import '../App.css'

function Home() {
    return (
        <div className='home-container'>
            <video src="/spacegif.mp4" autoPlay loop muted/>
            <img src='http://pngimg.com/uploads/star_wars_logo/star_wars_logo_PNG34.png' />
            <h1>Hace mucho tiempo en una galaxia muy, muy lejana...</h1>
        </div>
    )
}

export default Home;