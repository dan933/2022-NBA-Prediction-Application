export interface IPlayer {
    PlayerID: number;
    FirstName: string;
    LastName: string;
    FullName: string;
    Wins: number;
    Losses: number;
    PlayerWinPercentage: number;
    Points: number;
    Rebounds: number;
    Assists: number;
    Steals: number;
    Blocks: number;
    MissedFieldGoals: number;
    MissedFreeThrows: number;
    TurnOvers: number;
  
  }

export class Player implements IPlayer {

    constructor(public PlayerID: number, public FirstName: string, public LastName: string, public FullName: string, public Wins: number, public Losses: number, public PlayerWinPercentage: number, public Points: number, public Rebounds: number, public Assists: number, public Steals: number, public Blocks: number, public MissedFieldGoals: number, public MissedFreeThrows: number, public TurnOvers: number) {
        this.FullName = this.FirstName+" "+this.LastName;
    }
}