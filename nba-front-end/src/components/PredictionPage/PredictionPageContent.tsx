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
import TeamList from "./PredictionTeamList";
import TeamPlayerTableLoader from "../TeamPage/TeamPlayerTableLoader";
import AddPlayerTableLoader from "../TeamPage/AddPlayerTableLoader";
import { positions } from '@mui/system';
import PreviewIcon from '@mui/icons-material/Preview';

const PredictionTeamList: React.FC<any> = (props) => {

  const url = axiosRequestConfiguration.baseURL

  const [selectionTeam, setSelectionTeam] = React.useState<GridSelectionModel>([]);

  const [teamList, setTeamList] = React.useState(props.teamList);

  const [openPopup, setOpenPopup] = useState(false);

  const [isUpdated, setIsUpdated] = React.useState(false);

  const tableIsUpdated = () => {
    setIsUpdated(true);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
        <TeamList setSelectionModel={setSelectionTeam} selectionModel={selectionTeam} teamList={teamList} setTeamList={setTeamList} />
      </Grid>

      {/* Prediction Table  */}
    
      <Grid item xs={12} sm={12} md={4} lg={4} xl>
        <Paper
          sx={{ p: 2, height: '800px', width: 'auto', marginTop: "95px"}}
        >
          <div style={{columnGap: '10px', marginBottom: '10px', position: 'relative' }}>
            <h2 style={{ margin: 0 }}> Predicted Standings </h2>
            <Button
                  style={{left: '0px', top: '0px', position: 'absolute'}}
                  variant="contained"
                  color="primary"
                  startIcon={<PreviewIcon />}
                  
                  
                >
                  Refresh
                </Button>
          </div>
        
        </Paper>
      </Grid>

    </Grid>
  );
};

export default PredictionTeamList;

