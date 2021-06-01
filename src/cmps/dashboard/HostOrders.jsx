import { OrderList } from './OrderList'

export function HostOrders({orders}) {
    return (
        <section className="host-order-container">
            <OrderList orders={orders} />
        </section>
    )
}