const

    yelp = require('../yelpproject'),
    inquirer = require('inquirer')

const business = (id) => {
    yelp.business(id)
    .then(result =>{
        console.log(result);
    })
    .catch(err => console.log(err))

}

const search = (location) =>{
    let query = `?location=${location}`

    yelp.search(query)
    .then(result =>{

    })
    .catch(err => console.log(err))

}


// search('boulder')
business('bestia-los-angeles')

module.exports = {
    business
}