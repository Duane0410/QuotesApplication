import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequireAuth = () => {
    const { auth } = useAuth()
    const location = useLocation()

  return (
        auth?.user
            ? <Outlet />
            : <Navigate to='/log-in' state={{ from: location }} replace />
  )
}

export default RequireAuth