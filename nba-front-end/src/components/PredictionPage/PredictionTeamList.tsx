import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Grid,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { axiosRequestConfiguration } from "../../services/axios_config";
import api from "../../services/api";
import { BarChart } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
    

const TeamList: React.FC<any> = (props) => {
  const [removedTeamId, setremovedTeamId] = useState<any>("");

  //this is function gets values from child components
  const getRemovedTeamNumber = (teamID: any) => {
    setremovedTeamId(teamID);
  };

  useEffect(() => {
    if (!isNaN(removedTeamId)) {
      api.get("/team/get-all").subscribe((resp) => {
        props.setTeamList(resp);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removedTeamId]);

  const teamsColumns: GridColDef[] = [
    { field: "TeamID", headerName: "ID", width: 90, hide: true },
    { field: "TeamName", headerName: "Team Name", width: 150 },
       {
        //  Rating Score (or algorithm score of entire team)
          field: "TeamWinPercentage",
          headerName: "Team Rating",
          width: 150,
          valueFormatter: (params) => {
            const valueFormatted = Number(
              (params.value as number)
            ).toLocaleString();
            return `${valueFormatted}`;
          },
        },
  ];

  const url = axiosRequestConfiguration.baseURL;

  const [isError, setIsError] = React.useState(false);

  const teamName = useRef<HTMLInputElement | null>(null); //creating a refernce for TextField Component

  return (
    <Paper sx={{ backgroundColor: 'rgb(224, 224, 224)',p: 2.5, height: "65px", width: "1625px", top: "50px" }}>
      <Grid container spacing={3}>
        <Grid item >
        {/* todo: center text element to middle of screen */}
        <div>
          <h2 style={{position: 'relative', display: 'flex', marginTop: -4}}>
         Select Teams To Compare
          </h2>
         
        </div>
        </Grid>
        <Grid item>
            
        </Grid>
        <a 
        style={{textDecoration: 'none'}}
        href="/dashboard/Teams">
                  <Button
                  style={{top: '20px', left: '1120px', textDecoration: 'none'}}
                  variant="contained"
                  color="success"
                  startIcon={<EditIcon />}
                  
                  
                >
                  Edit Teams
                </Button>
                </a>
                <a 
                 style={{textDecoration: 'none'}}
                href="/dashboard/Players">
                  <Button
                  style={{top: '20px', left: '780px'}}
                  variant="contained"
                  color="primary"
                  startIcon={<PreviewIcon />}
                  
                  
                >
                  View All Players
                </Button>
                </a>

        <Grid item xs={12}>

        {/* ------------------ Team Table Here ------------------- */}
          <Paper sx={{ p: 2, height: "800px", width: "375px" }}>
            <Grid container spacing={3}>
              <Grid item>
                <h2 style={{ margin: 0 }}>All Teams</h2>
              </Grid>

            
              <Grid item>
                <Button 
                  variant="contained"
                  color="primary"
                  startIcon={<BarChart />}
               
                >
                  Compare Win%
                </Button>
                
              </Grid>
              <Grid item xs={12}>
                <div style={{ width: "100%" }}>
                  <DataGrid
                    autoHeight
                    rows={props.teamList}
                    getRowId={(row) => row.TeamID}
                    columns={teamsColumns}
                    disableColumnSelector={true}
                    pageSize={10}
                    checkboxSelection
                    rowsPerPageOptions={[10]}
                    onSelectionModelChange={(newSelectionModel) => {
                      props.setSelectionModel(newSelectionModel);
                    }}
                    selectionModel={props.selectionModel}
                  />
                
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      
    
    </Paper>

    
  );
};

export default TeamList;
