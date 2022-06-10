import { useState, useEffect, useCallback, useContext } from "react";
import { Button, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridFilterModel } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import RemoveTeamButton from "./RemoveTeam/RemoveTeamButton"
import api from "../../services/api";
import RemoveTeamPopUp from "./RemoveTeam/RemoveTeamPopUp";
import CreateTeamPopUp from "./CreateTeam/CreateTeamPopUp";
import SearchIcon from '@mui/icons-material/Search';
import { useAuth0 } from "@auth0/auth0-react";

import { TeamPageContext } from '../../services/Contexts/TeamPageContext';

const TeamList: React.FC<any> = () => {
    
    //context values
    const { setTeamList, setTeamSelectionModel, teamSelectionModel, teamList, teamPlayersList } = useContext(TeamPageContext)

    const [loadingTeams, setLoadingTeams] = useState(false);

    const [openRemoveTeamPopUp, setOpenRemoveTeamPopUp] = useState(false);    

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

    const handleRowChanges = (selectedRow: any) => {
        if (selectedRow.field !== "RemoveTeam") {
            let selectedTeam = teamList.find((team: any) => team.TeamID === selectedRow.id)
            console.log(selectedTeam)
            setTeamSelectionModel(selectedTeam)
        }
    }


    const { getAccessTokenSilently } = useAuth0();

    const updateTeams = useCallback(async () => {

        const token = await getAccessTokenSilently();
        setLoadingTeams(true);
        
        api.GetAllTeams(token).then(resp => {            
        setTeamList(resp.data.Data);
        setLoadingTeams(false);        
            
        }).catch((err) => {
            console.log(err) 
            setLoadingTeams(false);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[teamSelectionModel, teamPlayersList])
    

    // on changes to open state api is run
    useEffect(() => {
        updateTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teamSelectionModel, teamPlayersList]);
    
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
                        teamObject={params.row}
                        setOpenRemoveTeamPopUp={setOpenRemoveTeamPopUp}                        
                    />
                )
                
            }
        },
    ];

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
                        onClick={() => {setCreateTeamPopupOpen(true)}}
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
                            rows={teamList}
                            loading={loadingTeams}
                            getRowId={(row) => row.TeamID}
                            columns={teamsColumns}
                            disableColumnSelector={true}                            
                            disableColumnMenu={true}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            onCellClick={(event) => {handleRowChanges(event)}}
                            selectionModel={teamSelectionModel?.TeamID ? teamSelectionModel?.TeamID : undefined}
                            hideFooterSelectedRowCount
                            filterModel={SearchTeamModel}
                            onFilterModelChange={(newFilterModel) => setSearchTeamModel(newFilterModel)}
                        />                        
                    </div>
                </Grid>                
                
                <CreateTeamPopUp
                    open={createTeamPopupOpen}
                    setOpen={setCreateTeamPopupOpen}
                />
                
                <RemoveTeamPopUp
                    openRemoveTeamPopUp={openRemoveTeamPopUp}
                    setOpenRemoveTeamPopUp={setOpenRemoveTeamPopUp}
                />
            </Grid>
        </Paper>
    );
}
export default TeamList;