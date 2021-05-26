import { StayPreview } from '../explore/StayPreview'

export function StayList({ stays }) {

    return (
        <section className="stay-list">
            {stays.map(stay => <StayPreview stay={stay} />)}
        </section>
    )
}