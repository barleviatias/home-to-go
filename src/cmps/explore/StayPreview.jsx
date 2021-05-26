

export function StayPreview({ stay }) {

    return (
        <section className="stay-preview">
            <img src={stay.imgUrl} alt="" />
            <div className="stay-preview-info">
                <h3>{stay.rate}</h3>
                <h3>{stay.ctg}</h3>
                <h3>{stay.name}</h3>
                <h3>{stay.price}</h3>
            </div>

        </section>
    )
}