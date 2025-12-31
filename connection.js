const mongoose = require('mongoose')

async function connectionMongodb(url){
    mongoose.connect(url);
}

module.exports = {connectionMongodb}