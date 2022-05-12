import * as React from 'react';
import Container from '@mui/material/Container';

import api from '../../services/api';
import TeamsSection from './TeamSection/TeamsSection';
import { Grid, Paper } from '@mui/material';

function PredictionPage() {

  interface ITeam {
    TeamID ?: number,
    TeamName?: string,
    WinPer?:number
  }

  const [teamList, setTeamList] = React.useState<ITeam[]>()

  const [IsLoading, setIsLoading] = React.useState<boolean>(true)

  const [selectedTeams, setSelectedTeams] = React.useState<number[]>([])



//--------------------------- API Call get teams with win percentage ---------------------//  
  React.useEffect(() => {
    setTeamList(api.GetAllTeams())    
    setIsLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [IsLoading])
  

return (
  <Container maxWidth={false} sx={{ mt: 4, mb: 4, "minHeight": '600px' }}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={10} md={8} lg={4}>
           <TeamsSection
            teamList={teamList}
            IsLoading={IsLoading}
            setIsLoading={setIsLoading}            
            setSelectedTeams={setSelectedTeams}
            selectedTeams={selectedTeams}
        />
{/* ------------------------------------ Prediction stuff goes here -------------------- */}
      </Grid>
    </Grid>
  </Container>
);
    }
    
  export default PredictionPage;
  