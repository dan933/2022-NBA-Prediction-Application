import React from 'react'
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
                maxWidth: '360px'
            }}
            >
                
                <TeamHeader
                    selectedTeamsId={props.selectedTeamsId}
                    getTeamMatchUp={props.getTeamMatchUp}
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