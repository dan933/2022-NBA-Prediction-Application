import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';

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

  //todo loading please wait

// todo The Below functions should go into a predictionServices file eventually
  
  const GetSelectedTeamsId = (id: number[]) => {    
    if(id.length > 2){id = id.slice(0,2)}
    props.setSelectedTeamsId(id)    
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
        <DataGrid
        className='prediction-list'
          autoHeight
          rows={props.teamList}
          getRowId={(row) => row.TeamID}
          columns={teamsColumns}
          disableColumnSelector={true}
          pageSize={8}
          rowsPerPageOptions={[8]}
          onSelectionModelChange={(id) => {
          GetSelectedTeamsId(id as number[])
          }}
        checkboxSelection
        isRowSelectable={(params:GridRowParams) => checkTeamSelection(params.row.TeamID)}
        />
      }
    </>
  )
}

export default TeamsListPred