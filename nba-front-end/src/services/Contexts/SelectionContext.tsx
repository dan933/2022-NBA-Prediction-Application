import { createContext } from 'react';

export const SelectionContext = createContext({
    SelectionModel:{ TeamName:null, TeamID:null},
    setSelectionModel:(SelectionModel:any) => {}
});