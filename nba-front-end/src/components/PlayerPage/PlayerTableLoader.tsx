import { useEffect, useState } from 'react';
import PlayerDataGrid from './PlayerDataGrid';
import api from '../../services/api';
import { Player } from '../../models/IPlayer';

interface PlayerProps{
    playerList: Player[];
}

function PlayerTableLoader() {
  
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
    <>
      <div>
  {/* if the error message is not empty or does not equal "", then the error message will appear*/}
        {errorMessage!==""&&<h1 style={{color: 'red'}}>Oops! An Error Occured Please Try Again.</h1>}
  {/* if  isLoading is true, loading text will apear, if api is able to fetch player data and isLoading is false, then show filled player table*/}
        {isLoading ? (<h1>Hold on, fetching data may take some time :)</h1>) : (<PlayerDataGrid playerList={appState.playerList} />)}
      </div>
    </>

  );
}
export default PlayerTableLoader;