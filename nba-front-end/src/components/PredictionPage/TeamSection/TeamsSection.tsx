import React from 'react'
import TeamListPred from './TeamsListPred'
import TeamHeader from './TeamHeader'

function TeamsSection(props:any) {
    return (
    <>
        <TeamHeader />
        <TeamListPred
        teamList={props.teamList}
        />
    </>

  )
}

export default TeamsSection