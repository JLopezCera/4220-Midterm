const
    yelp = require('/yelp'),
    inquirer = require('inquirer')

    const get = (id ) => {
        yelp.business(id)
            .then(console.log(search))
            .catch(err => console.log(err))
    }


