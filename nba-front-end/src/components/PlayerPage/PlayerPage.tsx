import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import PlayerTableLoader from './PlayerTableLoader';

function PlayerPage() {
  return (
    //   these lines set up the format of the page
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, "min-height":440 }}>
        <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
                {/* this is the table of players, see playerTableLoader.tsx */}
                <PlayerTableLoader></PlayerTableLoader>
            </Grid>
        </Grid>
    </Container>
  );
}

export default PlayerPage;