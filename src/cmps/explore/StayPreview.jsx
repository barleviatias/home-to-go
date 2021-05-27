import {Link} from 'react-router-dom'

export function StayPreview({ stay }) {

    return (
        <section >
            <Link to={`/stay/${stay._id}`} className="stay-preview">
                <img src={`http://www.bamia.com/${stay.imgUrl}`} alt="" />
                <div className="stay-preview-info">
                    <h3>{stay.rate}</h3>
                    <h3>{stay.propertyType}</h3>
                    <h3>{stay.name}</h3>
                    <h3>${stay.price}</h3>
                </div>
            </Link>

        </section>
    )
}