import React, { createContext, useState, useEffect } from 'react';
import { fetchItems as fetchTeams, fetchEmp } from '../service/apiService';

export const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [teamIDs, setTeamIDs] = useState([]);

  const fetchTeamIDs = () => {
    fetchTeams('team')
    .then((result) => {
      const teamIDs = result.map((team) => team.teamID);
      setTeamIDs(teamIDs);
    });
  };

  useEffect(() => {
    fetchTeamIDs();
  }, []);

  const fetchEmployees = async (teamID, setTeamEmployees) => {
    fetchEmp(teamID)
      .then((result) => { setTeamEmployees(result); })

  };

  return (
    <TeamContext.Provider value={{ teamIDs, fetchEmployees }}>
      {children}
    </TeamContext.Provider>
  );
};