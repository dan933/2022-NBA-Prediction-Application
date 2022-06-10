import { createContext } from 'react';
import { TeamPageContextType } from "../../models/ContextModels/TeamPageContextModels";
export const TeamPageContext = createContext<TeamPageContextType>({
    teamSelectionModel: { TeamName: undefined, TeamID: undefined },
    setTeamSelectionModel: (teamSelectionModel: any) => { },
    teamPlayersList: [],
    setTeamPlayersList: (teamPlayersList: any) => { },
    playersList: [],
    setPlayersList: (playersList: any) => { },
    teamList: [],
    setTeamList: (teamList: any) => { },
    playerToDelete:undefined,
    setPlayerToDelete: (playerToDelete: any) => { }
});