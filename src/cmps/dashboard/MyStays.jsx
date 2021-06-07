import { HostStayList } from './HostStayList'
import {Loader} from '../app/Loader'

export function MyStays({ stays, onSelectedEditStay,  onSelectAction }) {

    function onEditStay(stay) {
        onSelectedEditStay(stay)
    }

    if (!stays) return <Loader/>
    return (
        <section className="host-stay-container">
            <HostStayList stays={stays} onEditStay={onEditStay} onSelectAction={onSelectAction} />
        </section>
    )
}
