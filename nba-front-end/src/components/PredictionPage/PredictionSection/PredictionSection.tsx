import { Button, Paper } from '@mui/material'
import './PredictionSectionStyles.css';
import React, { useEffect, useState } from 'react'

//todo make models/predictionModels section
import {ITeam} from '../../PredictionPage/PredictionPage'

function PredictionSection(props: any) {

  interface IPredictionResult {
    teams: ITeam[],
    winner: string,
    loser: string,
    edge: string,
    IsDraw: boolean,    
  }

  const [predictionResult, setPredictionResult] = useState<IPredictionResult>({
    teams: [],
    winner: "",
    loser:"",
    edge: "",
    IsDraw:false
  })

  const calculatePrediction = () => {

    if (props.selectedTeams.length === 2) {
      
      let totalWinPer = 0
      props.selectedTeams.forEach((team: any) => totalWinPer += team.WinPer)
      // totalWinPer = (Math.round((totalWinPer + Number.EPSILON) * 100) / 100)   

      let teamMatchUp: any =
      {
        teams:[
          ...props.selectedTeams
        ]
      }
    
      teamMatchUp.teams.forEach((team: any) => team.winChance = team.WinPer / totalWinPer)      

      let winner: string = "";
      let loser: string = "";
      let edge: string = "";
      let roundEdge: number = 0;
      let IsDraw: boolean = false;

      if (teamMatchUp.teams[0].winChance > teamMatchUp.teams[1].winChance) {
        winner = `${teamMatchUp.teams[0].TeamName}`
        loser = `${teamMatchUp.teams[1].TeamName}`

        roundEdge = teamMatchUp.teams[0].winChance - teamMatchUp.teams[1].winChance
        roundEdge = (Math.round((roundEdge + Number.EPSILON) * 100) / 100) * 100

        edge = `${roundEdge}%`

      } else if (teamMatchUp.teams[1].winChance > teamMatchUp.teams[0].winChance) {
        
        winner = `${teamMatchUp.teams[1].TeamName}`
        loser = `${teamMatchUp.teams[0].TeamName}`
        roundEdge = teamMatchUp.teams[1].winChance - teamMatchUp.teams[0].winChance
        roundEdge = (Math.round((roundEdge + Number.EPSILON) * 100) / 100) * 100
        edge = `${roundEdge}%`        

      } else {

        IsDraw = true

      }

      
      teamMatchUp.winner = winner;
      teamMatchUp.loser = loser;
      teamMatchUp.edge = edge;
      teamMatchUp.IsDraw = IsDraw;

      setPredictionResult(teamMatchUp as IPredictionResult)
    }
    

  

  }
  useEffect(() => {
    calculatePrediction()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedTeams])


  const navigateToMatchUps = () => { props.setValue(0) }


  const createMatchUpResultHtml = () => {
    
    let winnerColour = predictionResult.winner === predictionResult.teams[0].TeamName ? 'blue' : 'red'
    let loserColour = winnerColour === 'blue' ? 'red':'blue'

    return (
      <>        
        <h1><span className='blue'>{predictionResult.teams[0].TeamName}</span> VS <span className='red'>{predictionResult.teams[1].TeamName}</span></h1>
        <h1><span className={winnerColour}>{predictionResult.winner}</span> has an edge of {predictionResult.edge} against <span className={loserColour}>{predictionResult.loser}</span></h1>
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
        {props.selectedTeams.length !== 2 && <h1>Please Select Two Teams</h1>}  
        {(predictionResult.teams.length === 2 && !predictionResult.IsDraw) && createMatchUpResultHtml()}        
        {(predictionResult.teams.length === 2 && predictionResult.IsDraw) && <h1>{predictionResult.teams[0].TeamName} and {predictionResult.teams[1].TeamName} are evenly matched</h1>}
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