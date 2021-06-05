
export function OrdersPrview({ order }) {
    return (
        <tr className="host-stay-preview">
            <td><img src={order.user.imgUrl} alt="user" /></td>
            <td>{order.user.fullname}</td>
            <td>{order.startDate}</td>
            <td>{order.endtDate}</td>
            <td>{order.status}</td>
            <td>$ {order.totalPrice}</td>
            <td className="stay-actions" >
                <button><i class="fas fa-check"></i>Approve</button>
                <button><i class="fas fa-times"></i>Decline</button>
            </td>
        </tr>
    )
}


