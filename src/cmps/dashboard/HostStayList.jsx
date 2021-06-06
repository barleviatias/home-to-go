
import { HostStayPreview } from './HostStayPreview'

export function HostStayList({ stays, onRemoveStays, onEditStay }) {
    return (
        <section className="host-stay-list">
            <div className="host-stay-list-table">
                <div className="thead">
                    <div>
                        <span></span>
                        <span>Name</span>
                        <span>Address</span>
                        <span>Price</span>
                        <span className="stay-actions" >Action</span>
                    </div>
                </div>
                <div className="tbody">
                    {stays.map(stay => {
                        return (
                            <HostStayPreview
                                key={Math.random()}
                                stay={stay}
                                onRemoveStays={onRemoveStays}
                                onEditStay={onEditStay}
                            />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}