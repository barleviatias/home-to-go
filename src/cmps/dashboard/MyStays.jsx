import { HostStayList } from './HostStayList'
import {Loader} from '../app/Loader'

export function MyStays({ stays, removeStay, toggleMsgModal, onSelectedEditStay,  onSelectAction }) {

    async function onRemoveStays(stayId) {
        await removeStay(stayId)
        toggleMsgModal(<span><i className="far fa-check-circle"></i><h3>Your stay has been deleted</h3></span>)
    }

    function onEditStay(stay) {
        onSelectedEditStay(stay)
    }

    if (!stays) return <Loader/>
    return (
        <section className="host-stay-container">
            <HostStayList stays={stays} onRemoveStays={onRemoveStays} onEditStay={onEditStay} onSelectAction={onSelectAction} />
        </section>
    )
}
