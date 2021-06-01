import { OrderList } from './OrderList'

export function HostOrders({orders}) {
    return (
        <section className="host-stay-container">
            <h1>HostOrders</h1>
            <OrderList orders={orders} />
        </section>
    )
}