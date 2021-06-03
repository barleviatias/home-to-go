import { tripService } from '../services/trip-service'
import { utilService } from '../services/util-service'
import { httpService } from './http.service'

export const orderService = {
    query,
    remove,
    add,
    getHostOrders,
    getUserOrders
}

window.orderService = orderService

async function query(user = { id: null, type: 'all', filterBy: { num: 1, name: 'ifek' } }) {
    const orders = await httpService.get(`order`, user)
    return orders;
}

async function add(trip, stay, loggedInUser) {
    const order = {
        _id: utilService.makeId(),
        createdAt: Date.now(),
        endDate: trip.time.checkOut,
        startDate: trip.time.checkIn,
        guests: trip.guests,
        host: stay.host,
        status: 'pending',
        stay: { _id: stay._id, name: stay.name, price: stay.price },
        totalPrice: trip.totalPrice,
        user: loggedInUser
    }

    tripService.remove()
    return await httpService.post(`order`, order)
}

async function getHostOrders(userId) {
    var orders = query('order', { id: userId, type: 'host' })
    orders = orders.filter(order => {
        return order.host._id === userId
    })
    return orders
}

async function getUserOrders(userId) {
    var orders = query('order', { id: userId, type: 'user' })
    orders = orders.filter(order => {
        return order.host._id === userId
    })
    return orders
}

function remove(orderId) {
    return httpService.delete(`order/${orderId}`)
}

