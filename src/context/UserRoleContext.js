import React, { createContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { config } from '../usermanagementapiconfig';

export const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const { user } = useAuth0();
  const role = user?.[config.namespace + '/roles'];
  const ID = user?.[config.namespace + '/empID'];
  const [userRole, setUserRole] = useState(null);
  const [userID, setUserID] = useState(null);

  useEffect(()=>{
    setUserRole(role);
    setUserID(ID);
    console.log('Logged in User Role:',role);
    console.log('Logged in User Employee ID:',userID);
  },[user])

  return (
    <UserRoleContext.Provider value={{ userRole,userID }}>
      {children}
    </UserRoleContext.Provider>
  );
};
