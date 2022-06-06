import React from "react";
import { GridSelectionModel } from "@mui/x-data-grid";
import { Grid, Paper, useMediaQuery } from "@mui/material";
import type { } from '@mui/lab/themeAugmentation';
import '@mui/lab/themeAugmentation';
import TeamList from "./TeamList";
import TeamPlayerTableLoader from "./TeamPlayerTableLoader";
import AddPlayerTableLoader from "./AddPlayerTableLoader";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useTheme } from '@mui/material/styles';
import ResponsiveServices from '../../services/ResponsiveServices/ResponsiveServices';

const TeamPageContent: React.FC<any> = (props) => {

  const [selectionTeam, setSelectionTeam] = React.useState<GridSelectionModel>([]);

  const [teamList, setTeamList] = React.useState(props.teamList);
  
  const [teamPlayersList, setTeamPlayersList] = React.useState([]);

  const [isUpdated, setIsUpdated] = React.useState(false);

  const tableIsUpdated = () => {
    setIsUpdated(true);
  };
  
   // declares a constant for defaultView which is used in the display property for bigger screens.
   //const defaultView = { xs: "none", lg: "block" };
   // declares a constant for mobileView which is used in the display property for smaller screens.
  //const mobileView = { xs: "block", lg: "none" };
  
  const [mobileView, defaultView] = ResponsiveServices.CreateDesktopMobileViews();

  // declares a state for value. this references which tab the website will display. default value is set to "Teams" which shows the Team List
  const [value, setValue] = React.useState("Teams");

  // handleChange manages the event for when the user clicks on a tab in mobile view. 
  // it assigns "value" state into the "newValue". the "newValue" is obtained from the values within each TabPanel
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const teamListSection =
    (
      <TeamList
        tableIsUpdated={tableIsUpdated}
        setSelectionModel={setSelectionTeam}
        selectionModel={selectionTeam}
        teamList={teamList}
        isUpdated={isUpdated}
        setTeamList={setTeamList}
      />

    )
  

  const teamPlayerTableLoaderSection = 
    (
      <TeamPlayerTableLoader
        teamID={selectionTeam}
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        tableIsUpdated={tableIsUpdated}
        setTeamPlayersList={setTeamPlayersList}
      />
    )

  const addPlayerTableLoaderSection =
    (
      <AddPlayerTableLoader
        teamID={selectionTeam}
        tableIsUpdated={tableIsUpdated}
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        teamPlayersList={teamPlayersList}
      />
    )

  return (
    // the empty div "<>" container wraps the whole return component
    <>
      {/* --------------------------------------- This Box contains all tables for the Default view -------------------------------------- */}
      {/* screens lg and lower are hidden */}
      
        <Box  display={defaultView}>
          <Grid container spacing={2}>
            {/* -------------------------- Teams Section ----------------------------- */}
            <Grid
              item xs={12} sm={12} md={4} lg={4} xl={4}
            >
                {teamListSection}
            </Grid>        

      {/* formatting and adding of table that allows view/removal of players that are on selected team */}
      {/* -------------------------- Team Players Section ----------------------------- */}
      <Grid item xs={12} sm={12} md={4} lg={4} xl>
        <Paper
          sx={{ p: 2, height: '800px' }}
        >
          <div style={{ display: 'flex', columnGap: '10px', marginBottom: '10px' }}>
            <h2 style={{ margin: 0 }}>Your Lineup</h2>
          </div>
            {teamPlayerTableLoaderSection}
        </Paper>
      </Grid>

          {/* --------------------------------------- Players Section -------------------------------------- */}
          {/* formatting and adding of the table that allows for players to be added to a team */}

          <Grid
            item xs={12} sm={12} md={4} lg={4} xl={4}
          >
            <Paper
              sx={{ p: 2, height: '800px' }}
            >
              <div style={{ display: 'flex', columnGap: '10px', marginBottom: '10px' }}>
                <h2 style={{ margin: 0 }}>All Players</h2>
                </div>
                
                {addPlayerTableLoaderSection}
                
            </Paper>
          </Grid>
        </Grid>
        </Box>


      {/* --------------------------------------- This Box contains all tables for the Mobile View -------------------------------------- */}
      {/*hides screens lg and up*/}
      
      <Box
        display={mobileView}
        sx={{ width: '100%', typography: 'body1'}}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="NBA Prediction Tabs" variant="fullWidth">
              <Tab label="Teams" value="Teams" style={{ fontWeight: 'bold', color: "black" }}/>
              <Tab label="Lineup" value="Lineup" style={{ fontWeight: 'bold', color: "black" }}/>
              <Tab label="Add Players" value="Add Players" style={{ fontWeight: 'bold', color: "black" }}/>
            </TabList>
          </Box>

          {/* --------------------------------------- Teams Section -------------------------------------- */}
          <TabPanel value="Teams">
            {teamListSection}
          </TabPanel>

          {/* --------------------------------------- Lineup Section -------------------------------------- */}
          <TabPanel value="Lineup">
            <Paper
              sx={{ p: 2, height: '800px' }}
            >
              {teamPlayerTableLoaderSection}
            </Paper>
          </TabPanel>

          {/* --------------------------------------- Players Section -------------------------------------- */}
          <TabPanel value="Add Players">
            <Paper
              sx={{ p: 2, height: '800px' }}
            >
              {addPlayerTableLoaderSection}
            </Paper>
          </TabPanel>
        </TabContext>
        </Box>
    </>
  );
};


export default TeamPageContent; 