import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { StayDetails } from './pages/StayDetails';
import { UserDetails } from './pages/UserDetails';
import { Explore } from './pages/Explore';
import { Wishlist } from './pages/Whislist';
import { LoginSignup } from './pages/LoginSignup';
import { Home } from './pages/Home';
import { Header } from './cmps/Header';
import { Footer } from './cmps/Footer';
import { Dashboard } from './pages/Dashboard';
import { Orders } from './pages/Orders';
import { BecomeHost } from './pages/BecomeHost';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
  loadStays,
  removeStay,
  loadHostStays,
  loadWishlist,
} from './store/actions/stayActions';
import { loadOrders, removeOrder } from './store/actions/orderActions';
import { addTrip, loadTrip } from './store/actions/tripActions';
import { updateUser, loadUsers, logout } from './store/actions/userActions';
import { DynamicModal } from './cmps/app/DynamicModal';
import { UserMsg } from './cmps/app/UserMsg';

class _App extends Component {
  state = {
    userMsg: '',
    isUserMsg: false,
    modalType: '',
    dynamicModal: {
      modalContent: '',
      modalPosition: { top: 0, left: 0, height: 0, width: 0 },
    },
  };

  componentDidMount() {
    this.props.loadStays();
    this.props.loadUsers();
  }
  // {
  //   guests: { adults: 1, kids: 0 },
  //   loc: { address: '' },
  //   time: { checkIn: '', checkOut: '' }

  onSearch = (trip) => {
    trip = {
      guests: trip.guests.adults + trip.guests.kids,
      loc: trip.loc,
      time: trip.time,
    };

    this.props.addTrip(trip);
    this.props.loadStays(trip);
  };

  toggleMsgModal = (msg) => {
    this.setState({ userMsg: msg, isUserMsg: true });
    setTimeout(() => {
      this.setState({ isUserMsg: false });
    }, 3000);
    setTimeout(() => {
      this.setState({ userMsg: '' });
    }, 6000);
  };

  setModalContent = (dynamicModal, modalType) => {
    console.log('setModalContent');
    this.setState({ dynamicModal, modalType });
  };

  closeDynamicModal = (ev) => {
    if (ev.type === 'scroll') {
      this.setState({ modalType: '' }, () => {
        window.removeEventListener('click', this.closeDynamicModal, true);
        window.removeEventListener('scroll', this.closeDynamicModal, true);
      });
      return;
    }
    console.log('closeDynamicModal');
    if (ev.target.closest('.dynamic-modal')) return;
    if (ev.target.nodeName === 'BUTTON') return;
    this.setState({ modalType: '' }, () => {
      window.removeEventListener('click', this.closeDynamicModal, true);
      window.removeEventListener('scroll', this.closeDynamicModal, true);
    });
  };

  openDynamicModal = (modalType) => {
    console.log('openDynamicModal');
    this.setState({ modalType }, () => {
      window.addEventListener('click', this.closeDynamicModal, true);
      window.addEventListener('scroll', this.closeDynamicModal, true);
    });
  };

  render() {
    const {
      stays,
      orders,
      updateUser,
      trip,
      addTrip,
      loggedInUser,
      logout,
      loadStays,
      loadOrders,
      removeOrder,
      loadWishlist
    } = this.props;
    const { userMsg, isUserMsg, modalType, dynamicModal } = this.state;

    return (
      <Router>
        <Header
          trip={trip}
          addTrip={addTrip}
          modalType={modalType}
          onSearch={this.onSearch}
          loggedInUser={loggedInUser}
          logout={logout}
          openDynamicModal={this.openDynamicModal}
          closeDynamicModal={this.closeDynamicModal}
          setModalContent={this.setModalContent}
        />
        <Switch>
          <Route path="/login" component={LoginSignup} />
          <Route
            path="/orders"
            render={(props) => (
              <Orders
                {...props}
                loadOrders={loadOrders}
                orders={orders}
                loggedInUser={loggedInUser}
                removeOrder={removeOrder}
                toggleMsgModal={this.toggleMsgModal}
              />
            )}
          />
          <Route
            path="/host/:userId"
            render={(props) => (
              <Dashboard
                {...props}
                loggedInUser={loggedInUser}
                updateUser={updateUser}
                toggleMsgModal={this.toggleMsgModal}
                loadOrders={loadOrders} orders={orders}
              />
            )}
          />
          <Route
            path="/host"
            render={(props) => (
              <BecomeHost {...props} loggedInUser={loggedInUser} />
            )}
          />
          <Route
            path="/wishlist"
            render={(props) => (
              <Wishlist
                {...props}
                stays={stays}
                loadWishlist={loadWishlist}
                loggedInUser={loggedInUser}
              />
            )}
          />
          <Route
            path="/stay/:stayId"
            render={(props) => (
              <StayDetails
                {...props}
                onSearch={this.onSearch}
                loggedInUser={loggedInUser}
                toggleMsgModal={this.toggleMsgModal}
                openDynamicModal={this.openDynamicModal}
                modalType={modalType}
                updateUser={updateUser}
                setModalContent={this.setModalContent}
              />
            )}
          />
          <Route
            path="/explore"
            render={(props) => (
              <Explore
                {...props}
                trip={trip}
                loadStays={loadStays}
                stays={stays}
                updateUser={updateUser}
                loggedInUser={loggedInUser}
              />
            )}
          />
          <Route
            path="/user"
            render={(props) => (
              <UserDetails {...props} updateUser={updateUser} />
            )}
          />
          <Route
            path="/"
            render={(props) => (
              <Home
                {...props}
                onSearch={this.onSearch}
                stays={stays}
                loggedInUser={loggedInUser}
                loadStays={loadStays}
              />
            )}
          />
        </Switch>
        {/* <Footer /> */}

				<DynamicModal
          openDynamicModal={this.openDynamicModal}
          modalPosition={dynamicModal.modalPosition}
          modalType={modalType}
        >
          {dynamicModal.modalContent}
        </DynamicModal>

        <UserMsg>
          <section className={`user-msg ${isUserMsg && 'on'} `}>
            {userMsg}
          </section>
        </UserMsg>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stays: state.stayModule.stays,
    orders: state.orderModule.orders,
    trip: state.tripModule.trip,
    users: state.userModule.users,
    loggedInUser: state.userModule.loggedInUser,
  };
};

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
  removeOrder,
  loadWishlist,
};

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);
