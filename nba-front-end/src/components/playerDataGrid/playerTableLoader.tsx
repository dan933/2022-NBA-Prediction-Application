import React, { useEffect, useState } from 'react';
// import { Observable, of, Subject } from 'rxjs';
// import { catchError, reduce, take } from 'rxjs/operators';
import DataGridPlayers from './playerDataGrid';
import WithTableLoading from '../componentLoading';
import api from '../../services/api';
import { Player } from '../../models/IPlayer';

interface PlayerProps{
    loading: boolean;
    playerList: Player[];
}

function FilledPlayerTable() {
  // this sets up function (from componentLoading.tsx) which either returns 
  // DataGridPlayers (playerDataGrid.tsx) 
  // or
  // a message 'Hold on, fetching data may take some time :)'
  // we call this as <TableLoading isLoading={appState.loading} playerList={appState.playerList} />
  // isLoading={appState.loading} says that the boolean for whether data is available is 'appState.loading' variable
  // playerList={appState.playerList} says that (if the data is available) send the appState.playerList to the DataGridPlayers Component
  const TableLoading = WithTableLoading(DataGridPlayers);
  const [appState, setAppState] = useState<PlayerProps>({
    loading: false,
    playerList: [],
  });

  // this is the call to the API to get the player data
  useEffect(() => {
    setAppState({ loading: true, playerList: [] });
    api.get('players').subscribe((resp) => {
        setAppState({ loading: false, playerList: resp as Player[] });
      });
  }, [setAppState]);

  return (
      <div>
          <TableLoading isLoading={appState.loading} playerList={appState.playerList} />
      </div>
  );
}
export default FilledPlayerTable;