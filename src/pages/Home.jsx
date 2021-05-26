import { Component } from 'react'
import { FilterGallery } from '../cmps/home/FilterGallery'
import { Banner } from '../cmps/home/Banner'


export class Home extends Component {

  render() {

    return (

      <main>
        <FilterGallery />
        <Banner name={'banner-top'} />
        <FilterGallery />
        <Banner name={'banner-bottom'} />
      </main>

    )
  }
}
