import { Link } from "react-router-dom";


export function Hero({ loadStays }) {

    return (
        <section className="main-hero full">
            <div>
                <h1>Discover stays to live, work, or just relax.</h1>
                <button onClick={()=>{loadStays({
                    guests: { adults: 1, kids: 0 },
                    loc: { address: '' },
                    time: { checkIn: '', checkOut: '' }
                })}}><Link to="/explore">Explore now</Link></button>
            </div>
        </section>
    )
}