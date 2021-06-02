import { StayList } from '../cmps/explore/StayList'
import { StayFilter } from '../cmps/explore/StayFilter'
import { Component } from 'react'

export class Explore extends Component {

  state = {
    stays: []
  }

  componentDidMount() {
    this.setState({ stays: this.props.stays })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.stays !== this.props.stays) {
      this.setState({ stays: this.props.stays });
    }
  }

  // loadStays = async () => {
  //   console.log('loadStays');
  //   await this.props.loadStays(this.props.trip);
  //   console.log('props', this.props.stays);
  //   this.setState({ stays: this.props.stays })
  // }

  filterStays = (filterBy) => {
    var stays = this.state.stays;

  }

  render() {
    const { trip, loggedInUser, updateUser, openDynamicModal, closeDynamicModal, setModalContent } = this.props
    const { stays } = this.state
    // console.log(stays);
    if (!stays) return <h1>Loading....</h1>
    return (
      <main className="explore-container page">
        <span>{stays.length}+ stays</span>
        <h1>Find Places to stay {trip && trip.loc && trip.loc.address && `in ${trip.loc.address}`}</h1>
        <StayFilter openDynamicModal={openDynamicModal} closeDynamicModal={closeDynamicModal} setModalContent={setModalContent} />
        <StayList stays={stays} updateUser={updateUser} loggedInUser={loggedInUser} />
      </main>
    )
  }
}

