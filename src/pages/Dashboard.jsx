import { Component } from 'react';
import { DashHeader } from '../cmps/dashboard/DashHeader'
import { MyPlaces } from '../cmps/dashboard/MyPlaces'
import { FinanceStatistic } from '../cmps/dashboard/FinanceStatistic'
import { RateStatistic } from '../cmps/dashboard/RateStatistic'
import { StayEdit } from '../cmps/dashboard/SaveStay'


export class Dashboard extends Component {

    state = {
        action: ''
    }

    componentDidMount() {
        this.props.updateUser({ ...this.props.loggedInUser, isHost: true })
    }

    onSelectAction = (ev) => {
        const action = ev.target.value;
        this.setState({ action })
    }

    render() {
        const { action } = this.state
        return (
            <main className="page">
                <DashHeader onSelectAction={this.onSelectAction} />
                {(action === '' || action === 'my places') && <MyPlaces />}
                { action === 'finance stat' && <FinanceStatistic />}
                { action === 'rate stat' && <RateStatistic />}
                { action === 'add stay' && <StayEdit />}
            </main>
        )
    }
}