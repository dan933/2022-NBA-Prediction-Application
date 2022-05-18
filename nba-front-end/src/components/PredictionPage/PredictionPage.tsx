import * as React from 'react';
import Container from '@mui/material/Container';

import api from '../../services/api';
import TeamsSection from './TeamSection/TeamsSection';
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import PredictionSection from './PredictionSection/PredictionSection';

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

  const [teamList, setTeamList] = React.useState<ITeam[]>()

  const [IsLoading, setIsLoading] = React.useState<boolean>(true)

  const [selectedTeamsId, setSelectedTeamsId] = React.useState<number[]>([])


// Functions should be put in services/predictionServices later on
  const IsSelected = (id: number) => {
    return selectedTeamsId.includes(id)
  }
 
  const [selectedTeams, setSelectedTeams] = React.useState<ITeam[]>([])

  const getAllTeams = async () => {
    let teamListResp:any = await api.GetAllTeams()
    .catch((err) => {
      throw err
    })

    console.log(teamListResp.data.Data[0])

    setTeamList(teamListResp.data.Data)

    return teamListResp;

  }

  const getTeamMatchUp = () => {
    setSelectedTeams(teamList?.filter((x) => IsSelected(x.TeamID as number)) as ITeam[])    
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
    setSelectedTeams([])
  };

  const navigateToMatchUps = () => {
    setValue(0);
    setSelectedTeamsId([])
    setSelectedTeams([])
  }



return (
  <Container sx={{ mt: 4, mb: 4, "minHeight": '600px' }}>
    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
      <Tab label="Match Up"/>
      <Tab label="Prediction"/>
    </Tabs>
    <>
    <TabPanel value={value} index={0}>
      <TeamsSection
          teamList={teamList}
          IsLoading={IsLoading}
          setIsLoading={setIsLoading}            
          setSelectedTeamsId={setSelectedTeamsId}
          selectedTeamsId={selectedTeamsId}
          getTeamMatchUp={getTeamMatchUp}
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