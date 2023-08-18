import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoutes({isLoggedIn}) {
  return (
    <div>
        {
            isLoggedIn === true ? <Outlet /> : <Navigate to={"/login"} />
        }
    </div>
  )
}

export default ProtectedRoutes