import { Component } from 'react'
import { HostStaysMenu } from './HostStaysMenu'
import { RatePieChart } from '../dashboard/RatePieChart'

export class RateStatistic extends Component {

    state = {
        stay: null
    }

    updateSelectedStay = (stay) => {
        this.setState({ stay })
    }

    render() {
        const { stays } = this.props
        const { stay } = this.state
        return (
            <section className="dash-rate-statistics-container">
                {stay && <h3>{stay.name}</h3>}
                {!stay && <h3>Rate statistics</h3>}
                <div className="dash-rate-statistics">
                    <HostStaysMenu stays={stays} updateSelectedStay={this.updateSelectedStay} />
                    {stay && <RatePieChart stay={stay} />}
                </div>
            </section>

        )
    }
}
