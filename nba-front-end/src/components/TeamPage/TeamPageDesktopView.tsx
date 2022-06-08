import { Box, Grid, Paper } from "@mui/material";

function TeamPageDesktopView(props: any) {

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          {/* -------------------------- Teams Section ----------------------------- */}
          <Grid
            item xs={12} sm={12} md={4} lg={4} xl={4}
          >
            {props.teamListSection}
          </Grid>

          {/* formatting and adding of table that allows view/removal of players that are on selected team */}
          {/* -------------------------- Team Players Section ----------------------------- */}
          <Grid item xs={12} sm={12} md={4} lg={4} xl>
            <Paper
              sx={{ p: 2, height: '800px' }}
            >
              <div style={{ display: 'flex', columnGap: '10px', marginBottom: '10px' }}>
                <h2 style={{ margin: 0 }}>Your Lineup</h2>
              </div>
              {props.teamPlayerTableLoaderSection}
            </Paper>
          </Grid>

          {/* --------------------------------------- Players Section -------------------------------------- */}
          {/* formatting and adding of the table that allows for players to be added to a team */}

          <Grid
            item xs={12} sm={12} md={4} lg={4} xl={4}
          >
            <Paper
              sx={{ p: 2, height: '800px' }}
            >
              <div style={{ display: 'flex', columnGap: '10px', marginBottom: '10px' }}>
                <h2 style={{ margin: 0 }}>All Players</h2>
              </div>

              {props.addPlayerTableLoaderSection}

            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TeamPageDesktopView;