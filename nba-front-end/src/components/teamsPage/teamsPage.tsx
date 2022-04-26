//teams page
import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
// import FilledTeamsTable from './teamsTableLoader';
import DataGridTeams from "../teamDataGrid/teamDataGrid";
import FilledPlayerTable from "../playerDataGrid/playerTableLoader";
import FilledTeamTable from "../teamDataGrid/teamTableLoader";

function teamsPage() {
  return (
    <div
    style={{
      paddingLeft: "10px",
      display: "flex",
      top: -100,
      justifyContent: "center",
      columnGap: "15px",
    }}
  >
    <FilledTeamTable></FilledTeamTable>
    <FilledPlayerTable></FilledPlayerTable>
  </div>
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

export default teamsPage;
