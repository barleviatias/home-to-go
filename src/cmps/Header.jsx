import React from 'react'
import { NavLink } from 'react-router-dom'
import { MainFilter } from './app/MainFilter'
import Avatar from "../assets/img/avatar.png"
import { NavMenu } from './app/NavMenu'


export class Header extends React.Component {

    state = {
        isFullHeader: false
    }

    toggleUserMenu = () => {
        this.props.openDynamicModal('user-menu')
    }

    closeFullHeader = (ev) => {
        if (ev.target.closest(".main-filter-container")) return
        if (ev.target.closest(".dynamic-modal-child")) return
        this.setState({ isFullHeader: false }, () => { window.removeEventListener('click', this.closeFullHeader, true) })
    }

    openFullHeader = () => {
        this.setState({ isFullHeader: true }, () => { window.addEventListener('click', this.closeFullHeader, true) })
    }

    render() {
        const { onSearch, loggedInUser, logout, trip, openDynamicModal, modalType, setModalContent } = this.props
        const { isFullHeader } = this.state
        const imgUrl = (loggedInUser) ? loggedInUser.imgUrl : Avatar

        return (
            <header className={`main-header ${isFullHeader && 'full-header'}`}>
                <section>
                    <NavLink to="/"><h1 className="logo">Home<i className="fab fa-airbnb"></i>Go</h1></NavLink>
                    <nav>
                        {/* <NavLink to="/host">Become a host</NavLink> */}
                        <NavLink to="/explore" >Explore</NavLink>
                        <button onClick={this.toggleUserMenu} className="user-menu-btn">
                            <span>☰</span>
                            <img src={imgUrl} alt="avatar" />
                        </button>
                    </nav>
                    {modalType === 'user-menu' && <NavMenu logout={logout} loggedInUser={loggedInUser} toggleUserMenu={this.toggleUserMenu} />}
                </section>
                <MainFilter trip={trip} modalType={modalType} onSearch={onSearch} openDynamicModal={openDynamicModal} isFullHeader={isFullHeader} openFullHeader={this.openFullHeader} toggleFullHeader={this.toggleFullHeader} setModalContent={setModalContent} />
            </header>
        )
    }
}
