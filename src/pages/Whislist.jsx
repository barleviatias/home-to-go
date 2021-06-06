import { StayList } from '../cmps/explore/StayList'
import { Component } from 'react'


export class Wishlist extends Component {

  componentDidMount() {
    this.props.loadWishlist(this.props.loggedInUser)
    this.props.setHomePage('wishlist')
  }

  scrollUp = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }


  render() {

    this.scrollUp()
<<<<<<< HEAD
    const { stays, loggedInUser, toggleMsgModal, login,   updateUser, trip, addTrip} = this.props
=======
    const { stays, loggedInUser, toggleMsgModal, login, updateUser} = this.props
>>>>>>> 6be3554d19d460833ea4c2b6c974cb415b5e8d6e
    return (
      <main className="explore-container wishlist main page">
        <span>{stays.length} stays</span>
        <h1>Wishlist</h1>
        <StayList stays={stays} updateUser={updateUser} toggleMsgModal={toggleMsgModal} loggedInUser={loggedInUser} login={login} trip={trip} addTrip={addTrip} />

      </main>
    )
  }
}
