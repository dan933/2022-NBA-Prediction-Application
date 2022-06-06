import { FormControl, Grid, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { DataGrid, GridColDef, GridFilterModel, GridRowParams } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';

function TeamsListPred(props: any) {
    //-------------------- Column Headers ----------------------------//
    const teamsColumns: GridColDef[] = [
        { field: "TeamID", headerName: "ID", minWidth: 90, hide: true, flex:1 },
        { field: "TeamName", headerName: "Team Name", minWidth: 150, flex:1 },
        {
          field: "WinChance",
          headerName: "Predicted Win Percentage",          
          minWidth: 180,
          flex:1,
          valueFormatter:(params) => {
            const valueFormatted = Number(
            (params.value as number) * 100
            ).toLocaleString();
            return `${valueFormatted} %`;
          },
        }
  ];

   // initialise the value for the searchbar
   const [searchTeam, setSearchTeam] = React.useState('');
    
   // initialise the parameters that the table uses to filter values (when using the searchbar)
   const [SearchTeamModel, setSearchTeamModel] = React.useState<GridFilterModel>({
       items: [
           {
               columnField: 'TeamName',
               operatorValue: 'contains',
               value: searchTeam
           },
       ],
   });

       // when [search] is updated, update the table's filter
       useEffect(()=>{setSearchTeamModel({
        items: [
            {
                columnField: 'TeamName',
                operatorValue: 'contains',
                value: searchTeam,
            },
        ],
    })},[searchTeam]);

   // when you type in the searchbar, update the value of the object
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event)
    setSearchTeam(event.target.value);
    // can't update anything else here because of how the hook works, use useEffect hook instead
}

  //todo loading please wait

// todo The Below functions should go into a predictionServices file eventually
  
  const GetSelectedTeamsId = (id: number[]) => {
    console.log(id.slice(0, 2));
    if(id.length > 2){id = id.slice(0,2)}
    props.setSelectedTeamsId(id);    
    return id
  }

  const checkTeamSelection = (rowID: any) => {    
    if (props.selectedTeamsId.length < 2) {
      return true
    } else if(props.selectedTeamsId.includes(rowID)) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      {(!props.IsLoading && props.teamList) &&
      <>
      <Grid container spacing={2}>
        <Grid item xl={12} md={12} xs={12}>
          <FormControl variant="outlined" size="small" fullWidth={true}>
            <InputLabel htmlFor="outlined-search">Search for a Team</InputLabel>
            <OutlinedInput
            id="outlined-search"
            label="Search for a Team"
            value={searchTeam}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
          />
          </FormControl>
        </Grid> 
      
        <Grid item xl={12} md={12} xs={12}>
        <DataGrid
        className='prediction-list'
          autoHeight
          rows={props.teamList}
          getRowId={(row) => row.TeamID}
          columns={teamsColumns}
          disableColumnSelector={true}
          disableColumnMenu={true}
          pageSize={8}
          rowsPerPageOptions={[8]}
          onSelectionModelChange={(id) => {
          GetSelectedTeamsId(id as number[])
          }}
        checkboxSelection
        isRowSelectable={(params:GridRowParams) => checkTeamSelection(params.row.TeamID)}
        filterModel={SearchTeamModel}
        onFilterModelChange={(newFilterModel) => setSearchTeamModel(newFilterModel)}
        />
        </Grid>
        </Grid>
      </>
      }
    </>
  )
}

export default TeamsListPred