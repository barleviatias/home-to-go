import { storageService } from './asyncStorageService';
// import { httpService } from './http.service.js';


export const userService = {
	login,
	logout,
	signup,
	getById,
	// getUsers,
	// remove,
	update,
	// getLoggedinUser,
};

window.userService = userService;

async function login(userCred) {
	const users = await storageService.query('user');
	const user = users.find((user) => user.username === userCred.username);
	return _saveLocalUser(user);
	// const user = await httpService.post('auth/login', userCred)
	// if (user) return _saveLocalUser(user)
}

async function signup(userCred) {
	const user = await storageService.post('user', userCred);
	// const user = await httpService.post('auth/signup', userCred)
	return _saveLocalUser(user);
}

async function logout() {
	sessionStorage.clear();
	// return await httpService.post('auth/logout')
}
async function update(user) {
    return storageService.put('user', user)
    // return await httpService.put(`stay/${stay._id}`, stay)
    // Handle case in which admin updates other stay's details
    // if (getLoggedinStay()._id === stay._id) _saveLocalStay(stay)
}
function getById(userId) {
    return storageService.get('user', userId)
}
function _saveLocalUser(user) {
	sessionStorage.setItem('loggedinUser', JSON.stringify(user));
	return user;
}

// import { storageService } from './storage.service.js';
// import axios from 'axios';

// const STORAGE_KEY = 'user';

// const BASE_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3030/api'

// export const userService = {
//     login,
//     getLoggedinUser,
//     signup
// }

// function login(credentials) {
//     return axios.post(`${BASE_URL}/login`, credentials).then(res => res.data)
//         .then(user => {
//             storageService.save(STORAGE_KEY, user);
//             return user;
//         })
// }

// function signup(credentials) {
//     return axios.post(`${BASE_URL}/signup`, credentials).then(res => res.data)
//         .then(user => {
//             storageService.save(STORAGE_KEY, user);
//             return user
//         })
// }

// function getLoggedinUser() {
//     return storageService.load(STORAGE_KEY);
// }
