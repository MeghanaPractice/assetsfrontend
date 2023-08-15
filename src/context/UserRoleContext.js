import React, { createContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { config } from '../usermanagementapiconfig';
import CircularProgress from '@mui/material/CircularProgress';

export const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const { user, isLoading, isAuthenticated } = useAuth0();
  const role = user?.[config.namespace + '/roles'];
  const ID = user?.[config.namespace + '/empID'];
  const [userRole, setUserRole] = useState([]);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      setUserID(ID);
      setUserRole(role);
      console.log('Logged in User Role:', role);
      console.log('Logged in User Employee ID:', ID);
    }
  }, [isAuthenticated]); 

  if (isLoading) {
     return <div className="div-centerstyle"><CircularProgress/></div>;
  }

  return (
    <UserRoleContext.Provider value={{ userRole, userID }}>
      {children}
    </UserRoleContext.Provider>
  );
};
