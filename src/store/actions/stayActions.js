import { stayService } from '../../services/stay-service'
import { userService } from '../../services/user-service'


export function loadStays(trip) {
  return async dispatch => {
    try {
      const stays = await stayService.query(trip)
      dispatch({ type: 'SET_STAYS', stays })

    } catch (err) {
      console.log('StayActions: err in loadStays', err)
    }
  }
}

export function addStay(stay) {
  return async dispatch => {
    try {
      const addedStay = await stayService.add(stay)
      dispatch({ type: 'ADD_STAY', stay: addedStay })

      const score = await userService.increaseScore()
      dispatch({ type: 'SET_SCORE', score })
      
    } catch (err) {
      console.log('StayActions: err in addStay', err)
    }
  }
}

export function removeStay(stayId) {
  return async dispatch => {
    try {
      await stayService.remove(stayId)
      dispatch({ type: 'REMOVE_STAY', stayId })
    } catch (err) {
      console.log('StayActions: err in removeStay', err)
    }
  }
}

export function loadTopRated() {
  return async dispatch => {
    try {
      const stays = await stayService.getTopRatedStays()
      dispatch({ type: 'SET_TOP_RATED', stays })

    } catch (err) {
      console.log('StayActions: err in getTopRated', err)
    }
  }
}

export function loadNearby(location) {
  return async dispatch => {
    try {
      const stays = await stayService.getNearbyStays(location)
      dispatch({ type: 'SET_NEARBY', stays })

    } catch (err) {
      console.log('StayActions: err in getNearbyStays', err)
    }
  }
} 