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
        <Banner name={'banner-top'} />
        <FilterGallery />
        <Banner name={'banner-bottom'} />
      </main>

    )
  }
}
