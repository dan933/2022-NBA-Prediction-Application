import React, { useEffect, useState } from "react";
import DataGridTeams from "../teamDataGrid/teamDataGrid";
import WithTableLoading from "../componentLoading";
import api from "../../services/api";
import { Team } from "../../models/ITeam"

interface teamsProps {
  loading: boolean;
  teamsList: Team[];
}

function FilledTeamsTable() {
  const TableLoading = WithTableLoading(DataGridTeams);
  const [appState, setAppState] = useState<teamsProps>({
    loading: false,
    teamsList: [],
  });

  useEffect(() => {
    setAppState({ loading: true, teamsList: [] });
    api.get("players/get-all").subscribe((resp) => {
      setAppState({ loading: false, teamsList: resp as Team[] });
    });
  }, [setAppState]);

  return (
    <div>
      <TableLoading
        isLoading={appState.loading}
        teamsList={appState.teamsList}
      />
    </div>
  );
}

export default FilledTeamsTable;
