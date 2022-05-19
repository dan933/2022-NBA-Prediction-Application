import React from 'react'

const calculateTotal = (selectedTeams:any) => {
    let totalWinPer = 0
    selectedTeams.forEach((team: any) => totalWinPer += team.WinPer)
    
    return totalWinPer
}

const calculatePrediction = (selectedTeams: any) => {

    const totalWinPer = calculateTotal(selectedTeams);

    let teamMatchUp: any =
    {
      teams:[
        ...selectedTeams
      ]
    }
  
    teamMatchUp.teams.forEach((team: any) => team.winChance = team.WinPer / totalWinPer)      

    let winner: string = "";
    let loser: string = "";
    let edge: string = "";
    let roundWinChance: number = 0;
    let IsDraw: boolean = false;

    if (teamMatchUp.teams[0].winChance > teamMatchUp.teams[1].winChance) {
      winner = `${teamMatchUp.teams[0].TeamName}`
      loser = `${teamMatchUp.teams[1].TeamName}`

      roundWinChance = teamMatchUp.teams[0].winChance
      roundWinChance = (Math.round((roundWinChance + Number.EPSILON) * 100) / 100) * 100

      edge = `${roundWinChance}%`

    } else if (teamMatchUp.teams[1].winChance > teamMatchUp.teams[0].winChance) {
      
      winner = `${teamMatchUp.teams[1].TeamName}`
      loser = `${teamMatchUp.teams[0].TeamName}`
      roundWinChance = teamMatchUp.teams[1].winChance
      roundWinChance = (Math.round((roundWinChance + Number.EPSILON) * 100) / 100) * 100
      edge = `${roundWinChance}%`        

    } else {

      IsDraw = true

    }

    teamMatchUp.winner = winner;
    teamMatchUp.loser = loser;
    teamMatchUp.edge = edge;
    teamMatchUp.IsDraw = IsDraw;

    return teamMatchUp;

}

export default {calculatePrediction}