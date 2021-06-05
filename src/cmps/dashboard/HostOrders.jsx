import { OrderList } from './OrderList'

export function HostOrders({orders,updateOrder}) {
    return (
        <section className="host-order-container">
            <OrderList orders={orders} updateOrder={updateOrder}/>
        </section>
    )
}