import { createContext } from 'react';

export const SelectionContext = createContext({
    SelectionModel:{ TeamName: "John", TeamID: 1 },
    setSelectionModel:(SelectionModel:any) => {}
});