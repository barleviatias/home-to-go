import { Component } from "react";
import { tripService } from '../../services/trip-service'
import { addOrder } from '../../store/actions/orderActions'
import { DynamicModal } from '../app/DynamicModal'
import { connect } from "react-redux";
import { Link } from "react-router-dom";


class _BookStay extends Component {

    state = {
        trip: {
            guests: { adults: 0, kids: 0 },
            loc: { address: '' },
            time: { checkIn: '', checkOut: '' }
        },
        modalType: '',
        isAvailable: false,
        isErrModal: null
    }

    componentDidMount() {
        const trip = tripService.query()
        this.setState({ trip, isAvailable: false })
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

    toggleDynamicModal = (modalKey) => {
        if (this.state.modalType === modalKey) this.setState({ modalType: '' })
        else this.setState({ modalType: modalKey })
    }

    toggleAvailability = () => {
        this.setState({ isAvailable: !this.state.isAvailable })
    }

    onReserveTrip = async () => {
        const { trip } = this.state
        const { stay, loggedInUser } = this.props

        if (!loggedInUser) {
            this.toggleErrModal('You must log in frist', '/login', 'Login')
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
    }

    toggleErrModal = (msg, url, linkTxt) => {
        const isErrModal = (!this.state.isErrModal) ? { msg, url, linkTxt } : null
        this.setState({ isErrModal })
    }

    getTripTime = () => {
        const diff = new Date(this.state.trip.time.checkOut).getTime() - new Date(this.state.trip.time.checkIn).getTime();
        return diff / 1000 / 60 / 60 / 24
    }

    render() {
        const { stay, getTotalRate } = this.props
        const { trip, modalType, isAvailable, isErrModal } = this.state
        const { reviews, price } = stay
        const { kids, adults } = trip.guests;


        return (
            <section className="order-form-container">
                <div className="order-form">
                    <div className="order-form-header">
                        <p><span className="order-price">${(trip.guests.kids + trip.guests.adults) * price}</span><span> / night</span></p>
                        <span className="stay-rate-display"><i className="fas fa-star"></i>{getTotalRate()}<p>( {reviews.length} reviews )</p></span>
                    </div>

                    <form>
                        <div className="order-form-date-picker">
                            <label className="check-in">
                                <span>Check in</span>
                                <input name="check-in" value={trip.time.checkIn} type="date" placeholder="Add dates" onChange={this.handleChange} />
                            </label>
                            <label className="check-out" >
                                <span>Check out</span>
                                <input name="check-out" value={trip.time.checkOut} type="date" placeholder="Add dates" onChange={this.handleChange} />
                            </label>
                        </div>

                        <label className="guests-lable" onClick={() => { this.toggleDynamicModal('guests') }} >
                            <span>Guests</span>
                            <input name="guests" value={trip.guests.kids + trip.guests.adults} type="text" placeholder="Add guests" />
                            {modalType === 'guests' && <DynamicModal>
                                <section className="book-guest-modal">
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
                {isErrModal && <DynamicModal>
                    <h2>{isErrModal.msg}</h2>
                    <Link to={isErrModal.url}>{isErrModal.linkTxt}</Link>
                </DynamicModal>}
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    addOrder,

}

export const BookStay = connect(mapStateToProps, mapDispatchToProps)(_BookStay)