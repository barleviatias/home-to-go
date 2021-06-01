import { OrdersPrview } from './OrdersPrview'

export function OrderList({ orders }) {
    return (
        <section className="host-stay-list">
            <h2>OrderList</h2>
            <table>
                <tead>
                    <tr>
                        <th>Guest Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Total Price</th>
                        <th>Action</th>
                    </tr>
                    <tbody>
                        {orders.map(order => {
                            return (
                                <OrdersPrview
                                    key={order._id}
                                    order={order} />
                            )
                        })}
                    </tbody>
                </tead>
            </table>
        </section>
    )
}