import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import './TeamSection.css';

function TeamsListPred(props: any) {
    //-------------------- Column Headers ----------------------------//
    const teamsColumns: GridColDef[] = [
        { field: "TeamID", headerName: "ID", width: 90, hide: true },
        { field: "TeamName", headerName: "Team Name", width: 150 },
        {
          field: "WinPer",
          headerName: "Win Percentage",          
          minWidth: 120,
          valueFormatter: (params) => {
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
    console.log(id)
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
          sx={{ minWidth: '330px'}}
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