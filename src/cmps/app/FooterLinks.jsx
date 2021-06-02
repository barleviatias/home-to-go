import { Link } from "react-router-dom";


export function FooterLinks({ onSearch, topRatedStays, nearbayStays }) {

    function onSelectLink(address) {
        const trip = {
            guests: { adults: 1, kids: 0 },
            loc: { address },
            time: { checkIn: '', checkOut: '' }
        }
        onSearch(trip)
        window.scroll({
            top: 0
        })
    }

    return (
        <section className="footer-links-container">
            <h3>Inspiration for future getaways</h3>
            <div>

                <div>
                    <h3>Top Rated</h3>
                    {topRatedStays.map((stay, idx) => {
                        if (idx < 8) {
                            return <Link key={Math.random()} to="/explore" onClick={() => { onSelectLink(stay.loc.address) }}><span>{stay.name}</span><span>{stay.loc.address}</span></Link>
                        }
                    })}
                </div>

                <div>
                    <h3>Nearby</h3>
                    {nearbayStays.map((stay, idx) => {
                        if (idx < 8) {
                            return <Link key={Math.random()} to="/explore" onClick={() => { onSelectLink(stay.loc.address) }}><span>{stay.name}</span><span>{stay.loc.address}</span></Link>
                        }
                    })}
                </div>
                <div>
                    <h3>Cities</h3>
                    <Link to="/explore" onClick={() => { onSelectLink('Hong Kong') }}><span>Hong Kong </span><span>China</span></Link>
                    <Link to="/explore" onClick={() => { onSelectLink('Bangkok') }}><span>Bangkok</span><span>Thailand</span></Link>
                    <Link to="/explore" onClick={() => { onSelectLink('London') }}><span>London</span><span>England</span></Link>
                    <Link to="/explore" onClick={() => { onSelectLink('Paris') }}><span>Paris</span><span>France</span></Link>
                    <Link to="/explore" onClick={() => { onSelectLink('Dubai') }}><span>Dubai</span><span>United Arab Emirates</span></Link>
                    <Link to="/explore" onClick={() => { onSelectLink('New York') }}><span>New York</span><span>United States</span></Link>
                    <Link to="/explore" onClick={() => { onSelectLink('Amsterdam') }}><span>Amsterdam</span><span>Netherlands</span></Link>
                    <Link to="/explore" onClick={() => { onSelectLink('Tel Aviv') }}><span>Tel Aviv</span><span>Israel</span></Link>
                </div>
            </div>
        </section>

    )
}