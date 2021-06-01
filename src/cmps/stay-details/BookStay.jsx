import { Component } from "react";
import { addOrder } from '../../store/actions/orderActions'
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class _BookStay extends Component {

    state = {
        trip: {
            guests: { adults: 0, kids: 0 },
            loc: { address: '' },
            time: { checkIn: '', checkOut: '' }
        },
        isAvailable: false,
        dynamicModal: {
            modalContent: '',
            modalPosition: {}
        }
    }

    componentDidMount() {
        const trip = this.props.trip || {
            guests: { adults: 0, kids: 0 },
            loc: { address: '' },
            time: { checkIn: '', checkOut: '' }
        }
        this.setState({ trip, isAvailable: false })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.modalType !== this.props.modalType) {
            this.openModal(this.props.modalType)
        }
    }

    onSetModal = (event, modalKey) => {
        const clickPos = event.target.getBoundingClientRect()
        this.setState({
            dynamicModal: {
                ...this.state.dynamicModal,
                modalPosition: clickPos
            }
        }, () => { this.openModal(modalKey) })
    }

    openModal = (modalKey) => {
        const dynamicModal = {}
        const { top, left, height, x, y } = this.state.dynamicModal.modalPosition
        switch (modalKey) {
            case 'book-guests':
                const { kids, adults } = this.state.trip.guests;
                dynamicModal.modalContent = (<section className="book-guest-modal">
                    <div className="modal-label">
                        <div>
                            <span>Adults</span>
                            <span>Ages 13 or above</span>
                        </div>
                        <div>
                            <button className="modal-btn" type={"button"} onClick={() => { this.handleChange({ target: { name: "adults", type: "number", value: (adults - 1) } }) }}>-</button>
                            <span>{adults}</span>
                            <button className="modal-btn" type={"button"} onClick={() => { this.handleChange({ target: { name: "adults", type: "number", value: (adults + 1) } }) }}>+</button>
                        </div>
                    </div>
                    <div className="modal-label">
                        <div>
                            <span>Kids</span>
                            <span>Ages 2–12</span>
                        </div>
                        <div>
                            <button className="modal-btn" type={"button"} onClick={() => { this.handleChange({ target: { name: "kids", type: "number", value: (kids - 1) } }) }}>-</button>
                            <span>{kids}</span>
                            <button className="modal-btn" type={"button"} onClick={() => { this.handleChange({ target: { name: "kids", type: "number", value: (kids + 1) } }) }}>+</button>
                        </div>
                    </div>
                </section>)
                dynamicModal.modalPosition = { top: 940, left: left - 26 }
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

    handleChange = (ev) => {
        if (ev.timeStamp) ev.preventDefault()
        const { name, value, type } = ev.target
        if (type === 'date') {
            this.setState({ trip: { ...this.state.trip, time: { ...this.state.trip.time, [name]: value } } });
        } else if (type === 'number') {
            if (value < 0) return
            const sumGuest = this.state.trip.guests.adults + this.state.trip.guests.kids;
            const isLess = (this.state.trip.guests[name] < value) ? true : false
            if (sumGuest === this.props.stay.capacity && isLess) return
            this.setState({ trip: { ...this.state.trip, guests: { ...this.state.trip.guests, [name]: +value } } }, () => { this.openModal('book-guests') });
        } else this.setState({ trip: { ...this.state.trip, loc: { ...this.state.trip.loc, [name]: value } } });
    }

    toggleAvailability = () => {
        const { guests, time } = this.state.trip

        if (guests.adults + guests.kids < 1) {
            this.props.toggleMsgModal(<span><i className="fas fa-exclamation"></i><h2>Please enter guest number</h2></span>)
            return
        }

        if (!time.checkIn || !time.checkOut) {
            this.props.toggleMsgModal(<span><i className="fas fa-exclamation"></i><h2>Please enter trip dates</h2></span>)
            return
        }


        this.setState({ isAvailable: !this.state.isAvailable }, () => { this.props.onSearch(this.state.trip) })
    }

    onReserveTrip = async () => {
        const { trip } = this.state
        const { stay, loggedInUser } = this.props

        if (!loggedInUser) {
            this.props.toggleMsgModal(<span><h2>You must log in frist</h2><Link to='/login'>Login</Link></span>)
            return
        }

        trip.totalPrice = ((trip.guests.kids + trip.guests.adults) * stay.price) * this.getTripTime()
        this.props.addOrder(trip, stay, loggedInUser)

        this.setState({
            trip: {
                guests: { adults: 0, kids: 0 },
                loc: { address: '' },
                time: { checkIn: '', checkOut: '' }
            },
            isAvailable: false
        })
        this.props.toggleMsgModal(<span><i className="far fa-check-circle"></i><h3>Your order has sent to the host</h3></span>)
    }

    getTripTime = () => {
        const diff = new Date(this.state.trip.time.checkOut).getTime() - new Date(this.state.trip.time.checkIn).getTime();
        return diff / 1000 / 60 / 60 / 24
    }

    render() {
        const { stay, getTotalRate } = this.props
        const { trip, isAvailable } = this.state
        const { reviews, price } = stay

        return (
            <section className="order-form-container">
                <div className="order-form-sticky">
                    <div className="order-form">
                        <div className="order-form-header">
                            <p><span className="order-price">${(trip.guests.kids + trip.guests.adults) * price}</span><span> / night</span></p>
                            <span className="stay-rate-display"><i className="fas fa-star"></i>{getTotalRate()}<p>( {reviews.length} reviews )</p></span>
                        </div>

                        <form>
                            <div className="order-form-date-picker">
                                <label className="check-in">
                                    <span>Check in</span>
                                    <input name="checkIn" value={trip.time.checkIn} type="date" placeholder="Add dates" onChange={this.handleChange} />
                                </label>
                                <label className="check-out" >
                                    <span>Check out</span>
                                    <input name="checkOut" value={trip.time.checkOut} type="date" placeholder="Add dates" onChange={this.handleChange} />
                                </label>
                            </div>

                            <label className="guests-lable" >
                                <span>Guests</span>
                                <input onClick={(event) => { this.onSetModal(event, 'book-guests') }} name="guests" value={trip.guests.kids + trip.guests.adults} type="text" placeholder="Add guests" />
                            </label>
                            {!isAvailable && <button type="button" className="book-stay-btn" onClick={this.toggleAvailability}>Check availability</button>}
                            {isAvailable && <button type="button" className="book-stay-btn" onClick={this.onReserveTrip}>Reserve</button>}
                            {isAvailable && <div className="book-info">
                                <h4>You won't be charged yet</h4>
                                <h3><span>${price} X {this.getTripTime()} night{this.getTripTime() > 1 && 's'}</span> <span>${((trip.guests.kids + trip.guests.adults) * price) * this.getTripTime()}</span></h3>
                                <h3><span>Cleaning fee</span> <span>${(6 * this.getTripTime())}</span></h3>
                                <h3><span>Service fee</span> <span>${(17 * this.getTripTime())}</span></h3>
                            </div>}
                        </form>
                    </div>
                    <span className="report-listing-btn"><i className="fab fa-font-awesome-flag"></i><p>Report this listing</p></span>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.userModule.loggedInUser,
        trip: state.tripModule.trip
    }
}

const mapDispatchToProps = {
    addOrder,
}

export const BookStay = connect(mapStateToProps, mapDispatchToProps)(_BookStay)