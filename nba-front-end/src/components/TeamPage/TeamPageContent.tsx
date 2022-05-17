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
import { makeStyles } from '@material-ui/core/styles';

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

  return (
    <Grid container spacing={2}>
      {/* -------------------------- Teams Section ----------------------------- */}
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
        <TeamList
          setSelectionModel={setSelectionTeam}
          selectionModel={selectionTeam}
          teamList={teamList}
          setTeamList={setTeamList}
        />
      </Grid>

      {/* formatting and adding of table that allows view/removal of players that are on selected team */}
      {/* -------------------------- Team Players Section ----------------------------- */}
      <Grid item xs={12} sm={12} md={4} lg={4} xl>
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
            tableIsUpdated={tableIsUpdated} />
        </Paper>
      </Grid>

      {/* --------------------------------------- Players Section -------------------------------------- */}
      {/* formatting and adding of the table that allows for players to be added to a team */}

      <Grid item xs={12} sm={12} md={4.5} lg={4.5} xl>
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
    </Grid>
  );
};

export default TeamPageContent;

