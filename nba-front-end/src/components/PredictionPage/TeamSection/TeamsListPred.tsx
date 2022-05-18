import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import './TeamSection.css';

function TeamsListPred(props: any) {
    //-------------------- Column Headers ----------------------------//
    const teamsColumns: GridColDef[] = [
        { field: "TeamID", headerName: "ID", minWidth: 90, hide: true, flex:1 },
        { field: "TeamName", headerName: "Team Name", minWidth: 150, flex:1 },
        {
          field: "WinChance",
          headerName: "Win Percentage",          
          minWidth: 120,
          flex:1,
          valueFormatter:(params) => {
            console.log(params)
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
          autoHeight
          rows={props.teamList}
          getRowId={(row) => row.TeamID}
          columns={teamsColumns}
          disableColumnSelector={true}
          pageSize={4}
          rowsPerPageOptions={[4]}
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