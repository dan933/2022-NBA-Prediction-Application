import * as React from 'react';
import { DataGrid, GridColDef, GridFilterModel, GridValueGetterParams } from '@mui/x-data-grid';
import { TextField } from '@mui/material';
import { useEffect } from 'react';
// import { Player } from '../models/IPlayer';

// Setting up the columns of the player table
const playerColumns: GridColDef[] = [
    { field: 'PlayerID', headerName: 'ID', width: 90 },
    {
      field: 'FullName',
      headerName: 'Name',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.FirstName || ''} ${params.row.LastName || ''}`,
    },
    { field: 'PlayerWinPercentage', headerName: 'Win Percentage', width: 150,
      valueFormatter: (params) => {
        const valueFormatted = Number((params.value as number) * 100).toLocaleString();
        return `${valueFormatted} %`;
      }, 
    },
    { field: 'Points', headerName: 'Points', width: 150 },
    { field: 'Rebounds', headerName: 'Rebounds', width: 150 },
    { field: 'Steals', headerName: 'Steals', width: 150 },
    { field: 'Blocks', headerName: 'Blocks', width: 150 },
  ];

const DataGridPlayers: React.FC<any> = (props) => {

  // this takes the props passed to this component and uses it to populate the table
  const playerList = props.playerList;

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

  // when you type in the searchbar, update the value of the object
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    // can't update anything else here because of how the hook works, use useEffect hook instead
  }

  // when [search] is updated, update the table's filter
  useEffect(()=>{setFilterModel({
    items: [
      {
        columnField: 'FullName',
        operatorValue: 'contains',
        value: search,
      },
    ],
  })},[search]);

  return (
      <div style={{ height: '380px', width: '100%' }}>
        <TextField 
          id="outlined-search"
          label="Search for a player"
          value={search}
          onChange={handleChange}
        >
        </TextField>
        <DataGrid
          rows={playerList}
          getRowId={(row) => row.PlayerID}
          columns={playerColumns}
          pageSize={50}
          rowsPerPageOptions={[50]}
          checkboxSelection
          disableSelectionOnClick
          filterModel={filterModel}
          onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
        />
      </div>
    );
}
export default DataGridPlayers;