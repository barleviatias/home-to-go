import { Component } from 'react';
import { OrderList } from '../cmps/orders/OrderList';

export class Orders extends Component {

    state = {
        sction: '',
        loggedInUser: null,
        orders: [],
        filterBy: {
            status: true,
            price: true,
            checkIn: true,
            checkOut: true,
            name: true
        }
    }

    componentDidMount() {
        this.setState({ loggedInUser: this.props.loggedInUser }, () => {
            this.loadOrders();
        })
        this.props.setFooterDisplay(false)
    }

    componentWillUnmount(){
        this.props.setFooterDisplay(true) 
    }

    loadOrders = async () => {
        await this.props.loadOrders({ id: this.state.loggedInUser._id, type: 'user' })
        this.setState({ orders: this.props.orders })
    }

    onCancelOrder = async (stay) => {
        var daysToTrip = this.getTimeBeforeTrip(stay.startDate);
        if (daysToTrip >= 7) {
            await this.props.removeOrder(stay._id)
            this.setState({ orders: this.props.orders })
            this.props.toggleMsgModal(<span><i className="far fa-check-circle"></i><h3>Your order has been canceled</h3></span>)
        }
        else this.props.toggleMsgModal(<span><i className="far fa-times-circle"></i><h3>You can't cancel this order</h3></span>)

    }

    getCancelationStatus = (stay) => {
        var daysToTrip = this.getTimeBeforeTrip(stay.startDate);
        var daysToCancel = daysToTrip - 7;
        if (daysToCancel > 0) return `Refundable in the next ${daysToCancel.toFixed(0)} days`
        else return "Non-refundable"
    }

    getTimeBeforeTrip = (startDate) => {
        const diff = new Date(startDate).getTime() - Date.now();
        return diff / 1000 / 60 / 60 / 24
    }

    handleChange = (ev) => {
        var {name , value} = ev.target
        this.setState({ filterBy: { ...this.state.filterBy, [name]: !this.state.filterBy[name] } }, () => {
        });
    }

    render() {
        const { orders ,filterBy} = this.state;
        const { name, price , status , checkIn , checkOut} = filterBy
        return (
            <main className="user-order-container page">
                <section className="user-order-list">
                    <table className="user-order-list-table">
                        <thead>
                            <tr>
                                <th> <button name="name" value={name} onClick={this.handleChange}>Stay name</button></th>
                                <th><button name="checkIn" value={checkIn} onClick={this.handleChange}>Check in</button></th>
                                <th>  <th><button name="checkOut" value={checkOut} onClick={this.handleChange}>Check out</button></th></th>
                                <th>  <button name="price" value={price} onClick={this.handleChange}>Price</button></th>
                                <th>host</th>
                                <th><button name="status" value={status} onClick={this.handleChange}>Status</button></th>
                                <th>cancelation</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <OrderList
                            orders={orders}
                            getCancelationStatus={this.getCancelationStatus}
                            onCancelOrder={this.onCancelOrder}
                        />
                    </table>
                </section>
            </main>
        )
    }
}
