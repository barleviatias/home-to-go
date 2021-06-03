import { StayList } from '../cmps/explore/StayList'
import { StayFilter } from '../cmps/explore/StayFilter'
import { Component } from 'react'


export class Wishlist extends Component {
    componentDidMount(){
      this.props.loadWishlist(this.props.loggedInUser)      
    }

   scrollUp=()=> {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }

  
  render(){
    
    this.scrollUp()
    const {stays}=this.props
    return (
      <main className="explore-container page">
      <span>{stays.length}+ stays</span>
      <h1>Wishlist</h1>
      <StayList stays={stays} />

    </main>
  )
}
}
