import { Component } from 'react'
import { FilterGallery } from '../cmps/home/FilterGallery'
import { Banner } from '../cmps/home/Banner'
// import { Hero } from '../cmps/home/Hero'


export class Home extends Component {

  render() {

    return (

      <main>
        {/* <Hero/> */}
        <FilterGallery />
        <Banner name={'banner-top'} btnTxt={'Get inspired'} title={'The Gearest Outdoors'} subtitle={'Wishlists curated by Airbnb.'}/>
        <FilterGallery />
        <Banner name={'banner-bottom'} btnTxt={'Learn more'} title={'Become a host'} subtitle={'earn extra income and unlock new opportunities by sharing your space.'} />
      </main>

    )
  }
}
