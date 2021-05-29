import { Component } from 'react';
import { DashHeader } from '../cmps/dashboard/DashHeader'
import { MyPlaces } from '../cmps/dashboard/MyPlaces'
import { FinanceStatistic } from '../cmps/dashboard/FinanceStatistic'
import { RateStatistic } from '../cmps/dashboard/RateStatistic'
import { StayEdit } from '../cmps/dashboard/SaveStay'

import { connect } from 'react-redux';

import { loadHostStays,removeStay } from '../store/actions/stayActions'


export class _Dashboard extends Component {

    state = {
        action: '',
        loggedInUser: null
    }

    componentDidMount() {
        this.setState({ loggedInUser: { ...this.props.loggedInUser, isHost: true } }, () => {
            this.props.updateUser(this.state.loggedInUser)
            this.props.loadHostStays(this.state.loggedInUser._id);
        })
    }

    onSelectAction = (ev) => {
        const action = ev.target.value;
        this.setState({ action })
    }

    render() {
        const { action,loggedInUser } = this.state
        const { removeStay, stays ,toggleMsgModal} = this.props
        console.log(stays);
        return (
            <main className="page">
                <DashHeader onSelectAction={this.onSelectAction} />
                {(action === '' || action === 'my places') && <MyPlaces stays={stays} removeStay={removeStay} toggleMsgModal={toggleMsgModal}/>}
                { action === 'finance stat' && <FinanceStatistic />}
                { action === 'rate stat' && <RateStatistic />}
                { action === 'add stay' && <StayEdit onSelectAction={this.onSelectAction} loggedInUser={loggedInUser} />}
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        stays: state.stayModule.stays,
    }
}

const mapDispatchToProps = {
    loadHostStays,
    removeStay
}

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(_Dashboard)