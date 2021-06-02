import { Component } from 'react';
import { FilterOrders } from '../cmps/orders/FilterOrders'
import { OrderList } from '../cmps/orders/OrderList';

export class Orders extends Component {

    state = {
        sction: '',
        loggedInUser: null,
        orders: [],
    }

    componentDidMount() {
        this.setState({ loggedInUser: this.props.loggedInUser }, () => {
            this.loadOrders();
        })
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

    render() {
        const { orders } = this.state;
        return (
            <main className="user-order-container page">
                <FilterOrders />
                <section className="user-order-list">
                    <table className="user-order-list-table">
                        <thead>
                            <tr>
                                <th>Stay name</th>
                                <th>Check in</th>
                                <th>Check out</th>
                                <th>Price</th>
                                <th>host</th>
                                <th>Status</th>
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
