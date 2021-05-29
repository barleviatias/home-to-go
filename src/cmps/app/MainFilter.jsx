import { Component } from "react";
import { Link } from 'react-router-dom'
import { DynamicModal } from '../app/DynamicModal'
import { stayService } from '../../services/stay-service'



export class MainFilter extends Component {

    state = {
        trip: {
            guests: { adults: 1, kids: 0 },
            loc: { address: '' },
            time: { checkIn: '', checkOut: '' }
        },
        modalType: '',
        topRatedStays: []
    }

    componentDidMount() {
        this.loadRated();
    }

    handleChange = (ev) => {
        if (ev.timeStamp) ev.preventDefault()
        const { name, value, type } = ev.target
        if (type === 'date') {
            this.setState({ trip: { ...this.state.trip, time: { ...this.state.trip.time, [name]: value } } });
        } else if (type === 'number') {
            if (value < 0) return
            this.setState({ trip: { ...this.state.trip, guests: { ...this.state.trip.guests, [name]: +value } } });
        } else this.setState({ trip: { ...this.state.trip, loc: { ...this.state.trip.loc, [name]: value } } });
    }

    onSearch = (ev) => {
        ev.preventDefault();
        this.props.onSearch(this.state.trip)
        this.setState({ modalType: '' })
    }

    toggleDynamicModal = (modalKey) => {
        if (this.state.modalType === modalKey) this.setState({ modalType: '' })
        else this.setState({ modalType: modalKey })
    }

    loadRated = async () => {
        const topRated = await stayService.getTopRatedStays();
        this.setState({ topRatedStays: topRated })
    }

    render() {
        const { modalType, topRatedStays } = this.state
        const { address } = this.state.trip.loc;
        const { checkIn, checkOut } = this.state.trip.time;
        const { kids, adults } = this.state.trip.guests;

        return (
            <section className="main-filter">
                <form>
                    <label onClick={() => { this.toggleDynamicModal('loc') }} htmlFor="location">
                        <span>Location</span>
                        <input name="address" value={address} autoComplete="off" id="location" type="search" placeholder="Where are you going?" onChange={this.handleChange} />
                    </label>

                    {modalType === 'loc' && <DynamicModal>
                        <section className="filter-loc-modal">
                            {topRatedStays.map(stay => {
                                return (
                                    <div onClick={() => {
                                        this.toggleDynamicModal('loc')
                                        this.handleChange({ target: { name: "address", type: "search", value: stay.loc.address } })
                                    }} key={stay._id} className="modal-label">
                                        <img src={stay.imgUrls[0]} alt="stay" />
                                        <span>{stay.name}</span>
                                    </div>
                                )
                            })}
                        </section>
                    </DynamicModal>}

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
                        <section className="filter-guest-modal">
                            <div className="modal-label">
                                <div>
                                    <span>Adults</span>
                                    <span>Ages 13 or above</span>
                                </div>
                                <div>
                                    <button type={"button"} onClick={() => { this.handleChange({ target: { name: "adults", type: "number", value: (adults - 1) } }) }}>-</button>
                                    <span>{adults}</span>
                                    <button type={"button"} onClick={() => { this.handleChange({ target: { name: "adults", type: "number", value: (adults + 1) } }) }}>+</button>
                                </div>
                            </div>
                            <div className="modal-label">
                                <div>
                                    <span>Kids</span>
                                    <span>Ages 2–12</span>
                                </div>
                                <div>
                                    <button type={"button"} onClick={() => { this.handleChange({ target: { name: "kids", type: "number", value: (kids - 1) } }) }}>-</button>
                                    <span>{kids}</span>
                                    <button type={"button"} onClick={() => { this.handleChange({ target: { name: "kids", type: "number", value: (kids + 1) } }) }}>+</button>
                                </div>
                            </div>
                        </section>
                    </DynamicModal>}
                    <button onClick={this.onSearch}> <Link to="/explore"><i className="fas fa-search"></i>
                    </Link></button>
                </form>

            </section>
        )
    }
}