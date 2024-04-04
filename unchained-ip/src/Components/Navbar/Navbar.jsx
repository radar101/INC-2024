import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import "../../Styles/Navbar.css"

const Navbar = () => {
    const loggedIn = false;

    return (
        <div id='nav_sec'>
            <div id='nav_d1'>
                <p>UnchainedIP</p>
            </div>
            <div id='nav_d2'>
                <ul>
                    <li>
                        <NavLink to='/' className={({ isActive }) => ` ${isActive ? "navActiveLink" : "navLink"}`}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/create' className={({ isActive }) => `navLink ${isActive ? "navActiveLink" : "navLink"}`}>Create</NavLink>
                    </li>
                    <li>
                        <NavLink to='/verify' className={({ isActive }) => `navLink ${isActive ? "navActiveLink" : "navLink"}`}>Verify</NavLink>
                    </li>
                    <li>
                        <NavLink to='/about' className={({ isActive }) => `navLink ${isActive ? "navActiveLink" : "navLink"}`}>About Us</NavLink>
                    </li>
                </ul>
            </div>
            {
                loggedIn &&
                <div id='nav_d3'>

                </div>
            }
            {
                !loggedIn &&
                <div id='nav_d4'>

                    <Link 
                    to='/login'
                    className='l1'>
                        Log In
                    </Link>

                    <Link 
                    to='/register'
                    className='l2'>
                        <div>
                            Sign Up
                        </div>
                    </Link>
                </div>
            }


        </div>
    )
}

export default Navbar