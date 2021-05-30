import { tripService } from '../../services/trip-service'



export function loadTrip() {
  return dispatch => {
    const trip = tripService.query()
    console.log(trip);
    dispatch({ type: 'SET_TRIP', trip })
  }
}

export function addTrip(trip) {
  return dispatch => {
    const addedTrip = tripService.add(trip)
    console.log();
    dispatch({ type: 'SET_TRIP', trip: addedTrip })
  }
}

export function removeTrip() {
  return dispatch => {
    tripService.remove()
    dispatch({ type: 'REMOVE_TRIP' })
  }
}
