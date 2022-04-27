import * as React from "react";
import { Button } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import FilledPlayerTable from "../playerDataGrid/playerTableLoader";
import FilledTeamTable from "./teamTableLoader";

function teamPage() {
  return (
    <Container maxWidth="lg" sx={{ mt:4, mb: 4, "min-height": 600 }}>
      <Grid container>
        {/* Chart */}
        <Grid item xs={12} md={12} lg={12}>
          <FilledTeamTable />
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
