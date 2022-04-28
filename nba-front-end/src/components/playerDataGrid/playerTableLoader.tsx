import React, { useEffect, useState } from 'react';
// import { Observable, of, Subject } from 'rxjs';
// import { catchError, reduce, take } from 'rxjs/operators';
import DataGridPlayers from './playerDataGrid';
import WithTableLoading from '../componentLoading';
import api from '../../services/api';
import { Player } from '../../models/IPlayer';
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface PlayerProps{
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
  const TableLoading = (DataGridPlayers);
  const [appState, setAppState] = useState<PlayerProps>({
    playerList: [],
  });
  // defines a state for whenever an error occurs
  const [errorMessage, setErrorMessage] = useState("");
    // defines a state for when the api is fetching data for players
  const [isLoading, setLoading] = useState(false);

  // this is the call to the API to get the player data
  useEffect(() => {
    setLoading(true);
    setErrorMessage("");
    setAppState({ playerList: [] });
    api.get('players').toPromise().then((resp) => {
        setLoading(false);
        setAppState({ playerList: resp as Player[] });
        })
  // this catches any errors that may occur while fetching for player data
        .catch(error => { console.log(error) 
        setLoading(false);
  // this sets 'errorMessage' into the error that has occured
        setErrorMessage(error);
        })
      }, [setAppState]);

  return (
    <React.Fragment>
      <div>
  {/* if the error message is not empty or does not equal "", then the error message will appear*/}
        {errorMessage!==""&&<h1 style={{color: 'red'}}>Oops! An Error Occured Please Try Again.</h1>}
  {/* if  isLoading is true, loading text will apear, if api is able to fetch player data and isLoading is false, then show filled player table*/}
        {isLoading ? (<h1>Hold on, fetching data may take some time :)</h1>) : (<TableLoading playerList={appState.playerList} />)}
      </div>
    </React.Fragment>

  );
}
export default FilledPlayerTable;