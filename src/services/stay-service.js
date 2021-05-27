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
// toyService.signup({fullname: 'Puki Norma', toyname: 'toy1', password:'123',score: 100, isAdmin: false})
// toyService.signup({fullname: 'Master Adminov', toyname: 'admin', password:'123', score: 100, isAdmin: true})
// toyService.signup({fullname: 'Muki G', toyname: 'muki', password:'123', score: 100})

function query(filterBy = { searchTxt: '', availability: 'all', sortBy: 'all', type: 'all' }) {
    return storageService.query('toy')
    // var queryStr = `?availability=${filterBy.availability}&searchTxt=${filterBy.searchTxt}&sortBy=${filterBy.sortBy}&type=${filterBy.type}`
    // return httpService.get(`toy${queryStr}`)

}

function getById(toyId) {
    return storageService.get('toy', toyId)
    // return httpService.get(`toy/${toyId}`)
}
function remove(toyId) {
    return storageService.remove('toy', toyId)
    // return httpService.delete(`toy/${toyId}`)
}

async function update(toy) {
    return storageService.put('toy', toy)
    // return await httpService.put(`toy/${toy._id}`, toy)
    // Handle case in which admin updates other toy's details
    // if (getLoggedinToy()._id === toy._id) _saveLocalToy(toy)
}

async function add(toy) {
    return storageService.put('toy', toy)
    // toy.imgUrl = await getStayImage(toy.name)
    // toy.msgs = []
    // return await httpService.post(`toy`, toy)
    // Handle case in which admin updates other toy's details
    // if (getLoggedinToy()._id === toy._id) _saveLocalToy(toy)
}

// async function getStayImage(txt) {
//     const res = await axios.get(`https://pixabay.com/api/?key=${IMG_API_KEY}&q=${txt}&image_type=photo`)
//     if (res.data.hits.length === 0 || !res.data.hits[0] || !res.data.hits[0].webformatURL) return "https://images-na.ssl-images-amazon.com/images/I/61%2B-nrfoudS._AC_SX425_.jpg"
//     const imgUrl = res.data.hits[0].webformatURL
//     return imgUrl
// }

// async function getPriceData() {
//     const toys = await query()
//     return toys.reduce((acc, toy) => {
//         const { type } = toy
//         if (!acc[type]) acc[type] = 0
//         acc[type] += toy.price
//         return acc
//     }, {})
// }

// async function getDateData() {
//     const toys = await query()
//     return toys.reduce((acc, toy, idx) => {
//         const { createdAt } = toy
//         const year = new Date(createdAt).getFullYear()
//         if (!acc[year]) acc[year] = 0
//         acc[year]++
//         return acc
//     }, {})
// }




