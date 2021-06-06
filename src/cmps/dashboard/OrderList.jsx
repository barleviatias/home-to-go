import { OrdersPrview } from './OrdersPrview'

export function OrderList({ orders ,updateOrder}) {
    return (
        <section className="host-order-list">
            <div className="host-order-list-table">
                <div className="thead">
                    <div>
                        <span></span>
                        <span>Guest Name</span>
                        <span>Check in</span>
                        <span>Check out</span>
                        <span>Status</span>
                        <span>Price</span>
                        <span className="stay-actions">Action</span>
                    </div>
                </div>
                <div className="tbody">
                    {orders.map(order => {
                        return (
                            <OrdersPrview
                                key={Math.random()}
                                order={order}
                                updateOrder={updateOrder} />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}