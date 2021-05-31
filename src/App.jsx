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
import { loadStays, removeStay, loadHostStays } from './store/actions/stayActions'
import { loadOrders, removeOrder } from './store/actions/orderActions'
import { addTrip, loadTrip } from './store/actions/tripActions'
import { updateUser, loadUsers, logout } from './store/actions/userActions'
import { DynamicModal } from './cmps/app/DynamicModal';
import { UserMsg } from './cmps/app/UserMsg';

class _App extends Component {

  state = {
    userMsg: '',
    isUserMsg: false,
    modalType: '',
    dynamicModal: {
      modalContent: '',
      modalPosition: { top: 0, left: 0, height: 0, width: 0 }
    }
  }

  componentDidMount() {
    this.props.loadStays()
    this.props.loadUsers()
  }

  onSearch = (trip) => {
    this.props.addTrip(trip);
    this.props.loadStays(trip);
  }

  toggleMsgModal = (msg) => {
    this.setState({ userMsg: msg, isUserMsg: true })
    setTimeout(() => {
      this.setState({ isUserMsg: false })
    }, 3000);
    setTimeout(() => {
      this.setState({ userMsg: '' })
    }, 6000);
  }

  setModalContent = (dynamicModal , modalType) => {
    console.log('setModalContent: ', dynamicModal , modalType);
    this.setState({ dynamicModal , modalType})
  }

  closeDynamicModal = (ev) => {
    console.log('close:', ev);
    if (!ev.target.closest(".dynamic-modal") && ev.target !== "button") {
      console.log(ev.target);
      this.setState({ modalType: '' }, () => { window.removeEventListener('click', this.closeDynamicModal, true) })
    }
  }

  openDynamicModal = (modalType) => {
    console.log('open: ' , modalType);
    this.setState({ modalType }, () => { window.addEventListener('click', this.closeDynamicModal, true) })
  }

  render() {

    const { stays, orders, updateUser, trip, addTrip, loggedInUser, logout, loadStays, loadOrders, removeOrder } = this.props
    const { userMsg, isUserMsg, modalType, dynamicModal } = this.state

    return (
      <Router>
        <Header trip={trip} addTrip={addTrip} modalType={modalType} onSearch={this.onSearch} loggedInUser={loggedInUser} logout={logout} openDynamicModal={this.openDynamicModal} setModalContent={this.setModalContent} />
        <Switch>
          <Route path='/login' component={LoginSignup} />
          <Route path='/orders' render={(props) => (<Orders {...props} loadOrders={loadOrders} orders={orders} loggedInUser={loggedInUser} removeOrder={removeOrder} toggleMsgModal={this.toggleMsgModal} />)} />
          <Route path='/host/:userId' render={(props) => (<Dashboard {...props} loggedInUser={loggedInUser} updateUser={updateUser} toggleMsgModal={this.toggleMsgModal} />)} />
          <Route path='/host' render={(props) => (<BecomeHost {...props} loggedInUser={loggedInUser} />)} />
          <Route path='/stay/:stayId' render={(props) => (<StayDetails {...props} onSearch={this.onSearch} toggleMsgModal={this.toggleMsgModal} openDynamicModal={this.openDynamicModal} modalType={modalType} setModalContent={this.setModalContent} />)} />
          <Route path='/explore' render={(props) => (<Explore {...props} trip={trip} stays={stays} />)} />
          <Route path='/user' render={(props) => (<UserDetails {...props} updateUser={updateUser} />)} />
          <Route path='/' render={(props) => (<Home {...props} stays={stays} loggedInUser={loggedInUser} loadStays={loadStays} />)} />
        </Switch>

        <DynamicModal openDynamicModal={this.openDynamicModal} modalPosition={dynamicModal.modalPosition} modalType={modalType}>
          {dynamicModal.modalContent}
        </DynamicModal>

        <UserMsg>
          <section className={`user-msg ${isUserMsg && 'on'} `}>
            {userMsg}
          </section>
        </UserMsg>
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
  loadOrders,
  removeOrder
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)

// 