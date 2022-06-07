import { createContext } from 'react';

//todo change name to team page context
export const SelectionContext = createContext({
    teamSelectionModel:{ TeamName:null, TeamID:null},
    setTeamSelectionModel: (teamSelectionModel: any) => { },
    SelectedPlayers: [],
    setSelectedPlayers: (SelectedPlayers: any) => { },
    playerToDelete:null,
    setPlayerToDelete: (playerToDelete: any) => { }
});