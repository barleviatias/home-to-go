import { Component } from "react";
import { Link } from 'react-router-dom'


export class OrderPreview extends Component {

    render() {

        const { order, getCancelationStatus, onCancelOrder } = this.props

        return (

            <div className="order-preview">
                <div>
                    {/* <img src={order.stay.imgUrls[0]} alt="" /> */}
                </div>







                {/* <td><Link to={`/stay/${order.stay._id}`}>{order.stay.name}</Link></td>
                <td><Link to={`/stay/${order.stay._id}`}>{order.startDate}</Link></td>
                <td><Link to={`/stay/${order.stay._id}`}>{order.endDate}</Link></td>
                <td><Link to={`/stay/${order.stay._id}`}>$ {order.totalPrice}</Link></td>
                <td><Link to={`/stay/${order.stay._id}`}>{order.host.fullname}</Link></td>
                <td><Link to={`/stay/${order.stay._id}`}>{order.status}</Link></td>
                <td><Link to={`/stay/${order.stay._id}`}>{getCancelationStatus(order)}</Link></td>
                <td>
                    {getCancelationStatus(order) !== 'Non-refundable' && <button onClick={() => onCancelOrder(order)}>Cancel Order</button>}
                    {getCancelationStatus(order) === 'Non-refundable' && <button disabled onClick={() => onCancelOrder(order)}>Cancel Order</button>}
                </td> */}
            </div>

        )
    }
}