import TeamListPred from './TeamsListPred'
import TeamHeader from './TeamHeader'
import { Paper } from '@mui/material'

function TeamsSection(props:any) {
    return (
        <>
            <Paper
            sx={{
                p: 2,
                height: 'auto',                
            }}
            >
                
                <TeamHeader
                    selectedTeamsId={props.selectedTeamsId}
                    setValue={props.setValue}
                />
                <TeamListPred
                    teamList={props.teamList}
                    setSelectedTeamsId={props.setSelectedTeamsId}
                    selectedTeamsId={props.selectedTeamsId}
                />
            </Paper>
    </>

  )
}

export default TeamsSection