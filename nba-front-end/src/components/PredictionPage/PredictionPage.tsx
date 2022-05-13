import * as React from 'react';
import Container from '@mui/material/Container';

import api from '../../services/api';
import TeamsSection from './TeamSection/TeamsSection';
import { Grid } from '@mui/material';
import PredictionSection from './PredictionSection/PredictionSection';

export interface ITeam {
  TeamID ?: number,
  TeamName?: string,
  WinPer?:number
}

function PredictionPage() {



  const [teamList, setTeamList] = React.useState<ITeam[]>()

  const [IsLoading, setIsLoading] = React.useState<boolean>(true)

  const [selectedTeamsId, setSelectedTeamsId] = React.useState<number[]>([])


// Functions should be put in services/predictionServices later on
  const IsSelected = (id: number) => {
    return selectedTeamsId.includes(id)
  }
 
  const [selectedTeams, setSelectedTeams] = React.useState<ITeam[]>([])

  const getTeamMatchUp = () => {
    setSelectedTeams(teamList?.filter((x) => IsSelected(x.TeamID as number)) as ITeam[])    
  }

//--------------------------- API Call get teams with win percentage ---------------------//  
  React.useEffect(() => {
    setTeamList(api.GetAllTeams())    
    setIsLoading(false)    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [IsLoading])
  


//------------------------------- Todod create tabs to navigate from compare teams to predictions ---------------------/

return (
  <Container sx={{ mt: 4, mb: 4, "minHeight": '600px' }}>
    <Grid container spacing={2} >
{/* ------------------------------- Teams Section ---------------------------       */}
      <Grid item>
        <TeamsSection
        teamList={teamList}
        IsLoading={IsLoading}
        setIsLoading={setIsLoading}            
        setSelectedTeamsId={setSelectedTeamsId}
        selectedTeamsId={selectedTeamsId}
        getTeamMatchUp={getTeamMatchUp}
        />
      </Grid>

{/* ------------------------------- Prediction Section ---------------------------       */}
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <PredictionSection
          selectedTeams={selectedTeams}
        />
      </Grid>
    </Grid>
  </Container>
);
    }
    
  export default PredictionPage;
  