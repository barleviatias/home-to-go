import { OrdersPrview } from './OrdersPrview'

export function OrderList({ orders }) {
    return (
        <section className="host-order-list">
            <table className="host-order-list-table">
                <thead>
                    <tr>
                        <th>Guest Name</th>
                        <th>Check in</th>
                        <th>Check out</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => {
                        return (
                            <OrdersPrview
                                key={order._id}
                                order={order} />
                        )
                    })}
                </tbody>
            </table>
        </section>
    )
}