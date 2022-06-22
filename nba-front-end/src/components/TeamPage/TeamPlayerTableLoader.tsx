import React, { useContext } from "react";
import TeamPlayerTable from './TeamPlayerTable';
import { TeamPageContext } from '../../services/Contexts/TeamPageContext';
import { TeamPageContextType } from "../../models/ContextModels/TeamPageContextModels";

const TeamPlayerTableLoader: React.FC<any> = () => {

  const { teamSelectionModel, isLoading } = useContext(TeamPageContext) as TeamPageContextType


  const yourLineUpSection = () => {
    if (!teamSelectionModel.TeamID) {
      return (
        <h1>Please select a team</h1>
      )
    } else {
      return (
        <TeamPlayerTable
          loading={isLoading}          
        />
      )
    }
  }

  return (
    <>
      {/* if  isLoading is true, loading text will apear, if api is able to fetch player data and isLoading is false, then show filled player table*/}
      {yourLineUpSection()}
    </>
  );
};

export default TeamPlayerTableLoader;
