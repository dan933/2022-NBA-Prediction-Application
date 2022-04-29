import React, { useRef, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridValueGetterParams,
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
import AddIcon from "@mui/icons-material/Add";
import AddFilledPlayerTable from "./addPlayerTableLoader";
import axios, { AxiosError } from 'axios';
import { axiosRequestConfiguration } from "../../services/axios_config";
import WithTableLoading from '../componentLoading';
import FilledTeamTable from "./teamTableLoader";
import { Team } from "../../models/ITeam";
import api from "../../services/api";
import { TeamPlayer } from '../../models/ITeamPlayer';
import DataGridTeamPlayers from './teamPlayerDataGrid';

interface TeamPlayerProps{
    teamPlayerList: TeamPlayer[];
}

const FilledTeamPlayerTable: React.FC<any> = (props) => {

  const teamID = useRef<HTMLInputElement | null>(null) //creating a refernce for TextField Component
  const TableLoading = (DataGridTeamPlayers);
  const [appState, setAppState] = useState<TeamPlayerProps>({
    teamPlayerList: [],
  });
  const [teamList, setTeamList] = React.useState(props.teamList);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const url = axiosRequestConfiguration.baseURL
  
  // gets value from create team form
    let teamIDObject = { TeamID: teamID.current?.value }

    useEffect(() => {
        setLoading(true);
        setErrorMessage("");
        setAppState({ teamPlayerList: [] });
        api.get(`${url}{teamID:int}/get-players`).toPromise().then((resp) => {
            setLoading(false);
            setAppState({ teamPlayerList: resp as TeamPlayer[] });
            })
      // this catches any errors that may occur while fetching for player data
            .catch(error => { console.log(error) 
            setLoading(false);
      // this sets 'errorMessage' into the error that has occured
            setErrorMessage(error);
            })
          }, [setAppState]);
    
  return (
    <React.Fragment>
      <div>
  {/* if the error message is not empty or does not equal "", then the error message will appear*/}
        {errorMessage!==""&&<h1 style={{color: 'red'}}>Oops! An Error Occured Please Try Again.</h1>}
  {/* if  isLoading is true, loading text will apear, if api is able to fetch player data and isLoading is false, then show filled player table*/}
        {isLoading ? (<h1>Hold on, fetching data may take some time :)</h1>) : (<TableLoading teamPlayerList={appState.teamPlayerList} />)}
      </div>
    </React.Fragment>
  );
};

export default FilledTeamPlayerTable;
