import { createContext } from 'react';

//todo change name to team page context
export const SelectionContext = createContext({
    //todo change to TeamSelection Model
    SelectionModel:{ TeamName:null, TeamID:null},
    setSelectionModel: (SelectionModel: any) => { },
    SelectedPlayers: [],
    setSelectedPlayers: (SelectedPlayers: any) => { }
});