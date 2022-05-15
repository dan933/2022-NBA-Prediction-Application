import React, { useRef, useState } from "react";
import {
  GridSelectionModel,
} from "@mui/x-data-grid";
import {
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import RemoveIcon from '@mui/icons-material/Remove';
import axios, { AxiosError } from 'axios';
import { axiosRequestConfiguration } from "../../services/axios_config";
import { Team } from "../../models/ITeam";
import api from "../../services/api";
import TeamList from "./TeamList";
import TeamPlayerTableLoader from "./TeamPlayerTableLoader";
import AddPlayerTableLoader from "./AddPlayerTableLoader";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TeamPageContent: React.FC<any> = (props) => {

  const url = axiosRequestConfiguration.baseURL

  const [selectionTeam, setSelectionTeam] = React.useState<GridSelectionModel>([]);

  const [teamList, setTeamList] = React.useState(props.teamList);

  const [openPopup, setOpenPopup] = useState(false);

  const [isUpdated, setIsUpdated] = React.useState(false);

  const tableIsUpdated = () => {
    setIsUpdated(true);

    // useEffect(() => {
    //     setIsUpdated(true)
    //  }, [setIsUpdated]);
  };

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  return (
    <div style={{ width: '100%' }}>
    <Grid container spacing={2}>
      
      {/* -------------------------- Teams Section ----------------------------- */}
        <Grid item xs={12} sm={12} md={3} lg={3} xl
          display={{ xs: "none", lg: "block" }}
        >
        <TeamList
          setSelectionModel={setSelectionTeam}
          selectionModel={selectionTeam}
          teamList={teamList}
          setTeamList={setTeamList}
        />
      </Grid>

      {/* formatting and adding of table that allows view/removal of players that are on selected team */}
      {/* -------------------------- Team Players Section ----------------------------- */}
      <Grid 
      item xs={12} sm={12} md={4} lg={4} xl
      display={{ xs: "none", lg: "block" }}
      >
        <Paper
          sx={{ p: 2, height: '800px' }}
        >
          <div style={{ display: 'flex', columnGap: '10px', marginBottom: '10px' }}>
            <h2 style={{ margin: 0 }}>Your Lineup</h2>
          </div>
          <TeamPlayerTableLoader
            teamID={selectionTeam}
            isUpdated={isUpdated}
            setIsUpdated={setIsUpdated}
            tableIsUpdated={tableIsUpdated} />
        </Paper>
      </Grid>

      {/* --------------------------------------- Players Section -------------------------------------- */}
      {/* formatting and adding of the table that allows for players to be added to a team */}

      <Grid 
      item xs={12} sm={12} md={4.5} lg={4.5} xl
      display={{ xs: "none", lg: "block" }}
      >
        <Paper
          sx={{ p: 2, height: '800px' }}
        >
          <AddPlayerTableLoader
            teamID={selectionTeam}
            tableIsUpdated={tableIsUpdated}
            isUpdated={isUpdated}
            setIsUpdated={setIsUpdated}
          />
        </Paper>
      </Grid>



      <Grid 
      item xs={12}
      display={{ xs: "block", lg: "none", height:"100vh" , width:"100vw"}}
      >
      <Box
      display={{ xs: "block", lg: "none",height:"100vh" , width:"100vw" }}
      height="100vh" 
      width="100vw"
      >
            <Box sx={{ borderBottom: 1, borderColor: 'divider',height:"100vh" , width:"100vw" }}>
        <Tabs value={value} onChange={handleChange} aria-label="NBA Predictor Tabs">
          <Tab label="Teams" {...a11yProps(0)} />
          <Tab label="Lineup" {...a11yProps(1)} />
          <Tab label="Add Players" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <TeamList
          setSelectionModel={setSelectionTeam} 
          selectionModel={selectionTeam} 
          teamList={teamList} 
          setTeamList={setTeamList} 
          value={value}
          setValue={setValue}
        />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Paper sx={{ p: 2, height: '800px' }}>
          <TeamPlayerTableLoader
            teamID={selectionTeam}
            isUpdated={isUpdated}
            setIsUpdated={setIsUpdated}
            tableIsUpdated={tableIsUpdated} 
            />
        </Paper>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Paper sx={{ p: 2, height: '800px' }}>
          <AddPlayerTableLoader
            teamID={selectionTeam}
            tableIsUpdated={tableIsUpdated}
            isUpdated={isUpdated}
            setIsUpdated={setIsUpdated}
          />
          </Paper>
      </TabPanel>
  </Box>
  </Grid>
      </Grid>
      </div>
  );
};


export default TeamPageContent;