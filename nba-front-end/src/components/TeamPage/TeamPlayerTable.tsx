import * as React from 'react';
import { DataGrid, GridColDef, GridFilterModel, GridValueGetterParams, GridSelectionModel  } from '@mui/x-data-grid';
import { FormControl, Grid, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { axiosRequestConfiguration } from "../../services/axios_config";
import axios, { AxiosError } from 'axios';
import Button from '@mui/material/Button';
import RemovePlayerButton from './RemovePlayer/RemovePlayerButton';
import RemovePlayerPopUp from './RemovePlayer/RemovePlayerPopUp';


// Setting up the columns of the player table
const TeamPlayerTable: React.FC<any> = (props) => {

  



  const [openRemovePlayerPopUp, setOpenRemovePlayerPopUp]=useState(false);

  const [PlayerToDelete, setplayerToDelete]=useState([] as number[]);

  //opens remove team popup
    const handleOpenRemovePlayerPopUp = (player:number[]) => {
      setplayerToDelete(player);
      setOpenRemovePlayerPopUp((prev) => !prev)
    }

  // this takes the props passed to this component and uses it to populate the table
  const teamPlayerList = props.teamPlayerList;

  const teamID = props.teamID;

  // initialise the value for the searchbar
  const [search, setSearch] = React.useState('');

  // initialise the parameters that the table uses to filter values (when using the searchbar)
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [
      {
        columnField: 'FullName',
        operatorValue: 'contains',
        value: search,
      },
    ],
  });
  const teamPlayerColumns: GridColDef[] = [
    {
      field: "addplayer",
      headerName: "",
      width: 90,
      renderCell: (params: any) =>
      (
        <RemovePlayerButton
          teamObject={params.row}
          PlayerID={[params.row.PlayerID] as number[]}
          tableIsUpdated={props.tableIsUpdated}
          setOpenRemovePlayerPopUp={setOpenRemovePlayerPopUp}
          handleOpenRemovePlayerPopUp={()=> handleOpenRemovePlayerPopUp([params.row.PlayerID] as number[])}
        />
      )
    },
    { field: 'TeamID', headerName: 'Team ID', width: 90, hide: true },
    { field: 'TeamName', headerName: 'Team Name', width: 90, hide: true },
    { field: 'PlayerID', headerName: 'Player ID', width: 90, hide: true },
    { field: 'FirstName', headerName: 'First Name', width: 150, },
    { field: 'LastName', headerName: 'Last Name', width: 150, },
    {
      field: 'FullName',
      headerName: 'Name',
      sortable: false,
      width: 160,
      hide: true,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.FirstName || ''} ${params.row.LastName || ''}`,
  
    },
    {
      field: 'PlayerWinPercent', headerName: 'Win Percentage', width: 150,
      valueFormatter: (params) => {
        const valueFormatted = Number((params.value as number) * 100).toLocaleString();
        return `${valueFormatted} %`;
      },
    },
    { field: 'Points', headerName: 'Points', width: 120 },
    { field: 'Rebounds', headerName: 'Rebounds', width: 120 },
    { field: 'Assists', headerName: 'Assists', width: 120 },
    { field: 'Steals', headerName: 'Steals', width: 120 },
    { field: 'Blocks', headerName: 'Blocks', width: 120 },
  ];
  // when you type in the searchbar, update the value of the object
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    // can't update anything else here because of how the hook works, use useEffect hook instead
  }

  // when [search] is updated, update the table's filter
  useEffect(() => {
    setFilterModel({
      items: [
        {
          columnField: 'FullName',
          operatorValue: 'contains',
          value: search,
        },
      ],
    });

  }, [search]);

  return (
    <>
      {/* formats the placement of the searchbar and table */}
      <Grid container spacing={2}>
        <Grid item xs>
          <FormControl variant="outlined" size="small" fullWidth={true}>
            <InputLabel htmlFor="outlined-search">Search for a player</InputLabel>
            <OutlinedInput
              id="outlined-search"
              label="Search for a player"
              value={search}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <div style={{ height:'648px'}}>
            <DataGrid
              loading={props.loading}
              rows={teamPlayerList}
              getRowId={(row) => row.PlayerID}
              columns={teamPlayerColumns}
              disableColumnSelector={true}
              disableColumnMenu={true}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection={false}
              disableSelectionOnClick={true}
              filterModel={filterModel}
              onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
            />
          </div>
        </Grid>
      </Grid>
      <RemovePlayerPopUp 
        openRemovePlayerPopUp={openRemovePlayerPopUp}
        setOpenRemovePlayerPopUp={setOpenRemovePlayerPopUp}
        teamId={teamID}
        PlayerID={PlayerToDelete}
        teamPlayerList ={props.teamPlayerList}
        tableIsUpdated={props.tableIsUpdated}
      />
    </>
  );
}
export default TeamPlayerTable;