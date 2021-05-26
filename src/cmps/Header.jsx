import React from 'react'
import { NavLink } from 'react-router-dom'


export class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="header-container">
                    <h1>TOY SHOP</h1>
                    <div className="link-container">
                        <NavLink to="/">Home</NavLink>
                    </div>
                </div>
            </header>
        )
    }
}
