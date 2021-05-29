import { Component } from 'react';
import { Link } from 'react-router-dom'
import { FilterOrders } from '../cmps/orders/FilterOrders'

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
        await this.props.loadOrders({ id: this.state.loggedInUser._id, type: 'user', filterBy: {} })
        this.setState({ orders: this.props.orders })
    }

    onCancelOrder = async (stay) => {
        var daysToTrip = this.getTimeBeforeTrip(stay.startDate);
        console.log(daysToTrip);
        if (daysToTrip >= 14) {
            await this.props.removeOrder(stay._id)
            this.setState({ orders: this.props.orders })
            this.props.toggleMsgModal(<span><i className="far fa-check-circle"></i><h3>Your order has been canceled</h3></span>)
        }
        else this.props.toggleMsgModal(<span><i className="far fa-times-circle"></i><h3>You can't cancel this order</h3></span>)

    }

    getDaysToCancelOrder = (stay) => {
        var daysToTrip = this.getTimeBeforeTrip(stay.startDate);
        var daysToCancel = daysToTrip - 14;
        if (daysToCancel > 0) return daysToCancel.toFixed(0)
        else return "Can't cancel this order"
    }

    getTimeBeforeTrip = (startDate) => {
        const diff = new Date(startDate).getTime() - Date.now();
        return diff / 1000 / 60 / 60 / 24
    }

    render() {
        const { orders } = this.state;
        return (
            <main className="page">
                <h1>Orders</h1>
                <FilterOrders />
                <table>
                    <thead>
                        <tr>
                            <th>Stay name</th>
                            <th>Start date</th>
                            <th>End date</th>
                            <th>Price</th>
                            <th>host</th>
                            <th>Status</th>
                            <th>Day to cancel</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => {
                            return (
                                <tr key={order._id}>
                                    <td><Link to={`/stay/${order.stay._id}`}>{order.stay.name}</Link></td>
                                    <td><Link to={`/stay/${order.stay._id}`}>{order.startDate}</Link></td>
                                    <td><Link to={`/stay/${order.stay._id}`}>{order.endDate}</Link></td>
                                    <td><Link to={`/stay/${order.stay._id}`}>$ {order.totalPrice}</Link></td>
                                    <td><Link to={`/stay/${order.stay._id}`}>{order.host.fullname}</Link></td>
                                    <td><Link to={`/stay/${order.stay._id}`}>{order.status}</Link></td>
                                    <td><Link to={`/stay/${order.stay._id}`}>{this.getDaysToCancelOrder(order)}</Link></td>
                                    <td>
                                        <button onClick={() => this.onCancelOrder(order)}>Cancel Order</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </main>
        )
    }
}
