const {connectToDB, createDBContext} = require("../db-config");

//for later use useful for searching
//const Op = db.Sequelize.Op;

const Sequelize = require("sequelize");

exports.getPlayers = async (req, res) => {

  const sequelize = connectToDB();

  const db = createDBContext(sequelize);

  db.Players = require("../models/players.js")(sequelize, Sequelize);

  await  db.Players.findAll({
    attributes: ['PlayerID','FirstName','LastName','Year','Wins','Losses','PlayerWinPercentage','Points','Rebounds','Assists','Steals','Blocks','MissedFieldGoals','MissedFreeThrows','TurnOvers']
  })
    .then(
      data => { res.send(data)}
    )
    .catch(
      err => res.status(500)
        .send({ message: err.message || "internal server error" })
  );

  sequelize.close();
}