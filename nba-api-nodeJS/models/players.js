// Define the 'tbl_Players' model
module.exports = (sequelize, Sequelize) => {

    const Player = sequelize.define("tbl_Players", {
        PlayerID: Sequelize.INTEGER,
        FirstName: Sequelize.STRING,
        LastName: Sequelize.STRING,
        Year: Sequelize.STRING,
        Wins: Sequelize.INTEGER,
        Losses: Sequelize.INTEGER,
        PreviousWins: Sequelize.INTEGER,
        PreviousLosses: Sequelize.INTEGER,
        PlayerWinPercent: Sequelize.FLOAT,
        Points: Sequelize.FLOAT,
        Rebounds: Sequelize.FLOAT,
        Assists: Sequelize.FLOAT,
        Steals: Sequelize.FLOAT,
        Blocks: Sequelize.FLOAT,
        MissedFieldGoals: Sequelize.FLOAT,
        MissedFreeThrows: Sequelize.FLOAT,
        TurnOvers: Sequelize.FLOAT
    },
        {
            freezeTableName: true
        }
    );
    
    return Player;
}