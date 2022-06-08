import { useState } from "react";
import { Box, Paper } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

function TeamPageMobileView(props: any) {

    // declares a state for value. this references which tab the website will display. default value is set to "Teams" which shows the Team List
    const [value, setValue] = useState("Teams");

    // handleChange manages the event for when the user clicks on a tab in mobile view. 
    // it assigns "value" state into the "newValue". the "newValue" is obtained from the values within each TabPanel
    const handleChange = (event:any, newValue: string) => {
      setValue(newValue);
    };

  return (
    <>
      <Box
        sx={{ width: '100%', typography: 'body1' }}>
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
            {props.teamListSection}
          </TabPanel>

          {/* --------------------------------------- Lineup Section -------------------------------------- */}
          <TabPanel value="Lineup">
            <Paper
              sx={{ p: 2, height: '800px' }}
            >
              {props.teamPlayerTableLoaderSection}
            </Paper>
          </TabPanel>

          {/* --------------------------------------- Players Section -------------------------------------- */}
          <TabPanel value="Add Players">
            <Paper
              sx={{ p: 2, height: '800px' }}
            >
              {props.addPlayerTableLoaderSection}
            </Paper>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default TeamPageMobileView;