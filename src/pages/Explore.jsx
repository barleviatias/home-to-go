import { StayList } from '../cmps/explore/StayList'
import { StayFilter } from '../cmps/explore/StayFilter'
import { Component } from 'react'

export class Explore extends Component {

  componentDidMount() {
    this.props.loadStays()
  }

  render() {
    const { stays, trip, loggedInUser, updateUser, openDynamicModal , closeDynamicModal, setModalContent} = this.props
    return (
      <main className="explore-container page">
        <span>{stays.length}+ stays</span>
        <h1>Find Places to stay {trip && trip.loc && trip.loc.address && `in ${trip.loc.address}`}</h1>
        <StayFilter openDynamicModal={openDynamicModal} closeDynamicModal={closeDynamicModal} setModalContent={setModalContent}  />
        <StayList stays={stays} updateUser={updateUser} loggedInUser={loggedInUser} />
      </main>
    )
  }
}

