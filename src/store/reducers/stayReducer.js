const initialState = {
  stays: [],
  // topRatedStays: [],
  // nearbayStays: [],
  // loggedHostStays:[]
}

export function stayReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_TOP_RATED':
      return { ...state, stays: action.stays }
    case 'SET_HOST_STAYS':
      return { ...state, stays: action.stays }
    case 'SET_NEARBY':
      return { ...state, stays: action.stays }
    case 'SET_STAYS':
      return { ...state, stays: action.stays }
    case 'ADD_STAY':
      return { ...state, stays: [...state.stays, action.stay] }
    case 'REMOVE_STAY':
      return { ...state, stays: state.stays.filter(stay => stay._id !== action.stayId) }
    case 'UPDATE_STAY':
      return {
        ...state,
        stays: state.stays.map(stay =>
          stay._id === action.stay._id ? action.stay : stay
        )
      }
    default:
      return state
  }
}
