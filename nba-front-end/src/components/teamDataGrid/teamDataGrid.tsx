import React, { useState } from "react";
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
import FilledPlayerTable from "../playerDataGrid/playerTableLoader";

const teamsColumns: GridColDef[] = [
  { field: "TeamID", headerName: "ID", width: 90, hide: false },
  { field: "TeamName", headerName: "Team Name", width: 150 },
  {
    field: "TeamWinPercentage",
    headerName: "Win Percentage",
    width: 150,
    valueFormatter: (params) => {
      const valueFormatted = Number(
        (params.value as number) * 100
      ).toLocaleString();
      return `${valueFormatted} %`;
    },
  },
];

// todo connect API instead of hard coding
const rows = [
  { TeamID: 1, TeamName: "Team 1", TeamWinPercentage: 0.43 },
  { TeamID: 2, TeamName: "Team 2", TeamWinPercentage: 0.25 },
  { TeamID: 3, TeamName: "Team 3", TeamWinPercentage: 0.1 },
];

const DataGridTeams: React.FC<any> = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [view, viewAll] = React.useState(false);
  const teamInfo = () => {
    viewAll(true);
  };

  const closeTeamView = () => {
    viewAll(false);
  };

  //todo: onclick create new team entry in table
  const updateTeams = () => {
    //code here
    viewAll(true);
  };
  return (
    // white box around the table
    <Paper
      sx={{
        p: 2,
        paddingTop: 5,
        display: "flex",
        flexDirection: "column",
        height: "auto",
        mt: "auto",
        position: "relative",
        // distance from the left side of the page
        left: "-232px",
        width: "392px",
      }}
    >
      {/* formats the placement of the searchbar and table */}
      <Grid container spacing={3} />
      <Grid item xl={3} md={6} xs={12} />
      <Grid item xs={12}>
        <div style={{ height: "800px", width: "362px", position: "relative" }}>
          <DataGrid
            onRowClick={teamInfo}
            rows={rows}
            getRowId={(row) => row.TeamID}
            columns={teamsColumns}
            disableColumnSelector={true}
            pageSize={10}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
          {/* displays the pop up dialogue box on row click */}
          <Dialog id="viewTeam" open={view} onClose={handleClose}>
            <DialogTitle>Team (test) </DialogTitle>
            <DialogContent>
              <DialogContentText>
                View All Players In The Team
                <FilledPlayerTable></FilledPlayerTable>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeTeamView}>Cancel</Button>
              <Button onClick={updateTeams}>Save Edits</Button>
            </DialogActions>
          </Dialog>
          {/* add team button */}
          <Button
            sx={{
              left: "-98px",
              top: "-45px",
              padding: "5px",
              paddingRight: "9px",
            }}
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Add New Team
          </Button>
          {/* secondary dialogue box for add player */}
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
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Create </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Grid>
    </Paper>
  );
};

export default DataGridTeams;
