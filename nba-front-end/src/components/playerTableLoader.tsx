import React, { useEffect, useState } from 'react';
import { Observable, of, Subject } from 'rxjs';
import DataGridPlayers from './playerDataGrid';
import WithTableLoading from './componentLoading';
import { catchError, reduce, take } from 'rxjs/operators';
import api from '../services/api';
import { Player } from '../models/IPlayer';

interface PlayerProps{
    loading: boolean;
    playerList: Player[];
}

function FilledPlayerTable() {
  const TableLoading = WithTableLoading(DataGridPlayers);
  const [appState, setAppState] = useState<PlayerProps>({
    loading: false,
    playerList: [],
  });

  const getPlayers = <Player,> (url: string): Observable<Player[]> => {
    return api.get<Player[]>(url)
         .pipe(
             take(1),
             catchError(err => of(console.log(err)))
         ) as Observable<Player[]>;
  };

  useEffect(() => {
    setAppState({ loading: true, playerList: [] });
    api.get('players').subscribe((resp) => {
        setAppState({ loading: false, playerList: resp as Player[] });
      });
  }, [setAppState]);

// used for testing
//   const apiGet = () => {
//     console.log(appState.playerList);
//   };

  return (
      <div>
          <TableLoading isLoading={appState.loading} playerList={appState.playerList} />
          {/* <button onClick={apiGet}>Fetch API</button> */}
      </div>
  );
}
export default FilledPlayerTable;