const

    config = require('./config'),
    superagent = require('superagent')


 const _fetch = (command) => {
    return superagent.get(`${config.url}${command}`) 
    .set("Authorization", `Bearer ${config.apiKey}`)
    .then(response => response.body)
    .catch(error => error.response.body)

}

exports.search = (term,location) => {
    return _fetch(`businesses/search?term=${term}&location=${location}`)

}
exports.idc = (term, location) => {
    return _fetch(`businesses/search?term=${term}&location=${location}&sort_by=rating&price=2&open_now=true`)

}

exports.phoneSearch = (phone) => {
    return _fetch(`businesses/search/phone?phone=${phone}`)

}

// If someone can figure it out go for it

// exports.transactionSearch = (transactionType, parameters) => {
//     return _fetch(`transactions/${transactionType}/search?${parameters}`)

// }

exports.business = (id) => {
    return _fetch(`businesses/${id}`)

}

exports.reviews = (businessId) => {
    return _fetch(`businesses/${businessId}/reviews`)

}
exports.transactionSearch = (parameters) => {

    return _fetch(`transactions/delivery/search?location=${parameters}`)



}



exports.businessMatch = (matchType, parameters, name, state, city, county) => {

    return _fetch(`businesses/matches/${matchType}/${parameters}/lookup?name=${name}&state=${state}&city=${city}&county=${county}`)



}



exports.searchRating = (term,location) => {

    return _fetch(`businesses/search?term=${term}&location=${location}&limit=5&sort_by=rating`)

}
// If someone can figure it out go for it

// exports.autocomplete = (parameters) => {
//     return _fetch(`autocomplete/text=${parameters}`)

// }

// If someone can figure it out go for it
// exports.businessMatch = (matchType, parameters) => {
//     return _fetch(`businesses/matches/${matchType}`)
//
// }