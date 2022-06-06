import { useState, useEffect, useRef } from "react";
import { Button, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridFilterModel, GridSelectionModel } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import RemoveTeamButton from "./RemoveTeam/RemoveTeamButton"
import api from "../../services/api";
import RemoveTeamPopUp from "./RemoveTeam/RemoveTeamPopUp";
import CreateTeamPopUp from "./CreateTeam/CreateTeamPopUp";
import SearchIcon from '@mui/icons-material/Search';

function TeamList(props:any) {

    const [teamsList, setTeamsList] = useState([]);
    const [loadingTeams, setLoadingTeams] = useState(false);

    const teamName = useRef<HTMLInputElement | null>(null) //creating a refernce for TextField Component

    const [openRemoveTeamPopUp, setOpenRemoveTeamPopUp] = useState(false);


    //opens remove team popup
    const handleopenRemoveTeamPopUp = () => {
        setOpenRemoveTeamPopUp((prev) => !prev)
    }

    const teamsColumns: GridColDef[] = [
        { field: "TeamID", headerName: "ID", width: 90, hide: true, flex:1 },
        { field: "TeamName", headerName: "Team Name", width: 150, flex:1  },
        
        //-------------------- Formats Team Winrate --------------------//
        {
            field: "WinChance",
            headerName: "Win Percentage",
            width: 125, 
            flex:1, 
            
            valueFormatter: (params) => {
              const valueFormatted = Number(
                (params.value as number) * 100
              ).toLocaleString();
              return `${valueFormatted} %`;
              
            },
          },
          
          
    //-------------------- Renders the remove team button --------------------//
        { 
            field: "RemoveTeam",
            headerName: "",
            width: 90,
            renderCell: (params: any) =>
            (
                <RemoveTeamButton
                    teamObject={params.row}
                    handleopenRemoveTeamPopUp={handleopenRemoveTeamPopUp}
                />
            )
        },
    ];


    // initialise the value for the searchbar
    const [searchTeam, setSearchTeam] = useState('');
    
    // initialise the parameters that the table uses to filter values (when using the searchbar)
    const [SearchTeamModel, setSearchTeamModel] = useState<GridFilterModel>({
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

    const [createTeamPopupOpen, setCreateTeamPopupOpen] = useState(false);

    const handleClickOpen = () => {
        setCreateTeamPopupOpen(true);
    };

    const [newTeamID, setNewTeamID] = useState(props.selectionModel);

    const [selectionTeam, setSelectionTeam] = useState<GridSelectionModel>([]);
    
    useEffect(() => {
        props.setSelectionModel(newTeamID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newTeamID]); 

    // on changes to open state api is run
    useEffect(() => {

        setLoadingTeams(true);
        
        api.GetAllTeams().then(resp => {
            
            setTeamsList(resp.data.Data);            
            setSelectionTeam(props.selectionModel);
            props.tableIsUpdated();
            setLoadingTeams(false);
            
        }).catch((err) => {
            
            console.log(err) 
            setLoadingTeams(false);
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createTeamPopupOpen, openRemoveTeamPopUp, setTeamsList]);

    return (
        <Paper
            sx={{ p: 2, height: '800px' }}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <h2 style={{ margin: 0 }}>Teams</h2>
                </Grid>
                {/* add team button */}
                <Grid item>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<AddIcon />}
                        onClick={handleClickOpen}
                    >
                        Create New Team
                    </Button>
                </Grid>
                <Grid item xl={12} md={12} xs={12}>
                    <FormControl variant="outlined" size="small" fullWidth={true}>
                    <InputLabel>Search for a Team</InputLabel>
                    <OutlinedInput
                    type="Team Search"
                    label="Search for a Team"
                    value={searchTeam}
                    onChange={(event)=>setSearchTeam(event.target.value)}
                    endAdornment={
                    <InputAdornment position="end">
                    <SearchIcon />
                    </InputAdornment>
                    }
                    />
                    </FormControl>
                </Grid> 
                <Grid item xs={12}>
                    <div style={{ width: '100%' }}>   
                        <DataGrid     
                            style={{ width: '100%', display: '-ms-flexbox', border: 'none', boxShadow: "none" }}
                            autoHeight
                            rows={teamsList}
                            loading={loadingTeams}
                            getRowId={(row) => row.TeamID}
                            columns={teamsColumns}
                            disableColumnSelector={true}
                            disableColumnMenu={true}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            onSelectionModelChange={(newSelectionModel) => {
                                props.setSelectionModel(newSelectionModel);
                                setSelectionTeam(newSelectionModel);
                            }}
                            selectionModel={selectionTeam}
                            hideFooterSelectedRowCount
                            filterModel={SearchTeamModel}
                            onFilterModelChange={(newFilterModel) => setSearchTeamModel(newFilterModel)}
                        />                        
                    </div>
                </Grid>                
                
                <CreateTeamPopUp
                    open={createTeamPopupOpen}
                    setOpen={setCreateTeamPopupOpen}
                    teamName={teamName}
                    setNewTeamID={setNewTeamID}
                />
                
                <RemoveTeamPopUp
                    openRemoveTeamPopUp={openRemoveTeamPopUp}
                    setOpenRemoveTeamPopUp={setOpenRemoveTeamPopUp}
                    teamId={props.selectionModel}
                    teamsList={teamsList}
                    setNewTeamID={setNewTeamID}
                />
            </Grid>
        </Paper>
    );
}
export default TeamList;