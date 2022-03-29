const express = require('express')
require('dotenv').config();
const app = express()

const cors = require("cors");

//Allowed url's for cross origin resource sharing
var corsOptions = {
  origin: "http://nba-api.australiaeast.cloudapp.azure.com:3070",
  origin: "https://nba-api.australiaeast.cloudapp.azure.com:3070",
  origin: "https://chimerical-cheesecake-efd745.netlify.app",

};

//enable CORS options
app.use(cors(corsOptions));
//source https://github.com/keycloak/keycloak-quickstarts/blob/latest/service-nodejs/app.js

// In development, you may need to drop existing tables and re-sync database. Just use force: true as following code:

//Routes for players controller
app.use('/api', require('./controllers/players-controler'));

//Test to see if server is working
app.get('/', (req, res) => {
  res.send('NBA Prediction Algorithm')
})


app.listen(process.env.PORT||3070, () => {
    console.log(`Server listening on port ${process.env.PORT||3070}`)
  })
