import { Button, Paper } from '@mui/material'
import './PredictionSectionStyles.css';
import React, { useEffect, useState } from 'react';
import GetTeamMatchUp from '../../../services/api';

//todo make models/predictionModels section
import {ITeam} from '../../PredictionPage/PredictionPage'
import api from '../../../services/api';

function PredictionSection(props: any) {

  interface ITeamMatchUp{
    winningTeam?: string,
    losingTeam?: string,
    winTeamProbability: number,
    isDraw?:boolean
  }

  const [teamMatchUp, setTeamMatchUp] = useState<ITeamMatchUp>()

  const calculatePrediction = async () => {
    if (props.selectedTeamsId.length === 2) {
      const res = await api.GetTeamMatchUp(props.selectedTeamsId[0], props.selectedTeamsId[1])
      setTeamMatchUp(res.data)
    }
    
  }
  useEffect(() => {
    if (props.selectedTeamsId.length === 2) {
      calculatePrediction()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedTeamsId])


  const createMatchUpResultHtml = () => {
    let WinChance: number = teamMatchUp?.winTeamProbability !== undefined ? teamMatchUp?.winTeamProbability * 100 : 0;

    return (
      <>        
        <h1><span className='blue'>{teamMatchUp?.winningTeam}</span> VS <span className='red'>{teamMatchUp?.losingTeam}</span></h1>
        <h1><span className='blue'>{teamMatchUp?.winningTeam}</span> is predicted to have a {WinChance.toLocaleString()} % chance of  winning against <span className='red'>{teamMatchUp?.losingTeam}</span></h1>
      </>
    )            
  }
  
  
  return (
      <>
          <Paper
              sx={{
                p: 2,
                height: 'auto'                
            }}
            >
        {props.selectedTeamsId.length !== 2 && <h1>Please Select Two Teams</h1>}  
        {(teamMatchUp && !teamMatchUp.isDraw) && createMatchUpResultHtml()}
        {(teamMatchUp && teamMatchUp.isDraw) && <h1>{teamMatchUp?.winningTeam} and {teamMatchUp?.losingTeam} are evenly matched</h1>}
        <Button
          variant="contained"
          onClick={props.navigateToMatchUps}
        >
          MATCH UPS
        </Button>
          </Paper>
      </>
  )
}

export default PredictionSection