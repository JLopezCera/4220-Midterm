const
    app = require('./app'),
    yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: 'Searches yelp for whatever you like by keyword',
        builder: (yargs) => {
            return yargs.option('term', {
                alias: 't',
                describe: 'Type of place or name of place we are looking for'
            }).option('location', {
                alias: 'l',
                describe: 'City we are looking in'
            })
        },
        handler: (argv) => { app.search(argv.term, argv.location) }
    })

    .command({
        command: 'SearchByNumber',
        desc: 'Searches for an establishment with the phone number provided',
        builder: (yargs) => {
            return yargs.option('Phone', {
                alias: 'p',
                describe: 'Number we are using to search'
            })
             },
        handler: (argv) => { app.phone(argv.Phone) },
    })

    .command({
        command: 'BusinessID',
        desc: 'Searches for an establishment with the ID provided',
        builder: (yargs) => {
            return yargs.option('ID', {
                alias: 'i',
                describe: 'ID we are using to search'
            })
        },
        handler: (argv) => { app.business(argv.ID) },
    })

    .command({
        command: 'ReviewsOf',
        desc: 'Gets reviews from the business whose ID we provide',
        builder: (yargs) => {
            return yargs.option('Review', {
                alias: 'r',
                describe: 'ID we are using to search'
            })
        },
        handler: (argv) => { app.reviews(argv.Review) },
    })

    .command({
    command :'IDC',
    desc: "For when your significant other says they don't care where you guys go eat",
    builder: (yargs) => {
            return yargs.option('location', {
                alias: 'l',
                describe: "I don't care where we eat, somewhere close"
            })
        },
    handler: (argv) => app.idc("restaurant",argv.location),
    })

    .help('help')
    .argv