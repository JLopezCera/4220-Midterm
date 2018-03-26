//dependencies
const
    yelp = require('../Final-Yelp-Index'), // custom node module
    inquirer = require('inquirer'), //for cli
    moment = require('moment'), // for formatting dates
    day = new Date() // for dates

//Function: I Want To Eat _______ 
//Ask the user for a location and give him/her a choice depending on the 
//location they input
const pro = (location) => {
    //If the location is a Number (The user inputted a Zip Code)
    if (!isNaN(location)) {
        inquirer.prompt([{
            //show a list that asks 4 options
            type: 'list',
            message: 'Make a choice:',
            name: 'choice',
            choices: [
                { name: "I want to eat NOW", value: 1 },            //idc
                { name: "I want to eat SOMEWHERE NICE", value: 2 }, //somewhereNice
                { name: "I want to eat SOMEWHERE CHEAP", value: 3 },//cheap
                { name: "I want to eat at HOME", value: 4 },        //deliverySearch
            ]
        }]).then(answer => {
            //Depending on the choice, call the function
            if (answer.choice == 1) {
                //call the idc function
                idc(location)
            } else if (answer.choice == 2) {
                //call the somewhereNice function
                somewhereNice(location)
            } else if (answer.choice == 3) {
                //call the cheap function
                cheap(location)
            } else {
                //call the deliverySearch function
                //The only function that just takes a zip-code as a location
                deliverySearch(location)
            }
        }).catch(err => {
            console.error(err)
        })
    }
    //If the location is String based (Address, City, State, or Neighborhood)
    else {
        inquirer.prompt([{
            //show a list that asks 3 options
            type: 'list',
            message: 'Make a choice:',
            name: 'choice',
            choices: [
                { name: "I want to eat NOW", value: 1 },            //idc
                { name: "I want to eat SOMEWHERE NICE", value: 2 }, //somewhereNice
                { name: "I want to eat SOMEWHERE CHEAP", value: 3 },//cheap
            ]
        }]).then(answer => {
            //Depending on the choice, call the function
            if (answer.choice == 1) {
                //call the idc function
                idc(location)
            } else if (answer.choice == 2) {
                //call the somewhereNice function
                somewhereNice(location)
            } else {
                //call the cheap function
                cheap(location)
            }
        }).catch(err => {
            console.error(err)
        })
    }
}

//SubFunction of I Want To Eat _______: idc
//Take in a location and return 5 restaurants within an 8 mile radius that's open now
const idc = (location) => {
    yelp.idc(location)
        .then(result => {
            //ask user to select a restaurant to display it's information
            return inquirer.prompt([{
                type: 'list',
                message: 'select place that you would like more information from',
                name: 'place',
                choices: restaurants(result.businesses) //generates a list of 5 restaurants
            }])
                //display info
                .then(answer => {
                    oldBusiness(answer.place)
                })
                .catch(err => {
                    console.error(err)
                })
        })
        .catch(err => {
            console.error(err)
        })
}

//SubFunction of I Want To Eat _______: Somewhere Nice
//Takes in a location and returns top 5 list of highly rated restaurants by rating that are open now
const somewhereNice = (location) => {
    yelp.somewhereNice(location)
        .then(result => {
            //ask user to select a restaurant to display it's information
            return inquirer.prompt([{
                type: 'list',
                message: 'select place that you would like more information from',
                name: 'place',
                choices: restaurants(result.businesses) //generates a list of 5 restaurants
            }])
                //display info
                .then(answer => {
                    oldBusiness(answer.place)
                })
                .catch(err => {
                    console.error(err)
                })
        })
        .catch(err => {
            console.error(err)
        })
}


//SubFunction of I Want To Eat _______: Cheap
//Takes in a location and returns 5 restaurants with only one $ 
const cheap = (location) => {
    yelp.cheap(location)
        .then(result => {
            //ask user to select a restaurant to display it's information
            return inquirer.prompt([{
                type: 'list',
                message: 'select place that you would like more information from',
                name: 'place',
                choices: restaurants(result.businesses),
            }])
                //display info
                .then(answer => {
                    oldBusiness(answer.place)
                })
                .catch(err => {
                    console.error(err)
                })
        })
        .catch(err => {
            console.error(err)
        })
}

//generates a list of 5 restaurants from results for idc, somewhereNice, and cheap
let restaurants = (result) => {
    let list = []
    for (x in result) {
        let restaurant = {}
        restaurant.name = result[x].name,
            restaurant.value = result[x].id
        list.push(restaurant);
        if (x == 4) {
            break;
        }
    }
    return list;
}

//SubFunction of I Want To Eat _______: Delivery Search
//Takes in a Zip-Code and returns 5 restaurants that are open and are available to deliver
const deliverySearch = (location) => {
    yelp.deliverySearch(location)
        .then(result => {
            //generate list of 5 restaurants
            let restaurants = []
            for (x in result.businesses) {
                let restaurant = {}
                restaurant.name = result.businesses[x].name + " - Phone - " + result.businesses[x].phone + " - Price Range - " + result.businesses[x].price,
                    restaurant.value = result.businesses[x].id
                restaurants.push(restaurant);
                if (x == 4) {
                    break;
                }
            }
            return inquirer.prompt([{
                type: 'list',
                message: "These are places that deliver around your location?",
                name: 'place',
                choices: restaurants
            }]).then(answer => {
                oldBusiness(answer.place)
            })
                .catch(err => {
                    console.error(err)
                })
        })
        .catch(err => {
            console.error(err)
        })
}

//Function: Business Search
//Finds businesses given a term and location and returns 5 businesses sorted by your choice of By Distance or By Rating
const BusinessSearch = (term, location) => {
    inquirer.prompt([{
        type: 'list',
        message: 'Do you want to search for Rating or Distance',
        name: 'choice',
        choices: [{ name: "Search by Rating", value: 1 }, { name: "Search by Distance", value: 2 }],
    }])
        .then(answer => {
            if (answer.choice == 1) {
                searchByRating(term, location)
            } else {
                searchByDistance(term, location)
            }
        })
        .catch(err => {
            console.error(err)
        })
}

//SubFunction of Business Search: Search By Rating
//Finds businesses given a term and location and returns 5 businesses sorted by Rating
const searchByRating = (term, location) => {
    yelp.searchByRating(term, location)
        .then(result => {
            //generating business list using unshift
            let businesses = []
            for (x in result.businesses) {
                let business = {}
                business.name = result.businesses[x].name + " Rating " + result.businesses[x].rating,
                business.value = result.businesses[x].id
                businesses.unshift(business);
                if (x == 4) {
                    break;
                }
            }
            return inquirer.prompt([{
                type: 'list',
                message: 'select place that you would like more information from',
                name: 'place',
                choices: businesses
            }
            ]).then(answer => {
                oldBusiness(answer.place)
            })
                .catch(err => {
                    console.error(err)
                })
        })
        .catch(err => {
            console.error(err)
        })
}

//SubFunction of Business Search: Search By Distance
//Finds businesses given a term and location and returns 5 businesses sorted by distance
const searchByDistance = (term, location) => {
    yelp.searchByDistance(term, location)
        .then(result => {
            //generating business list using unshift
            let businesses = []
            for (x in result.businesses) {
                let business = {}
                business.name = result.businesses[x].name + "--- Street: " + result.businesses[x].location.display_address,
                    business.value = result.businesses[x].id
                businesses.push(business);
                if (x == 4) {
                    break;
                }
            }
            return inquirer.prompt([{
                type: 'list',
                message: 'select place that you would like more information from',
                name: 'place',
                choices: businesses
            }
            ])
                .then(answer => {
                    oldBusiness(answer.place)
                })
                .catch(err => {
                    console.error(err)
                })
        })
        .catch(err => {
            console.error(err)
        })
}

//Function: Search By Phone Number
//Search for a business with a given phone number (without format aka 10 digits)
const phone = (phone) => {
    yelp.phoneSearch(phone)
        .then(result => {
            //return the first business in the result
            if(result.businesses.length == 0){
                console.log("Business Not Found")
            } else {
                oldBusiness(result.businesses[0].id)
            }
        })
        .catch(err => console.error(err))
}

//Function: Business
//Displays Business information given a business ID and location
const business = (term, location) => {
    //to make it more user friendly we ask to give a term and location
    //instead of how the api asks for ID's (ex. bestia-los-angeles)
    let id = term.replace(" ", '-') + "-" + location.replace(" ", '-')

    yelp.business(id)
        .then(result => {
            //Get today's Date
            let n = day.getDay();
            //name of the business
            console.log("\nName:\t\t" + result.name)
            //address of the business
            console.log("\nAddress:\t" + result.location.address1)
            //city, state, country, and zipcode
            console.log("\t\t" + result.location.city + ", " + result.location.state + ", " + result.location.country + " " + result.location.zip_code + "\n")
           //phone number
            console.log("Phone Number - \t" + result.display_phone + "\n")
           //price range
            console.log("Price Range - \t" + result.price + "\n")
           //overall rating
            console.log("Rating - \t" + result.rating + " Stars\n")
            try {
                //if given a closing time, show it
                let d = result.hours[0].open[n].end
                console.log("Closing time - \t" + moment(d, 'HH:mm').format('h:mm A'))
            } catch (e) {
                //if not then tell the user there's no closing time
                console.log("No closing time given.")

            }
            //display reviews
            console.log("\n")
            console.log("Most Recent Reviews - \n")
            //call in reviews function
            reviews(id)
        })
        .catch(err => console.error(err))
}

//oldBusiness is here in order to be 
//able to use most of the functions because we wanted to make businessID 
//in the CLI to be more user friendly
//We repurposed this function to display business information for other functions
const oldBusiness = (id) => {
    yelp.business(id)
        .then(result => {
            let n = day.getDay();
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

//SubFunction of Business and oldBusiness: Reviews
//Returns all the reviews of a given business and who gave this business n amount of stars
const reviews = (businessId) => {
    yelp.reviews(businessId)
        .then(result => {
            for (let i = 0; i < result.reviews.length; i++) {
                console.log("\t\t" + result.reviews[i].user.name + " gave this establishment " + result.reviews[i].rating + " stars")
            }
        })
        .catch(err => console.error(err))
}

module.exports = {
    business,
    BusinessSearch,
    phone,
    idc,
    pro
}