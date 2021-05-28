import { Component } from 'react';
import { DashHeader } from '../cmps/dashboard/DashHeader'

export class Dashboard extends Component {

    state = {
        action: ''
    }

    componentDidMount() {
        this.props.updateUser({ ...this.props.loggedInUser, isHost: true })
    }

    render() {
        return (
            <main className="page">
                <DashHeader />
            </main>
        )
    }
}