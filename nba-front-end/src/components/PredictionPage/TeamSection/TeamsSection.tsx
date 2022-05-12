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
                    selectedTeams={props.selectedTeams}
                    calculatePrediction={props.calculatePrediction}
                />
                <TeamListPred
                    teamList={props.teamList}
                    setSelectedTeams={props.setSelectedTeams}
                    selectedTeams={props.selectedTeams}
                />
            </Paper>
    </>

  )
}

export default TeamsSection