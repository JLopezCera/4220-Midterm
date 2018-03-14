const
    yelp = require('yelp'),
    inquirer = require('inquirer')

const search = (term, location) => {
    let query = `?term=${term}&?location=${location}`
    yelp.search(query)
        .then(result =>{
            console.log(result);
        })
        .catch(err => console.log(err))
}

search("restaurant", "boulder");



module.exports = {
    business
}
