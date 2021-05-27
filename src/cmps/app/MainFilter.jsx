import { Component } from "react";
import { Link } from 'react-router-dom'
import { DateRange } from './DateRange'


export class MainFilter extends Component {

    state = {
        trip: {
            guests: {
                adults: 0,
                kids: 0,
                baby: 0
            },
            loc: {
                address: '',
            },
            time: {
                checkIn: '',
                checkOut: ''
            }
        }
    }

    handleChange = (ev) => {
        ev.preventDefault()
        const inputName = ev.target.name
        let inputValue = ev.target.value;
        if (ev.target.type === 'date') {
            this.setState({ trip: { ...this.state.trip, time: { ...this.state.trip.time, [inputName]: inputValue } } });
        } else if (ev.target.id === 'guests') {
            inputValue = +inputValue;
            this.setState({ trip: { ...this.state.trip, guests: { ...this.state.trip.guests, [inputName]: +inputValue } } });
        }
        else this.setState({ trip: { ...this.state.trip, loc: { ...this.state.trip.loc, [inputName]: inputValue } } });
    }

    onSearch = (ev) => {
        ev.preventDefault();
        console.log('trip from onSearch', this.state.trip);
        this.props.onSearch(this.state.trip)
    }

    render() {

        const { address } = this.state.trip.loc;
        const { checkIn, checkOut } = this.state.trip.time;
        const { adult } = this.state.trip.guests;
        return (
            <section className="main-filter">
                <form>
                    <label htmlFor="location">
                        <span>Location</span>
                        <input name="address" value={address} id="location" type="search" placeholder="Where are you going?" onChange={this.handleChange} />
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
                        <input type="number" id="guests" name="adults" min="0" placeholder="Ages 13 or above" onChange={this.handleChange} />
                        <span>kids</span>
                        <input type="number" id="guests" name="kids" min="0" placeholder="Ages 2–12" onChange={this.handleChange} />
                    </label>
                    <button onClick={this.onSearch}> <Link to="/explore">🔍</Link></button>
                </form>
            </section>
        )
    }
}