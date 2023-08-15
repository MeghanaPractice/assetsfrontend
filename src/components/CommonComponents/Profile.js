import { React, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Button, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import LoginButton from "./login";
import { UserRoleContext } from "../../context/UserRoleContext";
export default function Profile(){
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const { userRole } = useContext(UserRoleContext);
  if (isLoading) {
    return <div className="div-centerstyle"><CircularProgress/></div>
  }
  else if(!isAuthenticated)
  {
    return <LoginButton/>;
  }
  return (
    isAuthenticated && (
      <div className="div-centerstyle" style={{padding:'20px'}}>
        <Avatar src={user.picture} alt={user.name}></Avatar>
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="subtitle2">{userRole} User</Typography>
        <Button variant="contained" className="button-gradient" onClick={() => logout({ logoutParams: { returnTo: 'http://127.0.0.1:3000' } })}>Logout</Button>
      </div>
    )
  );
};

