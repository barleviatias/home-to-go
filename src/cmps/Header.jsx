import React from 'react'
import { NavLink } from 'react-router-dom'
import {ExploreFilter} from '../cmps/app/ExploreFilter'


export class Header extends React.Component {
    render() {
        return (
            <header>
                <h1>Home To Go</h1>
                <ExploreFilter/>
                <nav>
                    <NavLink to="/explore">Home</NavLink>
                    <NavLink to="/explore">Home</NavLink>
                    <NavLink to="/">Home</NavLink>
                </nav>
            </header>
        )
    }
}
