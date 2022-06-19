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
import { axiosRequestConfiguration } from "../../services/axios_config";

const TeamPage:React.FC<any> = (props:any) => {

//-------------------- Used for selection context ------------------//
  const [teamSelectionModel, setTeamSelectionModel] = useState<any>({ TeamName: undefined, TeamID: undefined })

  const [teamPlayersList, setTeamPlayersList] = useState<any>([])

  const [playerToDelete, setPlayerToDelete] = useState<any>([])

  const [teamList, setTeamList] = useState<any>([]);

  const [playersList, setPlayersList] = useState<any>([]);

  const isTeamSelected = (teamValue: number | undefined) => {
    return typeof teamValue ==='number'
  }

  const { getAccessTokenSilently } = useAuth0();

  const url = axiosRequestConfiguration.baseURL

  const updatePlayerTable =
  async () => {      
    const token = await getAccessTokenSilently();
    console.log(teamSelectionModel.TeamID);
    if (isTeamSelected(teamSelectionModel.TeamID)) {    
      api.get(`${url}/team/${teamSelectionModel.TeamID}/get-players`, token)
        .subscribe({
          next: (resp: any) => {              
            setTeamPlayersList(resp.Data);
          },
          error: (err) => {
            console.log(err);
          }
      })
    }
  }


useEffect(() => {
  updatePlayerTable();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamSelectionModel]);

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