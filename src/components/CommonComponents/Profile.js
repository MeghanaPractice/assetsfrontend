import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import LoginButton from "./login";

export default function Profile(){
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  if (isLoading) {
    return <div className="div-centerstyle"><CircularProgress/></div>
  }
  else if(!isAuthenticated)
  {
    return <LoginButton/>;
  }
  return (
    isAuthenticated && (
      <div className="div-centerstyle">
        <Avatar src={user.picture} alt={user.name}></Avatar>
        <p>{user.email}</p>
        <Button variant="contained" className="button-gradient" onClick={() => logout({ logoutParams: { returnTo: 'http://127.0.0.1:3000' } })}>Logout</Button>
      </div>
    )
  );
};

