const initialState = {
  trip: { guests: { adults: 0, kids: 0, baby: 0 }, loc: { address: '' }, time: { checkIn: '', checkOut: '' } }
}

export function tripReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_TRIP':
      return { trip: action.trip }
    case 'ADD_TRIP':
      return { ...state, stays: [...state.stays, action.stay] }
    case 'REMOVE_TRIP':
      return { trip: null }
    default:
      return state
  }
}
