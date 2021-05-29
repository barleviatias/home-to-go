import { orderService } from '../../services/order-service'
import { userService } from '../../services/user-service'


export function loadOrders() {
  return async dispatch => {
    try {
      const orders = await orderService.query()
      dispatch({ type: 'SET_ORDERS', orders })

    } catch (err) {
      console.log('OrderActions: err in loadOrders', err)
    }
  }
}

export function addOrder(order) {
  console.log('action:' ,order);
  return async dispatch => {
    try {
      const addedOrder = await orderService.add(order)
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
