import { stayService } from '../../services/stay-service'
import { userService } from '../../services/user-service'


export function loadStays() {
  return async dispatch => {
    try {
      const stays = await stayService.query()
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
