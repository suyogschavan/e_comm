const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://localhost:27017/e_com';
mongoose.connect(MONGO_URL);
const db = mongoose.connection;

db.on('error', console.error.bind(console, "MongoDB Connection Error: "));
db.once('open', ()=>{
    console.log('Connected to Database');
});

module.exports = mongoose;