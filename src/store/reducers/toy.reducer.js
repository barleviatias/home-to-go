

const initialState = {
    toys: [],
    shoppingCart: [],
    isLoading: false,
    err: null
}

export function toyReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TOYS':
            return { ...state, toys: action.toys, isLoading: false }
        case 'LOADING_TOYS':
            return { ...state, err: null, isLoading: action.isLoading }
        case 'TOY_ERR':
            return { ...state, err: action.err, isLoading: false }
        case 'REMOVE_TOY':
            return { ...state, toys: state.toys.filter(toy => toy._id !== action.toyId) }
        case 'Add_TOY':
            return { ...state, toys: [...state.toys, action.toy] }
        default:
            return state
    }
}