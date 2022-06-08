import { createContext } from 'react';

//todo change name to team page context
export const SelectionContext = createContext({
    teamSelectionModel:{ TeamName:null, TeamID:null},
    setTeamSelectionModel: (teamSelectionModel: any) => { },
    SelectedPlayersID:[],
    setSelectedPlayersID: (SelectedPlayers: any) => { },
    playerToDelete:[],
    setPlayerToDelete: (playerToDelete: any) => { }
});