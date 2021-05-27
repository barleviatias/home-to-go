import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { StayDetails } from './pages/StayDetails';
import { Explore } from './pages/Explore';
import { LoginSignup } from './pages/LoginSignup';
import { Home } from './pages/Home';
import { Header } from './cmps/Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { loadStays } from './store/actions/stayActions'
import { addTrip } from './store/actions/tripActions'

class _App extends Component {

  componentDidMount() {
    this.props.loadStays()
  }

  render() {

    const { stays, users, orders, trip, addTrip } = this.props

    return (
      <Router>
        <Header trip={trip} addTrip={addTrip} />
        <Switch>
          <Route path='/login' component={LoginSignup} />
          <Route path='/stay/:stayId' component={StayDetails} />
          <Route path='/explore' render={() => (<Explore stays={stays} />)} />
          <Route path='/stay' render={() => (<StayDetails />)} />
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
    trip: state.tripModule.trip
  }
}

const mapDispatchToProps = {
  loadStays,
  addTrip
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)

// 