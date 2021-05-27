import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { StayDetails } from './pages/StayDetails';
import { UserDetails } from './pages/UserDetails';
import { Explore } from './pages/Explore';
import { LoginSignup } from './pages/LoginSignup';
import { Home } from './pages/Home';
import { Header } from './cmps/Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { loadStays } from './store/actions/stayActions'
import { addTrip, loadTrip } from './store/actions/tripActions'
import { updateUser, loadUsers } from './store/actions/userActions'

class _App extends Component {

  componentDidMount() {
    this.props.loadStays()
    this.props.loadUsers()
  }

  onSearch = (trip) => {
    this.props.addTrip(trip);
    this.props.loadStays(trip)
  }



  render() {

    const { stays, orders, updateUser, trip, addTrip } = this.props

    return (
      <Router>
        <Header trip={trip} addTrip={addTrip} onSearch={this.onSearch} />
        <Switch>
          <Route path='/login' component={LoginSignup} />
          <Route path='/stay/:stayId' component={StayDetails} />
          <Route path='/explore' render={() => (<Explore stays={stays} />)} />
          <Route path='/stay' render={() => (<StayDetails />)} />
          <Route path='/user' render={() => (<UserDetails updateUser={updateUser} />)} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stays: state.stayModule.stays,
    // orders: state.ordersModule.order,
    // users: state.usersModule.user
    trip: state.tripModule.trip,
    users: state.userModule.users
  }
}

const mapDispatchToProps = {
  loadStays,
  addTrip,
  updateUser,
  loadUsers,
  loadTrip
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)

// 