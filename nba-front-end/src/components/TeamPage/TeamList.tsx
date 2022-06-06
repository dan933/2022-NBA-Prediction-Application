import React, { useEffect, useRef } from "react";
import { Button, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridFilterModel } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import RemoveTeamButton from "./RemoveTeam/RemoveTeamButton"
import api from "../../services/api";
import RemoveTeamPopUp from "./RemoveTeam/RemoveTeamPopUp";
import CreateTeamPopUp from "./CreateTeam/CreateTeamPopUp";
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@mui/icons-material/Search';
    
const TeamList: React.FC<any> = (props) => {

    const [SelectedTeam, setSelectedTeam] = React.useState<any>();
    
    const [openRemoveTeamPopUp, setOpenRemoveTeamPopUp] = React.useState(false);

    const teamName = useRef<HTMLInputElement | null>(null) //creating a refernce for TextField Component
    
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
            hideSortIcons: true,
            renderCell: (params: any) => {
                return (               
                    <RemoveTeamButton
                        tableIsUpdated={props.tableIsUpdated}
                        setSelectedTeam={setSelectedTeam}                                        
                        teamObject={params.row}
                        setOpenRemoveTeamPopUp={setOpenRemoveTeamPopUp}
                        setTeamList={props.setTeamList}                    
                    />
                )
                
            }
        },
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

    // when you type in the searchbar, update the value of the object
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event)
        setSearchTeam(event.target.value);
        // can't update anything else here because of how the hook works, use useEffect hook instead
    }

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

    const [open, setOpen] = React.useState(false);

        const handleClickOpen = () => {
        setOpen(true);
    };

    const handleRowChanges = (selectedRow: any) => {

        if (selectedRow.field !== "RemoveTeam") {
            props.setSelectionModel(selectedRow.row.TeamID)
        }
    }

    const [newTeamID, setNewTeamID] = React.useState("");

    const changeTeamSelected = (newSelectionModel: any) => {
        props.setSelectionModel(newSelectionModel)
    }
    
    useEffect(() => {
       changeTeamSelected(newTeamID)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newTeamID]); 

    

    const getWinChance = async () => {

        api.GetAllTeams().then(resp => {

            props.setTeamList(resp.data.Data);            
            
        }).catch((err) => { console.log(err) })        
    }
         
    // on changes to open state api is run
    useEffect(() => {
        if (props.selectionModel) {
        getWinChance()
        }    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, openRemoveTeamPopUp, props.isUpdated])

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
                    <div style={{ width: '100%' }}>   
                        <DataGrid     
                            style={{ width: '100%', display: '-ms-flexbox', border: 'none', boxShadow: "none" }}
                            autoHeight
                            rows={props.teamList}
                            getRowId={(row) => row.TeamID}
                            columns={teamsColumns}
                            disableColumnSelector={true}                            
                            disableColumnMenu={true}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            onCellClick={(event) => {handleRowChanges(event)}}
                            onSelectionModelChange={(newSelectionModel) => {
                                props.setSelectionModel(newSelectionModel);
                            }}
                            hideFooterSelectedRowCount
                            selectionModel={props.selectionModel}
                            filterModel={SearchTeamModel}
                            onFilterModelChange={(newFilterModel) => setSearchTeamModel(newFilterModel)}
                        />                        
                    </div>
                </Grid>                
                
                <CreateTeamPopUp
                    open={open}
                    setOpen={setOpen}
                    teamName={teamName}
                    setNewTeamID={setNewTeamID}
                />
                
                <RemoveTeamPopUp                                   
                    tableIsUpdated={props.tableIsUpdated}
                    SelectedTeam={SelectedTeam}
                    openRemoveTeamPopUp={openRemoveTeamPopUp}
                    setOpenRemoveTeamPopUp={setOpenRemoveTeamPopUp}
                    teamId={props.selectionModel}
                    setSelectionModel={props.setSelectionModel}
                    teamList={props.teamList}
                />
            </Grid>
        </Paper>
    );
}
export default TeamList;