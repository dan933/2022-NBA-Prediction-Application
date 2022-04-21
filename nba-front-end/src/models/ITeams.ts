export interface ITeams {
    TeamID: number;
    TeamName: string;
    TeamWinPercentage: number;
  }

  export class Teams implements ITeams {

    constructor(
        public TeamID: number,
        public TeamName: string,
        public TeamWinPercentage: number,
        ) {
        ;
    }
}