import { Link } from "react-router-dom";

export function FilterGallery({ stays }) {
    return (
        <section className="filter-gallery">
            {stays.map(stay => {
                return <Link to={`/stay/${stay._id}`} key={stay._id}>
                    <img src={`${stay.imgUrls[0]}`} alt={stay.name} />
                    <h3>{stay.name}</h3>
                </Link>
            })}
        </section>
    )
}
