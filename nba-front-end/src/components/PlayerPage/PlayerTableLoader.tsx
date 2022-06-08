import { useEffect, useState } from 'react';
import PlayerDataGrid from './PlayerDataGrid';
import api from '../../services/api';
import { Player } from '../../models/IPlayer';
import { useAuth0 } from '@auth0/auth0-react';

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

  const { getAccessTokenSilently } = useAuth0();

  const getAllPlayers = async () => {

    const token = await getAccessTokenSilently();

    setLoading(true);
    setErrorMessage("");
    setAppState({ playerList: [] });

    api.get('players/get-all', token).subscribe({
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