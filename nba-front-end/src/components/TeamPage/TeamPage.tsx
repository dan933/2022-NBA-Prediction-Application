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

function TeamPage(props:any) {

  const [selectionTeam, setSelectionTeam] = useState<GridSelectionModel>([]);

  const [teamList, setTeamList] = useState([]);
  const [teamPlayersIDList, setTeamPlayersIDList] = useState([]);
  const [teamPlayersList, setTeamPlayersList] = useState([]);

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
      <TeamList
        tableIsUpdated={teamPlayerListIsUpdated}
        selectionModel={selectionTeam}
        setSelectionModel={setSelectionTeam}
        teamList={teamList}
        setTeamList={setTeamList}
      />
    )

  const teamPlayerTableLoaderSection =
    (
      <TeamPlayerTableLoader
        teamID={selectionTeam}
        isUpdated={playersIsUpdated}
        IsMobileView={IsMobileView}
        setIsUpdated={setPlayersIsUpdated}
        tableIsUpdated={teamPlayerListIsUpdated}
        setTeamPlayersIDList={setTeamPlayersIDList}
        teamPlayersList={teamPlayersList}
        setTeamPlayersList={setTeamPlayersList}
      />
    )

  const addPlayerTableLoaderSection =
    (
      <AddPlayerTableLoader
        teamID={selectionTeam}
        tableIsUpdated={teamPlayerListIsUpdated}
        isUpdated={addPlayersIsUpdated}
        setIsUpdated={setAddPlayersIsUpdated}
        teamPlayersList={teamPlayersIDList}
        />
    )

  return (
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
  );
};


export default TeamPage; 