import { Component } from 'react'
import { FilterGallery } from '../cmps/home/FilterGallery'
import { Banner } from '../cmps/home/Banner'
import { Hero } from '../cmps/home/Hero'
import { stayService } from '../services/stay-service.js'
import {FilterCities} from '../cmps/home/FilterCities'


export class Home extends Component {

  state = {
    topRatedStays: [],
    nearbayStays: []
  }
  componentDidMount() {
    this.loadRated();
    this.loadNearby();
  }

  loadRated = async () => {
    const topRated = await stayService.getTopRatedStays();
    this.setState({ topRatedStays: topRated })
  }

  loadNearby = async () => {
    const nearby = await stayService.getNearbyStays('Israel');
    this.setState({ nearbayStays: nearby })
  }


  render() {
    const { loggedInUser ,onSearch} = this.props
    const { topRatedStays, nearbayStays } = this.state

    return (
      <main className="home-page">
        <Hero />
        <h1>Popular destinations</h1>
        <FilterCities onSearch={onSearch} />
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
