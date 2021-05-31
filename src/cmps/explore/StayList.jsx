import { StayPreview } from '../explore/StayPreview'

export function StayList({ stays ,loggedInUser ,updateUser}) {

    return (
        <section className="stay-list">
            {stays.map(stay => <StayPreview key={stay._id} updateUser={updateUser} loggedInUser={loggedInUser} stay={stay} />)}
        </section>
    )
}