import React from 'react'
import { NavLink } from 'react-router-dom'
import { MainFilter } from './app/MainFilter'
import Logo from "../assets/img/logo.png"
import Avatar from "../assets/img/avatar.png"


export class Header extends React.Component {
    render() {
        return (
            <header className="main-header">

                <NavLink to="/"><h1 className="logo">Home <img src={Logo} alt="logo" /> Go</h1></NavLink>

                <MainFilter />

                <nav>
                    <NavLink to="/explore">Explore</NavLink>
                    <NavLink to="/stay">StayDetails</NavLink>
                    <button className="user-menu-btn">
                        <span>☰</span>
                        <img src={Avatar} />
                    </button>
                </nav>
            </header>
        )
    }
}
