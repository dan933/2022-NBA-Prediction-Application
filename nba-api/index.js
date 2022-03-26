const express = require('express')
require('dotenv').config();
const app = express()
const port = 3070

const cors = require("cors");

var corsOptions = {
  origin: "http://nba-api.australiaeast.cloudapp.azure.com:3070",
  origin: "nba-api.australiaeast.cloudapp.azure.com:3070"
};

app.use(cors());
//source https://github.com/keycloak/keycloak-quickstarts/blob/latest/service-nodejs/app.js

//const db = require("./db-config");

// In development, you may need to drop existing tables and re-sync database. Just use force: true as following code:

//Routes
app.use('/api', require('./controllers/players-controler'));


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
