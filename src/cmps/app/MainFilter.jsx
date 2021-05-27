import { Component } from "react";


export class MainFilter extends Component {

    state = {

    }

    render() {

        return (
            <section className="main-filter">
                <form>
                    <label htmlFor="location">
                        <span>Location</span>
                        <input name="location" id="location" type="search" placeholder="Where are you going?" />
                    </label>
                    <label htmlFor="check-in">
                    <span>Check in</span>
                        <input name="check-in" id="check-in" type="text" placeholder="Add dates" />
                    </label>
                    <label htmlFor="check-out">
                    <span>Check out</span>
                        <input name="check-out" id="check-out" type="text" placeholder="Add dates"/>
                    </label>
                    <label htmlFor="guests">
                        <span>Guests</span>
                        <input name="guests" id="guests" type="text" placeholder="Add guests" />
                    </label>
                    <button>🔍</button>
                </form>
            </section>
        )
    }
}