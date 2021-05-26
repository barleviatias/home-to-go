import { Component } from "react";

export class StayFilter extends Component {


    render() {
        return (
            <section>
                <button>Cancellation flexibillty</button>
                <button>Type of place</button>
                {/* entire place */}
                {/* private room */}
                <button>Property type</button>
                {/* house */}
                {/* appartment */}
                {/* loft */}
                {/* villa */}
                {/* room */}
                <button>Price</button>
                <button>Amenities</button>
                <button>More filters</button>
            </section>
        )
    }
}