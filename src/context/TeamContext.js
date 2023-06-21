import React, { createContext, useState, useEffect } from 'react';

export const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [teamIDs, setTeamIDs] = useState([]);
  const fetchTeamIDs = () => {
    fetch("http://localhost:8081/team/getAll")
      .then((res) => res.json())
      .then((result) => {
        const teamIDs = result.map((team) => team.teamID); 
         setTeamIDs(teamIDs);
      });
  };

  useEffect(() => {
    fetchTeamIDs();
  }, []);

  const teamContextValues = {
    teamIDs : teamIDs || [],
    fetchTeamIDs,
  };

  return (
    <TeamContext.Provider value={teamContextValues}>
      {children}
    </TeamContext.Provider>
  );
};