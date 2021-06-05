import { OrderPreview } from './OrderPreview'

export function OrderList({ orders, getCancelationStatus, onCancelOrder }) {


    if (!orders || !orders.length) return <h1>Loading Trips...</h1>

    return (
        <section className="order-list">
            {orders.map(order => <OrderPreview
                key={order._id}
                order={order}
                getCancelationStatus={getCancelationStatus}
                onCancelOrder={onCancelOrder}
            />)}
        </section>

    )
}