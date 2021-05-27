export const tripService = {
    query,
    remove,
    add
}

const STORAGE_KEY = 'trip'
window.tripService = tripService

function query() {
    return load(STORAGE_KEY)
}

function remove() {
    return save(STORAGE_KEY, null)
}

async function add(trip) {
    return save(STORAGE_KEY, trip)
}



// storage service
function load(key) {
    var val = localStorage.getItem(key)
    return (val) ? JSON.parse(val) : null;
}

function save(key, val) {
    localStorage[key] = JSON.stringify(val);
}

export const storageService = {
    load,
    save
}