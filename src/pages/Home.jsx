import { Component } from 'react'
import { FilterGallery } from '../cmps/home/FilterGallery'
import { Banner } from '../cmps/home/Banner'
// import { Hero } from '../cmps/home/Hero'


export class Home extends Component {

  render() {

    return (

      <main>
        {/* <Hero/> */}
        <h3>Our Top Rated</h3>
       {this.props.topRatedStays&& <FilterGallery stays={this.props.topRatedStays} />}
        <Banner name={'banner-top'} btnTxt={'Get inspired'} title={'The Gearest Outdoors'} subtitle={'Wishlists curated by Airbnb.'}/>
        <h3>Explore nearby</h3>
        <FilterGallery stays={this.props.nearbayStays} /> 
        <Banner name={'banner-bottom'} btnTxt={'Learn more'} title={'Become a host'} subtitle={'earn extra income and unlock new opportunities by sharing your space.'} />
      </main>

    )
  }
}
