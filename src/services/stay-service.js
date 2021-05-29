import { storageService } from './asyncStorageService'

// import axios from 'axios'
// import { httpService } from './http.service'
// const SCORE_FOR_REVIEW = 10
// const IMG_API_KEY = '20031048-f5c2a8cb9ae058a58da123891'

export const stayService = {
    query,
    getById,
    remove,
    update,
    add,
    getTopRatedStays,
    getNearbyStays,
    getHostStays
    // getStayImage,
    // getPriceData,
    // getDateData
}

window.stayService = stayService
// Note: due to async, must run one by one...
// stayService.signup({fullname: 'Puki Norma', stayname: 'stay1', password:'123',score: 100, isAdmin: false})
// stayService.signup({fullname: 'Master Adminov', stayname: 'admin', password:'123', score: 100, isAdmin: true})
// stayService.signup({fullname: 'Muki G', stayname: 'muki', password:'123', score: 100})

function query(trip) {
    return storageService.query('stay', trip)

    // var queryStr = `?availability=${filterBy.availability}&searchTxt=${filterBy.searchTxt}&sortBy=${filterBy.sortBy}&type=${filterBy.type}`
    // return httpService.get(`stay${queryStr}`)
}

function getById(stayId) {
    return storageService.get('stay', stayId)
    // return httpService.get(`stay/${stayId}`)
}

function remove(stayId) {
    return storageService.remove('stay', stayId)
    // return httpService.delete(`stay/${stayId}`)
}

async function update(stay) {
    return storageService.put('stay', stay)
    // return await httpService.put(`stay/${stay._id}`, stay)
    // Handle case in which admin updates other stay's details
    // if (getLoggedinStay()._id === stay._id) _saveLocalStay(stay)
}

async function add(stay) {

    const currStay ={
        "name": stay.name,
        "imgUrls": [
            "https://a0.muscache.com/im/pictures/bd67daca-84a4-44e9-952d-11162ba76242.jpg?im_w=1200",
            "https://a0.muscache.com/im/pictures/533919e9-d77c-4dfc-94a5-3b71d6c41792.jpg?im_w=720",
            "https://a0.muscache.com/im/pictures/miso/Hosting-4869137/original/179b4e72-c3ed-4198-b274-bbc4c67276f2.jpeg?im_w=720",
            "https://a0.muscache.com/im/pictures/miso/Hosting-4869137/original/efaab6c2-f21a-40aa-a32a-a37b08711af4.jpeg?im_w=720",
            "https://a0.muscache.com/im/pictures/miso/Hosting-4869137/original/e5a8c40e-f26b-45fb-84c2-55845256e963.jpeg?im_w=720"
        ],
        "price": stay.price,
        "desc": stay.desc,
        "capacity": 8,
        "favorites": [
            {
                "userId": "u109"
            }
        ],
        "amenities": getAmeneties(stay.amenities)
        ,
        "stayType": "entire place",
        "propertyType": "loft",
        "host": {
            "_id": "u101",
            "fullname": "Mor Levi",
            "imgUrl": "https://randomuser.me/api/portraits/men/1.jpg"
        },
        "loc": {
            "country": "France",
            "countryCode": "PT",
            "address": "Paris, France",
            "lat": -8.61308,
            "lng": 41.1413
        },
        "reviews": []
            }
    
    return storageService.post('stay', currStay)
    // stay.imgUrl = await getStayImage(stay.name)
    // stay.msgs = []
    // return await httpService.post(`stay`, stay)
    // Handle case in which admin updates other stay's details
    // if (getLoggedinStay()._id === stay._id) _saveLocalStay(stay)
}



// async function getTopRatedStays(stays) {
//     stays = stays.map(stay => {
//         stay.avgRate = _getRate(stay);
//         return stay
//     })
//     stays.sort(function (a, b) {
//         return b.avgRate - a.avgRate
//     })
//     return stays.slice(0, 4)
//     // var queryStr = `?availability=${filterBy.availability}&searchTxt=${filterBy.searchTxt}&sortBy=${filterBy.sortBy}&type=${filterBy.type}`
//     // return httpService.get(`stay${queryStr}`)
// }
async function getTopRatedStays() {
    var stays = await storageService.query('stay')
    stays = stays.map(stay => {
        stay.avgRate = _getRate(stay);
        return stay
    })
    stays.sort(function (a, b) {
        return b.avgRate - a.avgRate
    })
    return stays.slice(0, 4)
    // var queryStr = `?availability=${filterBy.availability}&searchTxt=${filterBy.searchTxt}&sortBy=${filterBy.sortBy}&type=${filterBy.type}`
    // return httpService.get(`stay${queryStr}`)
}

function _getRate(stay) {
    const rates = stay.reviews.map(review => review.avgRate)
    const sum = rates.reduce((acc, rate) => {
        acc += rate
        return acc
    }, 0)
    return sum / rates.length
}

async function getNearbyStays(location) {
    var stays = await storageService.query('stay')
    stays = stays.filter(stay => {
        return stay.loc.address.toUpperCase().includes(location.toUpperCase())
    })
    return stays.slice(0, 4)
    // var queryStr = `?availability=${filterBy.availability}&searchTxt=${filterBy.searchTxt}&sortBy=${filterBy.sortBy}&type=${filterBy.type}`
    // return httpService.get(`stay${queryStr}`)
}

async function getHostStays(userId) {
    var stays = await storageService.query('stay')
    stays = stays.filter(stay => {
        return stay.host._id === userId
    })
    return stays
   
    // var queryStr = `?availability=${filterBy.availability}&searchTxt=${filterBy.searchTxt}&sortBy=${filterBy.sortBy}&type=${filterBy.type}`
    // return httpService.get(`stay${queryStr}`)
}

function getAmeneties(amenities){
    const currAmenities=[]
    for (const key in amenities){
        if (amenities[key]){
            currAmenities.push(key)
        }
    } 
    console.log('currAmenities',currAmenities);
    return currAmenities
}







