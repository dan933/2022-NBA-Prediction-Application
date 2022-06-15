import * as React from 'react';
import { DataGrid, GridColDef, GridFilterModel, GridValueGetterParams } from '@mui/x-data-grid';
import { FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import { Player } from '../models/IPlayer';

// Setting up the columns of the player table
const playerColumns: GridColDef[] = [
  { field: 'PlayerID', headerName: 'ID', width: 90, hide: true },
  { field: 'FirstName', headerName: 'First Name', width: 150, },
  { field: 'LastName', headerName: 'Last Name', width: 150, },
  {
    field: 'FullName',
    headerName: 'Name',
    width: 160,
    hide: true,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.FirstName || ''} ${params.row.LastName || ''}`,

  },
  {
    field: 'PlayerWinPercent', headerName: 'Win Percentage', width: 150,
    valueGetter: (params) => {
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

const PlayerDataGrid: React.FC<any> = (props) => {

  // this takes the props passed to this component and uses it to populate the table
  const playerList = props.playerList;

  // initialise the value for the searchbar
  const [search, setSearch] = React.useState('');

  // initialise the value for operator used in searchbar functionality
  const [operator, setOperator] = React.useState('')

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

  //initialise state for the Column Filter - Default selection is FullName
  const [dropdownColumn, setDropdownColumn] = React.useState("FullName");

  //creating a handleChange function for the Column Filter - clears search bar upon Changing the value of the Filter
  const handleChangeColumn = (event: any) => {
    setDropdownColumn(event.target.value);
    setSearch("");
  };


  // when you type in the searchbar, update the value of the object
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.target.value is the value received from the search bar (the user input). it is a string by default

    //setInput is the values that the user types in the searchbar
    //setSearch is the value that the filterModels use to search for players
    //setInput and setSearch are seperated to allow us to do calculations. 
    //if calculations are done to the setSearch value alone, the searchbar will keep changing as the user types, and will not display the values entered by the user correctly.
    //setOperator is the value that sets the operatorValue for the filterModels

    //this if statement is only for the "PlayerWinPercent" dropdown because calculations are only done here
    //the event.target.value becomes "NaN" after a user enters numbers and deletes those numbers
    //the page displays an empty table because the app tries to search for players with an "NaN" Win Percentage
    //this if statement ensures that the properties are set back to the default searchbar values when the user removes their input
    setSearch(event.target.value);
    if (dropdownColumn === "PlayerWinPercent") {
      setOperator('startsWith');
    }
    //users will want to filter names with the "contains" operator
    else if (dropdownColumn === "FullName") {
      setOperator('contains');
    }
    else if (dropdownColumn === "FirstName") {
      setOperator('contains');
    }
    else if (dropdownColumn === "LastName") {
      setOperator('contains');
    }
    //users will most likely want to filter the remaining numerical stats such as points and rebounds by exact values
    else {
      setOperator('equals');
    }
  };


  // when [search] is updated, update the table's filter
  useEffect(() => {
    setFilterModel({
      items: [
        {
          // columnField now references the Column Filter Dropdown
          columnField: dropdownColumn,
          operatorValue: operator,
          value: search,
        },
      ],
    })
  }, [search, dropdownColumn, operator]);

  //creating a function for clear search bar button
  const clearInput = () => {
    setSearch("");
  }


  return (
    // white box around the table
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        maxWidth: 'auto'
      }}
    >
      {/* formats the placement of the searchbar and table */}
      <Grid container spacing={2}>
        <Grid item xl={2} lg={2} md={2} sm={3} xs={4} sx={{ display: "flex" }}>
          <FormControl fullWidth sx={{ minWidth: 120 }} size="small">
            <InputLabel id="Column-dropdown">Column</InputLabel>
            <Select
              labelId="Column-dropdown"
              id="Column-dropdown"
              value={dropdownColumn}
              label="Column"
              onChange={handleChangeColumn}
            >
              <MenuItem value={"FullName"}>Full Name</MenuItem>
              <MenuItem value={"FirstName"}>First Name</MenuItem>
              <MenuItem value={"LastName"}>Last Name</MenuItem>
              <MenuItem value={"PlayerWinPercent"}>Win Percentage</MenuItem>
              <MenuItem value={"Points"}>Points</MenuItem>
              <MenuItem value={"Rebounds"}>Rebounds</MenuItem>
              <MenuItem value={"Assists"}>Assists</MenuItem>
              <MenuItem value={"Steals"}>Steals</MenuItem>
              <MenuItem value={"Blocks"}>Blocks</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xl={10} lg={10} md={10} sm={9} xs={8} sx={{ display: "flex" }} >
          <FormControl sx={{ flexGrow: 1 }} variant="outlined" size="small" >
            <InputLabel htmlFor="outlined-search">Search for a player</InputLabel>
            <OutlinedInput
              id="outlined-search"
              label="Search for a player"
              value={search}
              onChange={handleChange}
              // formats placement of clear search bar button
              endAdornment={
                <InputAdornment position="end">
                  {/* creates a condition - if user types in search bar, the clear button will replace the search icon */}
                  {search.length === 0 ? (
                    <SearchIcon />
                  ) : (
                    <CloseIcon id="clearBtn" onClick={clearInput} />
                  )}
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>

        <Grid item xl={12} md={12} xs={12}>
          <div style={{ height: '1151px', width: '100%' }}>
            <DataGrid
              rows={playerList}
              getRowId={(row) => row.PlayerID}
              columns={playerColumns}
              disableColumnMenu={true}
              checkboxSelection={false}
              pageSize={20}
              rowsPerPageOptions={[20]}
              filterModel={filterModel}
              onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
            />
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
export default PlayerDataGrid;