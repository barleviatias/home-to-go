import { Link } from "react-router-dom";


export function FooterLinks() {

    function onSelectLink(link) {
        const trip = {
            guests: { adults: 1, kids: 0 },
            loc: { address:''  },
            time: { checkIn: '', checkOut: '' }
        }
        // onSearch(trip)
    }

    return (
        <section className="footer-links-container">
            <div>
                <h3>Top Rated</h3>
                <Link  to="/explore" value={} onClick={() => { onSelectLink('Bangkok') }}>name</Link>
                <Link>name</Link>
                <Link>name</Link>
                <Link>name</Link>
            </div>
            <div>
                <h3>Countries</h3>
                <Link>Israel</Link>
                <Link>Israel</Link>
                <Link>Israel</Link>
                <Link>Israel</Link>
            </div>
            <div>
                <h3>Cities</h3>
                <Link>Tel Aviv</Link>
                <Link>Tel Aviv</Link>
                <Link>Tel Aviv</Link>
                <Link>Tel Aviv</Link>
            </div>
        </section>

    )
}