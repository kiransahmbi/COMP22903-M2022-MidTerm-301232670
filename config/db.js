// File Name: db.js
// Author's Name: Kirandeep Sahmbi
// Student ID: 301232670
// Web App Name: COMP229 Midterm

// Do not expose your credentials in your code.
let atlasDB = "mongodb+srv://appuser:eYOcx8UyDxVS8v0c@cluster0.yemkfnv.mongodb.net/comp229_midterm?retryWrites=true&w=majority";

// Database setup
let mongoose = require('mongoose');

module.exports = function(){

    mongoose.connect(atlasDB);
    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error:'));
    mongodb.once('open', ()=>{
        console.log('===> Connected to MongoDB.');
    })

    return mongodb;
}