
export function OrdersPrview({ order, updateOrder }) {

    function onUpdateOrder(status) {
        order.status = status;
        updateOrder(order)
    }

    return (
        <tr className="host-stay-preview">
            <td><img src={order.user.imgUrl} alt="user" /></td>
            <td>{order.user.fullname}</td>
            <td>{order.startDate}</td>
            <td>{order.endtDate}</td>
            <td>{order.status}</td>
            <td>$ {order.totalPrice}</td>
            <td className="stay-actions" >
                <button onClick={() => { onUpdateOrder('approved') }}><i class="fas fa-check"></i>Approve</button>
                <button onClick={() => { onUpdateOrder('declined') }}><i class="fas fa-times"></i>Decline</button>
            </td>
        </tr>
    )
}
