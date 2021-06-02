import { Component } from 'react';
import { DashHeader } from '../cmps/dashboard/DashHeader'
import { MyStays } from '../cmps/dashboard/MyStays'
import { FinanceStatistic } from '../cmps/dashboard/FinanceStatistic'
import { RateStatistic } from '../cmps/dashboard/RateStatistic'
import { StayEdit } from '../cmps/dashboard/SaveStay'
import {HostOrders} from '../cmps/dashboard/HostOrders'
import { connect } from 'react-redux';
import { loadHostStays, removeStay } from '../store/actions/stayActions'

export class _Dashboard extends Component {

    state = {
        action: '',
        loggedInUser: null,
        selsctedEditStay: null
    }
 
    componentDidMount() {
        this.setState({ loggedInUser: { ...this.props.loggedInUser, isHost: true } }, () => {
            this.props.updateUser(this.state.loggedInUser)
            this.loadHostStays()
            this.props.loadOrders({ id: this.state.loggedInUser._id, type: 'host' })
        })
        this.props.setFooterDisplay(false)
    }

    componentWillUnmount(){
        this.props.setFooterDisplay(true) 
    }

    loadHostStays = async () => {
        console.log('****** start to load host stays *****');
        await this.props.loadHostStays(this.state.loggedInUser._id);
        if (this.props.stays.length === 0) {
            this.setState({ action: 'add stay' })
        }
    }

    onSelectAction = (ev) => {
        const action = ev.target.value;
        this.setState({ action })
    }

    onSelectedEditStay = (stay) => {
        this.setState({ selsctedEditStay: stay }, () => {
            this.setState({ action: 'edit stay' })
        })
    }

    render() {
        const { action, loggedInUser, selsctedEditStay, } = this.state
        const { removeStay, stays, toggleMsgModal,orders } = this.props
        return (
            <main className="dashboard-container">
                <section className="dash-main-container">
                    <DashHeader onSelectAction={this.onSelectAction} />
                    <section className="dash-info-container">
                        {(action === '' || action === 'my Stays') && <MyStays stays={stays} removeStay={removeStay} toggleMsgModal={toggleMsgModal} onSelectedEditStay={this.onSelectedEditStay} />}
                        {action === 'finance stat' && <FinanceStatistic />}
                        {action === 'rate stat' && <RateStatistic stays={stays} />}
                        {action === 'edit stay' && <StayEdit stayEdit={selsctedEditStay} onSelectAction={this.onSelectAction} loggedInUser={loggedInUser} toggleMsgModal={toggleMsgModal} />}
                        {action === 'add stay' && <StayEdit onSelectAction={this.onSelectAction} loggedInUser={loggedInUser} toggleMsgModal={toggleMsgModal} />}
                        {action === 'orders' && <HostOrders  loggedInUser={loggedInUser} orders={orders}  />}
                    </section>
                </section>
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