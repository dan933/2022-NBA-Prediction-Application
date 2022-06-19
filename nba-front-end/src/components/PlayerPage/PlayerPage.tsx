import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PlayerTableLoader from './PlayerTableLoader';

function PlayerPage() {
  return (
    //   these lines set up the format of the page
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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