import { storageService } from './asyncStorageService'
import {userService} from '../services/user-service'
import {tripService} from '../services/trip-service'
import {utilService} from '../services/util-service'

// import axios from 'axios'
// import { httpService } from './http.service'
// const SCORE_FOR_REVIEW = 10
// const IMG_API_KEY = '20031048-f5c2a8cb9ae058a58da123891'

export const orderService = {
    query,
    getById,
    remove,
    update,
    add,
    getHostOrders
}

window.orderService = orderService

function query(trip) {
    return storageService.query('order', trip)

    // var queryStr = `?availability=${filterBy.availability}&searchTxt=${filterBy.searchTxt}&sortBy=${filterBy.sortBy}&type=${filterBy.type}`
    // return httpService.get(`order${queryStr}`)
}

function getById(orderId) {
    return storageService.get('order', orderId)

    // return httpService.get(`order/${orderId}`)
}

function remove(orderId) {
    return storageService.remove('order', orderId)

    // return httpService.delete(`order/${orderId}`)
}

async function update(order) {
    return storageService.put('order', order)

    // return await httpService.put(`order/${order._id}`, order)
    // Handle case in which admin updates other order's details
    // if (getLoggedinOrder()._id === order._id) _saveLocalOrder(order)
}

async function add(trip, stay , loggedInUser) {
    const order = {
        _id: utilService.makeId(),
        createdAt: Date.now(),
        endDate: trip.time.checkOut,
        startDate: trip.time.checkIn,
        guests: trip.guests,
        host: stay.host,
        status: 'pending',
        stay: {_id: stay._id , name: stay.name , price: stay.price},
        totalPrice: trip.totalPrice,
        user: loggedInUser
    }
    tripService.remove()
    return storageService.post('order', order)

    // order.imgUrl = await getOrderImage(order.name)
    // order.msgs = []
    // return await httpService.post(`order`, order)
    // Handle case in which admin updates other order's details
    // if (getLoggedinOrder()._id === order._id) _saveLocalOrder(order)
}


async function getHostOrders(userId) {
    var orders = await storageService.query('order')
    orders = orders.filter(order => {
        return order.host._id === userId
    })
    return orders

}









