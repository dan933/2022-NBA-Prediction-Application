import { useEffect, useState } from "react";
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
import { useAuth0 } from "@auth0/auth0-react";
import api from "../../services/api";

const TeamPage:React.FC<any> = (props:any) => {

//-------------------- Used for selection context ------------------//
  const [teamSelectionModel, setTeamSelectionModel] = useState<any>({ TeamName: undefined, TeamID: undefined })

  const [teamPlayersList, setTeamPlayersList] = useState<any>([])

  const [playerToDelete, setPlayerToDelete] = useState<any>([])

  const [teamList, setTeamList] = useState<any>([]);

  const [playersList, setPlayersList] = useState<any>([]);

  const [isLoading, setLoading] = useState<any>(false);

  const { getAccessTokenSilently } = useAuth0();


//------------------- Loads player lineup so add player section has a list of players that are already on the team -------------//
  const getTeamPlayers = async () => {
    const token = await getAccessTokenSilently();
    api.getTeamPlayers(token, setTeamPlayersList,setLoading, teamSelectionModel.TeamID,  )
  }

  useEffect(() => {
    getTeamPlayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamSelectionModel]);
  
//--------------------------------------------------------------------//

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
    setPlayersList,
    isLoading,
    setLoading
  }
//----------------------------------------------------------------------//

  const theme = useTheme();
  
  //uses boolean to determine which view to show
  const IsMobileView = useMediaQuery(theme.breakpoints.down('md'))
  const IsDesktopView = useMediaQuery(theme.breakpoints.up('md'))
  
  const teamListSection =
    (
        <TeamList/>
    )

  const teamPlayerTableLoaderSection =
    (
        <TeamPlayerTableLoader/>
    )

  const addPlayerTableLoaderSection =
    (
        <AddPlayerTableLoader/>
    )

  return (
    <TeamPageContext.Provider
      value={teamPageContextStates}
    >
        <Container maxWidth={false} sx={{ mt:4, mb: 4, "minHeight": '600px' }}>

          {IsDesktopView? 
          <TeamPageDesktopView 
            teamListSection={teamListSection} 
            teamPlayerTableLoaderSection={teamPlayerTableLoaderSection} 
            addPlayerTableLoaderSection={addPlayerTableLoaderSection}
          /> 
          : null}

          {/* --------------------------------------- This Box contains all tables for the Mobile View -------------------------------------- */}
          {/*hides screens lg and up*/}

          {IsMobileView? 
          <TeamPageMobileView 
            teamListSection={teamListSection} 
            teamPlayerTableLoaderSection={teamPlayerTableLoaderSection} 
            addPlayerTableLoaderSection={addPlayerTableLoaderSection}
          /> 
          : null}

        </Container>
    </TeamPageContext.Provider>
  );
};


export default TeamPage; 