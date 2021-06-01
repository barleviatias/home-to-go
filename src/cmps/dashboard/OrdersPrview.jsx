
export function OrdersPrview({ order }) {
    return (
        <tr className="host-stay-preview">
            <td>{order.user.fullname}</td>
            <td>{order.startDate}</td>
            <td>{order.endtDate}</td>
            <td>{order.status}</td>
            <td>$ {order.totalPrice}</td>
            <td>
                <button><i class="fas fa-check"></i></button>
                <button><i class="fas fa-times"></i></button>
            </td>
        </tr>
    )
}
