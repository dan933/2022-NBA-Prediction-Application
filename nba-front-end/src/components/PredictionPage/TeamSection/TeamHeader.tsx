import { Alert, Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'



function TeamHeader(props: any) {

    const [IsBothTeamsSelected, setIsBothTeamsSelected] = useState(true)
    
    const compareTeams = () => {
        if (props.selectedTeamsId.length === 2) {
            // props.getTeamMatchUp()
            setIsBothTeamsSelected(true)
            props.setValue(1)
        } else {

            setIsBothTeamsSelected(false)
        }

    }

  return (
      <>          
          <Box
              sx={{
                  display:'flex',
                  alignItems: 'flex-start',
                  flexDirection: 'column',
                  margin:'10px'
              }}
          >
            <Button
                variant="contained"
                sx={{                    
                    maxWidth: '170px',
                    marginBottom:'10px'
                  }}
                onClick={compareTeams}
            >
                Compare Teams
            </Button>
              { IsBothTeamsSelected ?
                <Typography variant="caption" display="block" gutterBottom>
                    Select two teams and click compare.
                </Typography> :
                <Alert severity="info">Please select two teams to continue.</Alert>
              }
        </Box>
         
      </>
  )
}

export default TeamHeader