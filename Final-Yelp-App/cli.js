const
    app = require('./app'), // yelp app
    yargs = require('yargs') //use yargs

//flags
const flags = yargs.usage('$0: Usage <cmd> [options]')
    //BusinessSearch Command
    //needs a term(-t) and location(-l)
    .command({
        command: 'BusinessSearch',
        desc: 'Searches yelp for whatever you like by keyword \n (ex. BusinessSearch -t "Restaurant" -l "Los Angeles")\n',
        builder: (yargs) => {
            return yargs.option('term', {
                alias: 't',
                describe: 'Type of place or name of place we are looking for'
            }).option('location', {
                alias: 'l',
                describe: 'City we are looking in'
            })
        },
        //call in BusinessSearch
        handler: (argv) => { app.BusinessSearch(argv.term, argv.location) }
    })

    //SearchByPhoneNumber Command
    //needs a phone(-p)
    .command({
        command: 'SearchByPhoneNumber',
        desc: 'Searches for an establishment with the phone number provided\n (ex. SearchByPhoneNumber -p 6264575234)\n',
        builder: (yargs) => {
            return yargs.option('phone', {
                alias: 'p',
                describe: 'Number we are using to search'
            })
        },
        //call in phone
        handler: (argv) => { app.phone(argv.phone) },
    })
    //BusinessID Command
    //needs a name(-n) and location(-l)
    .command({
        command: 'BusinessID',
        desc: 'Searches for an establishment with the ID provided \n (ex. BusinessID -n "Bestia" -l "Los Angeles")\n',
        builder: (yargs) => {
            return yargs.option('name', {
                alias: 'n',
                describe: 'Name Of Business'
            }).option('location', {
                alias: 'l',
                describe: 'City we are looking in'
            })
        }, 
        //call in businessid
        handler: (argv) => { app.business(argv.name,argv.location) },
    })
    //IDC command
    //needs a location(-l)
    .command({
        command: 'IDC',
        desc: 'For when your significant other says they want to eat anywhere \n (ex. IDC -l "Los Angeles")\n',
        builder: (yargs) => {
            return yargs.option('location', {
                alias: 'l',
                describe: "Take me somewhere nice"
            })
        },
        //call in idc
        handler: (argv) => app.pro(argv.location),
    })
    //help command
    .help('help')
    .argv