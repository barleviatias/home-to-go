import {StayList} from '../cmps/explore/StayList'
import {StayFilter} from '../cmps/explore/StayFilter'
 

export function Explore({ stays }) {

  return (
    <main className="explore-container">
      <span>{stays.length}+ stays</span>
    <h1>Find Places to stay</h1>
    <StayFilter/>
    <StayList stays={stays}/>

    </main>
  )
}
