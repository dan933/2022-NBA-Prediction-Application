import { createContext } from 'react';

export const TeamPageContext = createContext({
    teamSelectionModel: { TeamName: null, TeamID: null },
    setTeamSelectionModel: (teamSelectionModel: any) => { },
    teamPlayersList: [],
    setTeamPlayersList: (teamPlayersList: any) => { },
    playersList: [],
    setPlayersList: (playersList: any) => { },
    teamList: [],
    setTeamList: (teamList: any) => { },
    playerToDelete:[],
    setPlayerToDelete: (playerToDelete: any) => { }
});