const

    yelp = require('../yelpproject'),
    inquirer = require('inquirer')

const business = (id) => {
  yelp.business(id)
        .then(result => {
            console.log(result)
        })
        .catch(err => console.error(err))
}

business("gary-danko-san-francisco");

module.exports = {
    business
}