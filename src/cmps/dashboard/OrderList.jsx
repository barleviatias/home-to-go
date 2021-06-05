import { OrdersPrview } from './OrdersPrview'

export function OrderList({ orders ,updateOrder}) {
    return (
        <section className="host-order-list">
            <table className="host-order-list-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Guest Name</th>
                        <th>Check in</th>
                        <th>Check out</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th className="stay-actions">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => {
                        return (
                            <OrdersPrview
                                key={Math.random()}
                                order={order}
                                updateOrder={updateOrder} />
                        )
                    })}
                </tbody>
            </table>
        </section>
    )
}