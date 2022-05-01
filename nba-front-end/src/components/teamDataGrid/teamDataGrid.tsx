import React, { useRef, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridValueGetterParams,
  GridSelectionModel,
  gridRowTreeSelector
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
import RemoveIcon from '@mui/icons-material/Remove';
import FilledAddPlayerTable from "./addPlayerTableLoader";
import axios, { AxiosError } from 'axios';
import { axiosRequestConfiguration } from "../../services/axios_config";
import WithTableLoading from '../componentLoading';
import FilledTeamTable from "./teamTableLoader";
import { Team } from "../../models/ITeam";
import api from "../../services/api";
import FilledTeamPlayerTable from "./teamPlayerTableLoader";


const teamsColumns: GridColDef[] = [
  { field: "TeamID", headerName: "ID", width: 90, hide: true },
  { field: "TeamName", headerName: "Team Name", width: 150 },
  // {
  //   field: "TeamWinPercentage",
  //   headerName: "Win Percentage",
  //   width: 150,
  //   valueFormatter: (params) => {
  //     const valueFormatted = Number(
  //       (params.value as number) * 100
  //     ).toLocaleString();
  //     return `${valueFormatted} %`;
  //   },
  // },
];


const DataGridTeams: React.FC<any> = (props) => {

  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);

  const teamName = useRef<HTMLInputElement | null>(null) //creating a refernce for TextField Component

  const [open, setOpen] = React.useState(false);

  const [openPopup, setOpenPopup] = useState(false);

  const [isError, setIsError] = React.useState(false);

  const [teamList, setTeamList] = React.useState(props.teamList);

  const [isUpdated, setIsUpdated] = React.useState(false);  


  const tableIsUpdated = () => {
    setIsUpdated(true);
    console.log(isUpdated);

    // useEffect(() => {
    //     setIsUpdated(true)
    //  }, [setIsUpdated]);
  };

  
  const handleClickOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setIsError(false)
    setOpen(false);
  };
  const url = axiosRequestConfiguration.baseURL
  
  // gets value from create team form
  const createTeam = () => {
    
    let teamNameObject = { TeamName: teamName.current?.value }

    axios.post(`${url}/team/create-team`, teamNameObject)
    .then(function (response) {
    if ( response.data.Success === true) {
        setOpen(false);
        
        // if success call api again.
        //todo use useEffect() instead
        api.get('/team/get-all').subscribe(
          (resp) => {
            setTeamList(resp)
          })
    }
    })
      .catch((error) => {

//https://www.codegrepper.com/code-examples/javascript/response.error+console.log
        
        const err: any = error as AxiosError
        
        if (err.response.status === 409) {
          setIsError(true)
        }
    });

  };  
  
  // functions related  to team view
  const [view, viewAll] = React.useState(false);
  const teamInfo = () => {
    viewAll(true);
  };

  const closeTeamView = () => {
    viewAll(false);
  };

   const handleClickRemoveTeam = () => {
    
    setOpenPopup(false)
  
    axios.delete(`${url}/team/remove-team`, {data: selectionModel})
   .then(function (response) {
    if ( response.data != null) {
        
        // if success call api again.
        //todo use useEffect() instead
        api.get('/team/get-all').subscribe(
          (resp) => {
            setTeamList(resp)
          })

    }
    })
      .catch((error) => {
        
        const err: any = error as AxiosError
        
        if (err.response.status === 409) {
          setIsError(true)
        }
    });
    
   };

  return (
    // white box around the table
    <div>
      <Grid container spacing={0}>
      <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
    <Paper
      sx={{
        p: 2,
        position:'relative',
        left: '-50px',
        height: '750px',
        maxWidth: '1000px',
      }}

    >

      {/* formats the placement of the searchbar and table */}
      <Grid container spacing={3}>
        <Grid item>
          <h2 style={{margin: 0}}>Teams</h2>
        </Grid>
        <Grid item>
        {/* add team button */}
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Create New Team
          </Button>
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: '600px', width: '100%'}}>
              <DataGrid
                rows={teamList}
                getRowId={(row) => row.TeamID}
                columns={teamsColumns}
                disableColumnSelector={true}
                pageSize={10}
                rowsPerPageOptions={[10]}
                onSelectionModelChange={(newSelectionModel) => {
                  setSelectionModel(newSelectionModel);
                }}
                selectionModel={selectionModel}
              />
          </div>
        </Grid>
        <Dialog id="createTeam" open={open} onClose={handleClose}>
          <DialogTitle>Create a new team:</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a new team, please provide a Team Name.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="TeamName"
              label="Team Name"
              type="Team Name"
              fullWidth
              variant="standard"
              inputRef={teamName}
            />
            {isError && <p style={{color: "red"}}>This Team Already Exist!</p>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={createTeam}>Create </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      </Paper>
    </Grid>
    


      {/* formatting and adding of the table that allows for players to be added to a team */}
    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
      <Paper        sx={{
        p: 2,
        position:'relative',
        left: '25px',
        height: '750px',
        maxWidth: '1000px'
      }}
      >
        <FilledAddPlayerTable teamID={selectionModel} 
        tableIsUpdated={tableIsUpdated} isUpdated={isUpdated} setIsUpdated={setIsUpdated}
        ></FilledAddPlayerTable>
      </Paper>
    </Grid>




      {/* formatting and adding of table that allows view/removal of players that are on selected team */}
      <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
    <Paper
        sx={{
          p: 2,
          position:'relative',
          left: '100px',
          height: '750px',
          maxWidth: '1000px'
        }}
        >
   {/* formats the placement of the searchbar and table */}
      <Grid container spacing={3}>
        <Grid item>
          <h2 style={{margin: 0}}>Your Lineup</h2>
        </Grid>

        <Grid item>
        {/* add team button */}
          <Button
            variant="contained"
            color="error"
            startIcon={<RemoveIcon />}
            onClick={handleClickOpenPopup}
          >
            Remove Team
          </Button>
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: '600px', width: '100%'}}>
          <FilledTeamPlayerTable teamID={selectionModel} isUpdated={isUpdated} setIsUpdated={setIsUpdated} tableIsUpdated={tableIsUpdated}></FilledTeamPlayerTable>
          </div>
        </Grid>


        {/* todo: set up onclick for players to be removed from team*/}
        {/* secondary dialogue box for add player */}
        <Dialog id="AddPlayerTeam" open={openPopup} onClose={handleClosePopup}>

          
          {/* todo: need to add reference to team name */}
          <DialogTitle>Remove {selectionModel}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              
              You'll lose all data relating to {selectionModel} .

              Are you sure you want to permanently delete this team?
            </DialogContentText>
          </DialogContent>
          <DialogActions >
            <Button onClick={handleClosePopup} style={{color:"red"}}>Cancel</Button>
            <Button onClick={handleClickRemoveTeam}>Continue </Button>
          </DialogActions>
        </Dialog>
        </Grid>
    </Paper>
    </Grid>
    </Grid>
   </div>
  );
};

export default DataGridTeams;
function setAppState(arg0: { loading: boolean; teamList: Team[]; }) {
  throw new Error("Function not implemented.");
}

