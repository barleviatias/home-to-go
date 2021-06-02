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

  onfilterStays = (filterBy) => {
    // console.log(filterBy);
    var stays = filterStays(this.state.stays, filterBy)
    console.log('filtered satys', stays);

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
        <StayFilter openDynamicModal={openDynamicModal} closeDynamicModal={closeDynamicModal} setModalContent={setModalContent} onfilterStays={this.onfilterStays} />
        <StayList stays={stays} updateUser={updateUser} loggedInUser={loggedInUser} />
      </main>
    )
  }
}

function filterStays(stays, filterBy) {
  console.log('filterStays', stays, filterBy);
  let filteredStays = [];
  stays.forEach(stay => {
    if (_isTypePlace(stay, filterBy.placeType)) filteredStays.unshift(stay);
  })
  return filteredStays

  // && _isPropertyType(stay, filterBy.propertyType) &&
  //     _isPrice(stay, filterBy.price)
  // && _isAmenities(stay, filterBy.amenities)
}

function _isTypePlace(stay, filter) {
  return (stay.stayType === filter) ? true : false
}
function _isPropertyType(stay, filter) {
  return (stay.propertyType === filter) ? true : false
}
function _isPrice(stay, filter) {
  return (stay.price <= filter) ? true : false
}
function _isAmenities(stay, filter) {
  var _isAmenities = true;
  return stay.amenities.forEach(amenity => {

  })
}