const

    yelp = require('../yelpproject'),
    inquirer = require('inquirer')


// const search = (term) => {
//     yelp.search(term)
//         .then(result => {
//             searchLocal(result)
//     })
// }
const idc = (term, location) => {
    yelp.idc(term, location)
        .then(result => {
            return inquirer.prompt([{
                type: 'list',
                message: 'select place that you would like more information from',
                name: 'place',
                choices: [{ name: result.businesses[0].name, value: result.businesses[0].id }, { name: result.businesses[1].name, value: result.businesses[1].id }, { name: result.businesses[2].name, value: result.businesses[2].id }, { name: result.businesses[3].name, value: result.businesses[3].id }, { name: result.businesses[4].name, value: result.businesses[4].id }],
            }
            ]).then(answer => {
                reviews(answer.place)
                business(answer.place)
            });
        }
        )
}

const search = (term, location) => {
    yelp.search(term,location)
    .then(result => {
    return inquirer.prompt([{
        type: 'list',
        message: 'select place that you would like more information from',
        name: 'place',
        choices: [{ name: result.businesses[0].name, value: result.businesses[0].id }, { name: result.businesses[1].name, value: result.businesses[1].id }, { name: result.businesses[2].name, value: result.businesses[2].id }, { name: result.businesses[3].name, value: result.businesses[3].id }, { name: result.businesses[4].name, value: result.businesses[4].id }],
    }
    ]).then(answer => {
        reviews(answer.place)
        business(answer.place)
      });
}
    )}

const business = (id) => {
  yelp.business(id)
        .then(result => {
            console.log("\n" + result.name+"\n")
            console.log(result.location.address1)
            console.log(result.location.city + ", " + result.location.country + " " + result.location.zip_code + "\n")
            console.log("Phone Number - " + result.display_phone + "\n")
            console.log("Price Range - " + result.price + "\n")
            console.log(result.rating + " Stars\n")
            console.log("Yelp Website - " + result.url + "\n")
            if (result.hours[0].is_open_now === true){
            console.log("It's Open\n")}
            else {
                console.log("It's Closed\n")
            }
        })
        .catch(err => console.error(err))
}

const phone = (phone) => {
    yelp.phoneSearch(phone)
        .then(result => {
            business(result.businesses[0].id)
        })
        .catch(err => console.error(err))
        
}

// const transactionSearch = (transactionType , parameters) => {
//     yelp.transactionSearch(transactionType , parameters)
//         .then(result => {
//             console.log(result.businesses[0].name)
//         })
//         .catch(err => console.log(err))
// }

const reviews = (businessId) => {
    yelp.reviews(businessId)
    .then(result => {
    console.log(result.reviews[0].user.name + " gave this establishment " + result.reviews[0].rating + " stars")        
    console.log(result.reviews[1].user.name + " gave this establishment " + result.reviews[1].rating + " stars")
    console.log(result.reviews[2].user.name + " gave this establishment " + result.reviews[2].rating + " stars")
    })
}

// const businessMatch = (matchType, parameters) => {

// }

// const autocomplete = (parameters) => {

// }
        

//transactionSearch("pickup" , "term=restaurant&location=duarte")
//search("term=restaurants&location=duarte")
//business("gravy-portland");
//phone('+14157492060')

module.exports = {
    business,
    search,
    phone,
    idc,
//    transactionSearch,
    reviews,
 //   businessMatch,
   // autocomplete
}