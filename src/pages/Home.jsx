import { Component } from 'react'
import { FilterGallery } from '../cmps/home/FilterGallery'
import { Banner } from '../cmps/home/Banner'
import { Hero } from '../cmps/home/Hero'


export class Home extends Component {

  render() {
    const { loggedInUser, topRatedStays, nearbayStays } = this.props
    return (

      <main>
        <Hero />
        <h2>Our Top Rated</h2>
        {topRatedStays && <FilterGallery stays={topRatedStays} />}
        <Banner name={'banner-top'} btnTxt={'Get inspired'} title={'The Gearest Outdoors'} subtitle={'Wishlists curated by Airbnb.'} />
        <h2>Explore nearby</h2>
        <FilterGallery stays={nearbayStays} />
        <Banner name={'banner-bottom'} btnTxt={'Learn more'} title={'Become a host'} subtitle={'earn extra income and unlock new opportunities by sharing your space.'} loggedInUser={loggedInUser} />
      </main>

    )
  }
}
