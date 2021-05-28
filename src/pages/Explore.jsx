import { StayList } from '../cmps/explore/StayList'
import { StayFilter } from '../cmps/explore/StayFilter'


export function Explore({ stays }) {

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
      <h1>Find Places to stay</h1>
      <StayFilter />
      <StayList stays={stays} />

    </main>
  )
}
