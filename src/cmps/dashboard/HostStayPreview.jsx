import { Link } from 'react-router-dom'


export function HostStayPreview({ stay, onRemoveStays, onEditStay }) {

    return (
        <tr className="host-stay-preview">
            <td><img src={stay.imgUrls[0]} alt="stay" /></td>
            <td><Link to={`/stay/${stay._id}`}>{stay.name}</Link></td>
            <td><Link to={`/stay/${stay._id}`}>{stay.loc.address}</Link></td>
            <td><Link to={`/stay/${stay._id}`}>$ {stay.price}</Link></td>
            <td className="stay-actions">
                <button onClick={() => onEditStay(stay)} ><i className="far fa-edit"></i>Edit</button>
                <button onClick={() => onRemoveStays(stay._id)}> <i className="far fa-trash-alt"></i>Remove</button>
            </td>
        </tr>
    )
}