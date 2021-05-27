const initialState = {
  trip: null
}

export function tripReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_TRIP':
      return { trip: action.trip }
    // case 'ADD_TRIP':
    //   return { ...state, stays: [...state.stays, action.stay] }
    case 'REMOVE_TRIP':
      return { trip: null }
    default:
      return state
  }
}
