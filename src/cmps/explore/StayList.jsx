import { StayPreview } from '../explore/StayPreview'

export function StayList({ stays ,loggedInUser ,updateUser, toggleMsgModal, login}) {

    return (
        <section className="stay-list">
            {stays.map(stay => <StayPreview key={stay._id} updateUser={updateUser} loggedInUser={loggedInUser} stay={stay} toggleMsgModal={toggleMsgModal} login={login}/>)}
        </section>
    )
}