import React from 'react'
import { NavLink } from 'react-router-dom'
import { MainFilter } from './app/MainFilter'
import Logo from "../assets/img/logo.png"


export class Header extends React.Component {
    render() {
        return (
            <header className="main-header">
                
                <div className="logo" >
                    <img src={Logo} alt="logo" />
                    <NavLink to="/"><h1>Home To Go</h1></NavLink>
                </div>

                <MainFilter />

                <nav>
                    <NavLink to="/explore">Explore</NavLink>
                    <NavLink to="/stay">StayDetails</NavLink>
                    <NavLink to="/user">User</NavLink>
                </nav>
            </header>
        )
    }
}
