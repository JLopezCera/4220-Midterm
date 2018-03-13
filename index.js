'use strict';

const yelp = require('yelp');

const apiKey = '--vBS8be65vVEbTkD-KZ0z2aV8-hwnq6rhaQT7px02g3MprkD6ZXytF94vuJBh2cVoLTTJUuggz87dlDh0WOjG2dvCNG7rHg9svsLbso7D7_ZMNh0Xw6Rrbq6W2gWnYx'

const searchRequest ={

term:'Four Barrel Coffee',
location: 'los angelos, ca'

}

const client = yelp.client(apiKey)

client.search(searchRequest).then(response=>{
    const firstResult = response.jsonBody.businesses[0]
    const prettyJason = JSON.stringify(firstResult,null,4)
    console.log(prettyJson)
}).catch(e=>{
    console.log(e)
})