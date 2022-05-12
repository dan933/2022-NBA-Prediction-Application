import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

function TeamHeader() {
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
                }}
            >
                Compare Teams
            </Button>
            <Typography variant="caption" display="block" gutterBottom>
            Select two teams and click compare.
            </Typography>
        </Box>
         
      </>
  )
}

export default TeamHeader