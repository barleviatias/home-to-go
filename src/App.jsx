import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { StayDetails } from './pages/StayDetails';
import { UserDetails } from './pages/UserDetails';
import { Explore } from './pages/Explore';
import { LoginSignup } from './pages/LoginSignup';
import { Home } from './pages/Home';
import { Header } from './cmps/Header';
import { Dashboard } from './pages/Dashboard';
import { Orders } from './pages/Orders';
import { BecomeHost } from './pages/BecomeHost';
import { Component } from 'react';
import { connect } from 'react-redux';
import { loadStays,removeStay,loadHostStays } from './store/actions/stayActions'
import { loadOrders } from './store/actions/orderActions'
import { addTrip, loadTrip } from './store/actions/tripActions'
import { updateUser, loadUsers, logout } from './store/actions/userActions'
import { DynamicModal } from './cmps/app/DynamicModal';

class _App extends Component {

  state = {
    userMsg: ''
  }

  componentDidMount() {
    this.props.loadStays()
    this.props.loadUsers()
    this.props.loadOrders()
  }

  onSearch = (trip) => {
    this.props.addTrip(trip);
    this.props.loadStays(trip);
  }

  toggleMsgModal = (msg) => {
    this.setState({ userMsg: msg })
    setTimeout(() => {
      this.setState({ userMsg: '' })
    }, 3000);
  }


  render() {

    const { stays, orders,updateUser, trip, addTrip, loggedInUser, logout, loadStays,loadOrders } = this.props
    const { userMsg } = this.state

    return (
      <Router>
        <Header trip={trip} addTrip={addTrip} onSearch={this.onSearch} loggedInUser={loggedInUser} logout={logout} />
        <Switch>
          <Route path='/login' component={LoginSignup} />
          <Route path='/orders' render={(props) => (<Orders {...props} loadOrders={loadOrders} orders={orders} loggedInUser={loggedInUser} />)} />
          <Route path='/host/:userId' render={(props) => (<Dashboard {...props} loggedInUser={loggedInUser} updateUser={updateUser} toggleMsgModal={this.toggleMsgModal}/>)} />
          <Route path='/host' render={(props) => (<BecomeHost {...props} loggedInUser={loggedInUser} />)} />
          <Route path='/stay/:stayId' render={(props) => (<StayDetails {...props} toggleMsgModal={this.toggleMsgModal} />)} />
          <Route path='/explore' render={(props) => (<Explore {...props} stays={stays} />)} />
          <Route path='/user' render={(props) => (<UserDetails {...props} updateUser={updateUser} />)} />
          <Route path='/' render={(props) => (<Home {...props} stays={stays} loggedInUser={loggedInUser} loadStays={loadStays} />)} />
        </Switch>
        {userMsg && <DynamicModal >
          <section className="user-msg">
            {userMsg}
          </section>
        </DynamicModal>}
      </Router>
    )
  }
}

// component={Home}

const mapStateToProps = (state) => {
  return {
    stays: state.stayModule.stays,
    orders: state.orderModule.orders,
    trip: state.tripModule.trip,
    users: state.userModule.users,
    loggedInUser: state.userModule.loggedInUser
  }
}

const mapDispatchToProps = {
  loadStays,
  addTrip,
  updateUser,
  loadUsers,
  loadTrip,
  logout,
  removeStay,
  loadHostStays,
  loadOrders
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)

// 