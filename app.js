require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// const MongoDBURL = process.env.MongoDBURL;
// const ExpressPort = process.env.ExpressPort;

const app = express();


var cors = require('cors');
app.use(cors());
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1:27017/RecipePassport", { useNewUrlParser: true });
const conn = mongoose.connection;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ "message": "Ready to connect server" });
});

conn.on('open', () => {
    console.log('Database is connected successfully...');
})


const UserRegistrationRoute = require('./routes/userRegistration')
app.use('/', UserRegistrationRoute)


const UserloginRoute = require('./routes/userLogIn')
app.use('/', UserloginRoute)


app.listen(3000, () => {
    console.log("Server is listening on port: 3000 ");
});
