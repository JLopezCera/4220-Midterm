
const searchR = (term,location) =>{
    yelp.searchRating(term,location)
    .then(result =>{
        return inquirer.prompt([{
            type: 'list',
            message: 'select place that you would like more information from',
            name: 'place',
            choices: [{ name: result.businesses[0].name, value: result.businesses[0].id }, 
            { name: result.businesses[1].name, value: result.businesses[1].id },
            { name: result.businesses[2].name, value: result.businesses[2].id }, 
            { name: result.businesses[3].name, value: result.businesses[3].id }, 
            { name: result.businesses[4].name, value: result.businesses[4].id }]
        }])
    }).then(response =>{
        reviews(response.place)
    })
    .catch(err => console.log(err))

}


const businessMatched = (matchType, parameters, name, state, city, county) => {
    yelp.businessMatch(matchType, parameters, name, state, city, county)
    .then(best =>{
        return inquirer.prompt([{
            type: list,
            message: "These are your choice that best match your business",
            name: 'places',
            choices:[{name: best.businesses[0].name, value: best.businesses[0].id, value: best.businesses[0].display_phone},
            {name: best.businesses[1].name, value: best.businesses[1].id, value: best.businesses[1].display_phone}]
        }])
    }).catch(err => {
        console.log(err + " ")
    })
}

const transactionSearch = (parameters) => {

    yelp.transactionSearch(parameters)

        .then(result => {
           
            return inquirer.prompt([{

                type: 'list',

                message: "These are places that deliver around your location?",

                name: 'places',
                choices:[{name: result.businesses[0].name + " " + result.businesses[0].display_phone , value: result.businesses[0].id}, 
                {name: result.businesses[1].name + " " + result.businesses[1].display_phone , value: result.businesses[1].id}, 
                {name: result.businesses[2].name + " " + result.businesses[2].display_phone, value: result.businesses[2].id},
                {name: result.businesses[3].name + " " + result.businesses[3].display_phone, value: result.businesses[3].id},
                {name: result.businesses[4].name + " " + result.businesses[4].display_phone, value: result.businesses[4].id}]

            }])

        }).then(answer =>{
            business(answer.places)
        }).catch(err => console.log(err))

}  
//add address shows business that deliver
exports.transactionSearch = (parameters) => {
    return _fetch(`transactions/delivery/search?location=${parameters}`)

}

exports.businessMatch = (matchType, parameters, name, state, city, county) => {
    return _fetch(`businesses/matches/${matchType}/${parameters}/lookup?name=${name}&state=${state}&city=${city}&county=${county}`)

}

exports.searchRating = (term,location) => {
    return _fetch(`businesses/search?term=${term}&location=${location}&limit=5&sort_by=rating`)
}