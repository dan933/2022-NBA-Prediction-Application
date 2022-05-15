import React from 'react'

const calculateTotal = (selectedTeams:any) => {
    let totalWinPer = 0
    selectedTeams.forEach((team: any) => totalWinPer += team.WinPer)
    
    return totalWinPer
}

export default {calculateTotal}