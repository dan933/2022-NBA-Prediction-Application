const players = require("../controller-functions/player-controller-functions.js");

let router = require("express").Router();

//Get all Players
router.get("/players/get-all", players.getPlayers);


module.exports = router;