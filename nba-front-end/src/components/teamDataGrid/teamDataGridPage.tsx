import * as React from 'react';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';
// import FilledTeamsTable from './teamsTableLoader';
import FilledTeamTable from './teamTableLoader';

<Button 
  variant="contained" 
  color="primary"
  style={{
    top:100,
    left:200,
    bottom:500,
    right:200,
    width:100,
    height:40,
    position: 'absolute',}}>
Create Team
</Button>

function teamPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, "min-height":600, }}>
        <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={10} md={8} lg={8}>
            {/* {<FilledTeamsTable></FilledTeamsTable>} */}
            {<FilledTeamTable></FilledTeamTable>}
            
            </Grid>
        </Grid>
    </Container>
  );
}


<Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 'auto',
        }}
  />
  


export default teamPage;