const express = require('express')
const app = express()
const port = 3000

const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:3000",
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
//source https://github.com/keycloak/keycloak-quickstarts/blob/latest/service-nodejs/app.js

const db = require("./db-config");
db.sequelize.sync();

// In development, you may need to drop existing tables and re-sync database. Just use force: true as following code:

//Routes
app.use('/api', require('./controllers/players-controler'));


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
