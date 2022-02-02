const mongoose = require('mongoose')

if (process.argv.length < 5) {
    console.log('Please provide the following three arguments:');
    console.log("1. MongoDB database password");
    console.log("2. Person's name");
    console.log("3. Person's phone number");
    process.exit(1)
}

const [ , , password, name, number] = process.argv