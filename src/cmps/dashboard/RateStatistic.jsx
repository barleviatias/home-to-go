import { Component } from 'react'
import { HostStaysMenu } from './HostStaysMenu'
import { RatePieChart } from '../dashboard/RatePieChart'

export class RateStatistic extends Component {

    state = {
        stay: null
    }

    updateSelectedStay = (stay) => {
        console.log(stay);
        this.setState({ stay })
    }

    render() {
        const { stays } = this.props
        const { stay } = this.state
        return (
            < div >
                <HostStaysMenu stays={stays} updateSelectedStay={this.updateSelectedStay} />
                {stay && <h3>Selected stay: {stay.name}</h3>}
                <RatePieChart stay={stay} />
            </div >

        )
    }
}
