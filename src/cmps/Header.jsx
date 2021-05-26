import React from 'react'
import { NavLink } from 'react-router-dom'
import { MainFilter } from './app/MainFilter'


export class Header extends React.Component {
    render() {
        return (
            <header className="main-header">
                <NavLink to="/"><h1>Home To Go</h1></NavLink>

                <MainFilter />
                
                <nav>
                    <NavLink to="/explore">Explore</NavLink>
                    <NavLink to="/user">User</NavLink>
                </nav>
            </header>
        )
    }
}
