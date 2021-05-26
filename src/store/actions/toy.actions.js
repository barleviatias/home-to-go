import { toyService } from '../../services/toy-service.js';

export function loadToys(filterBy = { txt: '', type: 'All', }) {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_TOYS', isLoading: true })
            const toys = await toyService.query(filterBy)
            dispatch({ type: 'SET_TOYS', toys })
        } catch (err) {
            console.log('ToysActions: err in loadToys', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}

// export function loadToys(filterBy = { txt: '', type: 'All', }) {
//     return dispatch => {
//         dispatch({ type: 'LOADING_TOYS', isLoading: true });
//         return toyService.query(filterBy)
//             .then(toys => {
//                 const actions = {
//                     type: 'SET_TOYS',
//                     toys
//                 }
//                 dispatch(actions);
//             })
//             .catch(err => {
//                 dispatch({ type: 'TOY_ERR', err })
//             })
//     }
// }

export function removeToy(toyId) {
    return async dispatch => {
        try {
            await toyService.remove(toyId)
            dispatch({ type: 'REMOVE_TOY', toyId })
        } catch (err) {
            console.log('ToysActions: err in removeToy', err)
        }
    }
}

// export function removeToy(toyId) {
//     return dispatch => {
//         return toyService.remove(toyId)
//             .then(() => {
//                 const actions = {
//                     type: 'REMOVE_TOY',
//                     toyId
//                 }
//                 dispatch(actions);
//             })
//     }
// }

export function saveToy(toyDetails) {
    return async dispatch => {
      try {
        const savedToy = await toyService.signup(toyDetails)
        dispatch({ type: 'Add_TOY', savedToy })
      } catch (err) {
        console.log('ToyActions: err in saveToy', err)
      }
    }
  }

// export function saveToy(toy) {
//     return dispatch => {
//         return toyService.save(toy)
//             .then((savedToy) => {
//                 const action = {
//                     type: 'Add_TOY',
//                     toy: savedToy
//                 }
//                 dispatch(action)
//             })
//     }
// }