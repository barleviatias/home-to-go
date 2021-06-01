// import { storageService } from './asyncStorageService';
import { httpService } from './http.service'

// import axios from 'axios'
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
	getHostStays,
	getUserWishlist,
	// getStayImage,
	// getPriceData,
	// getDateData
};

window.stayService = stayService;
// Note: due to async, must run one by one...
// stayService.signup({fullname: 'Puki Norma', stayname: 'stay1', password:'123',score: 100, isAdmin: false})
// stayService.signup({fullname: 'Master Adminov', stayname: 'admin', password:'123', score: 100, isAdmin: true})
// stayService.signup({fullname: 'Muki G', stayname: 'muki', password:'123', score: 100})

function query(trip) {
	// const newTrip={...trip,guests:trip.guests.kids+trip.guests.adults}
	return httpService.get(`stay`, trip)
	// return storageService.query('stay', trip);

	// var queryStr = `?availability=${filterBy.availability}&searchTxt=${filterBy.searchTxt}&sortBy=${filterBy.sortBy}&type=${filterBy.type}`
	// return httpService.get(`stay${queryStr}`)


	// var queryStr = `?availability=${filterBy.availability}&searchTxt=${filterBy.searchTxt}&sortBy=${filterBy.sortBy}&type=${filterBy.type}`
}

function getById(stayId) {
	// return storageService.get('stay', stayId);
	return httpService.get(`stay/${stayId}`)
}

function remove(stayId) {
	// return storageService.remove('stay', stayId);
	return httpService.delete(`stay/${stayId}`)
}

async function update(stay) {
	stay.amenities = convertAmenetiesToArray(stay.amenities)
	return await httpService.put(`stay/${stay._id}`, stay)
	// return await httpService.put(`stay/${stay._id}`, stay)
	// Handle case in which admin updates other stay's details
	// if (getLoggedinStay()._id === stay._id) _saveLocalStay(stay)
}

async function add(stay) {
	stay.amenities = convertAmenetiesToArray(stay.amenities)
	return await httpService.post(`stay`, stay)

	// return storageService.post('stay', currStay);
	// stay.imgUrl = await getStayImage(stay.name)
	// stay.msgs = []
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

async function getTopRatedStays(trip = { loc: { address: '' }, guests: { adults: 1, kids: 0 } }) {

	return await httpService.get(`stay`, trip)
	// var stays = await storageService.query('stay');
	// 	stays = stays.map((stay) => {
	// 		stay.avgRate = _getRate(stay);
	// 		return stay;
	// 	});
	// 	stays.sort(function (a, b) {
	// 		return b.avgRate - a.avgRate;
	// 	});
	// 	return stays.slice(0, 4);
	// var queryStr = `?availability=${filterBy.availability}&searchTxt=${filterBy.searchTxt}&sortBy=${filterBy.sortBy}&type=${filterBy.type}`
}

function _getRate(stay) {
	const rates = stay.reviews.map((review) => review.avgRate);
	const sum = rates.reduce((acc, rate) => {
		acc += rate;
		return acc;
	}, 0);
	return sum / rates.length;
}

async function getNearbyStays(location) {
	return await httpService.get(`stay`, { loc: { address: location }, guests: { adults: 1, kids: 0 } })
	// var stays = await storageService.query('stay');
	// stays = stays.filter((stay) => {
	// 	return stay.loc.address.toUpperCase().includes(location.toUpperCase());
	// });
	// return stays.slice(0, 4);
	// var queryStr = `?availability=${filterBy.availability}&searchTxt=${filterBy.searchTxt}&sortBy=${filterBy.sortBy}&type=${filterBy.type}`
	// return httpService.get(`stay${queryStr}`)
}

async function getHostStays(userId) {
	return await httpService.get(`stay`, { loc: { address: '' }, guests: { adults: 1, kids: 0 } })
	// var stays = await storageService.query('stay');
	// stays = stays.filter((stay) => {
	// 	return stay.host._id === userId;
	// });
	// return stays;

	// var queryStr = `?availability=${filterBy.availability}&searchTxt=${filterBy.searchTxt}&sortBy=${filterBy.sortBy}&type=${filterBy.type}`
	// return httpService.get(`stay${queryStr}`)
}

async function getUserWishlist(user) {
	return httpService.get(`stay`, { loc: { address: '' }, guests: { adults: 1, kids: 0 }, type: 'wishlist', user })
	// var stays = await storageService.query('stay',null,user);
	// return stays;
	// user.wishlist.map()
	// stays = stays.filter((stay) => {
	// 	return stay._id === stayId;
	// });

	// var queryStr = `?availability=${filterBy.availability}&searchTxt=${filterBy.searchTxt}&sortBy=${filterBy.sortBy}&type=${filterBy.type}`
	// return httpService.get(`stay${queryStr}`)
}

function convertAmenetiesToArray(amenities) {
	const currAmenities = [];
	for (const key in amenities) {
		if (amenities[key]) {
			var str = key;
			var res = str.replace('_', ' ');
			currAmenities.push(res);
		}
	}
	return currAmenities;
}

