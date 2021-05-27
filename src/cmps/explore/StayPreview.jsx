import {Link} from 'react-router-dom'

export function StayPreview({ stay }) {

    console.log(stay);
    return (
        <section >
            <Link to={`/stay/${stay._id}`} className="stay-preview">
                <img src={stay.imgUrls[0]} alt="stay-preview" />
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