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
        // modalType: '',
        topRatedStays: [],
        dynamicModal: {
            modalContent: '',
            modalPosition: { top: 0, right: 0, bottom: 0, left: 0, height: 0, width: 0 }
        }
    }

    componentDidMount() {
        this.loadRated()
        this.loadTrip()
        // this.setState({ modalType: this.props.modalType })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.trip !== this.props.trip) {
            this.loadTrip()
        }

        if (prevProps.modalType !== this.props.modalType) {
            this.onSetModal(this.props.modalType)
        }
    }

    onSetModal = (modalKey) => {
        const dynamicModal = {}
        switch (modalKey) {
            case 'loc':
                dynamicModal.modalContent = (<section className="filter-loc-modal">
                    {this.state.topRatedStays.map(stay => {
                        return (
                            <div onClick={() => {
                                this.handleChange({ target: { name: "address", type: "search", value: stay.loc.address } })
                            }} key={stay._id} className="modal-label">
                                <img src={stay.imgUrls[0]} alt="stay" />
                                <span>{stay.name}</span>
                            </div>
                        )
                    })}
                </section>)
                dynamicModal.modalPosition = { top: '10px', left: '10px', height: '400px', width: '200px' }
                break;
            case 'guests':
                const { kids, adults } = this.state.trip.guests;
                dynamicModal.modalContent = (<section className="filter-guest-modal">
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
                </section>)
                dynamicModal.modalPosition = { top: '10px', left: '10px', height: '400px', width: '200px' }
                break;
            case '':
                dynamicModal.modalContent = ''
                dynamicModal.modalPosition = { top: 0, left: 0, height: 0, width: 0 }
                break;

            default:
                break;
        }
        this.props.setModalContent(dynamicModal, modalKey)
    }


    loadTrip = () => {
        var trip = this.props.trip
        if (!trip) trip = {
            guests: { adults: 1, kids: 0 },
            loc: { address: '' },
            time: { checkIn: '', checkOut: '' }
        }
        this.setState({ trip })
    }

    handleChange = (ev) => {
        if (ev.timeStamp) ev.preventDefault()
        const { name, value, type } = ev.target
        if (type === 'date') {
            this.setState({ trip: { ...this.state.trip, time: { ...this.state.trip.time, [name]: value } } });
        } else if (type === 'number') {
            if (value < 0) return
            this.setState({ trip: { ...this.state.trip, guests: { ...this.state.trip.guests, [name]: +value } } }, () => { this.onSetModal('guests') });
        } else this.setState({ trip: { ...this.state.trip, loc: { ...this.state.trip.loc, [name]: value } } });
    }

    onSearch = (ev) => {
        ev.preventDefault();
        this.props.onSearch(this.state.trip)
        this.onSetModal('')
    }

    loadRated = async () => {
        const topRated = await stayService.getTopRatedStays();
        this.setState({ topRatedStays: topRated })
    }

    handleGuestChang = () => {

    }



    render() {
        const { isFullHeader, openFullHeader } = this.props
        const { address } = this.state.trip.loc;
        const { checkIn, checkOut } = this.state.trip.time;
        const { kids, adults } = this.state.trip.guests;


        return (
            <section className="main-filter">
                {isFullHeader && <form className="max-filter">
                    <label>
                        <span>Location</span>
                        <input onClick={() => { this.onSetModal('loc') }} name="address" value={address} autoComplete="off" id="location" type="search" placeholder="Where are you going?" onChange={this.handleChange} />
                    </label>

                    <label htmlFor="check-in">
                        <span>Check in</span>
                        <input type="date" value={checkIn} name="checkIn" id="check-in" placeholder="Add dates" onChange={this.handleChange} />
                    </label>
                    <label htmlFor="check-out">
                        <span>Check out</span>
                        <input type="date" value={checkOut} name="checkOut" id="check-out" placeholder="Add dates" onChange={this.handleChange} />
                    </label>

                    <label className="guests" htmlFor="guests">
                        <div>
                            <span>Guests</span>
                            <input onClick={() => { this.onSetModal('guests') }} value={kids + adults} id="guests" name="guests" placeholder="Add guests" onChange={this.handleGuestChang} />
                        </div>
                    </label>

                    <button onClick={this.onSearch}> <Link to="/explore"><i className="fas fa-search"></i>
                    </Link></button>
                </form>}

                {!isFullHeader && <form className="min-filter" onClick={openFullHeader} >
                    <span>Start your search</span>
                    <button onClick={this.onSearch}>
                        <Link to="/explore"><i className="fas fa-search"></i> </Link>
                    </button>
                </form>}
            </section>
        )
    }
}