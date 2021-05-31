import { StayList } from '../cmps/explore/StayList'
import { StayFilter } from '../cmps/explore/StayFilter'
import { Component } from 'react'
// import { render } from '@testing-library/react'


export class Explore extends Component {

  componentDidMount(){  
  this.props.loadStays()    
  }
  // scrollUp=()=> {
  //   window.scroll({
  //     top: 0,
  //     behavior: 'smooth'
  //   })
  // }
  
  // scrollUp()
  render() { 
    const {stays, trip, loggedInUser,updateUser} = this.props
  return (
    <main className="explore-container page">
      <span>{stays.length}+ stays</span>
      <h1>Find Places to stay {trip && trip.loc && trip.loc.address && `in ${trip.loc.address}` }</h1>
      <StayFilter />
      <StayList stays={stays} updateUser={updateUser} loggedInUser={loggedInUser}/>

    </main>
  )
}
}