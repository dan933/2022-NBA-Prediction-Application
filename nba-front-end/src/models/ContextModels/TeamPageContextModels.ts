interface ITeamModel {
    TeamID: number | undefined,
    TeamName: string | undefined,
    WinChance?: number,
    userID?:number 
}

interface IPlayer{
    PlayerID: number,
    FirstName: string,
    LastName: string,
    Wins: number,
    Losses: number,
    PreviousWins: number,
    PreviousLosses: number,
    PlayerWinPercent: number,
    Points: number,
    Rebounds: number,
    Assists: number,
    Steals: number,
    Blocks: number,
    MissedFieldGoals: number,
    MissedFreeThrows: number,
    TurnOvers: number
}

interface ITeamPlayer {
    TeamID: number,
    TeamName: string,
    PlayerID: number,
    FirstName: string,
    LastName: string,
    Wins: number,
    Losses: number,
    PreviousWins: number,
    PreviousLosses: number,
    PlayerWinPercent: number,
    Points: number,
    Rebounds: number,
    Assists: number,
    Steals: number,
    Blocks: number,
    MissedFieldGoals: number,
    MissedFreeThrows: number,
    TurnOvers: number
}

export type TeamPageContextType = {
    teamSelectionModel: ITeamModel,
    setTeamSelectionModel:any
    teamPlayersList: ITeamPlayer[],
    setTeamPlayersList:any
    playersList: IPlayer[],
    setPlayersList:any,
    teamList: ITeamModel[],
    setTeamList:any,
    playerToDelete?: ITeamPlayer,
    setPlayerToDelete: any,
    isLoading: boolean,
    setLoading:any
};