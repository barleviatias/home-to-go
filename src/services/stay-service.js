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
    // getStayImage,
    // getPriceData,
    // getDateData
}

window.stayService = stayService
// Note: due to async, must run one by one...
// stayService.signup({fullname: 'Puki Norma', stayname: 'stay1', password:'123',score: 100, isAdmin: false})
// stayService.signup({fullname: 'Master Adminov', stayname: 'admin', password:'123', score: 100, isAdmin: true})
// stayService.signup({fullname: 'Muki G', stayname: 'muki', password:'123', score: 100})

function query(filterBy = { searchTxt: '', availability: 'all', sortBy: 'all', type: 'all' }) {
    return storageService.query('stay')
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
    return storageService.put('stay', stay)
    // stay.imgUrl = await getStayImage(stay.name)
    // stay.msgs = []
    // return await httpService.post(`stay`, stay)
    // Handle case in which admin updates other stay's details
    // if (getLoggedinStay()._id === stay._id) _saveLocalStay(stay)
}

// async function getStayImage(txt) {
//     const res = await axios.get(`https://pixabay.com/api/?key=${IMG_API_KEY}&q=${txt}&image_type=photo`)
//     if (res.data.hits.length === 0 || !res.data.hits[0] || !res.data.hits[0].webformatURL) return "https://images-na.ssl-images-amazon.com/images/I/61%2B-nrfoudS._AC_SX425_.jpg"
//     const imgUrl = res.data.hits[0].webformatURL
//     return imgUrl
// }

// async function getPriceData() {
//     const stays = await query()
//     return stays.reduce((acc, stay) => {
//         const { type } = stay
//         if (!acc[type]) acc[type] = 0
//         acc[type] += stay.price
//         return acc
//     }, {})
// }

// async function getDateData() {
//     const stays = await query()
//     return stays.reduce((acc, stay, idx) => {
//         const { createdAt } = stay
//         const year = new Date(createdAt).getFullYear()
//         if (!acc[year]) acc[year] = 0
//         acc[year]++
//         return acc
//     }, {})
// }




