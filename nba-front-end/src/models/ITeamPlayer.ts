export interface ITeamPlayer {
    PlayerID: number;
    FirstName: string;
    LastName: string;
    FullName: string;
    TeamID: number,
    TeamName: string,
    Wins: number;
    Losses: number;
    PreviousWins: number;
    PreviousLosses: number;
    PlayerWinPercent: number;
    Points: number;
    Rebounds: number;
    Assists: number;
    Steals: number;
    Blocks: number;
    MissedFieldGoals: number;
    MissedFreeThrows: number;
    TurnOvers: number;
  
  }

export class TeamPlayer implements ITeamPlayer {

    constructor(
        public PlayerID: number,
        public FirstName: string,
        public LastName: string,
        public FullName: string,
        public TeamID: number,
        public TeamName: string,
        public Wins: number,
        public Losses: number,
        public PreviousWins: number,
        public PreviousLosses: number,
        public PlayerWinPercent: number,
        public Points: number,
        public Rebounds: number,
        public Assists: number,
        public Steals: number,
        public Blocks: number,
        public MissedFieldGoals: number,
        public MissedFreeThrows: number,
        public TurnOvers: number) {
        this.FullName = this.FirstName+" "+this.LastName;
    }
}