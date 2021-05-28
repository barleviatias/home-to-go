import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { StayDetails } from './pages/StayDetails';
import { UserDetails } from './pages/UserDetails';
import { Explore } from './pages/Explore';
import { LoginSignup } from './pages/LoginSignup';
import { Home } from './pages/Home';
import { Header } from './cmps/Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { loadStays, loadTopRated, loadNearby } from './store/actions/stayActions'
import { addTrip, loadTrip } from './store/actions/tripActions'
import { updateUser, loadUsers, logout } from './store/actions/userActions'

class _App extends Component {

  componentDidMount() {
    this.props.loadStays()
    this.props.loadUsers()
    this.props.loadTopRated();
    this.props.loadNearby('Portugal');
  }

  onSearch = (trip) => {
    this.props.addTrip(trip);
    this.props.loadStays(trip);
  }



  render() {

    const { staysState, orders, updateUser, trip, addTrip, loggedInUser, logout } = this.props

    return (
      <Router>
        <Header trip={trip} addTrip={addTrip} onSearch={this.onSearch} loggedInUser={loggedInUser} logout={logout} />
        <Switch>
          <Route path='/login' component={LoginSignup} />
          <Route path='/stay/:stayId' component={StayDetails} />
          <Route path='/explore' render={() => (<Explore stays={staysState.stays} />)} />
          <Route path='/stay' render={() => (<StayDetails />)} />
          <Route path='/user' render={() => (<UserDetails updateUser={updateUser} />)} />
          <Route path='/' render={() => (<Home topRatedStays={staysState.topRatedStays} nearbayStays={staysState.nearbayStays} />)} />
        </Switch>
      </Router>
    )
  }
}

// component={Home}

const mapStateToProps = (state) => {
  return {
    staysState: state.stayModule,
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
  logout,
  loadTopRated,
  loadNearby
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)

// 