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

    return teamMatchUp;

}

export default {calculatePrediction}