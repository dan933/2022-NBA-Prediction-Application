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
                
                <TeamHeader />
                <TeamListPred
                    teamList={props.teamList}            
                        />
            </Paper>
    </>

  )
}

export default TeamsSection