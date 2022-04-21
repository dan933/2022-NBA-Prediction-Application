import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import FilledTeamsTable from './teamsTableLoader';
import DataGridTeams from './teamsDataGrid';

function teamsPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, "min-height":600, }}>
        <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={10} md={8} lg={8}>
            {/* {<FilledTeamsTable></FilledTeamsTable>} */}
            {<DataGridTeams></DataGridTeams>}
            
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
  


export default teamsPage;