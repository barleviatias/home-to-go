import { HostStayList } from './HostStayList'

export function MyStays({ stays, removeStay, toggleMsgModal, onSelectedEditStay }) {

    async function onRemoveStays(stayId) {
        await removeStay(stayId)
        toggleMsgModal(<span><i className="far fa-check-circle"></i><h3>Your stay has been deleted</h3></span>)
    }

    function onEditStay(stay) {
        onSelectedEditStay(stay)
    }

    if (!stays) return <h3>Loading....</h3>
    return (
        <section className="host-stay-container">
            <HostStayList stays={stays} onRemoveStays={onRemoveStays} onEditStay={onEditStay} />
        </section>
    )
}