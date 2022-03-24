
class Player 
{
    constructor(
        playerID, firstName, lastName, year, wins,
        lossess, PlayerWinPercentage, points, rebounds,
        assists, steals, blocks, missedFieldGoals,
        missedFreeThrows, turnOvers
    ) {
       
        this.PlayerID = playerID;
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Year = year;
        this.Wins = wins;
        this.Losses = lossess;
        this.PlayerWinPercentage = PlayerWinPercentage;
        this.Points = points;
        this.Rebounds = rebounds;
        this.Assists = assists;
        this.Steals = steals;
        this.Blocks = blocks;
        this.MissedFieldGoals = missedFieldGoals;
        this.MissedFreeThrows = missedFreeThrows;
        this.TurnOvers = turnOvers;
    }
}

export default Player;