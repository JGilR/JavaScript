import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
    const [click, setClick] = useState<boolean>(false);
    const closeMobileMenu = () => setClick(false);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to='/' className='navbar-logo'>EJEMPLO</Link>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/item1' className='nav-links' onClick={closeMobileMenu}>Item1</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/item2' className='nav-links' onClick={closeMobileMenu}>Item2</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/item3' className='nav-links' onClick={closeMobileMenu}>Item3</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar
