
const search = (location) =>{
    const query = `?location=${location}&limit=5&sort_by=rating`

    yelp.search(query)
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

const transactionSearch = (transactionType , parameters) => {
    yelp.transactionSearch(transactionType , parameters)
        .then(result => {
            console.log(result.businesses[0].name)
        })
        .catch(err => console.log(err))
}



exports.transactionSearch = (transactionType, parameters) => {
    return _fetch(`transactions/${transactionType}/search?${parameters}`)

}

exports.businessMatch = (matchType, parameters, name, state, city, county) => {
    return _fetch(`businesses/matches/${matchType}/${parameters}/lookup?name=${name}&state=${stete}&city=${city}&county=${county}`)

}