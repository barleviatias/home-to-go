import React from 'react'
import { NavLink } from 'react-router-dom'
import { MainFilter } from './app/MainFilter'
import Logo from "../assets/img/logo.png"
import Avatar from "../assets/img/avatar.png"


export class Header extends React.Component {
    state = {
        user:"",
      }
      componentDidMount() {
        this.loadUser()
        console.log(this.state);
      }
    
      loadUser = async () => {
        let user = sessionStorage.getItem('loggedinUser')
        console.log(user);
        user = JSON.parse(user)

        this.setState({ user })
        // console.log(user.imgUrl);
      }
    render() {
        const {trip, addTrip,onSearch} = this.props
        let imgUrl=""
        if(this.state.user){
             imgUrl=this.state.user.imgUrl
        }

        return (
            <header className="main-header">

                <NavLink to="/"><h1 className="logo">Home<img src={Logo} alt="logo"/>Go</h1></NavLink>

                <MainFilter onSearch={onSearch} />

                <nav>
                    {/* <NavLink to="/explore">Explore</NavLink> */}
                    {/* <NavLink to="/stay">StayDetails</NavLink> */}
                    <NavLink to="/login">login</NavLink>
                    <button className="user-menu-btn">
                        <span>☰</span>
                        {imgUrl&&<img src={imgUrl} alt=""/>}
                        {!imgUrl&&<img src={Avatar} alt=""/>}
                    </button>
                </nav>
            </header>
        )
    }
}
