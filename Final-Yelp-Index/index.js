const

    config = require('./config'),
    superagent = require('superagent')


const _fetch = (command) => {
    return superagent.get(`${config.url}${command}`)
        .set("Authorization", `Bearer ${config.apiKey}`)
        .then(response => response.body)
        .catch(error => error.response.body)

}

exports.searchByRating = (term, location) => {
    return _fetch(`businesses/search?term=${term}&location=${location}&sort_by=rating`)

}

exports.searchByDistance = (term, location) => {
    return _fetch(`businesses/search?term=${term}&location=${location}&sort_by=distance`)

}
exports.idc = (location) => {
    return _fetch(`businesses/search?term=restaurant&location=${location}&radius=16000&sort_by=distance&open_now=true`)

}

exports.cheap = (location) => {
    return _fetch(`businesses/search?term=restaurant&location=${location}&radius=16000&sort_by=distance&price=1&open_now=true`)
}

exports.somewhereNice = (location) => {
    return _fetch(`businesses/search?term=restaurant&location=${location}&sort_by=rating&open_now=true`)
}

exports.phoneSearch = (phone) => {
    return _fetch(`businesses/search/phone?phone=+1${phone}`)

}
exports.transactionSearch = (location) => {
    return _fetch(`transactions/delivery/search?location=${location}`)

}
exports.business = (id) => {
    return _fetch(`businesses/${id}`)

}

exports.reviews = (businessId) => {
    return _fetch(`businesses/${businessId}/reviews`)

}