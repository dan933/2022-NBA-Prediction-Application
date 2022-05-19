export interface ITeam {
    TeamID: number;
    TeamName: string;
    WinChance: number;
  }

  export class Team implements ITeam {

    constructor(
        public TeamID: number,
        public TeamName: string,
        public WinChance: number,
        ) {
        ;
    }
}