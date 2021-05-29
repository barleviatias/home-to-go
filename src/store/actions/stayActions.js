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

export function loadHostStays(hostId) {
  return async dispatch => {
    try {
      const stays = await stayService.getHostStays(hostId)
      dispatch({ type: 'SET_HOST_STAYS', stays })

    } catch (err) {
      console.log('StayActions: err in loadHostStays', err)
    }
  }
} 