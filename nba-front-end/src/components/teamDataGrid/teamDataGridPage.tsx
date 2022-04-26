import * as React from "react";
import { Button } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import FilledPlayerTable from "../playerDataGrid/playerTableLoader";
import FilledTeamTable from "./teamTableLoader";

function teamPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, "min-height": 600 }}>
      <h1
        style={{
          margin: 0,
          width: 5,
          position: "relative",
          top: -30,
          left: -200,
        }}
      >
        Teams
      </h1>

        <h3 
        style={{
          position: "relative",
          left: '-675px"',
          top: '-100px',
        }}> (temp) click on your team </h3>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={10} md={8} lg={8}>
          <div
            style={{
              paddingLeft: "10px",
              display: "flex",
             
              justifyContent: "center",
              columnGap: "15px",
            }}
          >
            {<FilledTeamTable></FilledTeamTable>}
            <div id="positioning" style={{top: -80, position: "relative", left: "300px", maxWidth: "auto",  flexDirection: 'column', height: 'auto',}}>
            {<FilledPlayerTable></FilledPlayerTable>}
            </div>
            </div>
        </Grid>
      </Grid>
    </Container>
  );
}

<Paper
  sx={{
    p: 2,
    display: "flex",
    flexDirection: "column",
    height: "auto",
  }}
/>;

export default teamPage;
