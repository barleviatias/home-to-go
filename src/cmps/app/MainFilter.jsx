import { Component } from "react";
import { Link } from 'react-router-dom'
import { DynamicModal } from '../app/DynamicModal'



export class MainFilter extends Component {

    state = {
        trip: {
            guests: { adults: 0, kids: 0 },
            loc: { address: '' },
            time: { checkIn: '', checkOut: '' }
        },
        modalType: ''
    }

    handleChange = (ev) => {

        ev.preventDefault()

        const { name, value, type } = ev.target

        if (type === 'date') {
            this.setState({ trip: { ...this.state.trip, time: { ...this.state.trip.time, [name]: value } } });
        }

        else if (type === 'number') {
            this.setState({ trip: { ...this.state.trip, guests: { ...this.state.trip.guests, [name]: +value } } });
        }

        else this.setState({ trip: { ...this.state.trip, loc: { ...this.state.trip.loc, [name]: value } } });
    }

    onSearch = (ev) => {
        ev.preventDefault();
        this.props.onSearch(this.state.trip)
    }

    toggleDynamicModal = (modalKey) => {
        if (this.state.modalType === modalKey) this.setState({ modalType: '' })
        else this.setState({ modalType: modalKey })
    }

    render() {
        const { modalType } = this.state
        console.log(modalType);
        // const { guests } = this.state.trip
        const { address } = this.state.trip.loc;
        const { checkIn, checkOut } = this.state.trip.time;
        const { kids, adults } = this.state.trip.guests;

        return (
            <section className="main-filter">
                <form>
                    <label htmlFor="location">
                        <span>Location</span>
                        <input name="address" value={address} id="location" type="search" placeholder="Where are you going?" onChange={this.handleChange} />
                    </label>

                    <label htmlFor="check-in">
                        <span>Check in</span>
                        <input type="date" value={checkIn} name="checkIn" id="check-in" placeholder="Add dates" onChange={this.handleChange} />
                    </label>
                    <label htmlFor="check-out">
                        <span>Check out</span>
                        <input type="date" value={checkOut} name="checkOut" id="check-out" placeholder="Add dates" onChange={this.handleChange} />
                    </label>

                    <label onClick={() => { this.toggleDynamicModal('guests') }} className="guests" htmlFor="guests">
                        <div>
                            <span>Guests</span>
                            <input value={kids + adults} id="guests" name="guests" placeholder="Add guests" />
                        </div>
                    </label>

                    {modalType === 'guests' && <DynamicModal>
                        <div>
                            <span>Adults</span>
                            <input type="number" name="adults" value={adults} min="0" placeholder="Ages 13 or above" onChange={this.handleChange} />
                        </div>
                        <div>
                            <span>kids</span>
                            <input type="number" name="kids" value={kids} min="0" placeholder="Ages 2–12" onChange={this.handleChange} />
                        </div>
                    </DynamicModal>}
                    
                    <button onClick={this.onSearch}> <Link to="/explore">🔍</Link></button>
                </form>

            </section>
        )
    }
}