const

    config = require('./config'), //get the url and api key from here
    superagent = require('superagent') //use superagent to make HTTP calls to yelp api

//handles different api calls with different commands 
const _fetch = (command) => {
    return superagent.get(`${config.url}${command}`)
        .set("Authorization", `Bearer ${config.apiKey}`)
        .then(response => response.body)
        .catch(error => error.response.body)

}
//Search Endpoints of the Yelp API

//Search Businesses and Sort By Rating
exports.searchByRating = (term, location) => {
    return _fetch(`businesses/search?term=${term}&location=${location}&sort_by=rating`)

}

//Search Businesses and Sort By Distance
exports.searchByDistance = (term, location) => {
    return _fetch(`businesses/search?term=${term}&location=${location}&sort_by=distance`)

}

//Search Restaurants That Are Open Now and Within 8 Mile Radius
exports.idc = (location) => {
    return _fetch(`businesses/search?term=restaurant&location=${location}&radius=16000&sort_by=distance&open_now=true`)

}

//Search Restaurants That Are Open Now, Within 8 Mile Radius, and Have 1 Price Sign ($)
exports.cheap = (location) => {
    return _fetch(`businesses/search?term=restaurant&location=${location}&radius=16000&sort_by=distance&price=1&open_now=true`)
}

//Search Restaurants That Are Highly Rated and Open Now
exports.somewhereNice = (location) => {
    return _fetch(`businesses/search?term=restaurant&location=${location}&sort_by=rating&open_now=true`)
}

//Find Business With A Given Phone Number
exports.phoneSearch = (phone) => {
    return _fetch(`businesses/search/phone?phone=+1${phone}`)
}

//Find Restaurants that Deliver
exports.deliverySearch = (location) => {
    return _fetch(`transactions/delivery/search?location=${location}`)

}

//Find Business By ID
exports.business = (id) => {
    return _fetch(`businesses/${id}`)

}

//Get Reviews For A Given Business ID
exports.reviews = (businessId) => {
    return _fetch(`businesses/${businessId}/reviews`)

}