import * as React from "react";
import Container from "@mui/material/Container";
import TeamPageContentLoader from "./TeamPageContentLoader";

function TeamPage() {
  return (
    <Container maxWidth={false} sx={{ mt:4, mb: 4, "minHeight": '600px' }}>
      {/* Chart */}
      <TeamPageContentLoader/>
    </Container>
  );
}

export default TeamPage;
