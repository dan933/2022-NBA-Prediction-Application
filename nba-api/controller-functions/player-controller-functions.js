const { text } = require("express");
const { sequelize } = require("../db-config");


const db = require('../db-config')

//for later use useful for searching
//const Op = db.Sequelize.Op;



exports.getPlayers = async (req, res) => {
  const players = await  db.Players.findAll({
    attributes: ['PlayerID','FirstName','LastName','Year','Wins','Losses','PlayerWinPercentage','Points','Rebounds','Assists','Steals','Blocks','MissedFieldGoals','MissedFreeThrows','TurnOvers']
  })
    .then(
      data => { res.send(data), console.log(data)}
    )
    .catch(
      err => res.status(500)
        .send({ message: err.message || "internal server error" })
  );
  
  db.close();
}