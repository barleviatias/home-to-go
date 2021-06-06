
export function OrdersPrview({ order, updateOrder }) {

    function onUpdateOrder(status) {
        order.status = status;
        updateOrder(order)
    }
console.log(order);
    return (
        <div className="host-stay-preview">
            <span><img src={order.user.imgUrl} alt="user" /></span>
            <span>{order.user.fullname}</span>
            <span>{order.startDate}</span>
            <span>{order.endDate}</span>
            <span>{order.status}</span>
            <span>$ {order.totalPrice.toLocaleString("en-US")}</span>
            <span className="stay-actions" >
                <button onClick={() => { onUpdateOrder('approved') }}><i className="fas fa-check"></i>Approve</button>
                <button onClick={() => { onUpdateOrder('declined') }}><i className="fas fa-times"></i>Decline</button>
            </span>
        </div>
    )
}


