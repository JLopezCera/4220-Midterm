const
    config = require('./config'),
    request = require('request')


let options = {
    url: `${config.url}`,
    headers: {
        'Authorization': `Bearer ${config.apiKey}`
    }
}

const _fetch = (command) => {

    options.url += `${command}`

    return request(options, (error, response, body) =>{
        let restaurant = JSON.parse(body);
        console.log(restaurant.name);
        console.log(restaurant.location.address1)
        console.log(restaurant.display_phone)
        console.log(restaurant.price)
        console.log(restaurant.rating)
    })
}

// const _fetch = (command) => {
//     console.log(config.url + command);

//     return superagent.get(`${config.url}/${command}`)
//     .set({'Authorization': `Bearer ${config.apiKey}`})
//     .then(response => response.body)
//         .catch(error => error.response.body)
// }

exports.search = (parameters) => {
    return _fetch(`businesses/search${parameters}`)
}

exports.phoneSearch = (parameters) => {
    return _fetch('businesses/search/phone')
}

exports.transactionSearch = (transactionType, parameters) => {
    return _fetch(`transactions/${transaction_type}/search`)
}

exports.business = (id) => {
    return _fetch(`businesses/${id}`)
}

exports.reviews = (businessId) => {
    return _fetch(`businesses/${businessId}/reviews`)
}

exports.autocomplete = (parameters) => {
    return _fetch('autocomplete')
}

exports.businessMatch = (matchType, parameters) => {
    return _fetch(`businesses/matches/${matchType}`)
}