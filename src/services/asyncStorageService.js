import user from '../data/user.json'
import stay from '../data/stay.json'
import order from '../data/order.json'

export const storageService = {
    query,
    get,
    post,
    put,
    remove
}

loadDB()

function loadDB() {
    var userDB = JSON.parse(localStorage.getItem('user')) || []
    var stayDB = JSON.parse(localStorage.getItem('stay')) || []
    var orderDB = JSON.parse(localStorage.getItem('order')) || []

    if (!userDB || !userDB.length) {
        _save('user', user)
    }
    if (!stayDB || !stayDB.length) {
        _save('stay', stay)
    }
    if (!orderDB || !orderDB.length) {
        _save('order', order)
    }
}

function query(entityType) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return Promise.resolve(entities)
}

function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}

function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}


function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}