import { Link } from 'react-router-dom'

export function StayPreview({ stay }) {

    const getTotalRate = () => {
        const rates = stay.reviews.map(review => review.avgRate)
        const sum = rates.reduce((acc, rate) => {
            acc += rate
            return acc
        }, 0)
        if (sum === 0) return 'new'
        return (sum / rates.length).toFixed(1)
    }

    return (
        <section >
            <Link to={`/stay/${stay._id}`} className="stay-preview">
                <div className="stay-preview-img">
                    <img src={stay.imgUrls[0]} alt="stay-preview" />
                </div>
                <div className="stay-preview-info">
                    <span className="stay-preview-header">
                        <span className="stay-preview-header-txt">
                            <h3>
                                <span>{stay.propertyType}</span>
                                     •
                                     <span>{stay.loc.country}</span>
                            </h3>
                        </span>
                        <span className="stay-preview-header-rate">
                            <i className="fas fa-star"></i>
                            <p>{getTotalRate()}</p>
                            <p>( {stay.reviews.length} )</p>
                        </span>
                    </span>
                    <h3>{stay.name}</h3>
                    <h3><span className="stay-price">${stay.price}</span> / night</h3>
                </div>
            </Link>

        </section>
    )
}