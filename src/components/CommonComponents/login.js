import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
export default function LoginButton() 
{
    const { loginWithRedirect } = useAuth0();
    return <Button variant='contained' className="button-gradient"  onClick={() => loginWithRedirect()}>Log In</Button>;
};

