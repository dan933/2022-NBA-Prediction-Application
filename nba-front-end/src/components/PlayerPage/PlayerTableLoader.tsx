import React, { useEffect, useState } from 'react';
// import { Observable, of, Subject } from 'rxjs';
// import { catchError, reduce, take } from 'rxjs/operators';
import PlayerDataGrid from './PlayerDataGrid';
import ApiComponentLoader from '../ApiComponentLoader';
import api from '../../services/api';
import { Player } from '../../models/IPlayer';
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { useAuth0 } from '@auth0/auth0-react';

interface PlayerProps{
    playerList: Player[];
}

function PlayerTableLoader() {
  // this sets up function (from componentLoading.tsx) which either returns 
  // DataGridPlayers (playerDataGrid.tsx) 
  // or
  // a message 'Hold on, fetching data may take some time :)'
  // we call this as <TableLoading isLoading={appState.loading} playerList={appState.playerList} />
  // isLoading={appState.loading} says that the boolean for whether data is available is 'appState.loading' variable
  // playerList={appState.playerList} says that (if the data is available) send the appState.playerList to the DataGridPlayers Component
  const TableLoading = (PlayerDataGrid);
  const [appState, setAppState] = useState<PlayerProps>({
    playerList: [],
  });
  // defines a state for whenever an error occurs
  const [errorMessage, setErrorMessage] = useState("");
    // defines a state for when the api is fetching data for players
  const [isLoading, setLoading] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  const getAllPlayers = async () => {

    const token = await getAccessTokenSilently();
    console.log(token)

    setLoading(true);
    setErrorMessage("");
    setAppState({ playerList: [] });

    api.get('players/get-all', {
      Headers: {
        'Authorization':`Bearer ${token}`
      }
    }).subscribe({
      next: (players) => {
        setAppState({ playerList: players as Player[] });
        setLoading(false);
      },
      error: (e) => {
        setLoading(false);
        // this sets 'errorMessage' into the error that has occured
        setErrorMessage(e);
      }
      
    })
  }

  // this is the call to the API to get the player data
  useEffect(() => {
    getAllPlayers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
export default PlayerTableLoader;