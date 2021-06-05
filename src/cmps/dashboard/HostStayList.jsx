
import { HostStayPreview } from './HostStayPreview'

export function HostStayList({ stays, onRemoveStays, onEditStay }) {
    return (
        <section className="host-stay-list">
            <table className="host-stay-list-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Price</th>
                        <th className="stay-actions" >Action</th>
                    </tr>
                </thead>
                <tbody>
                    {stays.map(stay => {
                        return (
                            <HostStayPreview
                                key={stay._id}
                                stay={stay}
                                onRemoveStays={onRemoveStays}
                                onEditStay={onEditStay}
                            />
                        )
                    })}
                </tbody>
            </table>
        </section>
    )
}