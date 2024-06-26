/*For use of BeQiSoft Pvt Ltd. */

import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { CircularProgress } from '@mui/material'

export default function PrivateRoute ({ children }) {
  const { isAuthenticated, isLoading } = useAuth0()
  if (isLoading) {
    return (
      <div className='div-centerstyle'>
        <CircularProgress />
      </div>
    )
  }
  return isAuthenticated ? children : <Navigate to='/' />
}
