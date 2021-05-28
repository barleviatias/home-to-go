import React from 'react'
import { NavLink } from 'react-router-dom'
import { MainFilter } from './app/MainFilter'
import Logo from "../assets/img/logo.png"
import Avatar from "../assets/img/avatar.png"
import { NavMenu } from './app/NavMenu'


export class Header extends React.Component {

    state = {
        isUserMenu: false
    }

    toggleUserMenu = () => {
        this.setState({ isUserMenu: !this.state.isUserMenu })
    }

    render() {
        const { onSearch, loggedInUser, logout } = this.props

        const { isUserMenu } = this.state

        const imgUrl = (loggedInUser) ? loggedInUser.imgUrl : Avatar



        return (
            <header className="main-header">
                <section>
                    <NavLink to="/"><h1 className="logo">Home<img src={Logo} alt="logo" />Go</h1></NavLink>
                    <MainFilter onSearch={onSearch} />

                    <nav>
                        {/* <NavLink to="/explore">Explore</NavLink> */}
                        {/* <NavLink to="/stay">StayDetails</NavLink> */}
                        <NavLink to="/login">login</NavLink>
                        <button onClick={this.toggleUserMenu} className="user-menu-btn">
                            <span>☰</span>
                            <img src={imgUrl} alt="avatar" />

                        </button>
                    </nav>

                    {isUserMenu && <NavMenu logout={logout} />}
                </section>
                
            </header>
        )
    }
}
