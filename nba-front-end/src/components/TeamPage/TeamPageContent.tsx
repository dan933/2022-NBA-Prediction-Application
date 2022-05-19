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
import type { } from '@mui/lab/themeAugmentation';
import '@mui/lab/themeAugmentation';
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
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

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
  const useStyles = makeStyles({
    root: {
        '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
        },
    }
});


const classes = useStyles();

  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


  return (
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
           <div style={{ display: 'flex', columnGap: '10px', marginBottom: '10px', flex: 1 }}>
            <h2 style={{ margin: 0 }}>Your Lineup</h2>
          </div>
          <TeamPlayerTableLoader
            teamID={selectionTeam}
            className={classes.root}
            isUpdated={isUpdated}
            setIsUpdated={setIsUpdated}
            tableIsUpdated={tableIsUpdated} 
            />
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

      <Box
        display={{ xs: "block", lg: "none" }}
        sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="NBA Prediction Tabs" variant="fullWidth">
              <Tab label="Teams" value="1" />
              <Tab label="Lineup" value="2" />
              <Tab label="Add Players" value="3" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <TeamList
              setSelectionModel={setSelectionTeam}
              selectionModel={selectionTeam}
              teamList={teamList}
              setTeamList={setTeamList}
            />
          </TabPanel>

          <TabPanel value="2">
            <Paper
              sx={{ p: 2, height: '800px' }}
            >
              <TeamPlayerTableLoader
                teamID={selectionTeam}
                isUpdated={isUpdated}
                setIsUpdated={setIsUpdated}
                tableIsUpdated={tableIsUpdated}
              />
            </Paper>
          </TabPanel>

          <TabPanel value="3">
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
          </TabPanel>

        </TabContext>
      </Box>
    </Grid>
  );
};


export default TeamPageContent;