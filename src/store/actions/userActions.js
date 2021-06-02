import { userService } from '../../services/user-service'
// import { userService } from '../../store/reducers/'

// THUNK action creators
// Work asynchronously with the service and dispatch actions to the reducers 

export function loadUsers() {
  console.log('enter to here **************');
  return async dispatch => {
    try {
      // dispatch({ type: 'LOADING_START' })
      const users = await userService.getUsers()
      dispatch({ type: 'SET_USERS', users })
    } catch (err) {
      console.log('UserActions: err in loadUsers', err)
    } 
    // finally {
    //   // dispatch({ type: 'LOADING_DONE' })
    // }
  }
}

export function removeUser(userId) {
  return async dispatch => {
    try {
      await userService.remove(userId)
      dispatch({ type: 'REMOVE_USER', userId })
    } catch (err) {
      console.log('UserActions: err in removeUser', err)
    }
  }
}

export function updateUser(user) {
  return async dispatch => {
    try {
      const updatedUser = await userService.update(user)
      console.log('UPDATE!!!!' , updatedUser);
      
      dispatch({ type: 'UPDATE_USER', user: updatedUser })
    } catch (err) {
      console.log('UserActions: err in updateUser', err)
    }
  }
}
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
