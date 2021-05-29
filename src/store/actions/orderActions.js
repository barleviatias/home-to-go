import { orderService } from '../../services/order-service'
import { userService } from '../../services/user-service'


export function loadOrders(user) {
  console.log(user);
  return async dispatch => {
    try {
      const orders = await orderService.query(user)
      dispatch({ type: 'SET_ORDERS', orders })
    } catch (err) {
      console.log('OrderActions: err in loadOrders', err)
    }
  }
}

export function addOrder(trip ,stay, loggedInUser) {
  console.log('action:' ,trip);
  return async dispatch => {
    try {
      const addedOrder = await orderService.add(trip, stay, loggedInUser)
      dispatch({ type: 'ADD_ORDER', order: addedOrder })

      // const score = await userService.increaseScore()
      // dispatch({ type: 'SET_SCORE', score })
      
    } catch (err) {
      console.log('OrderActions: err in addOrder', err)
    }
  }
}

export function removeOrder(orderId) {
  return async dispatch => {
    try {
      await orderService.remove(orderId)
      dispatch({ type: 'REMOVE_ORDER', orderId })
    } catch (err) {
      console.log('OrderActions: err in removeOrder', err)
    }
  }
}
