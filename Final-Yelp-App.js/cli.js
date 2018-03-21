const
    app = require('./app'),
    yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'BusinessSearch',
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
        handler: (argv) => { app.BusinessSearch(argv.term, argv.location) }
    })

    .command({
        command: 'SearchByPhoneNumber',
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
            return yargs.option('name', {
                alias: 'n',
                describe: 'Name Of Business'
            }).option('location', {
                alias: 'l',
                describe: 'City we are looking in'
            })
        }, 
        handler: (argv) => { app.business(argv.name,argv.location) },
    })


    .command({
        command: 'IDC',
        desc: "For when your significant other says they want to eat anywhere",
        builder: (yargs) => {
            return yargs.option('location', {
                alias: 'l',
                describe: "Take me somewhere nice"
            })
        },
        handler: (argv) => app.pro(argv.location),
    })

    .help('help')
    .argv
