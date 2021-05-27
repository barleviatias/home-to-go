import { Component } from "react";
import { DateRange } from './DateRange'


export class MainFilter extends Component {

    state = {
        trip: {

            guests: {
                adults: 0,
                kids: 0,
                baby: 0
            },
            filterBy: {
                location: '',
                checkIn: '',
                checkOut: ''
            }
        }

    }

    handleChange = (ev) => {
        ev.preventDefault()
        const inputName = ev.target.name
        let inputValue;
        if (inputName === 'adults' || inputName === 'kids') {
            inputValue = +ev.target.value;
            this.setState({ guests: { ...this.state.guests, [inputName]: inputValue } })
        }
        else {
            inputValue = ev.target.value;
            this.setState({ filterBy: { ...this.state.filterBy, [inputName]: inputValue } })
        }
    }

    onSearch = (ev) => {
        ev.preventDefault();
        console.log('on search', this.state);
        this.props.addTrip(this.state)
    }

    render() {

        const { location, checkIn, checkOut } = this.state.filterBy;
        const { adult } = this.state.guests;
        return (
            <section className="main-filter">
                <form>
                    <label htmlFor="location">
                        <span>Location</span>
                        <input name="location" value={location} id="location" type="search" placeholder="Where are you going?" onChange={this.handleChange} />
                    </label>


                    {/* <DateRange /> */}

                    <label htmlFor="check-in">
                        <span>Check in</span>
                        <input type="date" value={checkIn} name="checkIn" id="check-in" placeholder="Add dates" onChange={this.handleChange} />
                    </label>
                    <label htmlFor="check-out">
                        <span>Check out</span>
                        <input type="date" value={checkOut} name="checkOut" id="check-out" placeholder="Add dates" onChange={this.handleChange} />
                    </label>


                    <label htmlFor="guests">
                        <span>Adults</span>
                        <input type="number" name="adults" min="0" placeholder="Ages 13 or above" onChange={this.handleChange} />
                        <span>kids</span>
                        <input type="number" name="kids" min="0" placeholder="Ages 2–12" onChange={this.handleChange} />
                    </label>
                    <button onClick={this.onSearch}>🔍</button>
                </form>
            </section>
        )
    }
}