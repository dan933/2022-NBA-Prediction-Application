export interface ITeam {
    TeamID: number;
    TeamName: string;
    // TeamWinPercentage: number;
  }

  export class Team implements ITeam {

    constructor(
        public TeamID: number,
        public TeamName: string,
        //public TeamWinPercentage: number,
        ) {
        ;
    }
}