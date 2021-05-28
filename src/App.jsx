import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { StayDetails } from './pages/StayDetails';
import { UserDetails } from './pages/UserDetails';
import { Explore } from './pages/Explore';
import { LoginSignup } from './pages/LoginSignup';
import { Home } from './pages/Home';
import { Header } from './cmps/Header';
import { Dashboard } from './pages/Dashboard';
import { BecomeHost } from './pages/BecomeHost';
import { Component } from 'react';
import { connect } from 'react-redux';
import { loadStays } from './store/actions/stayActions'
import { addTrip, loadTrip } from './store/actions/tripActions'
import { updateUser, loadUsers, logout } from './store/actions/userActions'

class _App extends Component {

  componentDidMount() {
    this.props.loadStays()
    this.props.loadUsers()
  }

  onSearch = (trip) => {
    this.props.addTrip(trip);
    this.props.loadStays(trip);
  }


  render() {

    const { stays, updateUser, trip, addTrip, loggedInUser, logout, loadStays } = this.props

    return (
      <Router>
        <Header trip={trip} addTrip={addTrip} onSearch={this.onSearch} loggedInUser={loggedInUser} logout={logout} />
        <Switch>
          <Route path='/login' component={LoginSignup} />
          <Route path='/host/:userId' render={() => (<Dashboard loggedInUser={loggedInUser} updateUser={updateUser} />)} />
          <Route path='/host' render={() => (<BecomeHost loggedInUser={loggedInUser} />)} />
          <Route path='/stay/:stayId' component={StayDetails}/>
          <Route path='/explore' render={() => (<Explore stays={stays} />)} />
          <Route path='/user' render={() => (<UserDetails updateUser={updateUser} />)} />
          <Route path='/' render={() => (<Home stays={stays} loggedInUser={loggedInUser} loadStays={loadStays} />)} />
        </Switch>
      </Router>
    )
  }
}

// component={Home}

const mapStateToProps = (state) => {
  return {
    stays: state.stayModule.stays,
    // orders: state.ordersModule.order,
    // users: state.usersModule.user
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
  logout
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)

// 