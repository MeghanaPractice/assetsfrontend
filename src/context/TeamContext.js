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

 const fetchEmployees = async (teamID, setTeamEmployees) => {
  try {
    const response = await fetch(`http://localhost:8081/employee/getFrom/${teamID}`);
    const data = await response.json();
    const emps = data.map((emp) => emp.employeeID);
    setTeamEmployees(emps);
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
};

  return (
    <TeamContext.Provider value={{ teamIDs, fetchEmployees }}>
      {children}
    </TeamContext.Provider>
  );
};