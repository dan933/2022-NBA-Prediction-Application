import { useEffect, useState } from "react";
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

  const [teamPlayersList, setTeamPlayersList] = useState([]);

  const [playersIsUpdated, setPlayersIsUpdated] = useState(false);
  const [addPlayersIsUpdated, setAddPlayersIsUpdated] = useState(false);

  const tableIsUpdated = () => {
    
    setPlayersIsUpdated(true);
    setAddPlayersIsUpdated(true);
  };

  useEffect(() => {

    setPlayersIsUpdated(true);
    setAddPlayersIsUpdated(true);

  }, [selectionTeam])

  const theme = useTheme();
  
  //uses boolean to determine which view to show
  const IsMobileView = useMediaQuery(theme.breakpoints.down('md'))
  const IsDesktopView = useMediaQuery(theme.breakpoints.up('md'))
  
  const teamListSection =
    (
      <TeamList
        tableIsUpdated={tableIsUpdated}
        selectionModel={selectionTeam}
        setSelectionModel={setSelectionTeam}
      />
    )

  const teamPlayerTableLoaderSection =
    (
      <TeamPlayerTableLoader
        teamID={selectionTeam}
        isUpdated={playersIsUpdated}
        IsMobileView={IsMobileView}
        setIsUpdated={setPlayersIsUpdated}
        tableIsUpdated={tableIsUpdated}
        setTeamPlayersList={setTeamPlayersList}
      />
    )

  const addPlayerTableLoaderSection =
    (
      <AddPlayerTableLoader
        teamID={selectionTeam}
        tableIsUpdated={tableIsUpdated}
        isUpdated={addPlayersIsUpdated}
        setIsUpdated={setAddPlayersIsUpdated}
        teamPlayersList={teamPlayersList}
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