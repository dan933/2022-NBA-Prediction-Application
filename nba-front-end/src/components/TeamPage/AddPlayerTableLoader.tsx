import { useCallback, useEffect, useState } from 'react';
import AddPlayerTable from './AddPlayerTable';
import api from '../../services/api';
import { Player } from '../../models/IPlayer';
import { useAuth0 } from '@auth0/auth0-react';


interface PlayerProps{
    playerList: Player[];
}

function AddPlayerTableLoader(props:any) {

  const { getAccessTokenSilently } = useAuth0();

  const [appState, setAppState] = useState<PlayerProps>({
    playerList: [],
  });

  // defines a state for whenever an error occurs
  const [errorMessage, setErrorMessage] = useState("");
    // defines a state for when the api is fetching data for players
  const [isLoading, setLoading] = useState(false);

  const setIsUpdated=props.setIsUpdated;
  const  updatePlayerData = useCallback(
    async () =>  {
      setLoading(true);
      const token = await getAccessTokenSilently();
      setErrorMessage("");
      setAppState({ playerList: [] });
      api.get('players/get-all',token).toPromise().then((resp) => {
          setLoading(false);
          setAppState({ playerList: resp as Player[] });
          setIsUpdated(false);
          })
    // this catches any errors that may occur while fetching for player data
          .catch(error => { console.log(error); 
          setLoading(false);
    // this sets 'errorMessage' into the error that has occured
          setErrorMessage(error);
          })
    },
    [setLoading, getAccessTokenSilently, setAppState, setIsUpdated, setErrorMessage],
  )
  
  // this is the call to the API to get the player data
  useEffect(() => {
    updatePlayerData();
  }, [updatePlayerData]);

  return (
    <>
      <div>
  {/* if the error message is not empty or does not equal "", then the error message will appear*/}
        {errorMessage!==""&&<h1 style={{color: 'red'}}>Oops! An Error Occured Please Try Again.</h1>}
  {/* if  isLoading is true, loading text will apear, if api is able to fetch player data and isLoading is false, then show filled player table*/}
  <AddPlayerTable playerList={appState.playerList} teamID={props.teamID} loading={isLoading}
        tableIsUpdated={props.tableIsUpdated} teamPlayersList={props.teamPlayersList}
        />
      </div>
    </>

  );
}
export default AddPlayerTableLoader;