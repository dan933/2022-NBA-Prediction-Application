import * as React from 'react';
import Container from '@mui/material/Container';

import api from '../../services/api';
import TeamsSection from './TeamSection/TeamsSection';

function PredictionPage() {

  interface ITeam {
    TeamID ?: number,
    TeamName?:string
  }

  api.GetAllTeams()

  const [teamList, setTeamList] = React.useState<ITeam[]>()

//TeamList state goes here
//API call to get the list of teams here 
//Possibly use effect goes here
    return (
<Container maxWidth={false} sx={{ mt: 4, mb: 4, "minHeight": '600px' }}>
{/* -------------------------------- Grid stuff goes here ------------------------------- */}
        <TeamsSection
          
        />
{/* ------------------------------------ Prediction stuff goes here -------------------- */}
  </Container>
      );
    }
    
  export default PredictionPage;
  