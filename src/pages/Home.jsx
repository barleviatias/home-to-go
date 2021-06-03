import { FilterGallery } from '../cmps/home/FilterGallery'
import { Banner } from '../cmps/home/Banner'
import { Hero } from '../cmps/home/Hero'
import { FilterCities } from '../cmps/home/FilterCities'
import { render } from '@testing-library/react'
import { Component } from 'react'


export class Home extends Component {

  componentDidMount() {
    this.props.setHomePage(true)
    this.scrollUp()
  }

  componentWillUnmount() {
    this.props.setHomePage(false)
  }

  scrollUp = ()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }


  render() {
    const { loggedInUser, onSearch, topRatedStays, nearbayStays } = this.props

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
