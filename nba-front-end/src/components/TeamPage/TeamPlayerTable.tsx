import { DataGrid, GridColDef, GridFilterModel, GridValueGetterParams  } from '@mui/x-data-grid';
import { FormControl, Grid, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState, useContext } from 'react';
import RemovePlayerButton from './RemovePlayer/RemovePlayerButton';
import RemovePlayerPopUp from './RemovePlayer/RemovePlayerPopUp';
import { TeamPageContext } from '../../services/Contexts/TeamPageContext';


// Setting up the columns of the player table
function TeamPlayerTable(props: any) {

  const { teamPlayersList, teamSelectionModel } = useContext(TeamPageContext);

  const teamPlayerColumns: GridColDef[] = [
    {
      field: "addplayer",
      headerName: "",
      width: 90,
      renderCell: (params: any) =>
      (
        <RemovePlayerButton          
          playerObject={params.row}          
          setOpenRemovePlayerPopUp={setOpenRemovePlayerPopUp}          
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

  const [openRemovePlayerPopUp, setOpenRemovePlayerPopUp]=useState(false);

  const [PlayerToDelete, setplayerToDelete]=useState([] as number[]);

  // initialise the value for the searchbar
  const [search, setSearch] = useState('');

  const [SelectedTeam, setSelectedTeam] = useState();
  const [SelectedPlayer, setSelectedPlayer] = useState();



  // initialise the parameters that the table uses to filter values (when using the searchbar)
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [
      {
        columnField: 'FullName',
        operatorValue: 'contains',
        value: search,
      },
    ],
  });

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
  },[search]);

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
              onChange={(event)=>setSearch(event.target.value)}
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
              rows={teamPlayersList}
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
      />
    </>
  );
}
export default TeamPlayerTable;