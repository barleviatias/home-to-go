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
<<<<<<< HEAD
import { addTrip } from './store/actions/tripActions'
=======
import { updateUser ,loadUsers } from './store/actions/userActions'
>>>>>>> e063d9a8f5e98f168aaffdf501b0a073e4c8d071

class _App extends Component {

  componentDidMount() {
    this.props.loadStays()
    this.props.loadUsers()
  }

  render() {
<<<<<<< HEAD

    const { stays, users, orders, trip, addTrip } = this.props
=======
    console.log(this.props);
    const { stays,  orders ,updateUser } = this.props
>>>>>>> e063d9a8f5e98f168aaffdf501b0a073e4c8d071

    return (
      <Router>
        <Header trip={trip} addTrip={addTrip} />
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
<<<<<<< HEAD
    // users: state.usersModule.user
    trip: state.tripModule.trip
=======
    users: state.userModule.users
>>>>>>> e063d9a8f5e98f168aaffdf501b0a073e4c8d071
  }
}

const mapDispatchToProps = {
  loadStays,
<<<<<<< HEAD
  addTrip
=======
  updateUser,
  loadUsers
>>>>>>> e063d9a8f5e98f168aaffdf501b0a073e4c8d071
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)

// 