import { StayList } from '../cmps/explore/StayList'
import { StayFilter } from '../cmps/explore/StayFilter'


export function Explore({ stays, trip }) {

  function scrollUp() {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }

  scrollUp()

  return (
    <main className="explore-container page">
      <span>{stays.length}+ stays</span>
      <h1>Find Places to stay {trip && trip.loc && trip.loc.address && `in ${trip.loc.address}` }</h1>
      <StayFilter />
      <StayList stays={stays} />

    </main>
  )
}
