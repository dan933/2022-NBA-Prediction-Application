import React, { useEffect, useState } from 'react';
// import { Observable, of, Subject } from 'rxjs';
// import { catchError, reduce, take } from 'rxjs/operators';
import PlayerDataGrid from './PlayerDataGrid';
import ApiComponentLoader from '../ApiComponentLoader';
import api from '../../services/api';
import { Player } from '../../models/IPlayer';
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface PlayerProps{
    playerList: Player[];
}

function PlayerTableLoader() {
  // isLoading={appState.loading} says that the boolean for whether data is available is 'appState.loading' variable
  // playerList={appState.playerList} says that (if the data is available) send the appState.playerList to the DataGridPlayers Component
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

    api.get('players/get-all')
    .subscribe({
      next:(resp) => {
        setLoading(false);
        setAppState({ playerList: resp as Player[] });
      },
      error: (e) => {

        setLoading(false);
        // this sets 'errorMessage' into the error that has occured
              setErrorMessage(e);

      }
    })
  }, [setAppState]);

  return (
    <React.Fragment>
      <div>
  {/* if the error message is not empty or does not equal "", then the error message will appear*/}
        {errorMessage!==""&&<h1 style={{color: 'red'}}>Oops! An Error Occured Please Try Again.</h1>}
  {/* if  isLoading is true, loading text will apear, if api is able to fetch player data and isLoading is false, then show filled player table*/}
        {isLoading ? (<h1>Hold on, fetching data may take some time :)</h1>) : (<PlayerDataGrid playerList={appState.playerList} />)}
      </div>
    </React.Fragment>

  );
}
export default PlayerTableLoader;