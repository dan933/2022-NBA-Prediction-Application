import { useCallback, useEffect, useState, useContext } from 'react';
import AddPlayerTable from './AddPlayerTable';
import api from '../../services/api';
import { Player } from '../../models/IPlayer';
import { useAuth0 } from '@auth0/auth0-react';

import { TeamPageContext } from '../../services/Contexts/TeamPageContext';
import { TeamPageContextType } from '../../models/ContextModels/TeamPageContextModels';

const AddPlayerTableLoader: React.FC<any> = (props: any) => {
  
  const { setPlayersList } = useContext(TeamPageContext) as TeamPageContextType


  const { getAccessTokenSilently } = useAuth0();

  // defines a state for whenever an error occurs
  const [errorMessage, setErrorMessage] = useState("");
  // defines a state for when the api is fetching data for players
  const [isLoading, setLoading] = useState(false);

  const updatePlayerData =
    async () => {
      setLoading(true);
      const token = await getAccessTokenSilently();
      setErrorMessage("");
      
      api.get('players/get-all', token).toPromise().then((resp) => {
        setLoading(false);
        setPlayersList(resp)        
      })
        // this catches any errors that may occur while fetching for player data
        .catch(error => {
          console.log(error);
          setLoading(false);
          // this sets 'errorMessage' into the error that has occured
          setErrorMessage(error);
        })
    }
  
  // this is the call to the API to get the player data
  useEffect(() => {
    updatePlayerData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPlayersList]);

  return (
    <>
      <div>
  {/* if the error message is not empty or does not equal "", then the error message will appear*/}
        {errorMessage!==""&&<h1 style={{color: 'red'}}>Oops! An Error Occured Please Try Again.</h1>}
        {/* if  isLoading is true, loading text will apear, if api is able to fetch player data and isLoading is false, then show filled player table*/}
        
        {!isLoading ? <AddPlayerTable /> : null}
      </div>
    </>

  );
}
export default AddPlayerTableLoader;