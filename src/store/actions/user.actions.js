import { userService } from '../../services/user-service.js';



export function login(userCreds) {
    return async dispatch => {
      try {
        const user = await userService.login(userCreds)
        dispatch({ type: 'SET_USER', user })
      } catch (err) {
        console.log('UserActions: err in login', err)
      }
    }
  }


// export function login(credentials) {
//     return dispatch => {
//         return userService.login(credentials)
//             .then((user) => {
//                 const action = {
//                     type: 'SET_USER',
//                     user
//                 }
//                 dispatch(action);
//                 return user;
//             })
//     }
// }



export function signup(userCreds) {
    return async dispatch => {
      try {
        const user = await userService.signup(userCreds)
        dispatch({ type: 'SET_USER', user })
      } catch (err) {
        console.log('UserActions: err in signup', err)
      }
    }
  }

// export function signup(credentials) {
//     return dispatch => {
//         return userService.signup(credentials)
//             .then(user => {
//                 const action = {
//                     type: 'SET_USER',
//                     user
//                 }
//                 dispatch(action);
//                 return user;
//             })
//     }
// }

export function logout() {
    return async dispatch => {
      try {
        await userService.logout()
        dispatch({ type: 'SET_USER', user: null })
      } catch (err) {
        console.log('UserActions: err in logout', err)
      }
    }
  }