import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { StayDetails } from './pages/StayDetails';
import { Explore } from './pages/Explore';
import { LoginSignup } from './pages/LoginSignup';
import { Home } from './pages/Home';
import { Header } from './cmps/Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { loadStays } from './store/actions/stayActions'

class _App extends Component {

  componentDidMount() {
    this.props.loadStays()
  }

  render() {

    const { stays, users, orders } = this.props

    return (
      <Router>
        <Header />
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
  }
}

const mapDispatchToProps = {
  loadStays
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)
