import { Component } from 'react'
import { FilterGallery } from '../cmps/home/FilterGallery'
import { Banner } from '../cmps/home/Banner'
import { Hero } from '../cmps/home/Hero'
import { stayService } from '../services/stay-service.js'


export class Home extends Component {

  state = {
    topRatedStays: [],
    nearbayStays: []
  }
  componentDidMount() {
    this.loadRated();
    this.loadNearby();
  }

  loadRated = async() => {
    const topRated = await stayService.getTopRatedStays();
    this.setState({ topRatedStays: topRated })
  }

  loadNearby = async () => {
    const nearby = await stayService.getNearbyStays( 'portugal');
    this.setState({ nearbayStays: nearby })
  }


  render() {
    const { loggedInUser } = this.props
    const { topRatedStays, nearbayStays } = this.state

    return (

      <main className="home-page">
        <Hero />
        <h1>Explore nearby</h1>
        <FilterGallery stays={nearbayStays} />
        <Banner name={'banner-top'} btnTxt={'Get inspired'} title={'The Gearest Outdoors'} subtitle={'Wishlists curated by Airbnb.'} />
        <h1>Our Top Rated</h1>
        <FilterGallery stays={topRatedStays} />
        <Banner name={'banner-bottom'} btnTxt={'Learn more'} title={'Become a host'} subtitle={'earn extra income and unlock new opportunities by sharing your space.'} loggedInUser={loggedInUser} />
      </main>
    )
  }
}
