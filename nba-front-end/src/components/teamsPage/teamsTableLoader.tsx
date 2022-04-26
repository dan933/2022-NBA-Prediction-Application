import React, { useEffect, useState } from "react";
import DataGridTeams from "./teamsDataGrid";
import WithTableLoading from "../componentLoading";
import api from "../../services/api";
import { Teams } from "../../models/ITeams";

interface teamsProps {
  loading: boolean;
  teamsList: Teams[];
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
      setAppState({ loading: false, teamsList: resp as Teams[] });
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
