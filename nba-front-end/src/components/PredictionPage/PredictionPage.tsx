import * as React from 'react';
import Container from '@mui/material/Container';

import api from '../../services/api';
import TeamsSection from './TeamSection/TeamsSection';
import { Box, Tabs, Typography } from '@mui/material';
import PredictionSection from './PredictionSection/PredictionSection';
import { useAuth0 } from '@auth0/auth0-react';

export interface ITeam {
  TeamID ?: number,
  TeamName?: string,
  WinChance?:number
}

//-------------------------------- Might be good to put this component in services so that other components can reuse it ??? ---------------------------------//
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'} variant={'body2'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function PredictionPage() {

  const { getAccessTokenSilently } = useAuth0();

  const [teamList, setTeamList] = React.useState<ITeam[]>()

  const [IsLoading, setIsLoading] = React.useState<boolean>(true)

  const [selectedTeamsId, setSelectedTeamsId] = React.useState<number[]>([])


// Functions should be put in services/predictionServices later on
  const getAllTeams = async () => {

    const token = await getAccessTokenSilently();

    let teamListResp:any = await api.GetAllTeams(token)
    .catch((err) => {
      throw err
    })   

    setTeamList(teamListResp.data.Data)

    return teamListResp;

  }

//--------------------------- API Call get teams with win percentage ---------------------//  
  React.useEffect(() => {

    getAllTeams()
    
      
    setIsLoading(false)    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [IsLoading])

  const [value, setValue] = React.useState(0);
  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    
    setValue(newValue);
    setSelectedTeamsId([])
  };

  const navigateToMatchUps = () => {
    setValue(0);
    setSelectedTeamsId([])
  }



return (
  <Container sx={{mb: 4, "minHeight": '600px' }}>
    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
    </Tabs>
    <>
    <TabPanel value={value} index={0}>
      <TeamsSection
          teamList={teamList}
          IsLoading={IsLoading}
          setIsLoading={setIsLoading}            
          setSelectedTeamsId={setSelectedTeamsId}
          selectedTeamsId={selectedTeamsId}
          setValue={setValue}
      />
    </TabPanel>
    <TabPanel value={value} index={1}>
      <PredictionSection
        selectedTeamsId={selectedTeamsId}
        navigateToMatchUps={navigateToMatchUps}
    />
      </TabPanel>
      </>

  </Container>
);
    }
    
  export default PredictionPage;
  



//----------------------------------------- Option 1 no tabs ------------------------------------------//
  // <Grid container spacing={2} >
  // {/* ------------------------------- Teams Section ---------------------------       */}
  //       <Grid item>
  //         <TeamsSection
  //         teamList={teamList}
  //         IsLoading={IsLoading}
  //         setIsLoading={setIsLoading}            
  //         setSelectedTeamsId={setSelectedTeamsId}
  //         selectedTeamsId={selectedTeamsId}
  //         getTeamMatchUp={getTeamMatchUp}
  //         />
  //       </Grid>
  
  // {/* ------------------------------- Prediction Section ---------------------------       */}
  //       <Grid item xs={12} sm={12} md={12} lg={8}>
  //         <PredictionSection
  //           selectedTeams={selectedTeams}
  //         />
  //       </Grid>
  //     </Grid>