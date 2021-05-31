
export function HostStaysMenu({ stays,updateSelectedStay }) {
    return (
        <div>
            {stays.map(stay => {
                return (
                    <label key={stay._id} onClick={() => { updateSelectedStay(stay) }}>
                        <h4>{stay.name}</h4>
                        <h6>{`${stay.propertyType},${stay.capacity} Gursts, ${stay.loc.address}`}</h6>
                    </label>
                )
            })}
        </div>
    )
}