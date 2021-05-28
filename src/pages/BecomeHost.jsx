import { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/img/logo.png"


export function BecomeHost({ loggedInUser }) {

    return (
        <main >
            <section className="full bocome-host-container">
                <div className="hosting-img">
                    {/* <Link to="/"><img className="logo" src={Logo} alt="logo" /></Link> */}
                    <Link className="a" to="/"><i className="fab fa-airbnb fa-3x logo-icon"></i></Link>
                    <img className="guests-img" src="https://www.insidehook.com/wp-content/uploads/2021/03/good-airbnb-guest-2.jpg?fit=1200%2C800" />
                </div>
                <div className="hosting-info">
                    <h1>Hosting makes us</h1>
                    <h1 className="logo">Home<img src={Logo} alt="logo" />Go</h1>
                </div>
                <button className="host-btn"><Link to={(loggedInUser)? "/":"/login"}>Try hosting</Link></button>
            </section>
        </main>
    )
}
