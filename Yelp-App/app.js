const

    yelp = require('../yelpproject'),
    inquirer = require('inquirer')

const business = (id) => {
  yelp.business(id)
}

const search = (location) =>{
    let query = `?location=${location}`

    yelp.search(query)
}


// search('boulder')
business('bestia-los-angeles')

module.exports = {
    business
}