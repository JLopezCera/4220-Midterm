
const

    yelp = require('../Yelp-App'),
    inquirer = require('inquirer')
    moment = require('moment')
    day = new Date()

const pro = (location) => {
    if (!isNaN(location)){
    inquirer.prompt([{
        type: 'list',
        message: 'Do you want to eat NOW or somewhere NICE',
        name: 'choice',
        choices: [{ name: "I want to eat NOW", value: 1 }, { name: "I want to eat somewhere NICE", value: 2 }, { name: "I want to eat somewhere cheap", value: 3 }, { name: "I want to eat at home", value: 4 }],
    }])
    .then(answer => {
            if (answer.choice == 1) {
                idc(location)
            } else if (answer.choice == 2) {
                somewhereNice(location)
            }
            else if (answer.choice == 3) {
                cheap(location)
            }
            else {
                transactionSearch(location)
            }
    
})} 
else {
    inquirer.prompt([{
        type: 'list',
        message: 'Do you want to eat NOW or somewhere NICE',
        name: 'choice',
        choices: [{ name: "I want to eat NOW", value: 1 }, { name: "I want to eat somewhere NICE", value: 2 }, { name: "I want to eat somewhere cheap", value: 3 }],
    }])
    .then(answer => {
            if (answer.choice == 1) {
                idc(location)
            } else if (answer.choice == 2) {
                somewhereNice(location)
            }
            else if (answer.choice == 3) {
                cheap(location)
            }
    }
    )}
}
const transactionSearch = (location) => {
    yelp.transactionSearch(location)
        .then(result => {
            return inquirer.prompt([{
                type: 'list',
                message: "These are places that deliver around your location?",
                name: 'place',
                choices: [{ name: result.businesses[0].name + " - Phone - " + result.businesses[0].phone + " - Price Range - " + result.businesses[0].price , value: result.businesses[0].id },
                    { name: result.businesses[1].name + " - Phone - " + result.businesses[1].phone + " - Price Range - " + result.businesses[1].price, value: result.businesses[1].id },
                    { name: result.businesses[2].name + " - Phone - " + result.businesses[2].phone + " - Price Range - " + result.businesses[2].price, value: result.businesses[2].id },
                    { name: result.businesses[3].name + " - Phone - " + result.businesses[3].phone + " - Price Range - " + result.businesses[3].price, value: result.businesses[3].id },
                    { name: result.businesses[4].name + " - Phone - " + result.businesses[4].phone + " -Price Range - " + result.businesses[4].price, value: result.businesses[4].id }]
            }]).then(answer => {
                oldBusiness(answer.place)
        });
        })
}  

const cheap = (location) => {
    yelp.cheap(location)
        .then(result => {
            return inquirer.prompt([{
                type: 'list',
                message: 'select place that you would like more information from',
                name: 'place',
                choices: [{ name: result.businesses[0].name, value: result.businesses[0].id }, { name: result.businesses[1].name, value: result.businesses[1].id }, { name: result.businesses[2].name, value: result.businesses[2].id }, { name: result.businesses[3].name, value: result.businesses[3].id }, { name: result.businesses[4].name, value: result.businesses[4].id }],
            }
            ]).then(answer => {
                oldBusiness(answer.place)
            });
        }
        )
}

const BusinessSearch = (term, location) => {
    inquirer.prompt([{
        type: 'list',
        message: 'Do you want to search for Rating or Distance',
        name: 'choice',
        choices: [{ name: "Search by Rating", value: 1 }, { name: "Search by Distance", value: 2 }],
    }])
        .then(answer => {
            if (answer.choice == 1) {
                searchByRating(term,location)
            } else {
                searchByDistance(term,location)
            }
        })
}
const idc = (location) => {
    yelp.idc(location)
        .then(result => {
            return inquirer.prompt([{
                type: 'list',
                message: 'select place that you would like more information from',
                name: 'place',
                choices: [{ name: result.businesses[0].name, value: result.businesses[0].id }, { name: result.businesses[1].name, value: result.businesses[1].id }, { name: result.businesses[2].name, value: result.businesses[2].id }, { name: result.businesses[3].name, value: result.businesses[3].id }, { name: result.businesses[4].name, value: result.businesses[4].id }],
            }
            ]).then(answer => {
                oldBusiness(answer.place)
            });
        })}

const somewhereNice = (location) => {
    yelp.somewhereNice(location)
        .then(result => {
            return inquirer.prompt([{
                type: 'list',
                message: 'select place that you would like more information from',
                name: 'place',
                choices: [{ name: result.businesses[0].name, value: result.businesses[0].id }, { name: result.businesses[1].name, value: result.businesses[1].id }, { name: result.businesses[2].name, value: result.businesses[2].id }, { name: result.businesses[3].name, value: result.businesses[3].id }, { name: result.businesses[4].name, value: result.businesses[4].id }],
            }
            ]).then(answer => {
                oldBusiness(answer.place)
            });
        }
        )
}

const searchByRating = (term, location) => {
    yelp.searchByRating(term, location)
        .then(result => {
            return inquirer.prompt([{
                type: 'list',
                message: 'select place that you would like more information from',
                name: 'place',
                choices: [{ name: result.businesses[4].name + " Rating " + result.businesses[4].rating, value: result.businesses[4].id }, { name: result.businesses[3].name + " Rating " + result.businesses[3].rating, value: result.businesses[3].id }, { name: result.businesses[2].name + " Rating " + result.businesses[2].rating, value: result.businesses[2].id }, { name: result.businesses[1].name + " Rating " + result.businesses[1].rating, value: result.businesses[1].id }, { name: result.businesses[0].name + " Rating " + result.businesses[0].rating, value: result.businesses[0].id }],
            }
            ]).then(answer => {
                oldBusiness(answer.place)
            });
        }
        )
}
const searchByDistance = (term, location) => {
    yelp.searchByDistance(term, location)
        .then(result => {
            return inquirer.prompt([{
                type: 'list',
                message: 'select place that you would like more information from',
                name: 'place',
                choices: [{ name: result.businesses[0].name + "--- Street: " + result.businesses[0].location.display_address, value: result.businesses[0].id }, { name: result.businesses[1].name + "--- Street: " + result.businesses[1].location.display_address, value: result.businesses[1].id }, { name: result.businesses[2].name + "--- Street: " + result.businesses[2].location.display_address, value: result.businesses[2].id }, { name: result.businesses[3].name + "--- Street: " + result.businesses[3].location.display_address, value: result.businesses[3].id }, { name: result.businesses[4].name + "--- Street: " + result.businesses[4].location.display_address, value: result.businesses[4].id }],
            }
            ]).then(answer => {
                oldBusiness(answer.place)
            });
        }
        )
}


const business = (term,location) => {
    let id = term.replace(" ", '-') + "-" +  location.replace(" ",'-')
    yelp.business(id)
        .then(result => {
            var n = day.getDay();
            console.log("\nName:\t\t" + result.name)
            console.log("\nAddress:\t" + result.location.address1)
            console.log("\t\t" + result.location.city + ", " + result.location.state + ", " + result.location.country + " " + result.location.zip_code + "\n")
            console.log("Phone Number - \t" + result.display_phone + "\n")
            console.log("Price Range - \t" + result.price + "\n")
            console.log("Rating - \t" + result.rating + " Stars\n")
            try {
                let d = result.hours[0].open[n].end
                console.log("Closing time - \t" + moment(d, 'HH:mm').format('h:mm A'))
            } catch (e) {
                console.log("No closing time given.")

            }
            console.log("\n")
            console.log("Most Recent Reviews - \n")
            reviews(id)
        })
        .catch(err => console.error(err))
        .catch(err => console.error(err))
}

const oldBusiness = (id) => { //oldBusiness is here in order to be able to use most of the functions because we wanted to make businessID in the CLI to be more user friendly
    yelp.business(id)
        .then(result => {
            var n = day.getDay();
            console.log("\nName:\t\t" + result.name)
            console.log("\nAddress:\t" + result.location.address1)
            console.log("\t\t" + result.location.city + ", " + result.location.state + ", " + result.location.country + " " + result.location.zip_code + "\n")
            console.log("Phone Number - \t" + result.display_phone + "\n")
            console.log("Price Range - \t" + result.price + "\n")
            console.log("Rating - \t" + result.rating + " Stars\n")
            try {
                let d = result.hours[0].open[n].end
                console.log("Closing time - \t" + moment(d, 'HH:mm').format('h:mm A'))
            } catch (e) {
                console.log("No closing time given.")

            }
            console.log("\n")
            console.log("Most Recent Reviews - \n")
            reviews(id)
        })
        .catch(err => console.error(err))
}

const phone = (phone) => {
    yelp.phoneSearch(phone)
        .then(result => {
            oldBusiness(result.businesses[0].id)
        })
        .catch(err => console.error(err))

}


const reviews = (businessId) => {
    yelp.reviews(businessId)
        .then(result => {
            for(let i = 0; i < result.reviews.length; i++){ 
                console.log("\t\t" + result.reviews[i].user.name + " gave this establishment " + result.reviews[i].rating + " stars")    

            }
        })
    }


module.exports = {
    business,
    BusinessSearch,
    phone,
    idc,
    pro,
  }