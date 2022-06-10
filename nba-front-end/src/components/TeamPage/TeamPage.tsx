import { useCallback, useEffect, useState } from "react";
import { GridSelectionModel } from "@mui/x-data-grid";
import { Container, useMediaQuery } from "@mui/material";
import type { } from '@mui/lab/themeAugmentation';
import '@mui/lab/themeAugmentation';
import TeamList from "./TeamList";
import TeamPlayerTableLoader from "./TeamPlayerTableLoader";
import AddPlayerTableLoader from "./AddPlayerTableLoader";
import { useTheme } from '@mui/material/styles';
import TeamPageDesktopView from "./TeamPageDesktopView";
import TeamPageMobileView from "./TeamPageMobileView";
import { TeamPageContext } from '../../services/Contexts/TeamPageContext';

const TeamPage:React.FC<any> = (props:any) => {

//-------------------- Used for selection context ------------------//
  const [teamSelectionModel, setTeamSelectionModel] = useState<any>({ TeamName: undefined, TeamID: undefined })

  const [teamPlayersList, setTeamPlayersList] = useState<any>([])

  const [playerToDelete, setPlayerToDelete] = useState<any>([])

  const [teamList, setTeamList] = useState<any>([]);

  const [playersList, setPlayersList] = useState<any>([]); 
  
  const teamPageContextStates = {
    teamSelectionModel,
    setTeamSelectionModel,
    teamPlayersList,
    setTeamPlayersList,
    playerToDelete,
    setPlayerToDelete,
    teamList,
    setTeamList,
    playersList,
    setPlayersList
  }

//----------------------------------------------------------------------//  

  const [selectionTeam, setSelectionTeam] = useState<GridSelectionModel>([]);
  
  const [teamPlayersIDList, setTeamPlayersIDList] = useState([]);
  //const [teamPlayersList, setTeamPlayersList] = useState([]);

  const [playersIsUpdated, setPlayersIsUpdated] = useState(false);
  const [addPlayersIsUpdated, setAddPlayersIsUpdated] = useState(false);

  const teamPlayerListIsUpdated = useCallback(() => {
    
    setPlayersIsUpdated(true);
    setAddPlayersIsUpdated(true);
    
  },[setPlayersIsUpdated,setAddPlayersIsUpdated]);

  useEffect(() => {

    teamPlayerListIsUpdated();

  }, [selectionTeam, teamPlayerListIsUpdated])

  const theme = useTheme();
  
  //uses boolean to determine which view to show
  const IsMobileView = useMediaQuery(theme.breakpoints.down('md'))
  const IsDesktopView = useMediaQuery(theme.breakpoints.up('md'))
  
  const teamListSection =
    (
      <TeamPageContext.Provider
      value={teamPageContextStates}>
      <TeamList/>
      </TeamPageContext.Provider>
    )

  const teamPlayerTableLoaderSection =
    (
      <TeamPageContext.Provider
      value={teamPageContextStates}>
      <TeamPlayerTableLoader
        // teamID={selectionTeam}
        // isUpdated={playersIsUpdated}
        // IsMobileView={IsMobileView}
        // setIsUpdated={setPlayersIsUpdated}
        // tableIsUpdated={teamPlayerListIsUpdated}
        // setTeamPlayersIDList={setTeamPlayersIDList}
        // teamPlayersList={teamPlayersList}        
      />
      </TeamPageContext.Provider>
    )

  const addPlayerTableLoaderSection =
    (
      <TeamPageContext.Provider
      value={teamPageContextStates}>
        <AddPlayerTableLoader/>
      </TeamPageContext.Provider>
    )

  return (
    <TeamPageContext.Provider
      value={teamPageContextStates}>
        <Container maxWidth={false} sx={{ mt:4, mb: 4, "minHeight": '600px' }}>

          {IsDesktopView? 
          <TeamPageDesktopView 
          teamListSection={teamListSection} 
          teamPlayerTableLoaderSection={teamPlayerTableLoaderSection} 
          addPlayerTableLoaderSection={addPlayerTableLoaderSection} /> 
          : null}

          {/* --------------------------------------- This Box contains all tables for the Mobile View -------------------------------------- */}
          {/*hides screens lg and up*/}

          {IsMobileView? 
          <TeamPageMobileView 
          teamListSection={teamListSection} 
          teamPlayerTableLoaderSection={teamPlayerTableLoaderSection} 
          addPlayerTableLoaderSection={addPlayerTableLoaderSection} /> 
          : null}

        </Container>
    </TeamPageContext.Provider>
  );
};


export default TeamPage; 