import { Link } from "react-router-dom";
import {tripService} from '../../services/trip-service'


export function FooterLinks({ onSearch, topRatedStays, nearbayStays}) {

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

    const topCities = tripService.getTopCities()

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
                    {topCities.map((city, idx) => {
                        if (idx < 8) {
                            return <Link key={Math.random()} to="/explore" onClick={() => { onSelectLink(`${city.city}`) }}><span>{city.city}</span><span>{city.state}</span></Link>
                        }
                    })}
                </div>
            </div>
        </section>

    )
}